import Components from "../src/core/storage/Components";
import { HtmlComponent  } from "../src/HtmlComponent";
import HelloWorld from "./HelloWorld";
import { Test } from "./test";
/// <reference path="./core/abstraction/IObserver.ts" />
// let htmlComponent = new HtmlComponent('#test', 'div', null, null, [new HtmlComponent(null, 'h1', null, null, ['content']), new HtmlComponent(null, 'h1', null, null, ['content2'])]);
// htmlComponent.create();
// htmlComponent.mount();

// class ClickEventHandler implements Flare.Core.Abstraction.IObserver {
//     get Key(): string {
//         return 'click';
//     }
//     completed(): void {
//         throw new Error("Method not implemented.");
//     }
//     next(args: any): void {
//         console.log('Ok');
//     }
//     error(error: Error): void {
//         throw new Error("Method not implemented.");
//     }

// }

// htmlComponent.subscribe(new ClickEventHandler());
// setTimeout(() => {
//     htmlComponent.innerText = "Changed";
// }, 2000);
Components.current.register("HelloWorld", HelloWorld);
let test = new Test("#test").render().create().mount().destroy();

