/// <reference path="IHtmlElement.ts" />

namespace Flare.Core.Abstraction {
    export interface IHtmlComponent extends Flare.Core.Abstraction.IHtmlElement {
        create(): void;
        mount(): void;
        unMount(): void;
        destroy(): void;
    }
}