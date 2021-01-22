import './style/defaule.theme.scss';
import {WebPPTWorkspace} from './lib/workspace/web-ppt-workspace';
// import {WebPPTPlayer} from './lib/web/player/web-ppt-player';
import {AreaSelector} from "./lib/editor/area-selector";
import {Observable} from "./lib/obervable/observable";

const workspace = new WebPPTWorkspace('#ppt-workspace-container');
// let player = new WebPPTPlayer({workspace, data: null});
// player.play();

new AreaSelector(workspace.instanceElement);

new Observable((observer => {
    console.log('observable 1',observer)
}))

