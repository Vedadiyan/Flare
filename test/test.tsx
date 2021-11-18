/** @jsx createElement */

import { MouseEvent } from "react";
import { createElement } from "../src/CreateElement";
import { FlareComponent } from "../src/FlareComponent";
import { HtmlComponent } from "../src/HtmlComponent";

export class Test extends FlareComponent {
    private _name: string;
    private _data: any = {};
    constructor(selector: string) {
        super(selector);
        this._name = "ok";
    }
    template() {
        return (
            <div data-target={this.selector} style={{ backgroundColor: 'blue' }} className="test">
                <input name="test" value={this._name} type="text" f-ref={(e: HTMLElement) => { this.register("name", e); }} onClick={() => { this.changeValue() }} />
            </div>
        );
    }
    register(id: string, e: HTMLElement) {
        this._data[id] = {
            context: e,
            value: ""
        };
    }
    changeValue() {
        this._data["name"].value = "New Value";
        let context: HTMLElement = this._data["name"].context;
        context.setAttribute("value", this._data["name"].value);
    }
}