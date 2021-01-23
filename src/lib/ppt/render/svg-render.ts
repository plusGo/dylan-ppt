import {SvgUtil} from '../../util/svg-util';
import {DomUtil} from '../../util/domUtil';

export class SvgRender {
    svgElement: SVGElement;

    constructor(hostElement: HTMLElement) {
        this.svgElement = SvgUtil.create('svg', {
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            width: '640px',
            height: '360px',
            overflow: 'visible',
            viewBox: '0 0 1280 720',
        });
        DomUtil.appendTo(hostElement, this.svgElement);
        //
        // document.addEventListener('resize', () => {
        //     const width = DomUtil.getStyleValue(hostElement, 'width');
        //     console.log(width);
        // })
    }
}
