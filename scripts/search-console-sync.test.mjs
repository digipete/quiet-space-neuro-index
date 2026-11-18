import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeAlerts, isIndexed, previousWeek } from './search-console-sync.mjs';

test('alerts when impressions fall by more than half week on week', () => {
  assert.equal(computeAlerts({ thisWeek: { impressions: 40 }, lastWeek: { impressions: 124 } }).length, 1);
  assert.equal(computeAlerts({ thisWeek: { impressions: 70 }, lastWeek: { impressions: 124 } }).length, 0);
});
test('no impressions alert while numbers are tiny', () => {
  assert.equal(computeAlerts({ thisWeek: { impressions: 0 }, lastWeek: { impressions: 7 } }).length, 0);
});
test('alerts when a key page drops out of Google', () => {
  const a = computeAlerts({ thisWeek: { impressions: 0 }, indexStatus: [{ url: 'u', indexed: false, coverage: 'Crawled - currently not indexed' }], previousIndexStatus: [{ url: 'u', indexed: true }] });
  assert.equal(a.length, 1);
});
test('alerts on sitemap errors', () => {
  assert.equal(computeAlerts({ thisWeek: { impressions: 0 }, sitemap: { errors: '2' } }).length, 1);
});
test('recognises indexed coverage states', () => {
  assert.ok(isIndexed('Submitted and indexed'));
  assert.ok(!isIndexed('Crawled - currently not indexed'));
});
test('previous week runs Monday to Sunday', () => {
  assert.deepEqual(previousWeek(new Date('2026-11-18T10:00:00Z')), { start: '2026-11-09', end: '2026-11-15' });
});
