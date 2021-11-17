import { AttributeContext } from "./core/AttributeContext";
import { HtmlComponent, Children } from "./HtmlComponent";

/// <reference path="./core/types/KeyValue.ts" />

export function createElement(tagName: string, attributes: Flare.Core.Types.KeyValue<any>, ...next: Children[]): HtmlComponent {
    return new HtmlComponent(tagName, new AttributeContext(attributes), next);
}