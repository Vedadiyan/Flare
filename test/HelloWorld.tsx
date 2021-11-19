/** @jsx createElement */

import { FlareComponent } from "../src/FlareComponent";
import { createElement } from "../src/CreateElement";

export default class HelloWorld extends FlareComponent {
    constructor() {
        super(null);
    }
    protected template() {
        return (
            <div>
                <h1>Hello Worlds</h1>
                <h4>Ok this is awesom!</h4>
            </div>
        );
    }
}