# Callback 함수, Promise, Async/Await

함수를 인자로 받아 함수에서 특정 조건에서 실행시키는 함수

- JavaScript 에서 함수는 일급 객체 = Object

## Callback 함수

```typescript
type Callback = {
  (result: number): void;
}

function lazyAdd(a: number, b: number, callback: Callback) {
  setTimeout(() => {
    callback(a + b)
  }, 1000)
}

lazyAdd(1, 2, (result) => {
  console.log(result)
})
```

## Promise

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise

Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다.

Promise는 프로미스가 생성된 시점에는 알려지지 않았을 수도 있는 값을 위한 대리자로, 비동기 연산이 종료된 이후에 결과 값과 실패 사유를 처리하기 위한 처리기를 연결할 수 있습니다. 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있습니다. 다만 최종 결과를 반환하는 것이 아니고, 미래의 어떤 시점에 결과를 제공하겠다는 '약속'(프로미스)을 반환합니다.

Promise는 다음 중 하나의 상태를 가집니다.

- 대기(pending): 이행하지도, 거부하지도 않은 초기 상태.
- 이행(fulfilled): 연산이 성공적으로 완료됨.
- 거부(rejected): 연산이 실패함.

![diagram](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)

## Async / Await

https://developer.mozilla.org/ko/docs/conflicting/Learn/JavaScript/Asynchronous/Promises

```typescript
async function hello() { 
  return "Hello" 
};

console.log(hello());
```