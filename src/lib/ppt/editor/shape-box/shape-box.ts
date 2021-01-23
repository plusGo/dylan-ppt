import {DomUtil} from '../../../util/domUtil';
import {StyleUtil} from '../../../util/style.util';
import {CssUtil} from '../../../util/css.util';
import './shape-box.scss';
import {BaseComponent} from '../../base/base-component';

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
    private circleBoxElement: HTMLDivElement;
    private selectedRectsElement: HTMLDivElement;

    constructor() {
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
        this.circleBoxElement = DomUtil.createElement('div', '', 'circleBox');

        const lineOne = DomUtil.createElement('div', '', 'circleLine');
        DomUtil.appendTo(lineOne,
            DomUtil.createElement('div', '', 'circle cr1', {'data-name': 'cr1'}),
            DomUtil.createElement('div', '', 'circle cr2', {'data-name': 'cr2'}),
            DomUtil.createElement('div', '', 'circle cr3', {'data-name': 'cr3'}),
        );

        const lineTwo = DomUtil.createElement('div', '', 'circleLine');
        DomUtil.appendTo(lineTwo,
            DomUtil.createElement('div', '', 'circle cr4', {'data-name': 'cr4'}),
            DomUtil.createElement('div', '', 'circle cr5', {'data-name': 'cr5'}),
        );

        const lineThree = DomUtil.createElement('div', '', 'circleLine');
        DomUtil.appendTo(lineThree,
            DomUtil.createElement('div', '', 'circle cr6', {'data-name': 'cr6'}),
            DomUtil.createElement('div', '', 'circle cr7', {'data-name': 'cr7'}),
            DomUtil.createElement('div', '', 'circle cr8', {'data-name': 'cr8'}),
        );

        DomUtil.appendTo(this.circleBoxElement, lineOne, lineTwo, lineThree);
        DomUtil.appendTo(this.selectorBoxElement, this.circleBoxElement);
    }

    private initSelectedRects() {
        this.selectedRectsElement = DomUtil.createElement('div', '', 'selected-rects only-cursor');
        DomUtil.appendTo(this.shapeBoxElement, this.selectedRectsElement)

    }

    destroy(): void {
        this.unmount(this.shapeBoxElement.parentElement);
    }
}
