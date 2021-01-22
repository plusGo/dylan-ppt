export class CssUtil {
    /**
     * @description 将数字转换为像素值
     * @example 1 => 1px
     */
    static coercePixelValue(num: number): string {
        return `${num || 0}px`
    }
}