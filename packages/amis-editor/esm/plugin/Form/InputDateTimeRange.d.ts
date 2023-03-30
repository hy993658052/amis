import { DateRangeControlPlugin } from './InputDateRange';
export declare class DateTimeRangeControlPlugin extends DateRangeControlPlugin {
    rendererName: string;
    $schema: string;
    order: number;
    icon: string;
    pluginIcon: string;
    name: string;
    isBaseComponent: boolean;
    description: string;
    docLink: string;
    tags: string[];
    scaffold: {
        type: string;
        label: string;
        name: string;
    };
    previewSchema: any;
    disabledRendererPlugin: boolean;
    notRenderFormZone: boolean;
}
