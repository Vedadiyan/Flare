/** @jsx createElement */

import { createElement } from "../src/CreateElement";
import { HtmlComponent } from "../src/HtmlComponent";

export function Test(id: string) {
    return (
        <div data-target={id} style= {{backgroundColor: 'blue'}}>
            <h1>
                OK
            </h1>
        </div>
    );
}