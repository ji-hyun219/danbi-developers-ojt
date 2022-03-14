# Closure

클로저는 함수와 **함수가 선언**된 어휘적 환경의 조합이다. 클로저를 이해하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)를 먼저 이해해야 한다.

## Lexical scoping: 어휘적 범위 지정

scope: 범위 지정

스코프는 함수를 **호출**할 때가 아니라 **선언**할 때 발생

| `init()`   | `displayName()` |
| ---------- | --------------- |
| const name |

```javascript
function init() {
  const name = "Danbi"; // name은 init에 의해 생성된 지역 변수이다.
  function displayName() { // displayName() 은 내부 함수이며, 클로저다.
    console.log(name); // 부모 함수에서 선언된 변수를 사용한다.
  }
  displayName();
}
init();
```

## Scope chain

내부 함수에서는 외부 함수의 변수에 접근 가능하지만 외부 함수에서는 내부 함수의 변수에 접근할 수 없음.

## Closure

```javascript
function makeFunc() {
  const name = "Danbi";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
//myFunc변수에 displayName을 리턴함
//유효범위의 어휘적 환경을 유지
myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)
```

```javascript
function makeAdder(x) {
  const y = 1;
  return function(z) {
    y = 100;
    return x + y + z;
  };
}
const add5 = makeAdder(5);
const add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨
console.log(add5(2));  // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산
```

### Uses of Closures

- 클로저는 함수와 연결된 프라이빗 상태가 필요할 때마다 유용하다. 
- JavaScript는 2015년까지 클래스 구문이 없었으며 여전히 private 필드 구문이 없다. 
- 클로저는 이러한 클래스를 쓰지 않고도 요구를 충족시킨다.

#### Private instance variables

```typescript
function Car(manufacturer: string, model: string, year: string, color: string) {
  return {
    toString() {
      return `${manufacturer} ${model} (${year}, ${color})`
    }
  }
}

const car = new Car('Aston Martin', 'V8 Vantage', '2012', 'Quantum Silver')
console.log(car.toString())
```

#### Modularization

다음 예에서 모든 구현 세부 정보는 즉시 실행되는 함수 표현식 안에 숨겨져 있습니다. 기능 tick을 toString닫고 작업을 완료하는 데 필요한 비공개 상태 및 기능을 닫습니다. 클로저를 통해 코드를 모듈화하고 캡슐화할 수 있습니다.


#### Example 1

- 다음 코드에서 세 가지 메서드 `log`, `increment`및 `update` 모두 동일한 렉시컬 환경에서 Close 됨.
- 그리고 `createObject`가 호출될 때마다 새로운 실행 컨텍스트(stack frame)가 생성되고 완전히 새로운 변수가 생성되며 이 새로운 변수`x`를 Close 하는 새로운 함수셋( `log`, `increment`, `update`)이 생성됨.

```typescript
function createObject() {
  let x = 42;
  return {
    log() { console.log(x) },
    increment() { x++ },
    update(value: number) { x = value }
  }
}

const o = createObject()
o.increment()
o.log() // 43
o.update(5)
o.log() // 5
console.dir(o)

const { log, increment, update } = createObject()
log() // 42
increment()
log() // 43
update(40)
log() // 40
```

#### Example 2

- `var`를 사용하여 선언된 변수를 사용하는 경우 Closed된 변수를 유의해야함. 
- `var`를 사용하여 선언된 변수는 [호이스팅](#호이스팅이란hoisting)(안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것을 말함)됨. 
- `let`과 `const` 의 도입으로 인해 모던 JavaScript에서 문제되지 않음.

다음 코드에서는 루프를 돌 때마다 `inner`를 `i`라는 클로저 변수를 담은 새 함수가 생성됨. 그러나 `var i` 루프 밖에서 호이스트되기 때문에 이러한 모든 내부 함수는 동일한 변수에 대해 Close 함. 즉, `i(3)`의 최종 값이 세 번 출력 됨.

```typescript
function foo() {
  var result = []
  for (var i = 0; i < 3; i++) {
    result.push(function inner() { console.log(i) })
  }

  return result
}

const result = foo()
// 3만 3번찍힘
for (var i = 0; i < 3; i++) {
  result[i]()
}
```

##### 호이스팅이란(Hoisting)

- 자바스크립트 함수는 실행되기 전에 함수 안에 필요한 변수값들을 모두 모아서 유효 범위의 최상단에 선언한다.
  - 자바스크립트 Parser가 함수 실행 전 해당 함수를 한 번 훑는다.
  - 함수 안에 존재하는 변수/함수선언에 대한 정보를 기억하고 있다가 실행시킨다.
  - 유효 범위: 함수 블록 `{}` 안에서 유효
- 즉, 함수 내에서 아래쪽에 존재하는 내용 중 필요한 값들을 끌어올리는 것이다.
  - 실제로 코드가 끌어올려지는 건 아니며, 자바스크립트 Parser 내부적으로 끌어올려서 처리하는 것이다.
  - 실제 메모리에서는 변화가 없다.
- `var` 변수 vs `let/const` 변수
```javascript
console.log("기준점");
var foo = "danbi1";
let foo2 = "danbi2";
const foo3 = "danbi3";
```
- 호이스팅 결과: 결과에는 문제 없음.
```javascript
/** --- JS Parser -- */
var foo;
console.log("기준점");
foo = "danbi1";
let foo2 = "danbi2";
const foo3 = "danbi3";
```
- 함수 선언문 vs 함수 표현식
```javascript
foo1();
foo2();

function foo1() { // 함수 선언문
  console.log("danbi1");
}
var foo2 = function() { // 함수 표현식
  console.log("danbi2");
}
```
- 호이스팅 결과: 에러발생
```javascript
/** -- JS Parser -- */
var foo2;

function foo1() { // Hoisted
  console.log("danbi1");
}

foo1();
foo2();

foo2 = function() {
  console.log("danbi2");
}
```