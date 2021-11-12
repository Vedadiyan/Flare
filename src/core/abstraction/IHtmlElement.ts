/// <reference path="IObservable.ts" />
/// <reference path="../types/KeyValue.ts" />

namespace Flare.Core.Abstraction {
    export interface IHtmlElement extends Flare.Core.Abstraction.IObservable {
        set tagName(value: string);
        get tagName(): string;
        set classList(value: string[]);
        get classList(): string[];
        set styles(value: Flare.Core.Types.KeyValue<string>);
        get styles(): Flare.Core.Types.KeyValue<string>;
        set innerText(value: string);
        get innerText(): string;
        setAttribute(name: string, value: string): void;
        getAttribute(name: string): string;
    }
}