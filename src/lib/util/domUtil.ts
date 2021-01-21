export class DomUtil {
    /**
     * @description 判断是不是HTML元素
     */
    static isElement(element: HTMLElement): boolean {
        return element.nodeType === 1;
    }

    /**
     * @description 刷新元素的style属性
     */
    static resetStyle(element: HTMLElement, style: string): void {
        (element.style as any) = style;
    }

    /**
     * @description 刷新元素的class属性
     */
    static resetClass(element: HTMLElement, classNames: string): void {
        element.className = classNames;
    }

    /**
     * @description 创建HTML元素
     */
    static createElement<T extends HTMLElement>(tag: string, initialStyle?: string, initialClass?: string): T {
        const element = document.createElement(tag);
        DomUtil.resetStyle(element, initialStyle);
        DomUtil.resetClass(element, initialClass);
        return element as T;
    }

    /**
     * @description 获取HTML元素的style json
     */
    static getStyleMap(element: HTMLElement): { [key: string]: any } {
        return window.getComputedStyle(element);
    }


    /**
     * @description 获取HTML元素的某一个style值
     */
    static getStyleValue(element: HTMLElement, styleKey: string): string {
        return window.getComputedStyle(element, null).getPropertyValue(styleKey);
    }

    /**
     * @description 从尾部增加子节点
     */
    static appendTo(parent: HTMLElement, ...children: HTMLElement[]) {
        children.forEach($child => parent.appendChild($child));
    }

    /**
     * 获取元素左上角相对于视口的位置
     */
    static getViewOffsetXY(element: HTMLElement): number[] {
        return [element.getBoundingClientRect().x, element.getBoundingClientRect().y];
    }
}
