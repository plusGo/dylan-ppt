export class SvgUtil {


    /**
     * @description 创建SVG类元素
     */
    static create(tag: string, attrs: { [key: string]: any }): SVGElement {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

        Object.keys(attrs).forEach($key => {
            element.setAttribute($key, attrs[$key])
        });

        return element;
    }

    /**
     * @description 修改SVG类元素的属性
     */
    static resetAttr(element:SVGElement, attrs: { [key: string]: any }): SVGElement {

        Object.keys(attrs).forEach($key => {
            element.setAttribute($key, attrs[$key])
        });

        return element;
    }

}
