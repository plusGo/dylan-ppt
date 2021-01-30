import './style/defaule.theme.scss';
import {SlideDefinition} from './lib/definition/definition/slide.definition';
import {SvgSlideRender} from './lib/render/svg/svg-slide.render';
import {TextPropsSchema} from './lib/definition/schema/text/text-props.schema';
// import {EditWorkspace} from './lib/ppt/workspace/edit-workspace';
// // import {WebPPTPlayer} from './lib/web/player/web-ppt-player';
// import {AreaSelector} from "./lib/ppt/editor/area-selector/area-selector";
//
// const workspace = new EditWorkspace(document.querySelector('#ppt-workspace-container'));
//
//
const slideDefinition = new SlideDefinition();
// slideDefinition.addText('123122222222222222222222222222222222', {x: 300, y: 200, w: 100});

const textObjs: TextPropsSchema[] = [
    {text: "1st line", options: {fontSize: 24, color: "99ABCC"}},
    {text: "2nd line", options: {fontSize: 36, color: "FFFF00"}},
    {text: "3rd line", options: {fontSize: 48, color: "0088CC"}},
];

slideDefinition.addText(textObjs, {x: 96 / 2, y: 96 * 4, w: 96 * 8, h: 96 * 2, fill: {color: "232323"}});

let arrTextObjs1 = [
    {text: "1st line", options: {fontSize: 24, color: "99ABCC", breakLine: true}},
    {text: "2nd line", options: {fontSize: 36, color: "FFFF00", breakLine: true}},
    {text: "3rd line", options: {fontSize: 48, color: "0088CC"}},
];
slideDefinition.addText (arrTextObjs1, {x: 96 * 0.5, y: 96, w: 96 * 8, h: 96 * 2, fill: {color: "232323"}});


// slideDefinition.addText([
//     {text: '1211111111111111111111111111111111111111111111', options: {x: 300, y: 200, w: 100}},
//     {text: '111111111', options: {x: 300, y: 200, w: 100}},
// ]);

new SvgSlideRender(document.querySelector('#svg-render-host'))
    .render(slideDefinition);
