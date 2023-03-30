import { BasePlugin } from 'amis-editor-core';
import { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class CheckboxControlPlugin extends BasePlugin {
    static scene: string[];
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
        option: string;
        name: string;
    };
    previewSchema: any;
    notRenderFormZone: boolean;
    panelTitle: string;
    panelJustify: boolean;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelBodyCreator: (context: BaseEventContext) => any;
}
