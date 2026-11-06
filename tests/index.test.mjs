import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('equal rises', () => {
  const p = api.equalRisePlan(3, 0.2, 0.3);
  assert.equal(p.risers, 15);
  assert.equal(p.rise, 0.2);
  assert.equal(p.treads, 14);
  assert.equal(p.run, 4.2);
});
test('ceiling risers', () => {
  const p = api.equalRisePlan(3.1, 0.2, 0.3);
  assert.equal(p.risers, 16);
  assert.ok(p.rise <= 0.2);
});
test('minimum two', () => {
  assert.equal(api.equalRisePlan(0.1, 0.2, 0.3).risers, 2);
});
test('conservation', () => {
  for (let h = 1; h <= 10; h++) {
    const p = api.equalRisePlan(h, 0.19, 0.3);
    assert.ok(Math.abs(p.rise * p.risers - h) < 1e-12);
  }
});
test('diagonal identity', () => {
  const p = api.equalRisePlan(3, 0.2, 0.3);
  assert.ok(Math.abs(p.diagonal ** 2 - (9 + p.run ** 2)) < 1e-12);
});
test('invalid dimensions', () => {
  assert.throws(() => api.equalRisePlan(0, 0.2, 0.3));
  assert.throws(() => api.equalRisePlan(3, 0, 0.3));
  assert.throws(() => api.equalRisePlan(3, 0.2, -1));
});
