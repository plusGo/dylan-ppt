import {ElementUtil} from '../util/element.util';
import {PPTWorkspace} from '../interface/ppt-workspace.interface';

export class WebPPTWorkspace implements PPTWorkspace {
    private static INITIAL_STYLE = 'position:relative;display: block; touch-action: none; user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);background:black';
    hostElement: HTMLElement;
    instanceElement: HTMLDivElement;

    constructor(hostSelectorOrHostElement: string | HTMLElement) {
        if (typeof hostSelectorOrHostElement === 'string') {
            this.hostElement = document.querySelector(hostSelectorOrHostElement);
        } else {
            this.hostElement = hostSelectorOrHostElement;
        }
        if (!ElementUtil.isElement(this.hostElement)) {
            throw new Error('hostElement must be html element');
        }
        this.instanceElement = document.createElement('div');
        ElementUtil.resetStyle(this.instanceElement, WebPPTWorkspace.INITIAL_STYLE);
        this.instanceElement.setAttribute('id', 'workspace');
        this.hostElement.appendChild(this.instanceElement);
    }

}
