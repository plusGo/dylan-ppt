/**
 * @description 所有组件的基础类
 */
import {DomUtil} from '../../util/domUtil';

export abstract class BaseComponent {

    /**
     * @description 生命周期~组件初始化
     */
    abstract init(): void;

    /**
     * @description 生命周期~组件销毁
     */
    abstract destroy(): void;

    // abstract afterViewInit(): void;
}

/**
 * @description 生命周期函数 -> 初始化前
 */
export interface OnInit {
    onInit(): void;
}

/**
 * @description 生命周期函数 -> 初始化后，
 */
export interface AfterViewInit {
    afterViewInit(): void;
}

/**
 * @description 生命周期函数 -> 摧毁前，
 */
export interface OnDestroy {
    onDestroy(): void;
}

/**
 * @description 所有组件的抽象类
 */
export abstract class BaseComponent1 implements OnInit, AfterViewInit, OnDestroy {
    componentFragment: DocumentFragment;

    constructor(protected template: string, protected host: HTMLElement) {
        this.onInit();
        this.init();
    }

    query<T extends HTMLElement>(selector: string): T {
        return this.host.querySelector(selector) as T;
    }

    onInit(): void {
    }

    afterViewInit(): void {
    }

    onDestroy(): void {
    }

    init(): void {
        this.componentFragment = DomUtil.createFragmentByTemplate(this.template);
        this.mount();
    };

    mount(): void {
        this.host.append(this.componentFragment);
        this.afterViewInit();
    }

    destroy(): void {
        this.onDestroy();
        this.host.removeChild(this.componentFragment);
    }
}
