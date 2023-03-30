import { BuildPanelEventContext, BasePlugin, BasicPanelItem } from '../plugin';
/**
 * 添加名字面板，方便根据组件名字定位节点
 */
export declare class NamePlugin extends BasePlugin {
    static scene: string[];
    order: number;
    buildEditorPanel({ info, selections }: BuildPanelEventContext, panels: Array<BasicPanelItem>): void;
}
