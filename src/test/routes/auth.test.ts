import { getTokenFromHeader } from '../../routes/auth'
import { request } from 'http';

describe('Auth', () => {
  it('parses token from requests', () => {
    const req = {
      headers: {
        authorization: 'Token abcd'
      }
    }
    const actual = getTokenFromHeader(req)
    const expected = 'abcd'
    expect(actual).toBe(expected)
  })
})