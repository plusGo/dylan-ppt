import {BaseComponent1} from '../../base/base-component';
import {EditWorkspace} from '../../workspace/edit-workspace';

const template = `
    <form action="">
        <input type="text" id="hiddenInput" style="font-size: 1px; opacity: 0; ">
        <input type="hidden" disabled="" style="display: none;">
    </form>
    `;

export class HiddenInput extends BaseComponent1 {
    formElement: HTMLFormElement = this.query<HTMLFormElement>('form');
    hiddenInputElement: HTMLInputElement = this.query<HTMLInputElement>('#hiddenInput');
    disabledInput: HTMLInputElement = this.query<HTMLInputElement>('input[type="hidden"]');

    constructor(workspace: EditWorkspace) {
        super(template, workspace.uilContentElement);
    }

}
