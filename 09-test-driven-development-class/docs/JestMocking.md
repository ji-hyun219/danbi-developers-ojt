# Jest Mocking

## module mocking pattern

아래와 같이 `libs` 모듈에 `mqttClient`가 담겨있고, 테스트할 함수에 테스트 환경에서는 실행되면 안되는 MQTT 클라이언트가 있다고 가정하면

```
src
├─┬ libs
│ └─┬ mqtt
│   ├── mqttClient.ts
│   └─┬ __mocks__
│     └── mqttClient.ts
├── index.ts
└─┬ process
  ├─┬ __tests__
  │ └── process.spec.ts
  └── index.ts
```

모듈 `mock` 함수를 만드는 작업은 아래와 같이 같은 레벨에서 `import`하는 함수 파일과 동일한 파일을 `__mocks__` 하위에 같은 이름으로 만든다.

아래 mock함수는 사용하는 MQTT Client의 클래스를 만들어 구현체를 만들어 사용함(Class)
```ts
// src/libs/mqtt/__mocks__/mqttClient.ts
const MQTTClientMock = jest.fn().mockImplementation(() => ({
  client: jest.fn().mockImplementation(() => ({
    subscribe: jest.fn(),
    on: jest.fn(),
    publish: jest.fn(),
  })),
  listening: jest.fn(),
  subscribe: jest.fn(),
  removeRetain: jest.fn(),
  publish: jest.fn(),
}));

export default MQTTClientMock;

export const mqttClient = new MQTTClientMock();
```

테스트할 함수는 `mqttClient`를 사용하고 있으며, 이 함수`process`의 코드는 테스트 되어야 하고, `mqttClient`는 Mocking 되어야 한다.

```ts
// src/process/__tests__/process.spec.ts
import { process } from "../process"

jest.mock("libs/mqtt/mqttClient");

describe("process test", () => {
  it("should return normal result", () => {
    const result = process();
    expect(result).toEqual(expectaionResult);
  })
})
```

하지만 `mock` 함수의 결과값을 활용하여 `process`코드에 값이 있어야 하는 경우 `mockImplementation`을 수행할 수 도 있다.

```ts
// src/process/__tests__/process.spec.ts
import { process } from "../process";
import { mqttClient } from "libs/mqtt/mqttClient";

jest.mock("libs/mqtt/mqttClient");

describe("process test", () => {
  it("should return normal result", () => {
    // mqttClient.publish 함수를 실행한 결과는 1이 되어야할 경우
    (mqttClient.publish as jest.Mock).mockResolvedValue(1);
    const result = process();
    expect(result).toEqual(expectaionResult);
  })
})
```

## module mocking pattern (extended)

사용하는 모듈의 메서드가 꽤 많아 모든 `mock` 메서드를 만들어야 할 경우 모듈의 타입을 참조하여 Mocking 한다.

예를들어 `prisma` 클라이언트를 mocking 하는 경우,

```
src
├─┬ libs
│ └─┬ prisma
│   ├── prismaClient.ts
│   └─┬ __mocks__
│     └── prismaClient.ts
├── index.ts
└─┬ process
  ├─┬ __tests__
  │ └── process.spec.ts
  └── index.ts
```

`jest-mock-extended` 모듈을 사용하여 Mocking 한다.

```ts
// src/libs/prisma/__mocks__/prismaClient.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prismaOrigin from "../prisma";

jest.mock("../prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prisma);
});

export type PrismaMock = DeepMockProxy<PrismaClient>;

export const prisma = prismaOrigin as unknown as DeepMockProxy<PrismaClient>;

export default prisma;
```

여기서 주목해야할 부분은 `jest.mock` 과 동시에 `default`에 `mockDeep` 함수로 타입스크립트 타입을 제네릭으로 전달한다는 점.

그리고 모든 테스트를 수행하기전에 Mocking 된 Prisma를 리셋한다는 점이다.

Mocking된 `prisma`는 실제 반환해야할 DB값을 전달하여 여러 데이터 케이스에 따라 테스트가 될 수 있도록 고려해야한다.

```ts
import { PrismaMock } from "libs/prisma/__mocks__/prismaClient";
import { prisma } from "libs/prisma/prismaClient";
import { process } from "../process";

jest.mock("libs/prisma/prismaClient");

describie("query user findUnique process test", () => {
  it("should resolve normal result", async () => {
    (prisma as unknown as PrismaMock)
      .user
      .findUnique
      .mockResolvedValue(sampleUser);
    const result = process();
    expect(result).toEqual(expectedResult);
  })
})
```

`prisma` 클라이언트에서 에러가 발생하는 경우를 Mocking할땐, `mockRejectedValue` 함수를 호출한다.

## custom module mocking pattern

### case 1: export default `jest.mock`, `mockImplementation`

```
src
├─┬ libs
│ └─┬ module
│   └── module1.ts
├── index.ts
└─┬ process
  ├─┬ __tests__
  │ └── process.spec.ts
  └── index.ts
```

```ts
// src/libs/module/module1.ts

export default function module1() {
  return { error: false, message: null, data: "hello real world" }
}
```

```ts
// src/process/index.ts
import moduleDefault from "libs/module/module1";

export function process() {
  const data = moduleDefault();
  return data;
}
```

default export된 함수의 경우 `jest.mock`으로 경로를 적어주면 자동으로 Mocking이 된다. auto mocking의 경우에도 가상의 값을 리턴하여 함수가 오류가 발생하지 않도록, 그리고 케이스를 다양하게 구성하여 테스트를 한다.

```ts
// src/process/__tests__/process.spec.ts
import { process } from "../process";
import moduleDefault from "libs/module/module1";

describe("custom module mock", () => {
  beforeEach(jest.mockClear);
  it("should return normal value", () => {
    jest.mock("libs/module/module1");
    (moduleDefault as jest.Mock).mockReturnValue({
      error: false,
      message: null,
      data: "hello test world",
    });
    const result = process();
    expect(result).toEqual(expectedResult);
  })
})
```

### case 2: named export `jest.spyOn`

```
src
├─┬ libs
│ └─┬ module
│   └── module1.ts
├── index.ts
└─┬ process
  ├─┬ __tests__
  │ └── process.spec.ts
  └── index.ts
```

```ts
// src/libs/module/module1.ts

export function module1() {
  return { error: false, message: null, data: "hello real world" }
}
```

```ts
// src/process/index.ts
import { module1 } from "libs/module";

export function process() {
  const data = module1();
  return data;
}

```

`jest.spyOn` 함수는 테스트하려는 함수 내부의 Mocking 하고자 하는 함수를 명시하고 Mocking한 리턴값을 적는다. (TypeScript 작동하여, 실제 맞는 타입의 가상의 값을 주어야 함)

```ts
// src/process/__tests__/process.spec.ts
import { process } from "../process";
import * as module from "libs/module";

jest.mock("libs/module", () => ({
  __esModule: true,
  ...jest.requireActual("libs/module"),
}));

describe("custom module mock", () => {
  it("should return normal value", () => {
    const spy = jest.spyOn(module, "module1").mockReturnValue({
      error: false,
      message: null,
      data: "hello test world",
    });
    const result = process();
    expect(result).toEqual(expectedResult);
    spy.mockRestore();
  })
})
```