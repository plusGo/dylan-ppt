export interface Observer<T extends any, S extends any> {
    next: (value?: T) => void;
    error?: (error?: S) => void;
    complete?: () => void;
}

export interface Subscription {
    unsubscribe(): void;
}


export class Observable<T extends any, S extends any> {

    constructor(private readonly observerFunc: (observer: Observer<T, S>) => void) {
        this.resetObserverFunc();
    }

    subscribe(nextFunc: (value?: T) => void,
              errorFunc: (error?: S) => void = () => null,
              completeFunc: () => void = () => null): Subscription {
        this.observerFunc({
            next: nextFunc,
            error: errorFunc,
            complete: completeFunc
        })
        return {
            unsubscribe() {
                this.resetObserverFunc()
            }
        }
    }

    resetObserverFunc(): void {
        this.observerFunc({
            next: () => null,
            error: () => null,
            complete: () => null
        })
    }
}