import { BasePlugin } from 'amis-editor-core';
import { SchemaObject } from 'amis/lib/Schema';
export declare class AlertPlugin extends BasePlugin {
    static scene: string[];
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    description: string;
    docLink: string;
    icon: string;
    pluginIcon: string;
    scaffold: SchemaObject;
    previewSchema: any;
    regions: {
        key: string;
        label: string;
        placeholder: string;
    }[];
    notRenderFormZone: boolean;
    panelTitle: string;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
}
