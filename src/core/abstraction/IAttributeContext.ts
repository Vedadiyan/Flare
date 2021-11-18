import { FlareAttributes } from "../constants/FlareAttributes";
import { GlobalAttributes } from "../constants/GlobalAttributes";
import { GlobalEvents } from "../constants/GlobalEvents";

export interface IAttributeContext {
    get globalEvents(): (keyof typeof GlobalEvents)[];
    get globalAttributes(): (keyof typeof GlobalAttributes)[];
    get dataSet(): string[];
    get flareAttributes(): (keyof typeof FlareAttributes)[];
    getGlobalEvent(globalEvent: keyof typeof GlobalEvents): Flare.Core.Abstraction.IObserver;
    getGlobalAttribute<TResult>(globalAttribute: keyof typeof GlobalAttributes): TResult;
    getDataSet(dataAttribute: string): any;
    getFlareAttribute<TResult>(flareAttribute: keyof typeof FlareAttributes): TResult;
}