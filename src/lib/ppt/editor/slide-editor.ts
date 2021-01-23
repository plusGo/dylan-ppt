import {DomUtil} from '../../util/domUtil';
import {AreaSelector} from './area-selector';

export class SlideEditor {
    private slideElement: HTMLDivElement;
    private areaSelector: AreaSelector;

    constructor(private hostElement: HTMLElement) {
        if (!DomUtil.isElement(hostElement)) {
            throw new Error('宿主必须是HTML Element');
        }
        this.slideElement = DomUtil.createElement('div', 'width:640px;height:360px;', 'slide-editor');
        DomUtil.appendTo(this.hostElement, this.slideElement);
        this.initAreaSelector()
    }

    private initAreaSelector() {
        this.areaSelector = new AreaSelector(this.hostElement, this.slideElement);
        this.areaSelector.onDrawComplete$.subscribe(result => console.log(result));
    }
}
