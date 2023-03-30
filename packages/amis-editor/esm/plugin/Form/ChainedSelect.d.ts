import { BasePlugin, RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class ChainedSelectControlPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    icon: string;
    pluginIcon: string;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
        joinValues: boolean;
    };
    previewSchema: any;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelTitle: string;
    notRenderFormZone: boolean;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
