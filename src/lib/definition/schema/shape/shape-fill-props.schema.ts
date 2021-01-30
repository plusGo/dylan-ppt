import {Color} from '../../type/color/color.type';

export interface ShapeFillPropsSchema {
    /**
     * Fill color
     * - `HexColor` or `ThemeColor`
     * @example 'FF0000' // red
     * @example 'pptx.SchemeColor.text1' // Text1 Theme Color
     */
    color?: Color

    /**
     * Transparency (percent)
     * - range: 0-100
     * @default 0
     */
    transparency?: number
}
