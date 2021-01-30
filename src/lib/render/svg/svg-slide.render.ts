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
