import {Coord} from '../type/coord.type';

export interface PositionPropSchema {
    /**
     * Horizontal position
     * - inches or percentage
     * @example 10.25 // position in inches
     * @example '75%' // position as percentage of slide size
     */
    x?: Coord
    /**
     * Vertical position
     * - inches or percentage
     * @example 10.25 // position in inches
     * @example '75%' // position as percentage of slide size
     */
    y?: Coord
    /**
     * Height
     * - inches or percentage
     * @example 10.25 // height in inches
     * @example '75%' // height as percentage of slide size
     */
    h?: Coord
    /**
     * Width
     * - inches or percentage
     * @example 10.25 // width in inches
     * @example '75%' // width as percentage of slide size
     */
    w?: Coord
}
