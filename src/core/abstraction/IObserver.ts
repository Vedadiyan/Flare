namespace Flare.Core.Abstraction {
    export interface IObserver {
        get Key(): string;
        completed(): void;
        next(args: any): void;
        error(error: Error): void;
    }
}