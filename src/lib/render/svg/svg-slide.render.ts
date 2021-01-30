import {SlideRender} from '../base/slide.render';
import {SlideDefinition} from '../../definition/definition/slide.definition';
import {BaseComponent, ComponentDidMount} from '../../ppt/base/base-component';
import {SvgTextObjectRender} from './svg-text-object.render';
import {SlideObjectSchema} from '../../definition/schema/slide-object.schema';
import {SvgSlideConfig} from '../schema/svg-slide-config';

const getTemplate = (component: SvgSlideRender) => {
    return `
 <svg version="1.1" xmlns="http://www.w3.org/2000/svg"   overflow="visible" viewBox="0 0 ${component?.config?.width} ${component?.config?.height}">
    <defs></defs>
    <g>
        <g id="edit">
<!--            <g id="s_bg">-->
<!--                <g id="m_s_bg">-->
<!--                </g>-->
<!--            </g>-->
<!--            <g id="m_s">-->
<!--                <g transform="translate(0, 0)">-->
<!--&lt;!&ndash;                    <g id="s_1"></g>&ndash;&gt;-->
<!--                </g>-->
<!--            </g>-->
<!--            <g id="l_s">-->
<!--                <g transform="translate(0, 0)">-->
<!--&lt;!&ndash;                    <g id="s_1"></g>&ndash;&gt;-->
<!--                </g>-->
<!--            </g>-->
            <g id="slide_text">
               <g id="slide_text_root">
               
                </g>
            </g>
        </g>
    </g>
</svg>
 `
};

export class SvgSlideRender extends BaseComponent implements ComponentDidMount, SlideRender {
    svgElement: SVGElement;
    config: SvgSlideConfig = {width: 1280, height: 720, textObjectCounter: 0};

    constructor(host: HTMLElement) {
        super('', host);
        this.template = getTemplate(this);
    }

    render(slideDefinition: SlideDefinition): SvgSlideRender {
        Promise.resolve().then(() => {
            slideDefinition.slideObjects.forEach($slideObjectDefinition => {
                if ($slideObjectDefinition.type === 'text') {
                    this.renderTextObjectByDefinition($slideObjectDefinition);
                }
            });
        });
        return this;
    }

    private renderTextObjectByDefinition(schema: SlideObjectSchema) {
        new SvgTextObjectRender(schema, this).render(this.query('#slide_text_root'));
    }

    componentDidMount(): void {
        this.svgElement = this.query<SVGElement>('svg');
    }

}
