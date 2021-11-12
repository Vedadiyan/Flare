import { v4 } from 'uuid';

/// <reference path="./core/abstraction/IHtmlComponent.ts" />
/// <reference path="./core/storage/VirtualDOM.ts" />
/// <reference path="./core/types/KeyValue.ts" />

export type Children = string | Flare.Core.Abstraction.IHtmlComponent;

export class HtmlComponent implements Flare.Core.Abstraction.IHtmlComponent {

    //#region HtmlElement
    private _htmlElement: HTMLElement;
    private _targetHtmlElement: HTMLElement;
    private _virtualId: string;
    private _attributes: Flare.Core.Types.KeyValue<string>;
    private _observers: Flare.Core.Types.KeyValue<[Flare.Core.Abstraction.IObserver, any]>;
    //#endregion

    private _selector: string;
    private _tagName: string;
    private _classList: string[];
    private _styles: Flare.Core.Types.KeyValue<string>;
    private _children: Children[];
    constructor(selector: string, tagName: string, classList: string[] | null, styles: Flare.Core.Types.KeyValue<string> | null, childern: Children[] | null) {
        this._selector = selector;
        this._tagName = tagName;
        this._classList = classList;
        this._styles = styles;
        this._children = childern;
        this._virtualId = v4();
        this._targetHtmlElement = document.querySelector(selector);
    }
    set tagName(value: string) {
        this._tagName = value;
    }
    get tagName(): string {
        return this._tagName;
    }
    set classList(value: string[]) {
        this._classList = value;
    }
    get classList(): string[] {
        return this._classList;
    }
    set styles(value: Flare.Core.Types.KeyValue<string>) {
        this._styles = value;
    }
    get styles(): Flare.Core.Types.KeyValue<string> {
        return this._styles;
    }
    set innerText(value: string) {
        throw new Error("Method not implemented.");
    }
    get innerText(): string {
        throw new Error("Method not implemented.");
    }
    create(): void {
        this._htmlElement = document.createElement(this._tagName);
        for (let className of this._classList) {
            this._htmlElement.classList.add(className);
        }
        for (let style in this._styles) {
            this._htmlElement.style.setProperty(style, this.styles[style]);
        }
        for (let attribute in this._attributes) {
            this._htmlElement.setAttribute(attribute, this._attributes[attribute]);
        }
        for (let child of this._children) {
            if (child instanceof HtmlComponent) {
                child.create();
                this._htmlElement.appendChild((child as HtmlComponent)._htmlElement);
            }
            else {
                this._htmlElement.innerText += child;
            }
        }
        for (let observer in this._observers) {
            this._htmlElement.addEventListener(observer, this._observers[observer][1]);
        }
        this._htmlElement.innerText += this.innerText;
        Flare.Core.Storage.VirtualDOM.current.registerHtmlComponent(this._virtualId, this._selector, this);
    }
    mount(): void {
        if (this._targetHtmlElement) {
            this._targetHtmlElement.replaceWith(this._htmlElement);
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.mount();
                }
            }
        }
    }
    unMount(): void {
        if (this._targetHtmlElement) {
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.mount();
                }
            }
            this._targetHtmlElement.innerHTML = null;
        }
    }
    destroy(): void {
        if (this._targetHtmlElement) {
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.destroy();
                }
            }
            this._targetHtmlElement.remove();
        }
    }
    setAttribute(name: string, value: string): void {
        this._attributes[name] = value;
    }
    getAttribute(name: string): string {
        return this._attributes[name];
    }
    subscribe(observer: Flare.Core.Abstraction.IObserver): void {
        let event = (e: any) => observer.next(e);
        this._observers[observer.Key] = [observer, event];
        if (this._htmlElement) {
            this._htmlElement.addEventListener(observer.Key, event);
        }
    }
    unSubscribe(observer: Flare.Core.Abstraction.IObserver): void {
        if (this._htmlElement) {
            this._htmlElement.removeEventListener(observer.Key, this._observers[observer.Key][1]);
        }
        delete this._observers[observer.Key];
    }
    appendChild(child: Flare.Core.Abstraction.IHtmlComponent) {
        this._children.push(child);
    }
    removeChild(child: Flare.Core.Abstraction.IHtmlComponent) {
        let index: number = this._children.indexOf(child);
        this._children = this._children.splice(index, 1);
    }
}
