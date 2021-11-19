import { Data } from "./Data";
import { HtmlComponent } from "./HtmlComponent";

export abstract class FlareComponent {
    private _selector: string;
    private _data: {
        [name: string]: Data
    };
    _htmlComponent: HtmlComponent;
    get selector() {
        return this._selector;
    }
    constructor(selector: string) {
        this._selector = selector;
        this._data = {};
    }
    protected abstract template(): any;
    get data() {
        return this._data;
    }
    render(): FlareComponent {
        this._htmlComponent = this.template() as unknown as HtmlComponent;
        this._htmlComponent.instance = this;
        return this;
    }
    register(name: string, htmlElement: HTMLElement): void {
        this._data[name] = new Data(name, htmlElement, null);
    }
    create(): FlareComponent {
        this._htmlComponent.create();
        return this;
    }
    mount(): FlareComponent {
        this._htmlComponent.mount();
        return this;
    }
    unMount(): FlareComponent {
        this._htmlComponent.unMount();
        return this;
    }
    destroy(): FlareComponent {
        this._htmlComponent.destroy();
        return this;
    }
}