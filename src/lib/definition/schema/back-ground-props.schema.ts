import {DataOrPathPropsSchema} from './data-or-path-props.schema';
import {HexColor} from '../type/color/hex-color.type';

export interface BackGroundPropsSchema extends DataOrPathPropsSchema {
    /**
     * Color (hex format)
     * @example 'FF3399'
     */
    fill?: HexColor
}
