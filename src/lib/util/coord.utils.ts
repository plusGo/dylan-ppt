import {Coord} from '../definition/type/coord.type';

export class CoordUtils {
    /**
     * 将坐标转换为PT
     * @example 50%, x -> 640;  50%,y -> 360;
     */
    static transformToPt(coord: Coord, size: number): number {
        if (typeof coord === 'undefined' || coord === null) {
            return 0;
        }
        if (typeof coord === 'number') {
            return coord;
        }
        return parseInt(coord) / 100 * size;
    }
}
