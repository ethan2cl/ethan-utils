import { serialize } from '../axios/http'

test('serialize序列化测试', () => {
  expect(serialize({ a: 1, b: 2 })).toBe('?a=1&b=2')
})