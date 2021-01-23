import './style/defaule.theme.scss';
import {EditWorkspace} from './lib/ppt/workspace/edit-workspace';
// import {WebPPTPlayer} from './lib/web/player/web-ppt-player';
import {AreaSelector} from "./lib/ppt/editor/area-selector/area-selector";

const workspace = new EditWorkspace(document.querySelector('#ppt-workspace-container'));


