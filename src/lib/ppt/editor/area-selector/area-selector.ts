/**
 * 实现鼠标选区
 * @description 需要绑定到宿主dom，且dom区域的position是relative
 */
import {DomUtil} from "../../../util/domUtil";
import {StyleUtil} from "../../../util/style.util";
import {CssUtil} from "../../../util/css.util";
import {COLOR_MAP} from "../../../constant/color.constant";
import {Subject} from '../../../obervable/observable';
import {EditWorkspace} from '../../workspace/edit-workspace';

export interface AreaSelectorResult {
    x: number; // 左上角的横坐标
    y: number;// 左上角的纵坐标
    width: number; // 选区的宽度
    height: number; // 选区的高度
}

interface LastSelectorSnapshot {
    div: HTMLDivElement;
    xOrigin: number;
    yOrigin: number;
    result?: AreaSelectorResult;
}


export class AreaSelector {
    private static INITIAL_STYLE_MAP: { [key: string]: any } = {
        display: 'block',
        position: 'absolute',
        'background-color': COLOR_MAP.AREA_SELECTOR_BG_COLOR,
        'z-index': 1
    };

    private cachedDivs: HTMLDivElement[] = [];
    private lastSnapshot: LastSelectorSnapshot;
    private hostOffsetX: number;
    private hostOffsetY: number;

    onDrawComplete$: Subject<AreaSelectorResult, any> = new Subject<AreaSelectorResult, any>();
    onDrawStart$: Subject<HTMLDivElement, void> = new Subject<HTMLDivElement, void>();
    uilContentElement: HTMLDivElement;
    slideElement: HTMLDivElement;

    constructor(private editWorkspace: EditWorkspace) {
        this.uilContentElement = this.editWorkspace.uilContentElement;
        this.slideElement = this.editWorkspace.slideEditor.slideElement;
        if (!DomUtil.isElement(this.uilContentElement) || !DomUtil.isElement(this.slideElement)) {
            throw new Error('选区实例的宿主必须是相对定位')
        }
        this.init();
    }

    init(): void {
        this.editWorkspace.eventStream.subscribe(event => {
            if (event.eventType === 'uiResize') {
                const [offsetX, offsetY] = DomUtil.getViewOffsetXY(this.slideElement);
                this.hostOffsetX = offsetX;
                this.hostOffsetY = offsetY;
            }
        });
        const [offsetX, offsetY] = DomUtil.getViewOffsetXY(this.slideElement);
        this.hostOffsetX = offsetX;
        this.hostOffsetY = offsetY;

        this.uilContentElement.addEventListener('mousedown', this.listenHostMouseDownFunc);
        this.uilContentElement.addEventListener('mousemove', this.listenHostMouseMoveFunc);
        document.addEventListener('mouseup', this.listenDocumentMouseUpFunc);

    }

    destroy(): void {
        this.lastSnapshot = null;
        this.cachedDivs.forEach($div => DomUtil.removeChildren(this.uilContentElement, $div));
        this.cachedDivs = [];

        this.uilContentElement.removeEventListener('mousedown', this.listenHostMouseDownFunc);
        this.uilContentElement.removeEventListener('mousemove', this.listenHostMouseMoveFunc);
        document.removeEventListener('mouseup', this.listenDocumentMouseUpFunc);

        this.onDrawComplete$ = null;
        this.onDrawStart$ = null;
    }

    listenDocumentMouseUpFunc = () => {
        if (this.lastSnapshot && this.lastSnapshot.result) {
            this.onDrawComplete$.next(this.lastSnapshot.result);
        }

        this.lastSnapshot = null;
        this.cachedDivs.forEach($div => DomUtil.removeChildren(this.slideElement, $div));
        this.cachedDivs = [];
    };

    listenHostMouseMoveFunc = (event: MouseEvent): void => {
        if (!this.lastSnapshot) {
            return;
        }
        const xDest = event.clientX - this.hostOffsetX;
        const yDest = event.clientY - this.hostOffsetY;

        const leftValue = xDest > this.lastSnapshot.xOrigin ? this.lastSnapshot.xOrigin : xDest;
        const topValue = yDest > this.lastSnapshot.yOrigin ? this.lastSnapshot.yOrigin : yDest;
        const width = Math.abs(xDest - this.lastSnapshot.xOrigin);
        const height = Math.abs(yDest - this.lastSnapshot.yOrigin);

        this.lastSnapshot.result = {
            x: leftValue,
            y: topValue,
            width: width,
            height: height
        };

        DomUtil.resetStyle(this.lastSnapshot.div, this.buildStyle(leftValue, topValue, width, height))
    };

    listenHostMouseDownFunc = (event: MouseEvent): void => {
        if (this.lastSnapshot) {
            return;
        }

        const xOrigin = event.clientX - this.hostOffsetX;
        const yOrigin = event.clientY - this.hostOffsetY;

        const divElement = DomUtil.createElement<HTMLDivElement>('div', '', 'area-selector');
        DomUtil.appendTo(this.slideElement, divElement);

        this.cachedDivs.push(divElement);
        this.lastSnapshot = {
            div: divElement,
            xOrigin: xOrigin,
            yOrigin: yOrigin
        };

        this.onDrawStart$.next(divElement);

    };

    buildStyle(left: number, top: number, width: number, height: number): string {
        return StyleUtil.transformMapToStr({
            ...AreaSelector.INITIAL_STYLE_MAP,
            left: CssUtil.coercePixelValue(left),
            top: CssUtil.coercePixelValue(top),
            width: CssUtil.coercePixelValue(width),
            height: CssUtil.coercePixelValue(height),
        })
    }
}
