// used by: chart, text
import {HexColor} from '../type/color/hex-color.type';

export interface ShadowPropsSchema {
    /**
     * shadow type
     * @default 'none'
     */
    type: 'outer' | 'inner' | 'none';

    /**
     * opacity (0.0 - 1.0)
     * @example 0.5 // 50% opaque
     */
    opacity?: number; // TODO: "Transparency (0-100%)" in PPT // TODO: deprecate and add `transparency`
    /**
     * blur (points)
     * - range: 0-100
     * @default 0
     */
    blur?: number;

    /**
     * angle (degrees)
     * - range: 0-359
     * @default 0
     */
    angle?: number;

    /**
     * shadow offset (points)
     * - range: 0-200
     * @default 0
     */
    offset?: number; // TODO: "Distance" in PPT

    /**
     * shadow color (hex format)
     * @example 'FF3399'
     */
    color?: HexColor;
}
