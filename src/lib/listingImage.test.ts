// @ts-ignore -- bun's built-in test runner types aren't part of the app's type setup
import { test, expect } from 'bun:test';
import { versionedImageUrl, nextImageAttempt } from './listingImage';

test('adds a deploy version to local photos', () => {
  expect(versionedImageUrl('/spaces/a.jpg', 'abc')).toBe('/spaces/a.jpg?v=abc');
});
test('leaves external photos alone', () => {
  expect(versionedImageUrl('https://x.com/a.jpg', 'abc')).toBe('https://x.com/a.jpg');
});
test('retries a failed photo once only', () => {
  expect(nextImageAttempt('/spaces/a.jpg', 0, 123, 'abc')).toBe('/spaces/a.jpg?v=abc&r=123');
  expect(nextImageAttempt('/spaces/a.jpg', 1, 123, 'abc')).toBeNull();
});
