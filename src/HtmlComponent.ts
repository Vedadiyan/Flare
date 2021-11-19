import { v4 } from 'uuid';
import { IAttributeContext } from './core/abstraction/IAttributeContext';
import { GlobalAttributes } from './core/constants/GlobalAttributes';
import { GlobalEvents } from './core/constants/GlobalEvents';
import Components from './core/storage/Components';
import { FlareComponent } from './FlareComponent';

/// <reference path="./core/abstraction/IHtmlComponent.ts" />
/// <reference path="./core/types/KeyValue.ts" />


export class VirtualDOM {
    public static current: VirtualDOM;
    public static create(): void {
        if (this.current === undefined) {
            this.current = new VirtualDOM();
        }
    }
    private constructor() {

    }
    registerHtmlComponent(virtualId: string, selector: string, htmlCoponent: Flare.Core.Abstraction.IHtmlComponent) {

    }
    unRegisterHtmlComponent(virtualId: string) {

    }
}

export type Children = string | Flare.Core.Abstraction.IHtmlComponent;
export class HtmlComponent implements Flare.Core.Abstraction.IHtmlComponent {

    //#region HtmlElement
    private _htmlElement: HTMLElement;
    private _targetHtmlElement: HTMLElement;
    private _targetHtmlElementCloned: HTMLElement;
    private _virtualId: string;
    private _attributes: Flare.Core.Types.KeyValue<string>;
    private _observers: Flare.Core.Types.KeyValue<[Flare.Core.Abstraction.IObserver, any]>;
    //#endregion
    private _attributeContext: IAttributeContext;
    private _selector: string;
    private _tagName: string;
    private _classList: string[];
    private _styles: Flare.Core.Types.KeyValue<string>;
    private _children: Children[];
    private _instance: FlareComponent;
    set instance(instance: FlareComponent) {
        this._instance = instance;
        for (let child of this._children) {
            if (child instanceof HtmlComponent) {
                child.instance = instance;
            }
        }
    }
    constructor(tagName: string, attributeContext: IAttributeContext, childern: Children[] | null) {
        let component: string = attributeContext.getFlareAttribute("Component");
        if (component) {
            return Components.current.new(component).render()._htmlComponent;
        }
        this._tagName = tagName;
        this._attributeContext = attributeContext;
        this._selector = attributeContext.getDataSet("data-target");
        this._classList = attributeContext.getGlobalAttribute<string>("ClassName")?.split(' ');
        this._styles = attributeContext.getGlobalAttribute("Style");
        this._children = childern;
        this._virtualId = v4();
        this._attributes = {};
        for (let attribute of attributeContext.globalAttributes.filter(x => GlobalAttributes[x] !== GlobalAttributes.ClassName && GlobalAttributes[x] !== GlobalAttributes.Class && GlobalAttributes[x] !== GlobalAttributes.Style)) {
            this._attributes[attribute] = attributeContext.getGlobalAttribute(attribute);
        }
        for (let dataAttribute of attributeContext.dataSet.filter(x => x !== "data-target")) {
            this._attributes[dataAttribute] = attributeContext.getDataSet(dataAttribute);
        }
        this._observers = {};
        for (let event of attributeContext.globalEvents) {
            let observer = attributeContext.getGlobalEvent(event);
            this._observers[observer.key] = [observer, observer.next];
        }
        if (this._selector) {
            this._targetHtmlElement = document.querySelector(this._selector);
            this._targetHtmlElementCloned = this._targetHtmlElement.cloneNode(false) as HTMLElement;
        }
        VirtualDOM.create();
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
        if (this._htmlElement) {
            this._htmlElement.innerText = value;
        }
    }
    get innerText(): string {
        return "";
    }
    create(): void {
        this._htmlElement = document.createElement(this._tagName);
        if (this._classList) {
            for (let className of this._classList) {
                this._htmlElement.classList.add(className);
            }
        }
        if (this._styles) {
            for (let style in this._styles) {
                this._htmlElement.style.setProperty(this._getStylePropertyName(style), this._styles[style]);
            }
        }
        if (this._attributes) {
            for (let attribute in this._attributes) {
                this._htmlElement.setAttribute(attribute, this._attributes[attribute]);
            }
        }
        if (this._children) {
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.create();
                    this._htmlElement.appendChild((child as HtmlComponent)._htmlElement);
                }
                else {
                    this._htmlElement.innerText += child;
                }
            }
        }
        if (this._observers) {
            for (let observer in this._observers) {
                this._htmlElement.addEventListener(observer, (e) => {
                    this._observers[observer][1](this._htmlElement);
                });
            }
        }
        let model = this._attributeContext.getFlareAttribute("Model") as string;
        if (model) {
            this._instance.register(model, this._htmlElement);
        }
        //this._htmlElement.innerText += this.innerText;
        VirtualDOM.current.registerHtmlComponent(this._virtualId, this._selector, this);
    }
    mount(): void {
        if (this._targetHtmlElement) {
            this._targetHtmlElement.replaceWith(this._htmlElement);
        }
        for (let child of this._children) {
            if (child instanceof HtmlComponent) {
                child.mount();
            }
        }
    }
    unMount(): void {
        if (this._htmlElement) {
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.unMount();
                }
            }
            if (this._targetHtmlElement) {
                this._targetHtmlElement = this._targetHtmlElementCloned.cloneNode(false) as HTMLElement;
                this._htmlElement.replaceWith(this._targetHtmlElement);
            }
        }
    }
    destroy(): void {
        if (this._htmlElement) {
            for (let child of this._children) {
                if (child instanceof HtmlComponent) {
                    child.destroy();
                }
            }
            this._htmlElement.remove();
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
        this._observers[observer.key] = [observer, event];
        if (this._htmlElement) {
            this._htmlElement.addEventListener(observer.key, event);
        }
    }
    unSubscribe(observer: Flare.Core.Abstraction.IObserver): void {
        if (this._htmlElement) {
            this._htmlElement.removeEventListener(observer.key, this._observers[observer.key][1]);
        }
        delete this._observers[observer.key];
    }
    appendChild(child: Flare.Core.Abstraction.IHtmlComponent) {
        this._children.push(child);
    }
    removeChild(child: Flare.Core.Abstraction.IHtmlComponent) {
        let index: number = this._children.indexOf(child);
        this._children = this._children.splice(index, 1);
    }
    private _getStylePropertyName(input: string): string {
        let output = '';
        for (let i of input) {
            if (i == i.toUpperCase()) {
                output += '-' + i.toLowerCase();
            }
            else {
                output += i;
            }
        }
        return output;
    }
}
