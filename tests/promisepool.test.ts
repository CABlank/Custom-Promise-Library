import { PromisePool } from '../src/PromisePool'; // Adjust the import path according to your project structure

describe('PromisePool', () => {
    test('limits the concurrency of promise execution', async () => {
        let concurrentRunning = 0;
        let maxConcurrentRunning = 0;

        const pool = new PromisePool(2); // Concurrency limit set to 2

        const createTestPromise = () => new Promise(resolve => {
            concurrentRunning++;
            maxConcurrentRunning = Math.max(maxConcurrentRunning, concurrentRunning);
            setTimeout(() => {
                concurrentRunning--;
                resolve(null);
            }, 100); // Each test promise resolves after 100ms
        });

        await Promise.all([
            pool.add(createTestPromise),
            pool.add(createTestPromise),
            pool.add(createTestPromise),
            pool.add(createTestPromise)
        ]);

        expect(maxConcurrentRunning).toBe(2); // Expect no more than 2 promises to run concurrently
    });

    test('resolves all promises', async () => {
        const pool = new PromisePool(2);
        const results = await Promise.all([
            pool.add(() => Promise.resolve(1)),
            pool.add(() => Promise.resolve(2)),
            pool.add(() => Promise.resolve(3)),
            pool.add(() => Promise.resolve(4))
        ]);

        expect(results).toEqual([1, 2, 3, 4]); // Verify all promises resolve with expected values
    });
});
