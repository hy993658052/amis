import { EditorNodeType } from 'amis-editor-core';
import { BasePlugin, RegionConfig } from 'amis-editor-core';
import type { RendererPluginAction, RendererPluginEvent } from 'amis-editor-core';
export declare class ServicePlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    description: string;
    docLink: string;
    tags: string[];
    icon: string;
    pluginIcon: string;
    scaffold: {
        type: string;
        body: {
            type: string;
            tpl: string;
            wrapperComponent: string;
            inline: boolean;
        }[];
    };
    previewSchema: {
        type: string;
        wrapperComponent: string;
        tpl: string;
    };
    regions: Array<RegionConfig>;
    events: RendererPluginEvent[];
    actions: RendererPluginAction[];
    panelTitle: string;
    panelBodyCreator: (context: BaseEventContext) => any;
    rendererBeforeDispatchEvent(node: EditorNodeType, e: any, data: any): void;
}
