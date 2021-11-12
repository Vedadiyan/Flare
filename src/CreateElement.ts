import { HtmlComponent, Children } from "./HtmlComponent";

/// <reference path="./core/types/KeyValue.ts" />

export function createElement(tagName: string, attributes: Flare.Core.Types.KeyValue<any>, ...next: Children[]): HtmlComponent {
    let stylesAsStringArray: string[] = (attributes['styles'] as string).split(';');
    let styles: Flare.Core.Types.KeyValue<string> = {};
    for (let style of stylesAsStringArray) {
        let splitStyle = style.split(':');
        styles[splitStyle[0]] = splitStyle[1];
    }
    return new HtmlComponent('', tagName, (attributes['className'] as string).split(' '), styles, next);
}