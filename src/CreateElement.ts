import { HtmlComponent, Children } from "./HtmlComponent";

/// <reference path="./core/types/KeyValue.ts" />

export function createElement(tagName: string, attributes: Flare.Core.Types.KeyValue<any>, ...next: Children[]): HtmlComponent {
    let styleObject: Flare.Core.Types.KeyValue<string> = {};
    let classList: string[] = null;
    let selector: string = null;
    if(attributes) {
        styleObject = attributes['style'];
        classList = (attributes['className'] as string)?.split(' ')
        selector = attributes["data-target"];
    }
    return new HtmlComponent(selector, tagName, classList , styleObject, next);
}