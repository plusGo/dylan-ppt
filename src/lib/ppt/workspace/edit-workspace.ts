import {DomUtil} from '../../util/domUtil';
import {Workspace} from '../../interface/ppt-workspace.interface';
import {SvgRender} from '../render/svg-render';
import './edit-workspace.scss';
import {SlideEditor} from '../editor/slide-editor/slide-editor';
import {Subject} from '../../obervable/observable';
import {BaseEvent} from './type';
import {HiddenInput} from '../editor/hiden-input/hidden-input';
import {AfterViewInit, BaseComponent1} from '../base/base-component';

const template = `
<div id="workspace" class="edit" style="display: block;">
    <div id="uil-content">
    </div>
</div>
`;

/**
 * @description PPT编辑时的工作区
 */
export class EditWorkspace extends BaseComponent1 implements Workspace, AfterViewInit {
    workSpaceElement: HTMLDivElement; // 工作区域节点
    uilContentElement: HTMLDivElement; // UI区
    svgRender: SvgRender; // 编辑时的渲染层
    slideEditor: SlideEditor; // 编辑层

    /**
     * 事件总线
     */
    eventStream: Subject<BaseEvent, void> = new Subject<BaseEvent, void>();

    /**
     * 工作区静态配置
     */
    workspaceConfig = {
        widthHeightRatio: 16 / 9
    };

    hiddenInput: HiddenInput;

    constructor(private hostElement: HTMLElement) {
        super(template, hostElement);
        if (!DomUtil.isElement(this.hostElement)) {
            throw new Error('hostElement must be html element');
        }


        this.eventStream.subscribe((event) => {
            if (event.eventType === 'cursorChange') {
                DomUtil.addStyleMap(document.body, {cursor: event.data});
            }
        })
    }


    afterViewInit(): void {
        this.workSpaceElement = this.query('#workspace');
        this.uilContentElement = this.query('#uil-content');

        this.initHiddenInput();
        this.initSvg();
        this.initSlideEditor();

        this.listenDocResize();
    }

    private initSvg() {
        this.svgRender = new SvgRender(this);
    }


    /**
     * 初始化单页slide编辑器
     */
    private initSlideEditor() {
        this.slideEditor = new SlideEditor(this);

    }

    private initHiddenInput() {
        this.hiddenInput = new HiddenInput(this);
    }

    private listenDocResize() {
        window.onresize = () => {
            this.eventStream.next({
                eventType: 'uiResize',
                data: this.uilContentElement.clientWidth
            });
        }
    }
}
