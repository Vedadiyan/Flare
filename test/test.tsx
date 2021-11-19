/** @jsx createElement */

import { MouseEvent } from "react";
import { createElement } from "../src/CreateElement";
import { FlareComponent } from "../src/FlareComponent";
import { HtmlComponent } from "../src/HtmlComponent";
import HelloWorld from "./HelloWorld";

export class Test extends FlareComponent {
    constructor(selector: string) {
        super(selector);
    }
    template() {
        return (
            <div data-target={this.selector}  className="test">
                <input type="text" f-model="test" onKeyUp={() => { this.data["displayTest"].reference.innerText = (this.data["test"].reference as HTMLInputElement).value }} />
                <p f-model="displayTest"></p>
                <slot f-component="HelloWorld" />
                <slot f-component="HelloWorld" />
            </div>
        );
    }
}