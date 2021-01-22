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
    }

    subscribe(nextFunc: (value?: T) => void,
              errorFunc: (error?: S) => void = () => null,
              completeFunc: () => void = () => null): Subscription {
        this.observerFunc({
            next: nextFunc,
            error: errorFunc,
            complete: completeFunc
        });
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

export class Subject<T extends any, S extends any> extends Observable<T, S> {
    private observers: Observer<T, S>[] = [];


    constructor() {
        super(null);
    }

    subscribe(nextFunc: (value?: T) => void,
              errorFunc: (error?: S) => void = () => null,
              completeFunc: () => void = () => null): Subscription {
        const newObserver = {
            next: nextFunc,
            error: errorFunc,
            complete: completeFunc
        };
        this.observers.push(newObserver);
        return {
            unsubscribe: () => {
                this.observers = this.observers.filter($observer => $observer !== newObserver);
            }
        }
    }

    next(value: T): void {
        this.observers.forEach($observer => $observer.next(value));
    }

    error(error: S): void {
        this.observers.forEach($observer => $observer.error(error));
    }

    complete(): void {
        this.observers.forEach($observer => $observer.complete());
        this.observers = [];
    }

}
