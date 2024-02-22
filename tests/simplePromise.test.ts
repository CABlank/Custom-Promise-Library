import SimplePromise from '../src/SimplePromise';

describe('SimplePromise', () => {
    test('should resolve with the correct value', (done) => {
        const expectedResult = 42;
        const promise = new SimplePromise((resolve) => {
            resolve(expectedResult);
        });

        promise.then(value => {
            expect(value).toBe(expectedResult);
            done();
        });
    });

    test('should reject with the correct reason', (done) => {
      const expectedReason = 'error';
      const promise = new SimplePromise((_, reject) => {
        reject(expectedReason);
      });

      promise.then(undefined, reason => {
        expect(reason).toBe(expectedReason);
        done();
      });
    });

    test('then callbacks added after resolution are executed', (done) => {
        const expectedResult = 'later';
        const promise = new SimplePromise((resolve) => {
            resolve(expectedResult);
        });

        // Simulate adding the callback after resolution
        setTimeout(() => {
            promise.then(value => {
                expect(value).toBe(expectedResult);
                done();
            });
        }, 0);
    });
});
