# 코드 유지보수

## 일반코드: DRY (Don't repeat yourself)

유지보수가 쉬운 코드를 만드는 중요한 원칙

## 테스트코드: DAMP (Descriptive and Meaningful Phrases)

유닛 테스트 작성시 지켜야할 권장사항

- 테스트 코드는 자주 수정되지 않음
- 좋은 테스트는 코드 구현의 세부 사항을 테스트하지 않고 행동(behavior)을 테스트
- 구현을 자주 바뀔 수 있지만, 서비스 전체적인 행동은 쉽게 바뀌지 않음

## So what?

DRY 원칙을 적용해 중복되는 로직이 한 곳에 묶여있다면, 고장난 테스트 케이스 수정이 복잡해진다.
일반적인 상황에선 수정 전 코드의 전체적인 흐름을 먼저 이해하는것이 중요하지만, 테스트케이스를 하나 고치는 데엔 시간이 많이 소요된다.

### DRY 케이스의 코드의 테스트 코드

```js
it("should allow multiple users", () => {
  const testUsers = createUsers(false, false);
  validate(testUsers);
})

it("should not allow banned users", () => {
  const testUsers = createUsers(true);
  validate(testUsers);
})

// ... more tests

/* DRY 패턴 */
function createUsers(...isBanned) {
  return isBanned.map((banned) => (
    new User()
    .setState(banned ? : State.BANNED | State.ACTIVE)
    .build()
    )
  )
}

function validate(users) {
  const testGroup = new Group();
  for (const user of users) {
    try {
      testGroup.register(user);
    } catch(BannedUserException) {}
  }
  for (const user of users) {
    expect(testGroup.hanUser(use))
    .to.equal(user.state === State.BANNED)
  }
}

```

### DAMP 케이스 코드의 테스트 코드

```js
it("should allow multiple users", () => {
  const user0 = new User.setState(State.ACTIVE).build();
  const user1 = new User.setState(State.ACTIVE).build();

  const group = new Group();
  group.register(user0);
  group.register(user1);

  expect(group.hasUser(user0)).to.be.true;
  expect(group.hasUser(user1)).to.be.true;
})

it("shoud not allow banned users", () => {
  const user = new User.setState(State.BANNED).build();

  const group = new Group();
  try {
    group.register(user);
  } catch(BannedUserException) {
  }

  expect(group.hasUser(user)).to.be.false;
})
```