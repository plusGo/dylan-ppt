import {HexColor} from '../../type/color/hex-color.type';

export interface TextGlowPropsSchema {
    /**
     * Border color (hex format)
     * @example 'FF3399'
     */
    color?: HexColor
    /**
     * opacity (0.0 - 1.0)
     * @example 0.5
     * 50% opaque
     */
    opacity: number
    /**
     * size (points)
     */
    size: number
}
