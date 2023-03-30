import { BasePlugin, BasicRendererInfo, RendererInfoResolveEventContext, ReplaceEventContext, PluginEvent, AfterBuildPanelBody } from 'amis-editor-core';
export declare class TableCell2Plugin extends BasePlugin {
    panelTitle: string;
    panelIcon: string;
    afterBuildPanelBody(event: PluginEvent<AfterBuildPanelBody>): void;
    getRendererInfo(context: RendererInfoResolveEventContext): BasicRendererInfo | void;
    beforeReplace(event: PluginEvent<ReplaceEventContext>): void;
}
