/**
 * @description 所有组件的基础类
 */
import {DomUtil} from '../../util/domUtil';


/**
 * @description 生命周期函数 -> 挂载前，
 */
export interface ComponentWillMount {
    componentWillMount(): void;
}

/**
 * @description 生命周期函数 -> 挂载后，
 */
export interface ComponentDidMount {
    componentDidMount(): void;
}

/**
 * @description 生命周期函数 -> 摧毁前，
 */
export interface ComponentWillUnmount {
    componentWillUnmount(): void;
}

/**
 * @description 所有组件的抽象类
 */
export abstract class BaseComponent {
    /**
     * 用于包裹模板的fragment，只存在于mount前
     */
    componentFragment: DocumentFragment;

    constructor(protected template: string, protected host?: HTMLElement) {
        this.init();
    }

    /**
     * @description 查询组件作用域的dom节点，必须在组件mount后使用
     */
    query<E extends Element = Element>(selector: string): E {
        return this.componentFragment.querySelector<E>(selector) || this.host.querySelector<E>(selector);
    }

    queryAll<E extends Element = Element>(selector: string): E[] {
        const result: E[] = [];
        const nodeListOf = this.componentFragment.querySelectorAll<E>(selector) || this.host.querySelectorAll<E>(selector);
        for (let i = 0; i < nodeListOf.length; i++) {
            result.push(nodeListOf[i]);
        }
        return result;
    }


    init(): void {
        new Promise((resolve) => resolve(null)).then(() => {
            this.componentFragment = DomUtil.createFragmentByTemplate(this.template);
            this.mount();
        })
    };

    mount(host: Element = this.host): void {
        if (host) {
            if ((this as any).componentWillMount) {
                (this as any).componentWillMount();
            }
        } else {
            return;
        }
        host.append(this.componentFragment);
        if ((this as any).componentDidMount) {
            (this as any).componentDidMount();
        }
    }

    unmount(): void {
        if ((this as any).componentWillUnmount) {
            (this as any).componentWillUnmount();
        }
        this.host.removeChild(this.componentFragment);
    }
}
