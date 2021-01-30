import {PositionPropSchema} from '../position-prop.schema';
import {HorizontalAlign} from '../../type/horizontal-align.type';
import {ShapeFillPropsSchema} from './shape-fill-props.schema';
import {HyperLinkPropsSchema} from '../hyper-link-props.schema';
import {ShapeLinePropsSchema} from './shape-line-props.schema';
import {ShadowPropsSchema} from '../shadow-props.schema';

export interface ShapePropsSchema extends PositionPropSchema {
    /**
     * Horizontal alignment
     * @default 'left'
     */
    align?: HorizontalAlign;

    /**
     * Radius (only for pptx.shapes.PIE, pptx.shapes.ARC, pptx.shapes.BLOCK_ARC)
     * - In the case of pptx.shapes.BLOCK_ARC you have to setup the arcThicknessRatio
     * - values: [0-359, 0-359]
     * @since v3.4.0
     * @default [270, 0]
     */
    angleRange?: [number, number];

    /**
     * Radius (only for pptx.shapes.BLOCK_ARC)
     * - You have to setup the angleRange values too
     * - values: 0.0-1.0
     * @since v3.4.0
     * @default 0.5
     */
    arcThicknessRatio?: number;

    /**
     * Shape fill color properties
     * @example { color:'FF0000' } // hex string (red)
     * @example { color:'pptx.SchemeColor.accent1' } // theme color Accent1
     * @example { color:'0088CC', transparency:50 } // 50% transparent color
     */
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

    /**
     * Add hyperlink to shape
     * @example hyperlink: { url: "https://github.com/gitbrent/pptxgenjs", tooltip: "Visit Homepage" },
     */
    hyperlink?: HyperLinkPropsSchema;

    /**
     * Line options
     */
    line?: ShapeLinePropsSchema;

    /**
     * Radius (only for pptx.shapes.ROUNDED_RECTANGLE)
     * - values: 0-180(TODO:values?)
     * @default 0
     */
    rectRadius?: number;

    /**
     * Image rotation (degrees)
     * - range: -360 to 360
     * @default 0
     * @example 180 // rotate image 180 degrees
     */
    rotate?: number;

    /**
     * Shadow options
     * TODO: need new demo.js entry for shape shadow
     */
    shadow?: ShadowPropsSchema;

    /**
     * Shape name
     * - used instead of default "Shape N" name
     * @since v3.3.0
     * @example 'Antenna Design 9'
     */
    shapeName?: string;

}
