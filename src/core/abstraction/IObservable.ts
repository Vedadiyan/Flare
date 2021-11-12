/// <reference path="IObserver.ts" />

namespace Flare.Core.Abstraction {
    export interface IObservable {
        subscribe(observer: Flare.Core.Abstraction.IObserver): void;
        unSubscribe(observer: Flare.Core.Abstraction.IObserver): void;
    }
}