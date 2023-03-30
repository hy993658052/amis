import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
export declare class RangeControlPlugin extends BasePlugin {
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
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelTitle: string;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
