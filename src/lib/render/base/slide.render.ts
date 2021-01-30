import {SlideDefinition} from '../../definition/definition/slide.definition';

export interface SlideRender {
    render(slideDefinition: SlideDefinition): void;
}
