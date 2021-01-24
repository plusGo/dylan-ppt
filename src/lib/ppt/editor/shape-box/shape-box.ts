import {DomUtil} from '../../../util/domUtil';
import {CssUtil} from '../../../util/css.util';
import './shape-box.scss';
import {CircleBox} from './circle-box/circle-box';
import {EditWorkspace} from '../../workspace/edit-workspace';
import {NumberUtil} from '../../../util/number.util';
import {BaseComponent, ComponentDidMount, ComponentWillMount} from '../../base/base-component';
import {SelectedRects} from './selected-rects/selected-rects';

export interface ShapeBoxUpdateOption {
    left: number;
    top: number;
    width: number;
    height: number;
    transform: string;
}

const template = `
<div id="shape-ui-box" class="shape-box" style="position: absolute; ">
    <div data-name="selectorBox" class="selectorBox">
        <div class="borderBox"></div>
    </div>
</div>
`;

export class ShapeBox extends BaseComponent implements ComponentDidMount, ComponentWillMount {

    shapeBoxElement: HTMLDivElement;
    selectorBoxElement: HTMLDivElement;
    circleBoxComponent: CircleBox;

    selectedRects: SelectedRects;

    constructor(private workspace: EditWorkspace, private initBoxOption: ShapeBoxUpdateOption) {
        super(template, workspace.slideEditor.slideElement);
    }

    componentWillMount(): void {
        this.shapeBoxElement = this.query('#shape-ui-box');
        this.selectorBoxElement = this.query('.selectorBox');
    }

    componentDidMount(): void {
        this.update(this.initBoxOption);
        this.initCircleBox();
        this.selectedRects = new SelectedRects(this);
    }

    update(option: ShapeBoxUpdateOption): ShapeBox {
        DomUtil.addStyleMap(this.shapeBoxElement, {
            left: CssUtil.coercePixelValue(option.left),
            top: CssUtil.coercePixelValue(option.top),
            width: CssUtil.coercePixelValue(option.width),
            height: CssUtil.coercePixelValue(option.height),
            transform: option.transform
        });
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

}
