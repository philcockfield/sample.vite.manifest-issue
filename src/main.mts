export {};

import workerUrl from './worker.mjs?worker&url';

/**
 * Sample worker instantiation.
 */
const worker = new Worker(workerUrl, { type: 'module' });

console.log('-------------------------------------------');
console.log('workerUrl:', workerUrl);
console.log('worker (instance on main): ', worker);
