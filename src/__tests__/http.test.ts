import { createHttp } from '../index'

test('http', () => {
  expect(typeof createHttp).toBe('function')
})