import { equalRisePlan } from '@lp-labs/stair-layout';
if (equalRisePlan(3, 0.2, 0.3).risers !== 15) throw new Error('Geometry');
// @ts-expect-error invalid argument must be rejected by declarations
equalRisePlan('3', 0.2, 0.3);
