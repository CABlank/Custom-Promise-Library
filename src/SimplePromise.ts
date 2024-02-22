import { ExecutorFunction, ResolveFunction, RejectFunction, FulfilledCallback, RejectedCallback} from './types/promiseTypes';

class SimplePromise {
    private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
    private value: any = undefined;
    private reason: any = undefined;
    private onFulfilledCallbacks: FulfilledCallback[] = [];
    private onRejectedCallbacks: RejectedCallback[] = [];
    private onCancel: Function | null = null;

    constructor(executor: ExecutorFunction) {
        const resolve: ResolveFunction = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onFulfilledCallbacks.forEach((fn) => fn(value));
            }
        };

        const reject: RejectFunction = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn) => fn(reason));
            }
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled?: FulfilledCallback, onRejected?: RejectedCallback) {
        if (this.state === 'fulfilled' && onFulfilled) {
            onFulfilled(this.value);
        } else if (this.state === 'rejected' && onRejected) {
            onRejected(this.reason);
        }
    }
}

export default SimplePromise;
