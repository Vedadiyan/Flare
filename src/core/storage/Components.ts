import { FlareComponent } from "../../FlareComponent";

export default class Components {
    private static _current: Components;
    public static get current() {
        if (!this._current) {
            this._current = new Components();
        }
        return this._current;
    }
    private _components: {
        [name: string]: { new(): FlareComponent }
    };
    private constructor() {
        this._components = {};
    }
    register(name: string, component: { new(): FlareComponent }) {
        this._components[name] = component;
    }
    new(name: string): FlareComponent {
        return new this._components[name]();
    }
}