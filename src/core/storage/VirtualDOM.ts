/// <reference path="../abstraction/IHtmlComponent.ts" />

namespace Flare.Core.Storage {
    export class VirtualDOM {
        public static current: VirtualDOM;
        public static create(): void {
            if (this.current === null) {
                this.current = new VirtualDOM();
            }
        }
        private constructor(){

        }
        registerHtmlComponent(virtualId: string, selector: string, htmlCoponent: Flare.Core.Abstraction.IHtmlComponent) {

        }
        unRegisterHtmlComponent(virtualId: string) {

        }
    }
}
