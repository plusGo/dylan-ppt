import {DomUtil} from '../../../util/domUtil';
import {AreaSelector} from '../area-selector/area-selector';
import {EditWorkspace} from '../../workspace/edit-workspace';
import {ShapeBox} from '../shape-box/shape-box';
import {ComponentDidMount, BaseComponent} from '../../base/base-component';
import {CssUtil} from '../../../util/css.util';

const template = `
<div class="slide-editor" >
</div>
`;

export class SlideEditor extends BaseComponent implements ComponentDidMount {
    slideElement: HTMLDivElement;
    areaSelector: AreaSelector;
    shapeBoxes: ShapeBox[] = [];


    constructor(private workspace: EditWorkspace) {
        super(template, workspace.uilContentElement);
    }

    componentDidMount(): void {
        this.slideElement = this.query('.slide-editor');
        this.changeUIsIZE();
        this.workspace.eventStream$.subscribe(event => {
            if (event.eventType === 'uiResize') {
                this.changeUIsIZE();
            }
        });
        this.initAreaSelector();
    }

    private changeUIsIZE() {
        const width = this.workspace.uilContentElement.clientWidth - 40;
        const height = width / this.workspace.workspaceConfig.widthHeightRatio;
        DomUtil.addStyleMap(this.slideElement, {
            width: CssUtil.coercePixelValue(width),
            height: CssUtil.coercePixelValue(height)
        });
    }


    private initAreaSelector() {
        this.areaSelector = new AreaSelector(this.workspace);

        this.areaSelector.onDrawStart$.subscribe(() => {
            this.workspace.eventStream$.next({
                eventType: 'cursorChange',
                data: 'crosshair'
            });
        });
        this.areaSelector.onDrawComplete$.subscribe((result) => {
            this.workspace.eventStream$.next({
                eventType: 'cursorChange',
                data: 'default'
            });

            const initShapeBoxOption = {
                left: result.x,
                top: result.y,
                width: result.width,
                height: 20.533,
                transform: 'rotate(0deg)'
            };
            const shapeBox = new ShapeBox(this.workspace, initShapeBoxOption);

            this.shapeBoxes.push(shapeBox);

        })
    }

}
