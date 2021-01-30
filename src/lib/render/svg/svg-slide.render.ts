import {SlideRender} from '../base/slide.render';
import {SlideDefinition} from '../../definition/definition/slide.definition';
import {BaseComponent, ComponentDidMount} from '../../ppt/base/base-component';
import {SvgTextObjectRender} from './svg-text-object.render';
import {SlideObjectSchema} from '../../definition/schema/slide-object.schema';

const template = `
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   overflow="visible" viewBox="0 0 1280 720">
    <defs></defs>
    <g>
        <g id="edit">
            <g id="s_bg">
                <g id="m_s_bg">
                </g>
            </g>
            <g id="m_s">
                <g transform="translate(0, 0)">
<!--                    <g id="s_1"></g>-->
                </g>
            </g>
            <g id="l_s">
                <g transform="translate(0, 0)">
<!--                    <g id="s_1"></g>-->
                </g>
            </g>
            <g id="slide_text">
               <g id="slide_text_root">
               <g id="s_18"><g id="s_18_geomerty"><g transform="matrix(1, 0, 0, 1, 48, 96) matrix(1, 0, 0, 1, 0, 0)"><path fill="rgba(35,35,35,1)" stroke="none" paint-order="stroke fill markers" fill-rule="evenodd" d=" M 0 0 L 768 0 L 768 192 L 0 192 Z"></path></g></g><g id="s_18_text" transform="translate(0, 0)"><g transform="translate(432, 192) translate(-384, -96)"><g transform="translate(9.6, 9.599999999999994)" style="" class=""><g id="text_paragraph_0"><g id="text_line_0"><text writing-mode="" text-orientation="" white-space="pre" text-anchor="false" text-rendering="auto" alignment-baseline="alphabetic"><tspan fill="rgba(153,171,204,1)" font-variant="normal" font-weight="normal" font-family="&quot;Calibri&quot;" font-size="32" font-style="normal" x="0 16.22 28.729999999999997 39.449999999999996 46.67999999999999 54.03999999999999 61.39999999999999 78.19999999999999" y="31.488 31.488 31.488 31.488 31.488 31.488 31.488 31.488">1st&nbsp;line</tspan></text></g></g><g id="text_paragraph_1" transform="translate(0, 38.4)"><g id="text_line_0"><text writing-mode="" text-orientation="" white-space="pre" text-anchor="false" text-rendering="auto" alignment-baseline="alphabetic"><tspan fill="rgba(255,255,0,1)" font-variant="normal" font-weight="normal" font-family="&quot;Calibri&quot;" font-size="48" font-style="normal" x="0 24.34 49.54 74.74 85.58999999999999 96.63 107.66999999999999 132.86999999999998" y="47.232 47.232 47.232 47.232 47.232 47.232 47.232 47.232">2nd&nbsp;line</tspan></text></g></g><g id="text_paragraph_2" transform="translate(0, 96)"><g id="text_line_0"><text writing-mode="" text-orientation="" white-space="pre" text-anchor="false" text-rendering="auto" alignment-baseline="alphabetic"><tspan fill="rgba(0,136,204,1)" font-variant="normal" font-weight="normal" font-family="&quot;Calibri&quot;" font-size="64" font-style="normal" x="0 32.45 54.790000000000006 88.39000000000001 102.85000000000002 117.57000000000002 132.29000000000002 165.89000000000001" y="62.976 62.976 62.976 62.976 62.976 62.976 62.976 62.976">3rd&nbsp;line</tspan></text></g></g></g></g></g><g></g></g>
                </g>
            </g>
        </g>
    </g>
</svg>
 `;

export class SvgSlideRender extends BaseComponent implements ComponentDidMount, SlideRender {
    svgElement: SVGElement;

    constructor(host: HTMLElement) {
        super(template, host);
    }

    render(slideDefinition: SlideDefinition): SvgSlideRender {
        Promise.resolve().then(() => {
            slideDefinition.slideObjects.forEach($slideObject => {
                if ($slideObject.type === 'text') {
                    this.addTextObjectByDefinition($slideObject);
                }
            });
            console.log(slideDefinition);
        });
        return this;
    }

    private addTextObjectByDefinition(schema: SlideObjectSchema) {
        new SvgTextObjectRender(schema).render(this.query('#slide_text_root'));
    }

    componentDidMount(): void {
        this.svgElement = this.query<SVGElement>('svg');
    }

}
