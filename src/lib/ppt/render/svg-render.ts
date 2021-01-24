import {ComponentDidMount, BaseComponent} from '../base/base-component';
import {EditWorkspace} from '../workspace/edit-workspace';

const template = `
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   overflow="visible" viewBox="0 0 1280 720">
    <defs></defs>
</svg>
 `;

export class SvgRender extends BaseComponent implements ComponentDidMount {
    svgElement: SVGElement;

    constructor(private workspace: EditWorkspace) {
        super(template, workspace.uilContentElement);
    }

    componentDidMount(): void {
        this.svgElement = this.query<SVGElement>('svg');
        this.changeUIsIZE();
        this.workspace.eventStream$.subscribe(event => {
            if (event.eventType === 'uiResize') {
                this.changeUIsIZE();
            }
        })
    }

    private changeUIsIZE() {
        const width = this.workspace.uilContentElement.clientWidth - 40;
        const height = width / this.workspace.workspaceConfig.widthHeightRatio;
        this.svgElement.setAttribute('width', `${width}`)
        this.svgElement.setAttribute('height', `${height}`)
    }
}
