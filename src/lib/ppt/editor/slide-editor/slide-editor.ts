import {DomUtil} from '../../../util/domUtil';
import {AreaSelector} from '../area-selector/area-selector';
import {EditWorkspace} from '../../workspace/edit-workspace';
import {ShapeBox} from '../shape-box/shape-box';
import {AfterViewInit, BaseComponent1} from '../../base/base-component';
import {CssUtil} from '../../../util/css.util';

const template = `
<div class="slide-editor" >
</div>
`;

export class SlideEditor extends BaseComponent1 implements AfterViewInit {
    slideElement: HTMLDivElement;
    areaSelector: AreaSelector;
    shapeBoxes: ShapeBox[] = [];


    constructor(private workspace: EditWorkspace) {
        super(template, workspace.uilContentElement);
    }

    afterViewInit(): void {
        if (!DomUtil.isElement(this.workspace.uilContentElement)) {
            throw new Error('宿主必须是HTML Element');
        }
        this.slideElement = this.query('.slide-editor');
        this.changeUIsIZE();
        this.workspace.eventStream.subscribe(event => {
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
            this.workspace.eventStream.next({
                eventType: 'cursorChange',
                data: 'crosshair'
            });
        });
        this.areaSelector.onDrawComplete$.subscribe((result) => {
            this.workspace.eventStream.next({
                eventType: 'cursorChange',
                data: 'default'
            });

            const shapeBox = new ShapeBox(this.workspace);

            shapeBox.update({
                left: result.x,
                top: result.y,
                width: result.width,
                height: 20.533,
                transform: 'rotate(0deg)'
            }).mount(this.slideElement)
                .active();

            this.shapeBoxes.push(shapeBox);

        })
    }

}
