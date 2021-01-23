import {DomUtil} from '../../util/domUtil';
import {AreaSelector} from './area-selector/area-selector';
import {EditWorkspace} from '../workspace/edit-workspace';
import {ShapeBox} from './shape-box/shape-box';

export class SlideEditor {
    slideElement: HTMLDivElement;
    areaSelector: AreaSelector;
    hostElement: HTMLDivElement;
    shapeBoxes: ShapeBox[] = [];

    constructor(private workspace: EditWorkspace) {
        this.hostElement = this.workspace.uilContentElement;
        if (!DomUtil.isElement(this.hostElement)) {
            throw new Error('宿主必须是HTML Element');
        }
        this.slideElement = DomUtil.createElement('div', 'width:640px;height:360px;', 'slide-editor');
        DomUtil.appendTo(this.hostElement, this.slideElement);

        this.initAreaSelector();
    }

    private initAreaSelector() {
        this.areaSelector = new AreaSelector(this.hostElement, this.slideElement);

        this.areaSelector.onDrawStart$.subscribe(() => {
            this.hostElement.classList.add('cursor-crosshair');
        });
        this.areaSelector.onDrawComplete$.subscribe((result) => {
            this.hostElement.classList.remove('cursor-crosshair');

            const shapeBox = new ShapeBox();

            shapeBox.update({
                left: result.x,
                top: result.y,
                width: result.width,
                height: result.height,
                transform: 'rotate(0deg)'
            }).mount(this.slideElement);

            this.shapeBoxes.push(shapeBox);

        })
    }
}
