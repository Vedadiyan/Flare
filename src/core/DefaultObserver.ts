export class DefaultObserver implements Flare.Core.Abstraction.IObserver {
    private _key: string;
    private _completed: () => void;
    private _next: (args: any) => void;
    private _error: (error: Error) => void;
    get key(): string {
        return this._key;
    }
    get completed(): () => void {
        return this._completed;
    }
    get next(): (args: any) => void {
        return this._next;
    }
    get error(): (error: Error) => void {
        return this._error;
    }
    constructor(key: string, next: (args: any) => void, completed: () => void, error: (error: Error) => void) {
        this._key = key;
        this._next = next;
        this._completed = completed;
        this._error = error;
    }


}