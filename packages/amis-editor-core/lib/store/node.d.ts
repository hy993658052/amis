/**
 * @file 每个渲染器的节点信息存在这了。
 * Outline 就是靠这个生成的。
 */
import { IAnyModelType, Instance } from 'mobx-state-tree';
import { RegionConfig, RendererInfo } from '../plugin';
import React from 'react';
import type { RendererConfig } from 'amis-core/lib/factory';
export declare const EditorNode: import("mobx-state-tree").IModelType<{
    parentId: import("mobx-state-tree").IType<string | undefined, string, string>;
    parentRegion: import("mobx-state-tree").IType<string | undefined, string, string>;
    isCommonConfig: import("mobx-state-tree").IType<boolean | undefined, boolean, boolean>;
    id: import("mobx-state-tree").IType<string | undefined, string, string>;
    type: import("mobx-state-tree").IType<string | undefined, string, string>;
    label: import("mobx-state-tree").IType<string | undefined, string, string>;
    regionInfo: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<RegionConfig, RegionConfig, RegionConfig>>;
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
    children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<IAnyModelType>, [undefined]>;
}, {
    getData: import("mobx-state-tree").IType<() => any, () => any, () => any>;
} & {
    readonly info: RendererInfo;
    setInfo(value: RendererInfo): void;
    readonly rendererConfig: RendererConfig | undefined;
    setRendererConfig(value: RendererConfig): void;
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
    getClosestParentByType: (type: string) => EditorNodeType | void;
    updateIsCommonConfig: (value: boolean) => void;
    addChild(props: {
        id: string;
        type: string;
        label: string;
        path: string;
        isCommonConfig?: boolean;
        info?: RendererInfo;
        region?: string;
        getData?: () => any;
        preferTag?: string;
        schemaPath?: string;
        regionInfo?: RegionConfig;
        widthMutable?: boolean;
        memberIndex?: number;
    }): any;
    removeChild(child: any): void;
    toggleFold(e: React.MouseEvent<HTMLAnchorElement>): void;
    patch(store: any, force?: boolean): void;
    updateSchema(value: any): void;
    updateSchemaStyle(value: any): void;
    setComponent(value: any): void;
    getComponent(): any;
    /**
     * 计算高亮区域信息。
     * @param layer
     * @param root
     */
    calculateHighlightBox(root?: any): void;
    resetHighlightBox(root: any): void;
    updateState(state: any, replace?: boolean): void;
    setWidthMutable(value: any): void;
    setHeightMutable(value: any): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>;
export declare const EditorNodeContext: React.Context<({
    parentId: string;
    parentRegion: string;
    isCommonConfig: boolean;
    id: string;
    type: string;
    label: string;
    regionInfo: (RegionConfig & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<RegionConfig, RegionConfig, RegionConfig>>>) | undefined;
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
    children: import("mobx-state-tree").IMSTArray<IAnyModelType> & import("mobx-state-tree").IStateTreeNode<import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<IAnyModelType>, [undefined]>>;
} & import("mobx-state-tree/dist/internal").NonEmptyObject & {
    getData: import("mobx-state-tree").IType<() => any, () => any, () => any>;
} & {
    readonly info: RendererInfo;
    setInfo(value: RendererInfo): void;
    readonly rendererConfig: RendererConfig | undefined;
    setRendererConfig(value: RendererConfig): void;
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
    getClosestParentByType: (type: string) => EditorNodeType | void;
    updateIsCommonConfig: (value: boolean) => void;
    addChild(props: {
        id: string;
        type: string;
        label: string;
        path: string;
        isCommonConfig?: boolean;
        info?: RendererInfo;
        region?: string;
        getData?: () => any;
        preferTag?: string;
        schemaPath?: string;
        regionInfo?: RegionConfig;
        widthMutable?: boolean;
        memberIndex?: number;
    }): any;
    removeChild(child: any): void;
    toggleFold(e: React.MouseEvent<HTMLAnchorElement>): void;
    patch(store: any, force?: boolean): void;
    updateSchema(value: any): void;
    updateSchemaStyle(value: any): void;
    setComponent(value: any): void;
    getComponent(): any;
    /**
     * 计算高亮区域信息。
     * @param layer
     * @param root
     */
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
    regionInfo: import("mobx-state-tree").IMaybe<import("mobx-state-tree").IType<RegionConfig, RegionConfig, RegionConfig>>;
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
    children: import("mobx-state-tree").IOptionalIType<import("mobx-state-tree").IArrayType<IAnyModelType>, [undefined]>;
}, {
    getData: import("mobx-state-tree").IType<() => any, () => any, () => any>;
} & {
    readonly info: RendererInfo;
    setInfo(value: RendererInfo): void;
    readonly rendererConfig: RendererConfig | undefined;
    setRendererConfig(value: RendererConfig): void;
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
    getClosestParentByType: (type: string) => EditorNodeType | void;
    updateIsCommonConfig: (value: boolean) => void;
    addChild(props: {
        id: string;
        type: string;
        label: string;
        path: string;
        isCommonConfig?: boolean;
        info?: RendererInfo;
        region?: string;
        getData?: () => any;
        preferTag?: string;
        schemaPath?: string;
        regionInfo?: RegionConfig;
        widthMutable?: boolean;
        memberIndex?: number;
    }): any;
    removeChild(child: any): void;
    toggleFold(e: React.MouseEvent<HTMLAnchorElement>): void;
    patch(store: any, force?: boolean): void;
    updateSchema(value: any): void;
    updateSchemaStyle(value: any): void;
    setComponent(value: any): void;
    getComponent(): any;
    /**
     * 计算高亮区域信息。
     * @param layer
     * @param root
     */
    calculateHighlightBox(root?: any): void;
    resetHighlightBox(root: any): void;
    updateState(state: any, replace?: boolean): void;
    setWidthMutable(value: any): void;
    setHeightMutable(value: any): void;
}, import("mobx-state-tree")._NotCustomized, import("mobx-state-tree")._NotCustomized>>) | null>;
export type EditorNodeType = Instance<typeof EditorNode>;
