import {AfterViewInit, BaseComponent1, OnDestroy} from '../../../base/base-component';
import {Subject} from '../../../../obervable/observable';
import {EditWorkspace} from '../../../workspace/edit-workspace';
import {DIRECTION_MAP} from './zoom-direaction';

const template = `
<div class="circleBox">
    <div class="circleLine">
        <div data-name="cr1" class="circle cr1 "></div>
        <div data-name="cr2" class="circle cr2 " style="display:"></div>
        <div data-name="cr3" class="circle cr3 "></div>
    </div>
    <div class="circleLine" style="display:">
        <div data-name="cr4" class="circle cr4 "></div>
        <div data-name="cr5" class="circle cr5 "></div>
    </div>
    <div class="circleLine">
        <div data-name="cr6" class="circle cr6 "></div>
        <div data-name="cr7" class="circle cr7 " style="display:"></div>
        <div data-name="cr8" class="circle cr8 "></div>
    </div>
</div>
`;

interface StartSnapshot {
    circleName?: string;
    xOrigin: number;
    yOrigin: number;
}

export interface ZoomAction {
    type?: 'start' | 'zooming' | 'end';
    circleName?: string;
    offsetWidth?: number;
    offsetHeight?: number;
    offsetLeft?: number;
    offsetTop?: number;
}

export class CircleBox extends BaseComponent1 implements AfterViewInit, OnDestroy {
    private static CIRCLE_ATTR_NAME: string = 'data-name';
    circleBoxElement: HTMLDivElement;
    lastSnapshot: StartSnapshot;

    zoomAction$: Subject<ZoomAction, void> = new Subject<ZoomAction, void>();

    constructor(host: HTMLElement, private workspace: EditWorkspace) {
        super(template, host);
    }


    afterViewInit(): void {
        this.circleBoxElement = this.query('.circleBox');
        this.circleBoxElement.addEventListener('mousedown', this.onMousedownFunc);
        this.workspace.uilContentElement.addEventListener('mousemove', this.onMousemoveFunc);
        this.workspace.uilContentElement.addEventListener('mouseup', this.onMouseupFunc);
    }

    onMouseupFunc = (): void => {

        this.lastSnapshot = null;
        this.zoomAction$.next({
            type: 'end'
        })
    };

    onMousemoveFunc = (event: MouseEvent): void => {
        if (!this.lastSnapshot) {
            return;
        }
        const offsetX = event.clientX - this.lastSnapshot.xOrigin;
        const offsetY = event.clientY - this.lastSnapshot.yOrigin;

        const result: ZoomAction = {
            type: 'zooming',
            circleName: this.lastSnapshot.circleName,
            offsetWidth: DIRECTION_MAP[this.lastSnapshot.circleName].offsetWidth * offsetX,
            offsetLeft: DIRECTION_MAP[this.lastSnapshot.circleName].offsetLeft * offsetX,
            offsetHeight: DIRECTION_MAP[this.lastSnapshot.circleName].offsetHeight * offsetY,
            offsetTop: DIRECTION_MAP[this.lastSnapshot.circleName].offsetTop * offsetY,
        };
        this.zoomAction$.next(result);
    };

    onMousedownFunc = (event: MouseEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target) {
            const destDivElement = event.target as HTMLDivElement;
            this.lastSnapshot = {
                xOrigin: event.clientX,
                yOrigin: event.clientY,
            };
            this.lastSnapshot.circleName = destDivElement.getAttribute(CircleBox.CIRCLE_ATTR_NAME);

        }
        this.zoomAction$.next({type: 'start'})
    };


    onDestroy(): void {
        this.circleBoxElement.removeEventListener('mousedown', this.onMousedownFunc);
        this.workspace.uilContentElement.removeEventListener('mousemove', this.onMousemoveFunc);
        this.workspace.uilContentElement.removeEventListener('mouseup', this.onMouseupFunc);
    }
}
