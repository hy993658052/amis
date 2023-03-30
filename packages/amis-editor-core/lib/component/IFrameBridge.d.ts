import React from 'react';
import { EditorManager } from '../manager';
import { EditorStoreType } from '../store/editor';
export interface IFrameBridgeProps {
    className?: string;
    url: string;
    editable?: boolean;
    isMobile?: boolean;
    store: EditorStoreType;
    manager: EditorManager;
    theme?: string;
    data?: any;
    env?: any;
    autoFocus?: boolean;
}
export interface BridgeApi {
    update: (props: any) => void;
}
export default class IFrameBridge extends React.PureComponent<IFrameBridgeProps> {
    bridgeFnName: string;
    bridge?: BridgeApi;
    schema: any;
    constructor(props: IFrameBridgeProps);
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    iframeRef(iframe: any): void;
    update(props?: Readonly<IFrameBridgeProps>): void;
    render(): JSX.Element;
}
export declare function mountInIframe(dom: HTMLElement, reactDom: any, envCreator?: any): void;
