import {SlideObjectSchema} from '../../definition/schema/slide-object.schema';
import {SvgUtil} from '../../util/svg-util';
import {TextPropsSchema} from '../../definition/schema/text/text-props.schema';
import {TextUtil} from '../../util/text.util';
import {CoordUtils} from '../../util/coord.utils';
import {SvgSlideRender} from './svg-slide.render';
import {TEXT_OBJECT_DEFAULT_CONFIG} from '../config/text-object-default.config';

const getTemplate = (component: SvgTextObjectRender) => {
    return `
<g id="${component.elementId}" transform="translate(0, 0)">
    <g id="${component.elementId}_geomerty">
        <g transform="">
        </g>
    </g>
    <g id="${component.elementId}_text">
        <g transform="">
            <g id="text-wrapper" transform="translate(9.6, 5)" style="" class="">
               
            </g>
        </g>
    </g>
</g>
`;
};


export class SvgTextObjectRender {
    private textParagraphCounter: number = 0;
    elementId: string;

    textProps: TextPropsSchema[];

    private rootGElement: SVGGraphicsElement;
    private textGElement: SVGGraphicsElement;
    private geomertyGElement: SVGGraphicsElement;

    constructor(public slideObjectSchema: SlideObjectSchema, public svgSlideRender: SvgSlideRender) {
        // 初始化全局唯一ID
        this.elementId = `slide_text_${svgSlideRender.config.textObjectCounter}`;
        svgSlideRender.config.textObjectCounter++;
        this.textProps = slideObjectSchema.text || [];
    }

    /**
     * 组件挂载前
     */
    private componentWillMount() {
        this.renderGeomertyGraphics();
        this.renderTextContent();
    }

    /**
     * 挂载到目标节点
     */
    render(host: Element): void {
        const documentFragment = SvgUtil.createFragmentByTemplate(getTemplate(this));
        this.rootGElement = documentFragment.querySelector(`#${this.elementId}`);
        this.geomertyGElement = documentFragment.querySelector(`#${this.elementId}_geomerty`);
        this.textGElement = documentFragment.querySelector(`#${this.elementId}_text`);

        this.componentWillMount();
        host.append(documentFragment);
        this.componentDidMount();
    }

    /**
     * 组件挂载后
     */
    private componentDidMount() {
        this.renderTextGraphics();
    }


    /**
     * 渲染文本内容
     */
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

        this.rootGElement.querySelector('#text-wrapper').append(documentFragment);
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


    /**
     * 判断当前的textObject是否需要渲染几何图形
     */
    private shouldRenderGeomertyGraphic(): boolean {
        return !!this.slideObjectSchema.options.w && !!this.slideObjectSchema.options.h;
    }

    /**
     * 渲染几何容器
     */
    private renderGeomertyGraphics() {
        const graphicsElement = this.geomertyGElement.children[0];

        // Step1:初始化几何的坐标属性
        let matrixX = CoordUtils.transformToPt(this.slideObjectSchema?.options?.x, this.svgSlideRender.config.width);
        let matrixY = CoordUtils.transformToPt(this.slideObjectSchema?.options?.y, this.svgSlideRender.config.height);
        const transformAttr = `matrix(1, 0, 0, 1, ${matrixX}, ${matrixY}) matrix(1, 0, 0, 1, 0, 0)`;
        SvgUtil.resetAttr(graphicsElement, {'transform': transformAttr});

        // Step2:初始化几何的图形
        if (this.shouldRenderGeomertyGraphic()) {
            const pathElement = SvgUtil.createElement('path');
            const attrs: { [key: string]: string } = {};
            if (this.slideObjectSchema.options?.fill?.color) {
                attrs.fill = this.slideObjectSchema.options?.fill?.color;
            }
            attrs['paint-order'] = 'stroke fill makers';
            attrs['fill-rule'] = 'evenodd';

            const width = CoordUtils.transformToPt(this?.slideObjectSchema?.options?.w, this.svgSlideRender.config.width);
            const height = CoordUtils.transformToPt(this?.slideObjectSchema?.options?.h, this.svgSlideRender.config.height);
            attrs['d'] = ` M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;

            SvgUtil.resetAttr(pathElement, attrs);
            SvgUtil.appendTo(graphicsElement, pathElement);
        }
    }


    /**
     * 渲染文字容器，必须在挂载到DOM树后执行，因为挂载后，才能获取到图形的高宽
     */
    private renderTextGraphics() {
        // step1: 渲染文本容器的坐标属性
        const rootBbox = this.rootGElement.getBBox();

        // step1.1: 获取文字容器的宽高，便于后续编辑。若有几何图形，则以几何图形为准；若无几何图形，则以整个根容器为准
        const textGraphicAttr: { [key: string]: number } = {};
        if (this.shouldRenderGeomertyGraphic()) {
            textGraphicAttr.width = CoordUtils.transformToPt(this?.slideObjectSchema?.options?.w, this.svgSlideRender.config.width);
            textGraphicAttr.height = CoordUtils.transformToPt(this?.slideObjectSchema?.options?.h, this.svgSlideRender.config.height);
        } else {
            textGraphicAttr.width = rootBbox.width;
            textGraphicAttr.height = rootBbox.height;
        }

        // step1.2：绑定属性
        const graphicsElement = this.textGElement.children[0];

        const coordX = CoordUtils.transformToPt(this.slideObjectSchema.options.x, this.svgSlideRender.config.width);
        const coordY = CoordUtils.transformToPt(this.slideObjectSchema.options.y, this.svgSlideRender.config.height);


        const translateX = coordX + textGraphicAttr.width / 2;
        const translatesY = coordY + textGraphicAttr.height / 2;
        const transformAttr = `translate(${translateX}, ${translatesY}) translate(-${textGraphicAttr.width / 2}, -${textGraphicAttr.height / 2})`;
        SvgUtil.resetAttr(graphicsElement, {'transform': transformAttr});

        // step2: 计算textWrapper的x和y的偏移量
        const textWrapperElement = this.textGElement.querySelector<SVGGraphicsElement>('#text-wrapper');
        let textWrapperX = 9.6;
        let textWrapperY = (textGraphicAttr.height - textWrapperElement.getBBox().height) / 2 - 7;
        SvgUtil.resetAttr(textWrapperElement, {transform: `translate(${textWrapperX},${textWrapperY})`});
    }


}
