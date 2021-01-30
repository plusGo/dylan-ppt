// used by: chart, slide, table, text
import {HorizontalAlign} from '../../type/horizontal-align.type';
import {Color} from '../../type/color/color.type';
import {VerticalAlign} from '../../type/vertical-align.type';

export interface TextBasePropsSchema {
    /**
     * Horizontal alignment
     * @default 'left'
     */
    align?: HorizontalAlign
    /**
     * Bold style
     * @default false
     */
    bold?: boolean
    /**
     * Add a line-break
     * @default false
     */
    breakLine?: boolean

    // todo(dylan) bullet

    /**
     * Text color
     * - `HexColor` or `ThemeColor`
     * @example 'FF0000' // red
     * @example 'pptxgen.SchemeColor.text1' // Text1 Theme Color
     */
    color?: Color

    /**
     * Font size
     * @example 12 // Font size 12
     */
    fontSize?: number

    /**
     * italic style
     * @default false
     */
    italic?: boolean

    /**
     * language
     * - ISO 639-1 standard language code
     * @default 'en-US' // english US
     * @example 'fr-CA' // french Canadian
     */
    lang?: string

    /**
     * underline style
     * @default false
     */
    underline?: boolean

    /**
     * vertical alignment
     * @default 'top'
     */
    valign?: VerticalAlign
}
