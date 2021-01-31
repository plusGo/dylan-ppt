import {TextPropsOptionsSchema} from '../schema/text/text-props-options.schema';
import {SlideObjectSchema} from '../schema/slide-object.schema';
import {SlideSchema} from '../schema/slide.schema';
import {TextDefinitionUtil} from './text-definition.util';
import {TextPropsSchema} from '../schema/text/text-props.schema';

/**
 * Slide Definition
 */
export class SlideDefinition implements SlideSchema {

    name?: string;
    slideId?: number;
    slideNum?: number;
    slideNumberProps?: any;
    slideLayout?: any;
    presLayout?: any;
    rId?: number;
    rels?: any[];
    relsChart?: any[];
    relsMedia?: any[];

    readonly slideObjects: SlideObjectSchema[] = [];

    constructor() {
    }

    //
    // setBackGround(value: BackGroundPropsSchema): SlideDefinition {
    //
    //     return this;
    // }


    addText(text: string | TextPropsSchema[], options?: TextPropsOptionsSchema): SlideDefinition {
        if (typeof text === 'string') {
            text = [{text: text, options: {}}]
        }
        TextDefinitionUtil.addTextDefinition(this, text, options);
        return this;
    }

    addObject(newTextObject: SlideObjectSchema): SlideDefinition {
        this.slideObjects.push(newTextObject);
        return this;
    }
}
