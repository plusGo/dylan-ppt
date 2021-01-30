import {SlideObjectSchema} from './slide-object.schema';

export interface SlideSchema {
    name?: string;
    slideId?: number;
    slideNum?: number;
    slideNumberProps?: any;
    slideLayout?: any;
    slideObjects?:SlideObjectSchema[];

    presLayout?: any;
    rId?: number;
    rels?: any[];
    relsChart?: any[];
    relsMedia?: any[];

}
