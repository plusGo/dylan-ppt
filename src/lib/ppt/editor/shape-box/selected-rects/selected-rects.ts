import {BaseComponent, ComponentDidMount, ComponentWillMount} from '../../../base/base-component';
import {ShapeBox} from '../shape-box';
import {DomUtil} from '../../../../util/domUtil';
import './selected-rects.scss';

const template = `
<div class="selected-rects only-cursor">
    <div class="caret" style="position: absolute; width: 1px; height: 12px; background: rgb(0, 0, 0);"></div>
</div>
`;

export class SelectedRects extends BaseComponent implements ComponentDidMount, ComponentWillMount {
    nativeElement: HTMLDivElement;
    caretElement: HTMLDivElement;

    constructor(private shapeBox: ShapeBox) {
        super(template, shapeBox.shapeBoxElement);
    }

    componentWillMount(): void {
        this.nativeElement = this.query('.selected-rects');
        this.caretElement = this.query('.caret');
        DomUtil.addStyleMap(this.caretElement, {
            left: '4.8px',
            top: '4.593px',
        })
    }

    componentDidMount(): void {

    }


}
