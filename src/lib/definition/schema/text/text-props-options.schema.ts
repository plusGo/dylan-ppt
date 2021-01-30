/**
 * 描述文本的相关配置
 */
import {PositionPropSchema} from '../position-prop.schema';
import {DataOrPathPropsSchema} from '../data-or-path-props.schema';
import {TextBasePropsSchema} from './text-base-props.schema';
import {ShapeFillPropsSchema} from '../shape/shape-fill-props.schema';
import {TextGlowPropsSchema} from './text-glow-props.schema';
import {HyperLinkPropsSchema} from '../hyper-link-props.schema';
import {ShapeLinePropsSchema} from '../shape/shape-line-props.schema';
import {Margin} from '../../type/margin.type';
import {Color} from '../../type/color/color.type';
import {ShadowPropsSchema} from '../shadow-props.schema';
import {SHAPE_NAME} from '../../type/shape-name.type';
import {VerticalAlign} from '../../type/vertical-align.type';

export interface TextPropsOptionsSchema extends PositionPropSchema, DataOrPathPropsSchema, TextBasePropsSchema {
    /**
     * Character spacing
     */
    charSpacing?: number;

    /**
     * Text fit options
     *
     * MS-PPT > Format Shape > Shape Options > Text Box > "[unlabeled group]": [3 options below]
     * - 'none' = Do not Autofit
     * - 'shrink' = Shrink text on overflow
     * - 'resize' = Resize shape to fit text
     *
     * **Note** 'shrink' and 'resize' only take effect after editting text/resize shape.
     * Both PowerPoint and Word dynamically calculate a scaling factor and apply it when edit/resize occurs.
     *
     * There is no way for this library to trigger that behavior, sorry.
     * @since v3.3.0
     * @default "none"
     */
    fit?: 'none' | 'shrink' | 'resize';

    fill?: ShapeFillPropsSchema;

    /**
     * Flip shape horizontally?
     * @default false
     */
    flipH?: boolean;

    /**
     * Flip shape vertical?
     * @default false
     */
    flipV?: boolean;

    glow?: TextGlowPropsSchema;

    hyperlink?: HyperLinkPropsSchema;

    indentLevel?: number;

    inset?: number;

    isTextBox?: boolean;

    line?: ShapeLinePropsSchema;

    lineSpacing?: number;

    margin?: Margin;

    outline?: { color: Color; size: number };

    paraSpaceAfter?: number;

    paraSpaceBefore?: number;

    placeholder?: string;

    rotate?: number // (degree * 60,000);

    /**
     * Whether to enable right-to-left mode
     * @default false
     */
    rtlMode?: boolean;

    shadow?: ShadowPropsSchema;

    shape?: SHAPE_NAME;

    strike?: boolean;

    subscript?: boolean;

    superscript?: boolean;

    underline?: boolean;

    valign?: VerticalAlign;

    vert?: 'eaVert' | 'horz' | 'mongolianVert' | 'vert' | 'vert270' | 'wordArtVert' | 'wordArtVertRtl';

    /**
     * Text wrap
     * @since v3.3.0
     * @default true
     */
    wrap?: boolean;

}
