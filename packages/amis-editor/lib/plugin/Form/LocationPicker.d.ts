import { BasePlugin } from 'amis-editor-core';
export declare class LocationControlPlugin extends BasePlugin {
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
        name: string;
        label: string;
    };
    previewSchema: any;
    panelTitle: string;
    panelBodyCreator: (context: BaseEventContext) => any[];
}
