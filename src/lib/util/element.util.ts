export class ElementUtil {
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
    static createElement<T>(tag: string, initialStyle: string, initialClass: string): T {
        const element = document.createElement(tag);
        ElementUtil.resetStyle(element, initialStyle);
        ElementUtil.resetClass(element, initialClass);
        return element as any;
    }
}
