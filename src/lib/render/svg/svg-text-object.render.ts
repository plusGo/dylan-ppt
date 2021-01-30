import {SlideObjectSchema} from '../../definition/schema/slide-object.schema';
import {SvgUtil} from '../../util/svg-util';
import {TextPropsSchema} from '../../definition/schema/text/text-props.schema';
import {TextUtil} from '../../util/text.util';
import {CoordUtils} from '../../util/coord.utils';
import {SvgSlideRender} from './svg-slide.render';
import {TEXT_OBJECT_DEFAULT_CONFIG} from '../config/text-object-default.config';

const getTemplate = (component: SvgTextObjectRender) => {
    return `
<g id="${component.id}" transform="translate(0, 0)">
    <g id="${component.id}_geomerty">
        <g transform="matrix(1, 0, 0, 1, ${component.slideObjectSchema?.options?.x || 0}, ${component?.slideObjectSchema?.options?.y || 0}) matrix(1, 0, 0, 1, 0, 0)">
             ${component.getGeomertyTemplate()}
        </g>
    </g>
    <g id="${component.id}_text">
        <g transform="${component.getInitPositionTransform()}">
            <g id="text-wrapper" transform="translate(9.6, 5)" style="" class="">
               
            </g>
        </g>
    </g>
</g>
`;
};


export class SvgTextObjectRender {
    private textParagraphCounter: number = 0;
    id: string;

    textProps: TextPropsSchema[];
    documentFragment: DocumentFragment;

    constructor(public slideObjectSchema: SlideObjectSchema, public svgSlideRender: SvgSlideRender) {
        this.id = `slide_text_${svgSlideRender.config.textObjectCounter}`;
        svgSlideRender.config.textObjectCounter++;
        this.textProps = slideObjectSchema.text || [];
    }

    render(host: Element): void {
        this.documentFragment = SvgUtil.createFragmentByTemplate(getTemplate(this));

        this.renderTextContent();

        host.append(this.documentFragment);
    }

    /**
     * 获得text object相对画布的偏移量
     */
    getInitPositionTransform(): string {
        let coordX = CoordUtils.transformToPt(this.slideObjectSchema.options.x, this.svgSlideRender.config.width);
        let coordY = CoordUtils.transformToPt(this.slideObjectSchema.options.y, this.svgSlideRender.config.height);
        let shapeWidth = CoordUtils.transformToPt(this.slideObjectSchema.options.w, this.svgSlideRender.config.width);
        let shapeHeight = CoordUtils.transformToPt(this.slideObjectSchema.options.h, this.svgSlideRender.config.height);
        return `translate(${coordX + shapeWidth / 2}, ${coordY + shapeHeight / 2}) translate(-${shapeWidth / 2}, -${shapeHeight / 2})`;
    }

    renderTextContent(): void {
        const documentFragment = document.createDocumentFragment();

        const renderedTextProps: TextPropsSchema[][] = [];

        // 将一维数组转换为二维数组，便于直接渲染
        let tempArray: TextPropsSchema[] = [];
        renderedTextProps.push(tempArray);
        for (let i = 0; i < this.textProps.length; i++) {
            const $textProp = this.textProps[i];
            tempArray.push($textProp);
            if ($textProp.options.breakLine) {
                tempArray = [];
                renderedTextProps.push(tempArray);
            }
        }

        let textLineYOffset = 0;
        renderedTextProps.forEach($propsArray => {
            let [textParagraphElement, textLineElement, textElement] = this.generateParagraphElements();
            if (textLineYOffset !== 0) {
                SvgUtil.resetAttr(textParagraphElement, {transform: `translate(0,${textLineYOffset})`});
            }
            documentFragment.append(textParagraphElement);

            let maxLineHeight = 0;
            const maxFontSize = Math.max(...$propsArray.map($textProp => $textProp.options.fontSize || 12));
            $propsArray.forEach($textProp => {
                const attrs = {
                    'font-size': `${$textProp.options.fontSize || TEXT_OBJECT_DEFAULT_CONFIG.fontSize}`,
                    'font-variant': 'normal',
                    'font-weight': `${$textProp.options.bold ? 'bold' : 'normal'}`,
                    'font-family': 'normal',
                    'font-style': 'normal',
                    'x': '',
                    'y': TextUtil.getLineYByFontSize(maxFontSize),
                } as any;
                if ($textProp.options.color) {
                    attrs.fill = `#${$textProp.options.color}`;
                }
                const svgTSpanElement = SvgUtil.createElement('tspan', attrs);
                svgTSpanElement.innerHTML = $textProp.text.replace(/ /g, '&nbsp;');
                textElement.append(svgTSpanElement);
                maxLineHeight = Math.max(TextUtil.getLineHeightByFontSize($textProp.options.fontSize), maxLineHeight)
            });

            textLineYOffset = textLineYOffset + maxLineHeight;
        });

        this.documentFragment.querySelector('#text-wrapper').append(documentFragment);

    }

    private generateParagraphElements(): SVGElement[] {
        this.textParagraphCounter++;
        const textParagraphElement = SvgUtil.createElement('g', {id: `text_paragraph_${this.textParagraphCounter}`});
        const textLineElement = SvgUtil.createElement('g', {id: `text_line_0`});
        textParagraphElement.append(textLineElement);
        const textElement = SvgUtil.createElement('text', {
            'writing-mode': '',
            'text-orientation': '',
            'white-space': 'pre',
            'text-anchor': false,
            'text-rendering': false,
            'alignment-baseline': 'alphabetic'
        });
        textLineElement.append(textElement);

        return [textParagraphElement, textLineElement, textElement]
    }

    getGeomertyTemplate() {
        return `<path fill="${this?.slideObjectSchema?.options?.fill?.color}" 
         stroke="none"
         paint-order="stroke fill markers" 
         fill-rule="evenodd" d=" M 0 0 L ${this?.slideObjectSchema?.options?.w} 0 L ${this?.slideObjectSchema?.options?.w} ${this?.slideObjectSchema?.options?.h} L 0 ${this?.slideObjectSchema?.options?.h} Z"></path>`
    }
}
