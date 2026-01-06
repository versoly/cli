import { expect, test } from 'vitest';
import { KSON } from '../utils/kson';
import { readFileSync } from 'fs';
const dateKsonRaw = readFileSync(require.resolve('../registry/utils/date.kson'), 'utf-8');

console.log(KSON.parse(dateKsonRaw));
// import { $d } from '../registryutils/date.kson?raw';

const ksonString = `
key: [1, 2, 3, 4]
  anotherKey:
  nestedKey: value
  nestedArray: [true, false, null]
  .
astro: %html
<div></div>
%%
content: %jsx
<div></div>
%%
`;

const formattedKsonString = `key:
  - 1
  - 2
  - 3
  - 4
anotherKey:
  nestedKey: value
  nestedArray:
    - true
    - false
    - null
  .
astro: %html
  <div></div>
  %%
content: %jsx
  <div></div>
  %%`;

const jsObj = KSON.parse(ksonString);

test('KSON parse', () => {
  expect(jsObj).matchSnapshot();
});

test('KSON stringify', () => {
  const str = KSON.stringify(jsObj);
  expect(str).toEqual(formattedKsonString);
});
