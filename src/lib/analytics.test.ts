// @ts-ignore -- bun's built-in test runner types aren't part of the app's type setup
import { describe, expect, test, mock } from 'bun:test';
mock.module('@/integrations/supabase/client', () => ({ supabase: {} }));
const { sectionFor, referrerSource } = await import('./analytics');

describe('sectionFor', () => {
  test('guides', () => {
    expect(sectionFor('/blog/adhd-friendly-office/')).toBe('guide');
    expect(sectionFor('/neurodiversity-in-the-workplace/')).toBe('guide');
    expect(sectionFor('/for/hr-teams/')).toBe('guide');
  });
  test('blog index is not a guide', () => expect(sectionFor('/blog/')).toBe('other'));
  test('assessment', () => expect(sectionFor('/tools/sensory-self-assessment/')).toBe('assessment'));
  test('listings', () => {
    expect(sectionFor('/spaces/')).toBe('listing');
    expect(sectionFor('/space/abc/')).toBe('listing');
  });
});

describe('referrerSource', () => {
  test('no referrer is direct', () => expect(referrerSource('', 'index.quietspace.club')).toBe('direct'));
  test('own site is direct', () => expect(referrerSource('https://index.quietspace.club/blog/', 'index.quietspace.club')).toBe('direct'));
  test('google', () => expect(referrerSource('https://www.google.co.uk/', 'x')).toBe('Google'));
  test('linkedin', () => expect(referrerSource('https://www.linkedin.com/feed/', 'x')).toBe('LinkedIn'));
  test('other site keeps host', () => expect(referrerSource('https://www.example.org/a', 'x')).toBe('example.org'));
});