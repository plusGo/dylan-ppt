import {WebPPTPlayerOption} from '../type/web-ppt-player-option';
import {DomUtil} from '../../util/domUtil';

export class WebPPTPlayer {
    playerRootContainerElement: HTMLDivElement;
    playerRootElement: HTMLDivElement;
    playerSvgContainerElement: HTMLDivElement;

    constructor(private webPPTPlayerOption: WebPPTPlayerOption) {
        this.initPlayerRootContainer();
    }

    play(): void {
        console.log('web ppt player 开始播放了');
    }

    private initPlayerRootContainer(): void {
        let initialStyle = 'position: relative; width: 1280px; height: 720px; overflow: hidden; zoom: 0.8586; flex-shrink: 0;';
        this.playerRootContainerElement = DomUtil.createElement<HTMLDivElement>('div', initialStyle, 'player-root-container');
        this.webPPTPlayerOption.workspace.workSpaceElement.appendChild(this.playerRootContainerElement);
        this.initPlayerRoot();
    }
    private initPlayerRoot(): void {
        let initialStyle = 'position: absolute; top: 0px; left: 0px; opacity: 0; animation: 1ms linear 0ms 1 normal both running wpp-animation-45;';
        this.playerRootElement = DomUtil.createElement<HTMLDivElement>('div', initialStyle, 'player-root');
        this.playerRootContainerElement.appendChild(this.playerRootElement);
        this.initPlayerSvgContainer();
    }
    private initPlayerSvgContainer(): void {
        let initialStyle = 'width: 1281px; height: 721px; zoom: 1;';
        this.playerSvgContainerElement = DomUtil.createElement<HTMLDivElement>('div', initialStyle, 'player-svg-container');
        this.playerRootElement.appendChild(this.playerSvgContainerElement);
    }
}
