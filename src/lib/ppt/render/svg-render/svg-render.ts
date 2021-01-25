import {ComponentDidMount, BaseComponent} from '../../base/base-component';
import {EditWorkspace} from '../../workspace/edit-workspace';

const template = `
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   overflow="visible" viewBox="0 0 1280 720">
    <defs></defs>
    <g>
        <g id="edit">
            <g id="s_bg">
                <g id="m_s_bg">
                    <g id="s_undefined_geomerty">
                        <g transform="matrix(1, 0, 0, 1, 0, 0) matrix(1, 0, 0, 1, 0, 0)">
                            <path fill="rgba(255,255,255,1)" stroke="none" paint-order="stroke fill markers"
                                  fill-rule="evenodd" d=" M 0 0 L 1280 0 L 1280 720 L 0 720 Z"></path>
                        </g>
                    </g>
                    <g></g>
                </g>
            </g>
            <g id="m_s">
                <g transform="translate(0, 0)">
                    <g id="s_1"></g>
                </g>
            </g>
            <g id="l_s">
                <g transform="translate(0, 0)">
                    <g id="s_1"></g>
                </g>
            </g>
            <g id="s_t">
                <g id="s_1">
                <g id="s_4" transform="translate(0, 0)">

                    <g id="s_4_text">
                        <g transform="translate(611.4745331170254, 152.5918906176332) translate(-140.26402640264027, -19.4)">
                            <g transform="translate(9.6, 5)" style="" class="">
                                <g id="text_paragraph_0">
                                    <g id="text_line_0">
                                        <text writing-mode="" text-orientation="" white-space="pre" text-anchor="false"
                                              text-rendering="auto" alignment-baseline="alphabetic">
                                            <tspan fill="rgba(0,0,0,1)" font-variant="normal" font-weight="normal"
                                                   font-family="&quot;Calibri&quot;" font-size="24" font-style="normal"
                                                   x="0 13 25 30 36 48 54 71 83 92 97"
                                                   y="23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003 23.816000000000003">
                                                hello&nbsp;world
                                            </tspan>
                                        </text>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g></g>
                </g>
</g>
            </g>
        </g>
    </g>
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
