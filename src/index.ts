function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function dimension(value: number): void {
  finite(value, 1e-6, 1e6);
}
function count(value: number): number {
  if (!Number.isSafeInteger(value) || value < 0)
    throw new RangeError('Count exceeds safe integer resolution');
  return value;
}
export function equalRisePlan(
  totalRise: number,
  maxRise: number,
  treadDepth: number,
): { risers: number; rise: number; treads: number; run: number; diagonal: number } {
  for (const v of [totalRise, maxRise, treadDepth]) dimension(v);
  const risers = count(Math.max(2, Math.ceil(totalRise / maxRise))),
    rise = totalRise / risers,
    treads = risers - 1,
    run = treads * treadDepth;
  return { risers, rise, treads, run, diagonal: Math.hypot(totalRise, run) };
}
