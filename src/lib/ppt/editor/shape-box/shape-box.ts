import {DomUtil} from '../../../util/domUtil';
import {StyleUtil} from '../../../util/style.util';
import {CssUtil} from '../../../util/css.util';
import './shape-box.scss';
import {BaseComponent} from '../../base/base-component';
import {CircleBox} from './circle-box/circle-box';
import {EditWorkspace} from '../../workspace/edit-workspace';
import {NumberUtil} from '../../../util/number.util';

export interface ShapeBoxUpdateOption {
    left: number;
    top: number;
    width: number;
    height: number;
    transform: string;
}

export class ShapeBox extends BaseComponent {
    static caretElement: HTMLDivElement;

    private shapeBoxElement: HTMLDivElement;
    private selectorBoxElement: HTMLDivElement;
    private borderBox: HTMLDivElement;
    private selectedRectsElement: HTMLDivElement;
    private circleBoxComponent: CircleBox;

    constructor(private workspace: EditWorkspace) {
        super();
        this.init();
    }

    init() {
        this.shapeBoxElement = DomUtil.createElement('div', 'position:absolute;', 'shape-box', {'id': 'shape-ui-box'})
        this.initSelectorBox();
        this.initSelectedRects();

    }

    private initSelectorBox() {
        this.selectorBoxElement = DomUtil.createElement('div', '', 'selectorBox', {'data-name': 'selectorBox'})
        DomUtil.appendTo(this.shapeBoxElement, this.selectorBoxElement);

        this.initCircleBox();

        this.borderBox = DomUtil.createElement('div', '', 'borderBox');
        DomUtil.appendTo(this.selectorBoxElement, this.borderBox)
    }

    update(option: ShapeBoxUpdateOption): ShapeBox {
        DomUtil.resetStyle(this.shapeBoxElement, StyleUtil.transformMapToStr({
            position: 'absolute',
            left: CssUtil.coercePixelValue(option.left),
            top: CssUtil.coercePixelValue(option.top),
            width: CssUtil.coercePixelValue(option.width),
            height: CssUtil.coercePixelValue(option.height),
            transform: option.transform
        }));
        return this;
    }

    mount(host: HTMLElement): ShapeBox {
        DomUtil.appendTo(host, this.shapeBoxElement);
        return this;
    }

    unmount(host: HTMLElement): ShapeBox {
        DomUtil.removeChildren(host, this.shapeBoxElement);
        return this;
    }

    active(): ShapeBox {
        if (!ShapeBox.caretElement) {
            const caretStyleMap = {
                position: 'absolute',
                left: '4.8px',
                top: '4.593px',
                width: '1px',
                height: '13px',
                background: 'rgba(0,0,0)',
            };

            ShapeBox.caretElement = DomUtil.createElement('div', StyleUtil.transformMapToStr(caretStyleMap), 'caret');
        }
        DomUtil.appendTo(this.selectedRectsElement, ShapeBox.caretElement);
        return this;
    }

    private initCircleBox() {
        this.circleBoxComponent = new CircleBox(this.selectorBoxElement, this.workspace);

        let widthNum = 0;
        let heightNum = 0;
        let left = 0;
        let top = 0;
        this.circleBoxComponent.zoomAction$.subscribe((zoomAction) => {
            if (zoomAction.type === 'start') {
                widthNum = NumberUtil.coerceNumberProperty(DomUtil.getStyleValue(this.shapeBoxElement, 'width'));
                heightNum = NumberUtil.coerceNumberProperty(DomUtil.getStyleValue(this.shapeBoxElement, 'height'));
                left = NumberUtil.coerceNumberProperty(DomUtil.getStyleValue(this.shapeBoxElement, 'left'));
                top = NumberUtil.coerceNumberProperty(DomUtil.getStyleValue(this.shapeBoxElement, 'top'));
            }
            if (zoomAction.type === 'zooming' && widthNum && heightNum && left && top) {
                const newWidth = Math.max(widthNum + zoomAction.offsetWidth, 13.2);
                const newHeight = Math.max(heightNum + zoomAction.offsetHeight, 13.2);

                let styleMap = {
                    'width': CssUtil.coercePixelValue(newWidth),
                    'height': CssUtil.coercePixelValue(newHeight),
                } as any;
                if (newWidth !== 13.2) {
                    styleMap.left = CssUtil.coercePixelValue(left + zoomAction.offsetLeft)
                }
                if (newHeight !== 13.2) {
                    styleMap.top = CssUtil.coercePixelValue(top + zoomAction.offsetTop)
                }

                DomUtil.addStyleMap(this.shapeBoxElement, styleMap);
            }
            if (zoomAction.type === 'end') {
                widthNum = 0;
                heightNum = 0;
                left = 0;
                top = 0;
            }
        })

    }

    private initSelectedRects() {
        this.selectedRectsElement = DomUtil.createElement('div', '', 'selected-rects only-cursor');
        DomUtil.appendTo(this.shapeBoxElement, this.selectedRectsElement)

    }

    destroy(): void {
        this.unmount(this.shapeBoxElement.parentElement);
    }
}
