export class Data {
    private _name: string;
    private _reference: HTMLElement;
    private _value: any;
    get name(): string {
        return this._name;
    }
    get reference(): HTMLElement {
        return this._reference;
    }
    get value(): any {
        return this.value;
    }
    set value(value: any) {
        if (this._reference instanceof HTMLInputElement) {
            this._reference.value = value;
        }
        this._value = value;
    }
    constructor(name: string, reference: HTMLElement, value: any) {
        this._name = name;
        this._reference = reference;
        this._value = value;
    }
}