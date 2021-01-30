import {ShapeFillPropsSchema} from './shape-fill-props.schema';

export interface ShapeLinePropsSchema extends ShapeFillPropsSchema {
    /**
     * Line width (pt)
     * @default 1
     */
    width?: number;

    /**
     * Dash type
     * @default 'solid'
     */
    dashType?: 'solid' | 'dash' | 'dashDot' | 'lgDash' | 'lgDashDot' | 'lgDashDotDot' | 'sysDash' | 'sysDot';

    /**
     * Begin arrow type
     * @since v3.3.0
     */
    beginArrowType?: 'none' | 'arrow' | 'diamond' | 'oval' | 'stealth' | 'triangle';

    /**
     * End arrow type
     * @since v3.3.0
     */
    endArrowType?: 'none' | 'arrow' | 'diamond' | 'oval' | 'stealth' | 'triangle';
    // FUTURE: beginArrowSize (1-9)
    // FUTURE: endArrowSize (1-9)

    /**
     * Dash type
     * @deprecated v3.3.0 - use `dashType`
     */
    lineDash?: 'solid' | 'dash' | 'dashDot' | 'lgDash' | 'lgDashDot' | 'lgDashDotDot' | 'sysDash' | 'sysDot';
}
