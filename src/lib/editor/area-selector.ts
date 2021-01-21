/**
 * 实现鼠标选区
 * @description 需要绑定到宿主dom，且dom区域的position是relative
 */
import {DomUtil} from "../util/domUtil";

export class AreaSelector {
    private static INITIAL_STYLE = `display: block; position: absolute; background: rgba(61, 71, 87, 0.15); z-index: 1; left: 176.969px; top: -174.078px; x: 176.969px; y: -174.078px; width: 155px; height: 75px;`;

    constructor(private hostElement: HTMLElement) {
        if (DomUtil.isElement(hostElement) && DomUtil.getStyleValue(hostElement, 'position') !== 'relative') {
            throw new Error('选区实例的宿主必须是相对定位')
        }
        this.hostElement.onmousedown = (event) => {
            event = window.event as any || event; // 兼容ie的事件传递
            const [offsetX, offsetY] = DomUtil.getViewOffsetXY(this.hostElement);

            const xOrigin = event.clientX - offsetX;
            const yOrigin = event.clientY - offsetY;

            const divElement = DomUtil.createElement('div');
            DomUtil.appendTo(this.hostElement, divElement);
            this.hostElement.onmousemove = ($event) => {
                $event = window.event as any || $event; // 兼容ie的事件传递
                console.log(`x:${$event.clientX};y:${$event.clientY}`);
                console.log(`offsetLeft:${offsetX};offsetTop:${offsetY}`);
                const xDest = $event.clientX - offsetX;
                const yDest = $event.clientY - offsetY;

                const leftValue = (xDest > xOrigin ? xOrigin : xDest) + 'px';
                const rightValue = (yDest > yOrigin ? yOrigin : yDest) + 'px';
                const width = Math.abs(xDest - xOrigin) + "px";
                const height = Math.abs(yDest - yOrigin) + "px";
                DomUtil.resetStyle(divElement, this.buildStyle(leftValue, rightValue, width, height))
            }
        };
        document.onmouseup = () => {
            // this.hostElement.onmousedown = null;
            this.hostElement.onmousemove = null;
        }
    }

    buildStyle(left: string, top: string, width: string, height: string): string {
        return `display: block;position: absolute; background: rgba(61, 71, 87, 0.15); z-index: 1; left:${left}; top: ${top}; x: ${left}; y: ${top}; width: ${width}; height: ${height};`
    }
}
