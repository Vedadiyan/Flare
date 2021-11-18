/** @jsx createElement */

import { MouseEvent } from "react";
import { createElement } from "../src/CreateElement";
import { FlareComponent } from "../src/FlareComponent";
import { HtmlComponent } from "../src/HtmlComponent";

export class Test extends FlareComponent {
    constructor(selector: string) {
        super(selector);
    }
    template() {
        return (
            <div data-target={this.selector} style={{ backgroundColor: 'blue' }} className="test">
                <input type="text" f-model="test" onKeyUp={() => { this.data["displayTest"].reference.innerText = (this.data["test"].reference as HTMLInputElement).value }} />
                <p f-model="displayTest"></p>
            </div>
        );
    }
}