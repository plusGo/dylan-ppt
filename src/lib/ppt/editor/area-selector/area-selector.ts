/**
 * 实现鼠标选区
 * @description 需要绑定到宿主dom，且dom区域的position是relative
 */
import {DomUtil} from "../../../util/domUtil";
import {StyleUtil} from "../../../util/style.util";
import {CssUtil} from "../../../util/css.util";
import {COLOR_MAP} from "../../../constant/color.constant";
import {Subject} from '../../../obervable/observable';

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

    constructor(private listenHostElement: HTMLElement, private parentElement: HTMLElement) {
        if (!DomUtil.isElement(this.listenHostElement) || !DomUtil.isElement(this.parentElement)) {
            throw new Error('选区实例的宿主必须是相对定位')
        }
        this.init();
    }

    init(): void {
        const [offsetX, offsetY] = DomUtil.getViewOffsetXY(this.parentElement);
        this.hostOffsetX = offsetX;
        this.hostOffsetY = offsetY;

        this.listenHostElement.addEventListener('mousedown', this.listenHostMouseDownFunc);
        this.listenHostElement.addEventListener('mousemove', this.listenHostMouseMoveFunc);
        document.addEventListener('mouseup', this.listenDocumentMouseUpFunc);

    }

    destroy(): void {
        this.lastSnapshot = null;
        this.cachedDivs.forEach($div => DomUtil.removeChildren(this.listenHostElement, $div));
        this.cachedDivs = [];

        this.listenHostElement.removeEventListener('mousedown', this.listenHostMouseDownFunc);
        this.listenHostElement.removeEventListener('mousemove', this.listenHostMouseMoveFunc);
        document.removeEventListener('mouseup', this.listenDocumentMouseUpFunc);

        this.onDrawComplete$ = null;
        this.onDrawStart$ = null;
    }

    listenDocumentMouseUpFunc = () => {
        debugger
        if (this.lastSnapshot && this.lastSnapshot.result) {
            this.onDrawComplete$.next(this.lastSnapshot.result);
        }

        this.lastSnapshot = null;
        this.cachedDivs.forEach($div => DomUtil.removeChildren(this.parentElement, $div));
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
        DomUtil.appendTo(this.parentElement, divElement);

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
