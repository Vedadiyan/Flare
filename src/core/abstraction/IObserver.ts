namespace Flare.Core.Abstraction {
    export interface IObserver {
        get key(): string;
        get completed(): () => void;
        get next(): (args: any) => void;
        get error(): (error: Error) => void;
    }
}