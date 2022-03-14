# Functional programming

- 입출력이 순수해야함 (Pure JavaScript function)
- 부작용(side effects)이 없어야 함: 원본 데이터는 불변 해야함.
- 함수와 데이터를 중심으로 사고

## Functional programming 의 장점

- 부작용이 적음
- 코드의 재사용성이 높아 짐
- JavaScript 언의 지향점: 객체지향 => 함수형
- 테스트의 용이 ⭐️

## What functional programming isn't

- 반복문
  - `while`
  - `do` ... `while`
  - `for`
  - `for` ... `of`
  - `for` ... `in`
- `var` or `let` 변수선언
- `void` 함수
- 객체 뮤테이션: ex) `o.x = 5;`
- 배열 변경 메서드: 원본 배열을 변경 시키는 매서드
  - `copyWithin`
  - `fill`
  - `pop`
  - `push`
  - `reverse`
  - `shift`
  - `sort`
  - `splice`
  - `unshift`
- Map mutator 매서드
  - `clear`
  - `delete`
  - `set`
- Set mutator 매서드
  - `add`
  - `clear`
  - `delete`

## 순수 함수(Pure function)

- 프로그램에 함수가 포함되어 있다고 해서 반드시 함수형 프로그래밍을 하고 있다는 의미는 아님
- 순수 함수는 다음의 속성을 가지고 있음
  - 참조 투명성: 함수는 항상 동일한 인수에 대해 동일한 반환 값을 제공한다. 이는 함수가 변경 가능한 상태에 종속될 수 없음을 의미함
  - 부작용 없음: 기능이 부작용을 일으키지 않아야 함. 부작용에는 I/O(예: 콘솔 또는 로그 파일에 쓰기), 변경 가능한 개체 수정, 변수 재할당 등이 포함될 수 있음.

## 불변성(Immutability)

## Function composition

## 재귀 함수 Recursion

- 반복문 대신 재귀함수를 사용

```typescript
function iterativeAdder(iter: number) {
 let value = 0;
 for (let i = 1; i <= iter; i++) {
   value += i;
 }
 return value;
};

console.log("== iterative add", iterativeAdder(10))


function recursiveAdder(iter: number): number {
  if (iter === 0) return 0;
  return iter + recursiveAdder(iter - 1)
}

console.log("== recursive add", recursiveAdder(10))
```

## 고차함수 (Higher-order function)

