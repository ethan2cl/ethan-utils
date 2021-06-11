import { serialize } from '../utils/serialize'

test('serialize测试', () => {
  expect(serialize({ a: 1, b: 2})).toBe('?a=1&b=2')
})