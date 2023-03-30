import React from 'react';
import { BasePlugin, RegionConfig } from 'amis-editor-core';
export declare class DialogPlugin extends BasePlugin {
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    wrapperProps: {
        wrapperComponent: typeof InlineModal;
        onClose: any;
        show: boolean;
    };
    regions: Array<RegionConfig>;
    events: {
        eventName: string;
        eventLabel: string;
        description: string;
        dataSchema: {
            type: string;
            properties: {
                'event.data': {
                    type: string;
                    title: string;
                };
            };
        }[];
    }[];
    actions: {
        actionType: string;
        actionLabel: string;
        description: string;
    }[];
    panelTitle: string;
    panelJustify: boolean;
    panelBodyCreator: (context: BaseEventContext) => any;
    buildSubRenderers(): void;
}
export declare class InlineModal extends React.Component<any, any> {
    componentDidMount(): void;
    render(): JSX.Element;
}
