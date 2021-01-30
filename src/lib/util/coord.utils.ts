import {Coord} from '../definition/type/coord.type';

export class CoordUtils {
    /**
     * 将坐标转换为PT
     * @example 50%, x -> 640;  50%,y -> 360;
     */
    static transformToPt(coord: Coord, direction: 'x' | 'y'): number {
        if (typeof coord === 'undefined' || coord === null) {
            return 0;
        }
        if (typeof coord === 'number') {
            return coord;
        }
        if (direction === 'x') {
            return parseInt(coord) * 1280;
        } else {
            return parseInt(coord) * 720;
        }
    }
}
