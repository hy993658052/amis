/**
 * 数据源构造器，可用于对接当前amis中的扩展数据源
 */
import { ButtonSchema } from 'amis/lib/renderers/Action';
import { CRUD2Schema } from 'amis/lib/renderers/CRUD2';
import { FormSchema, SchemaCollection, SchemaObject } from 'amis/lib/Schema';
import { EditorNodeType } from '../store/node';
/**
 * 数据源所需操作，目前是因为schema从后端来
 */
export declare enum DSBehavior {
    create = "create",
    view = "view",
    update = "update",
    table = "table",
    filter = "filter"
}
export interface DSField {
    value: string;
    label: string;
    [propKey: string]: any;
}
export interface DSFieldGroup {
    value: string;
    label: string;
    children: DSField[];
    [propKey: string]: any;
}
/**
 * 支持数据源配置的一些属性名
 */
export declare enum DSGrain {
    entity = "entity",
    list = "list",
    piece = "piece"
}
export declare const DSFeature: {
    List: {
        value: string;
        label: string;
    };
    Insert: {
        value: string;
        label: string;
    };
    View: {
        value: string;
        label: string;
    };
    Edit: {
        value: string;
        label: string;
    };
    Delete: {
        value: string;
        label: string;
    };
    BulkEdit: {
        value: string;
        label: string;
    };
    BulkDelete: {
        value: string;
        label: string;
    };
    Import: {
        value: string;
        label: string;
    };
    Export: {
        value: string;
        label: string;
    };
    SimpleQuery: {
        value: string;
        label: string;
    };
    FuzzyQuery: {
        value: string;
        label: string;
    };
    AdvancedQuery: {
        value: string;
        label: string;
    };
};
export type DSFeatureType = keyof typeof DSFeature;
export interface DSSourceSettingFormConfig {
    /** 数据源字段名 */
    name?: string;
    /** 数据源字段标题 */
    label?: string;
    /** 所需要配置的数据粒度 */
    grain?: DSGrain;
    /** 数据源所被使用的功能场景 */
    feat: DSFeatureType;
    /** 是否是在CRUD场景下，有的数据源在CRUD中可以统一设置 */
    inCrud?: boolean;
    /** 是否在脚手架中 */
    inScaffold?: boolean;
}
/**
 * 数据源选择构造器
 */
export declare abstract class DSBuilder {
    /**
     * 数据源名字，中文，可以覆盖同名
     */
    static type: string;
    name: string;
    order: number;
    /**
     * 数据源schema运行前转换
     */
    static schemaFilter?: (schema: any) => any;
    /**
     * 根据组件、属性名判断是否可以使用这个数据源
     */
    static accessable: (controlType: string, propKey: string) => boolean;
    features: Array<keyof typeof DSFeature>;
    /**
     * 根据值内容和schema配置状态，看是否是当前数据源
     */
    abstract match(value: any, schema?: SchemaObject): boolean;
    /**
     * 生成数据源的配置表单
     */
    abstract makeSourceSettingForm(config: DSSourceSettingFormConfig): SchemaObject[];
    abstract makeFieldsSettingForm(config: {
        /** 数据源字段名 */
        sourceKey?: string;
        feat: DSFeatureType;
        inCrud?: boolean;
        inScaffold?: boolean;
        /** 初次设置字段还是选择字段 */
        setting?: boolean;
    }): SchemaObject[];
    /**
     * 生成字段的筛选配置表单
     */
    abstract makeFieldFilterSetting(config: {
        /** 数据源字段名 */
        sourceKey: string;
        schema: any;
        fieldName: string;
    }): Promise<SchemaObject[]>;
    /**
     * 数据源schema生成
     */
    abstract resolveSourceSchema(config: {
        /** schema */
        schema: SchemaObject;
        /** 数据源配置结果 */
        setting: any;
        /** 数据源字段名 */
        name?: string;
        feat?: DSFeatureType;
        /** 是否是在CRUD场景下，有的数据源在CRUD中可以统一设置 */
        inCrud?: boolean;
        inScaffold?: boolean;
    }): void;
    /**
     * 数据删除schema生成
     */
    abstract resolveDeleteSchema(config: {
        schema: ButtonSchema;
        setting: any;
        feat: 'BulkDelete' | 'Delete';
        name?: string;
    }): any;
    /**
     * 生成数据创建表单schema
     */
    abstract resolveCreateSchema(config: {
        /** schema */
        schema: FormSchema;
        /** 脚手架配置数据 */
        setting: any;
        feat: 'Insert' | 'Edit' | 'BulkEdit';
        /** 数据源字段名 */
        name?: string;
        /** 是否是在CRUD场景下，有的数据源在CRUD中可以统一设置 */
        inCrud?: boolean;
    }): void;
    /**
     * 生成数据表格列
     */
    abstract resolveTableSchema(config: {
        /** schema */
        schema: CRUD2Schema;
        /** 脚手架配置数据 */
        setting: any;
        /** 数据源字段名 */
        name?: string;
        /** 是否是在CRUD场景下，有的数据源在CRUD中可以统一设置 */
        inCrud?: boolean;
    }): void;
    /**
     * 生成数据表格列
     */
    abstract resolveViewSchema(config: {
        /** 脚手架配置数据 */
        setting: any;
        feat?: DSFeatureType;
    }): SchemaObject[];
    abstract resolveSimpleFilterSchema(config: {
        setting: any;
    }): SchemaObject[];
    abstract resolveAdvancedFilterSchema(config: {
        setting: any;
    }): SchemaObject | void;
    abstract makeTableColumnsByFields(fields: any[]): SchemaObject[];
    /**
     * 当前上下文中使用的字段
     */
    abstract getContextFileds(config: {
        schema: any;
        sourceKey: string;
        feat: DSFeatureType;
    }): Promise<DSField[] | void>;
    /**
     * 上下文可以使用的字段
     */
    abstract getAvailableContextFileds(config: {
        schema: any;
        sourceKey: string;
        feat: DSFeatureType;
    }, target: EditorNodeType): Promise<SchemaCollection | void>;
}
export declare const registerDSBuilder: (builderKClass: any) => void;
/**
 * 构造器管理工具，便于更好的缓存
 */
export declare class DSBuilderManager {
    /** 所有可用的数据源构造器实例 */
    builders: {
        [key: string]: DSBuilder;
    };
    get builderNum(): number;
    constructor(type: string, propKey: string);
    resolveBuilderBySetting(setting: any): DSBuilder;
    resolveBuilderBySchema(schema: any, propKey: string): DSBuilder;
    getDefaultBuilderName(): string;
    getDSSwitch(setting?: any): any;
    collectFromBuilders(callee: (builder: DSBuilder, builderName: string) => any): any[];
}
