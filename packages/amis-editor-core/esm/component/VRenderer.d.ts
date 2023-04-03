import React from 'react';
import { RendererInfo } from '../plugin';
import { EditorNodeType } from '../store/node';
export interface VRendererProps extends RendererInfo {
    path: string;
    data?: any;
    widthMutable?: boolean;
    children?: React.ReactNode;
}
export declare class VRenderer extends React.Component<VRendererProps> {
    static contextType: React.Context<({
        parentId: string;
        parentRegion: string;
        isCommonConfig: boolean;
        id: string;
        type: string;
        label: string;
        regionInfo: (import("../plugin").RegionConfig & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>>) | undefined;
        path: string;
        schemaPath: string;
        region: string;
        preferTag: string;
        state: any;
        widthMutable: boolean;
        heightMutable: boolean;
        memberIndex: number;
        folded: boolean;
        patched: boolean;
        x: number;
        y: number;
        w: number;
        h: number;
        children: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IAnyModelType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>>;
    } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
        getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
         * 弄点标记
         */
    } & {
        readonly info: RendererInfo;
        setInfo(value: RendererInfo): void;
        readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
        setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
        readonly isVitualRenderer: boolean;
        readonly clickable: boolean;
        readonly draggable: boolean;
        readonly moveable: boolean;
        readonly canMoveUp: boolean;
        readonly canMoveDown: boolean;
        readonly removable: boolean;
        readonly duplicatable: boolean;
        readonly replaceable: boolean;
        memberImmutable(region: string): boolean;
        readonly isRegion: boolean;
        readonly childRegions: any[];
        readonly uniqueChildren: any[];
        readonly sameIdChild: any;
        readonly singleRegion: boolean;
        isExists(id: string): boolean;
        getChildById(id: string): any;
        readonly parent: any;
        readonly ancestorField: any;
        readonly host: any;
        readonly firstChild: any;
        readonly index: any;
        readonly prevSibling: any;
        readonly nextSibling: any;
        readonly schema: any;
        readonly schemaParent: any;
        readonly isSecondFactor: boolean;
    } & {
        getClosestParentByType: (type: string) => void | ({
            parentId: string;
            parentRegion: string;
            isCommonConfig: boolean;
            id: string;
            type: string;
            label: string;
            regionInfo: (import("../plugin").RegionConfig & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>>) | undefined;
            path: string;
            schemaPath: string;
            region: string;
            preferTag: string;
            state: any;
            widthMutable: boolean;
            heightMutable: boolean;
            memberIndex: number;
            folded: boolean;
            patched: boolean;
            x: number;
            y: number;
            w: number;
            h: number;
            children: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IAnyModelType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
             * 弄点标记
             */
        } & {
            readonly info: RendererInfo;
            setInfo(value: RendererInfo): void;
            readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
            setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
            readonly isVitualRenderer: boolean;
            readonly clickable: boolean;
            readonly draggable: boolean;
            readonly moveable: boolean;
            readonly canMoveUp: boolean;
            readonly canMoveDown: boolean;
            readonly removable: boolean;
            readonly duplicatable: boolean;
            readonly replaceable: boolean;
            memberImmutable(region: string): boolean;
            readonly isRegion: boolean;
            readonly childRegions: any[];
            readonly uniqueChildren: any[];
            readonly sameIdChild: any;
            readonly singleRegion: boolean;
            isExists(id: string): boolean;
            getChildById(id: string): any;
            readonly parent: any;
            readonly ancestorField: any;
            readonly host: any;
            readonly firstChild: any;
            readonly index: any;
            readonly prevSibling: any;
            readonly nextSibling: any;
            readonly schema: any;
            readonly schemaParent: any;
            readonly isSecondFactor: boolean;
        } & any & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
            parentRegion: import("mobx-state-tree").IType<string | undefined, string, string>;
            isCommonConfig: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            id: import("mobx-state-tree").IType<string | undefined, string, string>;
            type: import("mobx-state-tree").IType<string | undefined, string, string>;
            label: import("mobx-state-tree").IType<string | undefined, string, string>;
            regionInfo: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>;
            path: import("mobx-state-tree").IType<string | undefined, string, string>;
            schemaPath: import("mobx-state-tree").IType<string | undefined, string, string>;
            region: import("mobx-state-tree").IType<string | undefined, string, string>;
            preferTag: import("mobx-state-tree").IType<string | undefined, string, string>;
            state: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
            widthMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            heightMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            memberIndex: import("mobx-state-tree").IType<number | undefined, number, number>;
            folded: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            patched: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            x: import("mobx-state-tree").IType<number | undefined, number, number>;
            y: import("mobx-state-tree").IType<number | undefined, number, number>;
            w: import("mobx-state-tree").IType<number | undefined, number, number>;
            h: import("mobx-state-tree").IType<number | undefined, number, number>;
            children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>;
        }, {
            getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
             * 弄点标记
             */
        } & {
            readonly info: RendererInfo;
            setInfo(value: RendererInfo): void;
            readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
            setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
            readonly isVitualRenderer: boolean;
            readonly clickable: boolean;
            readonly draggable: boolean;
            readonly moveable: boolean;
            readonly canMoveUp: boolean;
            readonly canMoveDown: boolean;
            readonly removable: boolean;
            readonly duplicatable: boolean;
            readonly replaceable: boolean;
            memberImmutable(region: string): boolean;
            readonly isRegion: boolean;
            readonly childRegions: any[];
            readonly uniqueChildren: any[];
            readonly sameIdChild: any;
            readonly singleRegion: boolean;
            isExists(id: string): boolean;
            getChildById(id: string): any;
            readonly parent: any;
            readonly ancestorField: any;
            readonly host: any;
            readonly firstChild: any;
            readonly index: any;
            readonly prevSibling: any;
            readonly nextSibling: any;
            readonly schema: any;
            readonly schemaParent: any;
            readonly isSecondFactor: boolean;
        } & any, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>);
        updateIsCommonConfig: (value: boolean) => void;
        addChild(props: {
            id: string;
            type: string;
            label: string;
            path: string;
            isCommonConfig?: boolean | undefined;
            info?: RendererInfo | undefined;
            region?: string | undefined;
            getData?: (() => any) | undefined;
            preferTag?: string | undefined;
            schemaPath?: string | undefined;
            regionInfo?: import("../plugin").RegionConfig | undefined;
            widthMutable?: boolean | undefined;
            memberIndex?: number | undefined;
        }): any;
        removeChild(child: any): void;
        toggleFold(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
        patch(store: any, force?: boolean): void;
        updateSchema(value: any): void;
        updateSchemaStyle(value: any): void;
        setComponent(value: any): void;
        getComponent(): any;
        calculateHighlightBox(root?: any): void;
        resetHighlightBox(root: any): void;
        updateState(state: any, replace?: boolean): void;
        setWidthMutable(value: any): void;
        setHeightMutable(value: any): void;
    } & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
        parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
        parentRegion: import("mobx-state-tree").IType<string | undefined, string, string>;
        isCommonConfig: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        id: import("mobx-state-tree").IType<string | undefined, string, string>;
        type: import("mobx-state-tree").IType<string | undefined, string, string>;
        label: import("mobx-state-tree").IType<string | undefined, string, string>;
        regionInfo: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>;
        path: import("mobx-state-tree").IType<string | undefined, string, string>;
        schemaPath: import("mobx-state-tree").IType<string | undefined, string, string>;
        region: import("mobx-state-tree").IType<string | undefined, string, string>;
        preferTag: import("mobx-state-tree").IType<string | undefined, string, string>;
        state: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
        widthMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        heightMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        memberIndex: import("mobx-state-tree").IType<number | undefined, number, number>;
        folded: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        patched: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
        x: import("mobx-state-tree").IType<number | undefined, number, number>;
        y: import("mobx-state-tree").IType<number | undefined, number, number>;
        w: import("mobx-state-tree").IType<number | undefined, number, number>;
        h: import("mobx-state-tree").IType<number | undefined, number, number>;
        children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>;
    }, {
        getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
         * 弄点标记
         */
    } & {
        readonly info: RendererInfo;
        setInfo(value: RendererInfo): void;
        readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
        setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
        readonly isVitualRenderer: boolean;
        readonly clickable: boolean;
        readonly draggable: boolean;
        readonly moveable: boolean;
        readonly canMoveUp: boolean;
        readonly canMoveDown: boolean;
        readonly removable: boolean;
        readonly duplicatable: boolean;
        readonly replaceable: boolean;
        memberImmutable(region: string): boolean;
        readonly isRegion: boolean;
        readonly childRegions: any[];
        readonly uniqueChildren: any[];
        readonly sameIdChild: any;
        readonly singleRegion: boolean;
        isExists(id: string): boolean;
        getChildById(id: string): any;
        readonly parent: any;
        readonly ancestorField: any;
        readonly host: any;
        readonly firstChild: any;
        readonly index: any;
        readonly prevSibling: any;
        readonly nextSibling: any;
        readonly schema: any;
        readonly schemaParent: any;
        readonly isSecondFactor: boolean;
    } & {
        getClosestParentByType: (type: string) => void | ({
            parentId: string;
            parentRegion: string;
            isCommonConfig: boolean;
            id: string;
            type: string;
            label: string;
            regionInfo: (import("../plugin").RegionConfig & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>>) | undefined;
            path: string;
            schemaPath: string;
            region: string;
            preferTag: string;
            state: any;
            widthMutable: boolean;
            heightMutable: boolean;
            memberIndex: number;
            folded: boolean;
            patched: boolean;
            x: number;
            y: number;
            w: number;
            h: number;
            children: import("mobx-state-tree").IMSTArray<import("mobx-state-tree").IAnyModelType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>>;
        } & import("mobx-state-tree/dist/internal").NonEmptyObject & {
            getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
             * 弄点标记
             */
        } & {
            readonly info: RendererInfo;
            setInfo(value: RendererInfo): void;
            readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
            setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
            readonly isVitualRenderer: boolean;
            readonly clickable: boolean;
            readonly draggable: boolean;
            readonly moveable: boolean;
            readonly canMoveUp: boolean;
            readonly canMoveDown: boolean;
            readonly removable: boolean;
            readonly duplicatable: boolean;
            readonly replaceable: boolean;
            memberImmutable(region: string): boolean;
            readonly isRegion: boolean;
            readonly childRegions: any[];
            readonly uniqueChildren: any[];
            readonly sameIdChild: any;
            readonly singleRegion: boolean;
            isExists(id: string): boolean;
            getChildById(id: string): any;
            readonly parent: any;
            readonly ancestorField: any;
            readonly host: any;
            readonly firstChild: any;
            readonly index: any;
            readonly prevSibling: any;
            readonly nextSibling: any;
            readonly schema: any;
            readonly schemaParent: any;
            readonly isSecondFactor: boolean;
        } & any & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IModelType<{
            parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
            parentRegion: import("mobx-state-tree").IType<string | undefined, string, string>;
            isCommonConfig: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            id: import("mobx-state-tree").IType<string | undefined, string, string>;
            type: import("mobx-state-tree").IType<string | undefined, string, string>;
            label: import("mobx-state-tree").IType<string | undefined, string, string>;
            regionInfo: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<import("../plugin").RegionConfig, import("../plugin").RegionConfig, import("../plugin").RegionConfig>>;
            path: import("mobx-state-tree").IType<string | undefined, string, string>;
            schemaPath: import("mobx-state-tree").IType<string | undefined, string, string>;
            region: import("mobx-state-tree").IType<string | undefined, string, string>;
            preferTag: import("mobx-state-tree").IType<string | undefined, string, string>;
            state: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IType<any, any, any>, [undefined]>;
            widthMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            heightMutable: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            memberIndex: import("mobx-state-tree").IType<number | undefined, number, number>;
            folded: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            patched: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
            x: import("mobx-state-tree").IType<number | undefined, number, number>;
            y: import("mobx-state-tree").IType<number | undefined, number, number>;
            w: import("mobx-state-tree").IType<number | undefined, number, number>;
            h: import("mobx-state-tree").IType<number | undefined, number, number>;
            children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<import("mobx-state-tree").IAnyModelType>, [undefined]>;
        }, {
            getData: import("mobx-state-tree").IType<() => any, () => any, () => any>; /**
             * 弄点标记
             */
        } & {
            readonly info: RendererInfo;
            setInfo(value: RendererInfo): void;
            readonly rendererConfig: import("packages/amis-core/lib").RendererConfig | undefined;
            setRendererConfig(value: import("packages/amis-core/lib").RendererConfig): void;
            readonly isVitualRenderer: boolean;
            readonly clickable: boolean;
            readonly draggable: boolean;
            readonly moveable: boolean;
            readonly canMoveUp: boolean;
            readonly canMoveDown: boolean;
            readonly removable: boolean;
            readonly duplicatable: boolean;
            readonly replaceable: boolean;
            memberImmutable(region: string): boolean;
            readonly isRegion: boolean;
            readonly childRegions: any[];
            readonly uniqueChildren: any[];
            readonly sameIdChild: any;
            readonly singleRegion: boolean;
            isExists(id: string): boolean;
            getChildById(id: string): any;
            readonly parent: any;
            readonly ancestorField: any;
            readonly host: any;
            readonly firstChild: any;
            readonly index: any;
            readonly prevSibling: any;
            readonly nextSibling: any;
            readonly schema: any;
            readonly schemaParent: any;
            readonly isSecondFactor: boolean;
        } & any, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>);
        updateIsCommonConfig: (value: boolean) => void;
        addChild(props: {
            id: string;
            type: string;
            label: string;
            path: string;
            isCommonConfig?: boolean | undefined;
            info?: RendererInfo | undefined;
            region?: string | undefined;
            getData?: (() => any) | undefined;
            preferTag?: string | undefined;
            schemaPath?: string | undefined;
            regionInfo?: import("../plugin").RegionConfig | undefined;
            widthMutable?: boolean | undefined;
            memberIndex?: number | undefined;
        }): any;
        removeChild(child: any): void;
        toggleFold(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
        patch(store: any, force?: boolean): void;
        updateSchema(value: any): void;
        updateSchemaStyle(value: any): void;
        setComponent(value: any): void;
        getComponent(): any;
        calculateHighlightBox(root?: any): void;
        resetHighlightBox(root: any): void;
        updateState(state: any, replace?: boolean): void;
        setWidthMutable(value: any): void;
        setHeightMutable(value: any): void;
    }, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | null>;
    editorNode: EditorNodeType;
    UNSAFE_componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /**
     * 弄点标记
     */
    markDom(id: string): void;
    render(): JSX.Element;
}
