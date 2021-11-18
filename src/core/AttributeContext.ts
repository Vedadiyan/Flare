import { IAttributeContext } from "./abstraction/IAttributeContext";
import { FlareAttributes } from "./constants/FlareAttributes";
import { GlobalAttributes } from "./constants/GlobalAttributes";
import { GlobalEvents } from "./constants/GlobalEvents";
import { DefaultObserver } from "./DefaultObserver";

export class AttributeContext implements IAttributeContext {
    private _attributes: Flare.Core.Types.KeyValue<any>;
    private _globalEvents: any = {};
    private _globalAttributes: any = {};
    private _dataSet: any = {};
    private _flareAttributes: any = {};
    private _globalEventsProcessed: (keyof typeof GlobalEvents)[];
    private _globalAttributesProcessed: (keyof typeof GlobalAttributes)[];
    private _dataSetProcessed: string[];
    private _flareAttributesProcessed: (keyof typeof FlareAttributes)[];
    get globalEvents(): (keyof typeof GlobalEvents)[] {
        return this._globalEventsProcessed ?? (this._globalEventsProcessed = Object.keys(this._globalEvents).map(x => x as keyof typeof GlobalEvents));
    }
    get globalAttributes(): (keyof typeof GlobalAttributes)[] {
        return this._globalAttributesProcessed ?? (this._globalAttributesProcessed = Object.keys(this._globalAttributes).map(x => x as keyof typeof GlobalAttributes));
    }
    get dataSet(): string[] {
        return this._dataSetProcessed ?? (this._dataSetProcessed = Object.keys(this._dataSet));
    }
    get flareAttributes(): (keyof typeof FlareAttributes)[] {
        return this._flareAttributesProcessed ?? (this._flareAttributesProcessed = Object.keys(this._flareAttributes).map(x => x as keyof typeof FlareAttributes));
    }
    constructor(attributes: Flare.Core.Types.KeyValue<any>) {
        this._attributes = attributes ?? {};
        for (let attribute in attributes) {
            let lowerCaseAttribute = attribute.toLowerCase();
            let result: string
            if ((result = this._valueOf(GlobalAttributes, lowerCaseAttribute))) {
                this._globalAttributes[result] = attribute;
            }
            else if ((result = this._valueOf(GlobalEvents, lowerCaseAttribute.replace("on", "")))) {
                this._globalEvents[result] = attribute;
            }
            else if (lowerCaseAttribute.startsWith("data-")) {
                this._dataSet[lowerCaseAttribute] = attribute;
            }
            else if (lowerCaseAttribute.startsWith("f-") && (result = this._valueOf(FlareAttributes, lowerCaseAttribute.replace("f-", "")))) {
                this._flareAttributes[result] = attribute;
            }
        }
    }
    getGlobalEvent(globalEvent: keyof typeof GlobalEvents): Flare.Core.Abstraction.IObserver {
        let event = this._attributes[this._globalEvents[globalEvent]];
        return new DefaultObserver(GlobalEvents[globalEvent], event, undefined, undefined);
    }
    getGlobalAttribute<TResult>(globalAttribute: keyof typeof GlobalAttributes): TResult {
        return this._attributes[this._globalAttributes[globalAttribute]] as TResult;
    }
    getDataSet(dataAttribute: string) {
        return this._attributes[this._dataSet[dataAttribute]];
    }
    getFlareAttribute<TResult>(flareAttribute: keyof typeof FlareAttributes): TResult {
        return this._attributes[this._flareAttributes[flareAttribute]];
    }
    private _valueOf<TEnumType>(e: TEnumType, value: string): string {
        for (let key in e) {
            if (e[key].toString() === value) {
                return key
            }
        }
    }
}