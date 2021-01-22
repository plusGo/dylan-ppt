import './style/defaule.theme.scss';
import {WebPPTWorkspace} from './lib/workspace/web-ppt-workspace';
// import {WebPPTPlayer} from './lib/web/player/web-ppt-player';
import {AreaSelector} from "./lib/editor/area-selector";

const workspace = new WebPPTWorkspace('#ppt-workspace-container');
// let player = new WebPPTPlayer({workspace, data: null});
// player.play();

const areaSelector = new AreaSelector(workspace.instanceElement);
areaSelector.onDrawComplete$.subscribe(result => console.log(result));

setTimeout(() => areaSelector.destroy(), 3000);

