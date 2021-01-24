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
export abstract class BaseComponent1 {
    componentFragment: DocumentFragment;

    constructor(protected template: string, protected host: HTMLElement) {
        if ((this as any).onInit) {
            (this as any).onInit();
        }
        this.init();
    }

    query<E extends Element = Element>(selector: string): E {
        return this.host.querySelector<E>(selector);
    }

    queryAll<E extends Element = Element>(selector: string): E[] {
        const result: E[] = [];
        const nodeListOf = this.host.querySelectorAll<E>(selector);
        for (let i = 0; i < nodeListOf.length; i++) {
            result.push(nodeListOf[i]);
        }
        return result;
    }


    init(): void {
        this.componentFragment = DomUtil.createFragmentByTemplate(this.template);
        new Promise((resolve) => resolve(null)).then(() => {
            this.mount();
        })
    };

    mount(): void {
        this.host.append(this.componentFragment);
        if ((this as any).afterViewInit) {
            (this as any).afterViewInit();
        }
    }

    destroy(): void {
        if ((this as any).onDestroy) {
            (this as any).onDestroy();
        }
        this.host.removeChild(this.componentFragment);
    }
}
