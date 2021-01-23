import {DomUtil} from '../../util/domUtil';
import {Workspace} from '../../interface/ppt-workspace.interface';
import {SvgRender} from '../render/svg-render';
import './edit-workspace.scss';
import {SlideEditor} from '../editor/slide-editor';

/**
 * @description PPT编辑时的工作区
 */
export class EditWorkspace implements Workspace {
    workSpaceElement: HTMLDivElement; // 工作区域节点
    uilContentElement: HTMLDivElement; // UI区
    svgRender: SvgRender; // 编辑时的渲染层
    private slideEditor: SlideEditor; // 编辑层

    constructor(private hostElement: HTMLElement) {
        if (!DomUtil.isElement(this.hostElement)) {
            throw new Error('hostElement must be html element');
        }
        this.initWorkSpaceElement();
        this.initUilContentElement();
        this.initSvg();
        this.initSlideEditor();
    }

    private initSvg() {
        this.svgRender = new SvgRender(this.uilContentElement);
    }

    private initUilContentElement() {
        this.uilContentElement = DomUtil.createElement('div', '', '', {id: 'uil-content'});
        DomUtil.appendTo(this.workSpaceElement, this.uilContentElement);
    }

    private initWorkSpaceElement() {
        this.workSpaceElement = DomUtil.createElement('div',
            'display:block', 'edit', {id: 'workspace'});
        DomUtil.appendTo(this.hostElement, this.workSpaceElement);
    }

    /**
     * 初始化单页slide编辑器
     */
    private initSlideEditor() {
        this.slideEditor = new SlideEditor(this.uilContentElement);
        this.slideEditor.areaSelector.onDrawStart$.subscribe(() => {
            this.uilContentElement.classList.add('cursor-crosshair');
        });
        this.slideEditor.areaSelector.onDrawComplete$.subscribe(() => {
            this.uilContentElement.classList.remove('cursor-crosshair');
        })
    }

}
