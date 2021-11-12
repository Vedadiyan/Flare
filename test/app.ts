import { HtmlComponent  } from "../src/HtmlComponent";
/// <reference path="./core/abstraction/IObserver.ts" />
let htmlComponent = new HtmlComponent('#test', 'div', null, null, [new HtmlComponent(null, 'h1', null, null, ['content']), new HtmlComponent(null, 'h1', null, null, ['content2'])]);
htmlComponent.create();
htmlComponent.mount();

class ClickEventHandler implements Flare.Core.Abstraction.IObserver {
    get Key(): string {
        return 'click';
    }
    completed(): void {
        throw new Error("Method not implemented.");
    }
    next(args: any): void {
        console.log('Ok');
    }
    error(error: Error): void {
        throw new Error("Method not implemented.");
    }

}

htmlComponent.subscribe(new ClickEventHandler());
// setTimeout(() => {
//     htmlComponent.unMount();
//     setTimeout(() => {
//         htmlComponent.mount();
//     }, 2000);
// }, 2000);