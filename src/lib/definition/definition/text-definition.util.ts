import {SlideDefinition} from './slide.definition';
import {TextPropsOptionsSchema} from '../schema/text/text-props-options.schema';
import {TextPropsSchema} from '../schema/text/text-props.schema';
import {SlideObjectSchema} from '../schema/slide-object.schema';
import {SHAPE_TYPE} from '../type/shpe-type.enum';
import {SLIDE_OBJECT_TYPES} from '../type/slide-object-type.type';

export class TextDefinitionUtil {
    static addTextDefinition(slide: SlideDefinition, text: TextPropsSchema[], options: TextPropsOptionsSchema = {}): void {
        options.line = options.line || {};
        const newTextObject: SlideObjectSchema = {
            type: SLIDE_OBJECT_TYPES.text,
            shape: options.shape || SHAPE_TYPE.RECTANGLE,
            text: text || [],
            options: options,
        };

        slide.addObject(newTextObject);
    }
}
