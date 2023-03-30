import { BasePlugin } from 'amis-editor-core';
export declare class DividerPlugin extends BasePlugin {
    static scene: string[];
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    icon: string;
    pluginIcon: string;
    description: string;
    scaffold: {
        type: string;
    };
    previewSchema: any;
    panelTitle: string;
    panelJustify: boolean;
    panelBody: any;
}
