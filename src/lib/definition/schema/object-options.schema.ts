import {PLACEHOLDER_TYPES} from '../type/placeholder-types.type';
import {Coord} from '../type/coord.type';
import {Margin} from '../type/margin.type';
import {PositionPropSchema} from './position-prop.schema';
import {TextPropsSchema} from './text/text-props.schema';
import {ShapePropsSchema} from './shape/shape-props.schema';

export interface ObjectOptionsSchema extends PositionPropSchema, TextPropsSchema, ShapePropsSchema {
    placeholderIdx?: number;

    placeholderType?: PLACEHOLDER_TYPES;

    cx?: Coord;

    cy?: Coord

    margin?: Margin;

    colW?: number | number[]; // table
    rowH?: number | number[]; // table
}
