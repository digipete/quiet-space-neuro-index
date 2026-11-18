import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PRIVATE_ROUTES, writePrivatePages, verifyDeployment } from './deployment-checks.mjs';

function fixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'neuroindex-deployment-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  writePrivatePages(dir, '<html><head><title>NeuroIndex</title></head><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>');
  fs.mkdirSync(path.join(dir, 'spaces'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'spaces/index.html'), '<img src="/spaces/jellicoe-fora-space.jpg">');
  return dir;
}

test('all private direct links have physical pages, including OAuth consent', t => {
  const dir = fixture(t);
  for (const route of PRIVATE_ROUTES) assert.ok(fs.existsSync(path.join(dir, route.slice(1), 'index.html')));
  assert.ok(fs.existsSync(path.join(dir, '.lovable/oauth/consent/index.html')));
});

test('publishing fails when the /spaces direct-link file is missing', t => {
  const dir = fixture(t);
  fs.unlinkSync(path.join(dir, 'spaces/index.html'));
  assert.throws(() => verifyDeployment(dir, [{ path: '/spaces' }]), /\/spaces: direct-link page is missing/);
});

test('publishing fails when a listing photo is absent from the artifact', t => {
  const dir = fixture(t);
  assert.throws(() => verifyDeployment(dir, [{ path: '/spaces' }]), /missing listing photo \/spaces\/jellicoe-fora-space.jpg/);
});

test('publishing passes when direct links and listing photos are present', t => {
  const dir = fixture(t);
  fs.writeFileSync(path.join(dir, 'spaces/jellicoe-fora-space.jpg'), 'photo fixture');
  assert.doesNotThrow(() => verifyDeployment(dir, [{ path: '/spaces' }]));
});