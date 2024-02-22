import SimplePromise from "./SimplePromise";

class PromisePool {
    private concurrencyLimit: number;
    private currentRunning: number = 0;
    private queue: (() => SimplePromise<any>)[] = [];

    constructor(concurrencyLimit: number = 5) {
        this.concurrencyLimit = concurrencyLimit;
    }

    add(promiseFunction: () => SimplePromise<any>) {
        return new SimplePromise<any>((resolve, reject) => {
            this.queue.push(() => promiseFunction().then(resolve).catch(reject));
            this.run();
        });
    }

    run() {
        while (this.currentRunning < this.concurrencyLimit && this.queue.length) {
            const task = this.queue.shift();
            if (task) {
                this.currentRunning++;
                task().finally(() => {
                    this.currentRunning--;
                    this.run();
                });
            }
        }
    }
}
