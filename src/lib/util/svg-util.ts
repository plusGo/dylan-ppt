import {DomUtil} from './domUtil';

export class SvgUtil {


    /**
     * @description 创建SVG类元素
     */
    static createElement(tag: string, attrs: { [key: string]: any } = {}): SVGElement {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);

        Object.keys(attrs).forEach($key => {
            element.setAttribute($key, attrs[$key])
        });

        return element;
    }

    /**
     * @description 修改SVG类元素的属性
     */
    static resetAttr(element: Element, attrs: { [key: string]: any }): Element {

        Object.keys(attrs).forEach($key => {
            element.setAttribute($key, attrs[$key])
        });

        return element;
    }

    /**
     * 根据字符串模板创建documentFragment
     */
    static createFragmentByTemplate(template: string): DocumentFragment {
        const templeElement = SvgUtil.createElement('g');
        templeElement.innerHTML = template;
        const documentFragment = document.createDocumentFragment();
        for (let i = 0; i < templeElement.children.length; i++) {
            documentFragment.append(templeElement.children[i]);
        }
        return documentFragment;
    }

    /**
     * 从尾部增加子节点
     */
    static appendTo(parent: Element, ...children: Element[]) {
        DomUtil.appendTo(parent, ...children);
    }

}
