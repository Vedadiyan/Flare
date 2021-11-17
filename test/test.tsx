/** @jsx createElement */

import { MouseEventHandler } from "react";
import { createElement } from "../src/CreateElement";
import { FlareComponent } from "../src/FlareComponent";

export class Test extends FlareComponent {
    constructor(selector: string) {
        super(selector);
    }
    template() {
        return (
            <div data-target={this.selector} style={{ backgroundColor: 'blue' }} className="test">
                <h1>
                    OK
                </h1>
            </div>
        );
    }

}