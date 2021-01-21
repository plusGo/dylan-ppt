/**
 * 实现鼠标选区
 * @description 需要绑定到宿主dom，且dom区域的position是relative
 */
import {ElementUtil} from "../util/element.util";

export class AreaSelector {

    constructor(private hostElement: HTMLElement) {
        if (ElementUtil.isElement(hostElement) && ElementUtil.getStyleValue(hostElement, 'position') !== 'relative') {
            throw new Error('选区实例的宿主必须是相对定位')
        }
        this.hostElement.onmousedown = (event) => {
            event = window.event as any || event; // 兼容ie的事件传递

            const xOrigin = event.clientX - this.hostElement.offsetLeft;
            const yOrigin = event.clientY - this.hostElement.offsetTop;
        }
    }
}