import { HtmlComponent } from "./HtmlComponent";

export abstract class FlareComponent {
    private _selector: string;
    protected _htmlComponent: HtmlComponent;
    get selector() {
        return this._selector;
    }
    constructor(selector: string) {
        this._selector = selector;
    }
    protected abstract template(): any;
    render(): FlareComponent {
        this._htmlComponent = this.template() as unknown as HtmlComponent;
        return this;
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