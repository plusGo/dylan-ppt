import {SLIDE_OBJECT_TYPES} from '../type/slide-object-type.type';
import {TextPropsSchema} from './text/text-props.schema';
import {ObjectOptionsSchema} from './object-options.schema';
import {SHAPE_NAME} from '../type/shape-name.type';

export interface SlideObjectSchema {
    type: SLIDE_OBJECT_TYPES;

    options?: ObjectOptionsSchema;
    shape?: SHAPE_NAME;

    // text
    text?: TextPropsSchema[];

}
