export type ExecutorFunction = (resolve: ResolveFunction, reject: RejectFunction) => void;
export type ResolveFunction = (value?: any) => void;
export type RejectFunction = (reason?: any) => void;
export type FulfilledCallback = (value: any) => any;
export type RejectedCallback = (reason: any) => any;
