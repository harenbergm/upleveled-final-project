import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

test('stringify a cookie value', () => {
  expect(stringifyCookieValue([{ id: '1', stars: 2 }])).toBe(
    '[{"id":"1","stars":2}]',
  );
});

test('set, gets and delete a cookie', () => {
  const cookieKey = 'diet';
  const cookieValue = [{ id: '1', stars: 2 }];
  // First make sure that the return of the function is undefined
  // Use .toBe to compare primitive values
  expect(getParsedCookie(cookieKey)).toBe(undefined);
  // Set the cookie value and test if the value is updated
  expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();
  // Test cookie value, use .toStrictEqual to test that the object have the same type as well as structure
  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);
  // Best practice: clear the state you created after the test to bring the system back to the initial state
  // Delete cookie with deleteCookie function
  expect(deleteCookie(cookieKey)).toBe(undefined);
  // Check if delete function was successful
  expect(getParsedCookie(cookieKey)).toBe(undefined);
});
