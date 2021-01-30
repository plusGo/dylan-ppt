export interface SvgSlideConfig {
    /**
     * svg画布宽度
     * @default 1280
     */
    width?: number;

    /**
     * svg画布高度
     * @default 720
     */
    height?: number;

    /**
     * text对象的数量，会用于全局生成ID
     * @default 0
     */
    textObjectCounter?: number
}
