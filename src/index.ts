import './style/defaule.theme.scss';
import {WebPPTWorkspace} from './lib/workspace/web-ppt-workspace';
import {WebPPTPlayer} from './lib/web/player/web-ppt-player';

const workspace = new WebPPTWorkspace('#ppt-workspace-container');
let player = new WebPPTPlayer({workspace, data: null});
player.play();

