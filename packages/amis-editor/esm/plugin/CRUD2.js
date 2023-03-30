/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __awaiter, __generator, __spreadArray, __read, __assign } from 'tslib';
import cloneDeep from 'lodash/cloneDeep';
import React__default from 'react';
import { generateNodeId, DSBuilderManager, getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin, DSFeature } from 'amis-editor-core';
import { flattenDeep, fromPairs, isObject, remove } from 'lodash';
import { findTree } from 'amis';
import { getArgsWrapper } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var findObj = function (obj, predicate, stop) {
  var waitProcess = [obj];
  while (waitProcess.length) {
    var item = waitProcess.pop();
    if (Array.isArray(item)) {
      waitProcess.push.apply(waitProcess, __spreadArray([], __read(item), false));
      continue;
    }
    if (!isObject(item) || stop && stop(item)) {
      continue;
    }
    if (predicate(item)) {
      return item;
    }
    waitProcess.push.apply(waitProcess, __spreadArray([], __read(Object.values(item)), false));
  }
};
var deepRemove = function (obj, predicate) {
  var waitProcess = [obj];
  var _loop_1 = function () {
    var item = waitProcess.pop();
    if (Array.isArray(item)) {
      remove(item, predicate);
      waitProcess.push.apply(waitProcess, __spreadArray([], __read(item), false));
      return "continue";
    }
    if (!isObject(item)) {
      return "continue";
    }
    Object.entries(item).forEach(function (_a) {
      var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1];
      if (isObject(value) && predicate(value)) {
        delete item[key];
      }
      waitProcess.push(value);
    });
  };
  while (waitProcess.length) {
    _loop_1();
  }
};
var Tools = [{
  label: i18n("a4313469fd7361486fe47076629c76ac"),
  value: 'Insert',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    var form = {
      type: 'form',
      body: [],
      onEvent: {
        submitSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id
          }]
        }
      }
    };
    builder.resolveCreateSchema({
      schema: form,
      setting: setting,
      feat: 'Insert',
      inCrud: true
    });
    return {
      type: 'button',
      behavior: 'Insert',
      label: i18n("66ab5e9f24c8f46012a25c89919fb191"),
      level: 'primary',
      className: 'm-r-xs',
      onEvent: {
        click: {
          actions: [{
            actionType: 'dialog',
            dialog: {
              title: i18n("50abd0bf31e07dbee84e9e5b9a407840"),
              body: form
            }
          }]
        }
      }
    };
  },
  align: 'left'
}, {
  label: i18n("e73cefac9d030927da1618c7b15c98c9"),
  value: 'BulkEdit',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    var form = {
      type: 'form',
      // @ts-ignore
      behavior: 'BulkEdit',
      body: [],
      onEvent: {
        submitSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id
          }]
        }
      }
    };
    builder.resolveCreateSchema({
      schema: form,
      setting: setting,
      feat: 'BulkEdit',
      inCrud: true
    });
    return {
      type: 'button',
      behavior: 'BulkEdit',
      label: i18n("e73cefac9d030927da1618c7b15c98c9"),
      className: 'm-r-xs',
      onEvent: {
        click: {
          actions: [{
            actionType: 'dialog',
            dialog: {
              title: i18n("e73cefac9d030927da1618c7b15c98c9"),
              body: form
            }
          }]
        }
      },
      disabledOn: 'selectedItems != null && selectedItems.length < 1'
    };
  },
  align: 'left'
}, {
  label: i18n("7fb62b30119c3797a843a48368463314"),
  value: 'BulkDelete',
  resolveSchema: function (setting, builder) {
    var _a, _b, _c;
    if (setting === void 0) {
      setting = {};
    }
    var button = {
      type: 'button',
      className: 'm-r-xs',
      label: i18n("7fb62b30119c3797a843a48368463314"),
      level: 'danger',
      // @ts-ignore
      behavior: 'BulkDelete',
      disabledOn: 'selectedItems != null && selectedItems.length < 1'
    };
    builder.resolveDeleteSchema({
      schema: button,
      setting: setting,
      feat: 'BulkDelete'
    });
    (_c = (_b = (_a = button.onEvent) === null || _a === void 0 ? void 0 : _a.click) === null || _b === void 0 ? void 0 : _b.actions) === null || _c === void 0 ? void 0 : _c.push({
      actionType: 'search',
      componentId: setting.id
    });
    return button;
  },
  align: 'left'
}, {
  label: i18n("73f28ac83b623fb81d73f16fb3856fa0"),
  value: 'Import',
  resolveSchema: function (setting, builder) {
    return {
      type: 'button',
      className: 'm-r-xs',
      label: i18n("8d9a071ee2ef45e045968e117a205c07"),
      // @ts-ignore
      behavior: 'Import'
    };
  },
  align: 'left'
}, {
  label: i18n("09d44261d7883bf5141a462a790d2816"),
  value: 'Export',
  resolveSchema: function (setting, builder) {
    return {
      type: 'button',
      className: 'm-r-xs',
      label: i18n("55405ea6ff6fd823ffab7e6b10ddfa95"),
      // @ts-ignore
      behavior: 'Export'
    };
  },
  align: 'left'
}];
var FilterTypes = [{
  label: i18n("6ff4bf3d567e977aa4c90c27dff1e6db"),
  value: 'FuzzyQuery',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    var formId = generateNodeId();
    return {
      type: 'form',
      behavior: 'FuzzyQuery',
      id: formId,
      submitOnChange: true,
      wrapWithPanel: false,
      onEvent: {
        validateSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id,
            args: {
              query: '${event.data}'
            }
          }]
        }
      },
      body: [{
        name: 'keywords',
        type: 'input-text',
        label: false,
        addOn: {
          type: 'button',
          label: i18n("e5f71fc31e7246dd6ccc5539570471b0"),
          onEvent: {
            click: {
              actions: [{
                actionType: 'submit',
                componentId: formId
              }]
            }
          }
        }
      }]
    };
  }
}, {
  label: i18n("c26996a6506adf397f0668d376d0b40b"),
  value: 'SimpleQuery',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    return {
      title: i18n("c26996a6506adf397f0668d376d0b40b"),
      type: 'form',
      mode: 'inline',
      behavior: 'SimpleQuery',
      body: builder.resolveSimpleFilterSchema({
        setting: setting
      }) || [],
      actions: [{
        type: 'submit',
        label: i18n("bee912d79eefb7335988c4997aa9138d")
      }, {
        type: 'reset',
        label: i18n("4b9c3271dc2f299dc3aeffb369187513")
      }],
      onEvent: {
        validateSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id,
            args: {
              query: {
                simpleFilters: '${event.data}'
              }
            }
          }]
        }
      }
    };
  }
}, {
  label: i18n("9c4666fd08c2738eb9611a3721cb5f0f"),
  value: 'AdvancedQuery',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    return {
      title: i18n("9c4666fd08c2738eb9611a3721cb5f0f"),
      type: 'form',
      mode: 'inline',
      behavior: 'AdvancedQuery',
      body: builder.resolveAdvancedFilterSchema({
        setting: setting
      }) || [],
      actions: [{
        type: 'submit',
        label: i18n("bee912d79eefb7335988c4997aa9138d")
      }, {
        type: 'reset',
        label: i18n("4b9c3271dc2f299dc3aeffb369187513")
      }],
      onEvent: {
        validateSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id,
            args: {
              query: {
                customFilters: '${event.data}'
              }
            }
          }]
        }
      }
    };
  }
}];
// 数据操作
var DataOperators = [{
  label: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
  value: 'View',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    return {
      type: 'button',
      label: i18n("607e7a4f377fa66b0b28ce318aab841f"),
      level: 'link',
      behavior: 'View',
      onEvent: {
        click: {
          actions: [{
            actionType: 'dialog',
            dialog: {
              type: 'form',
              title: i18n("607e7a4f377fa66b0b28ce318aab841f"),
              body: builder.resolveViewSchema({
                setting: setting
              })
            }
          }]
        }
      }
    };
  }
}, {
  label: i18n("e22b59b6bda1cf9a58f8979fd0a0b43c"),
  value: 'Edit',
  resolveSchema: function (setting, builder) {
    if (setting === void 0) {
      setting = {};
    }
    var form = {
      type: 'form',
      body: [],
      onEvent: {
        submitSucc: {
          actions: [{
            actionType: 'search',
            componentId: setting.id
          }]
        }
      }
    };
    builder.resolveCreateSchema({
      schema: form,
      setting: setting,
      feat: 'Edit',
      inCrud: true
    });
    return {
      type: 'button',
      label: i18n("95b351c86267f3aedf89520959bce689"),
      level: 'link',
      behavior: 'Edit',
      onEvent: {
        click: {
          actions: [{
            actionType: 'dialog',
            dialog: {
              title: i18n("95b351c86267f3aedf89520959bce689"),
              body: form
            }
          }]
        }
      }
    };
  }
}, {
  label: i18n("a790208cafd5c95a18dd9a168319ecf8"),
  value: 'Delete',
  resolveSchema: function (setting, builder) {
    var _a, _b, _c;
    if (setting === void 0) {
      setting = {};
    }
    var button = {
      type: 'button',
      className: 'm-r-xs',
      label: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      level: 'link',
      // @ts-ignore
      behavior: 'Delete'
    };
    builder.resolveDeleteSchema({
      schema: button,
      setting: setting,
      feat: 'Delete'
    });
    (_c = (_b = (_a = button.onEvent) === null || _a === void 0 ? void 0 : _a.click) === null || _b === void 0 ? void 0 : _b.actions) === null || _c === void 0 ? void 0 : _c.push({
      actionType: 'search',
      componentId: setting.id
    });
    return button;
  }
}];
var CRUDPlugin = /** @class */function (_super) {
  __extends(CRUDPlugin, _super);
  function CRUDPlugin(manager) {
    var _this = _super.call(this, manager) || this;
    _this.disabledRendererPlugin = true;
    // 关联渲染器名字
    _this.rendererName = 'crud2';
    _this.multifactor = true;
    _this.$schema = '/schemas/CRUD2Schema.json';
    _this.order = -1000;
    _this.docLink = '/amis/zh-CN/components/crud';
    _this.tags = [i18n("73721e611daaafe5c34aa9f3f901d016")];
    _this.events = [{
      eventName: 'get-data',
      eventLabel: i18n("1b79a4f49b7a21e62b8868f12189b0b0"),
      description: i18n("5a28d015b7b3518f75bc4cc27d9f6c20")
    }];
    _this.actions = [{
      actionType: 'search',
      actionLabel: i18n("cfd84204d9476936c949d071cc2338cf"),
      description: i18n("c6bd3393c21379d3f75d179abe36da3d"),
      descDetail: function (info) {
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), "\u89E6\u53D1\u6570\u636E\u67E5\u8BE2");
      },
      schema: getArgsWrapper(
      /*
        {
          type: 'input-formula',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          label: '查询条件',
          size: 'md',
          name: 'query',
          mode: 'horizontal'
        }
      */
      {
        name: 'query',
        label: i18n("cf12e55021998a8328201800ec356773"),
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'md',
        mode: 'horizontal'
      })
    },
    // {
    //   actionType: 'resetQuery',
    //   actionLabel: '重置查询',
    //   description: '重新恢复查询条件为初始值',
    //   descDetail: (info: any) => {
    //     return (
    //       <div>
    //         <span className="variable-right">{info?.__rendererLabel}</span>
    //         重置初始查询条件
    //       </div>
    //     );
    //   }
    // },
    {
      actionType: 'loadMore',
      actionLabel: i18n("77281549955309c49f5eef77838a85e5"),
      description: i18n("b3a4d6a345372c5def1d5a1bf6077bce"),
      descDetail: function (info) {
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), "\u52A0\u8F7D\u66F4\u591A\u6570\u636E");
      }
    }];
    _this.previewSchema = {
      syncLocation: false,
      type: 'crud2',
      className: 'text-left',
      bodyClassName: 'm-b-none',
      affixHeader: false,
      data: {
        items: [{
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }, {
          a: 5,
          b: 6
        }]
      },
      source: '${items}',
      columns: [{
        title: 'A',
        name: 'a'
      }, {
        title: 'B',
        name: 'b'
      }, {
        name: 'operation',
        title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
        buttons: [{
          icon: 'fa fa-eye',
          type: 'button'
        }, {
          icon: 'fa fa-edit',
          type: 'button'
        }]
      }]
    };
    _this.dsBuilderMgr = new DSBuilderManager('crud2', 'api');
    return _this;
  }
  CRUDPlugin.prototype.afterBuildPanelBody = function (event) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var context;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            context = event.context.context;
            if (!(((_a = context.info.renderer) === null || _a === void 0 ? void 0 : _a.isFormItem) && new RegExp('/crud2/filter/').test(context.path))) return [3 /*break*/, 2];
            return [4 /*yield*/, this.addFilterPanelSetting(event.context)];
          case 1:
            _b.sent();
            return [3 /*break*/, 3];
          case 2:
            if (context.schema.type === 'crud2' && context.schema.mode === this.scaffold.mode) {
              this.addListPanelSetting(event.context);
            }
            _b.label = 3;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDPlugin.prototype.addFilterPanelSetting = function (context) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
      var _b, info, node, form, host, builder, body_1;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _b = context.context, info = _b.info, node = _b.node;
            if (!((_a = info.renderer) === null || _a === void 0 ? void 0 : _a.isFormItem)) return [3 /*break*/, 2];
            form = node.getClosestParentByType('form');
            host = node.getClosestParentByType('crud2');
            if (!host || !form || !form.schema.behavior || host.schema.mode !== this.scaffold.mode) {
              return [2 /*return*/];
            }

            builder = this.dsBuilderMgr.resolveBuilderBySchema(host.schema, 'api');
            return [4 /*yield*/, builder.makeFieldFilterSetting({
              schema: host.schema,
              sourceKey: 'api',
              fieldName: node.schema.name
            })];
          case 1:
            body_1 = _c.sent();
            if (!body_1 || !body_1.length) {
              return [2 /*return*/];
            }
            // 可能会出错，但是cards table2 list 配置面板结构统一，因此
            context.data.tabs.forEach(function (tab) {
              if (tab.title === i18n("24d67862f87f439db7ca957aecb77cce")) {
                tab.body[0].body.forEach(function (collapse) {
                  var _a;
                  if (collapse.title === i18n("4092ed98e9035652d4c9ca9441701ed7")) {
                    // 在标题后面插入过滤条件
                    (_a = collapse.body).splice.apply(_a, __spreadArray([2, 0], __read(body_1), false));
                  }
                });
              }
            });
            _c.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };

  CRUDPlugin.prototype.addDataOperatorSchema = function (schema, content) {};
  CRUDPlugin.prototype.addFeatToToolbar = function (schema, content, position, align) {
    var region = "".concat(position, "Toolbar");
    schema[region] = schema[region] || [{
      type: 'grid',
      columns: [{
        body: []
      }, {
        columnClassName: 'text-right',
        body: []
      }]
    }];
    // 尝试放到左面第一个，否则只能放外头了
    try {
      schema[region][0].columns[align === 'left' ? 0 : 1].body.unshift(content);
    } catch (e) {
      schema[region].unshift(content);
    }
  };
  CRUDPlugin.prototype.filterOperators = function (builder, context) {
    var _this = this;
    var operators = [];
    Tools.forEach(function (tool) {
      if (!builder.features.includes(tool.value)) {
        return;
      }
      operators.push(__assign(__assign({}, tool), {
        remove: function (schema) {
          deepRemove(schema.headerToolbar, function (item) {
            return item.behavior === tool.value;
          });
          deepRemove(schema.footerToolbar, function (item) {
            return item.behavior === tool.value;
          });
        },
        add: function (data) {
          _this.addFeatToToolbar(data, tool.resolveSchema(data, builder), 'header', tool.align);
        },
        isActive: function (data) {
          return _this.isFeatActive(data, tool.value, 'headerToolbar', 'footerToolbar');
        }
      }));
    });
    // 只有表格才能找到操作列放这个内容，卡片和列表不知道位置
    if (context.schema.mode === 'table2') {
      DataOperators.forEach(function (op) {
        if (!builder.features.includes(op.value)) {
          return;
        }
        operators.push(__assign(__assign({}, op), {
          remove: function (schema) {
            deepRemove(schema.columns, function (item) {
              return item.behavior === op.value;
            });
          },
          add: function (data) {
            _this.addDataOperatorSchema(data, op.resolveSchema(data, builder));
          },
          isActive: function (data) {
            return _this.isFeatActive(data, op.value, 'columns');
          }
        }));
      });
    }
    return operators;
  };
  CRUDPlugin.prototype.makeFeatSetting = function (feat, builder, inScaffold) {
    if (feat.makeSetting) {
      return feat.makeSetting(builder);
    }
    return builder.makeFieldsSettingForm({
      feat: feat.value,
      inCrud: true,
      inScaffold: inScaffold
    });
  };
  CRUDPlugin.prototype.isFeatActive = function (schema, feat) {
    var scope = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      scope[_i - 2] = arguments[_i];
    }
    if (scope.length === 0) {
      return findObj(schema, function (item) {
        return item.behavior === feat;
      });
    }
    var region = null;
    while (region = scope.shift()) {
      if (findObj(schema[region], function (item) {
        return item.behavior === feat;
      })) {
        return true;
      }
    }
    return false;
  };
  CRUDPlugin.prototype.removeFeatSchema = function (schema, feat) {
    var scope = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      scope[_i - 2] = arguments[_i];
    }
    if (scope.length === 0) {
      return deepRemove(schema, function (item) {
        return item.behavior === feat;
      });
    }
    var region = null;
    while (region = scope.shift()) {
      deepRemove(schema[region], function (item) {
        return item.behavior === feat;
      });
    }
    return false;
  };
  CRUDPlugin.prototype.filterColumns = function (builder, context) {
    var _a, _b, _c;
    var existColsName = [];
    var columns = [];
    // 实时获取，否则点击预览再回到编辑的时context中的node失效
    var node = this.manager.store.getNodeById(context.id);
    if (!node) {
      return columns;
    }
    var existCols = ((_b = (_a = node.children.find(function (child) {
      return child.type === 'table2';
    })) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.children) || [];
    var hasOperatorCol = (_c = node.schema.columns) === null || _c === void 0 ? void 0 : _c.some(function (col) {
      return col.type === 'operation';
    });
    existCols.some(function (col, index) {
      var _a;
      // 严格来说是单元格的集合，因此要屏蔽掉
      if (index !== 0 && col.id === existCols[0].id) {
        return true;
      }
      col.schema && columns.push({
        label: col.schema.title,
        value: col.id
      });
      ((_a = col.schema) === null || _a === void 0 ? void 0 : _a.key) && existColsName.push(col.schema.key);
      return false;
    });
    if (node.schema.__fields) {
      var appendCols = builder.makeTableColumnsByFields(node.schema.__fields);
      if (appendCols === null || appendCols === void 0 ? void 0 : appendCols.length) {
        appendCols.forEach(function (col) {
          if (existColsName.includes(col.name)) {
            return;
          }
          columns.push({
            label: col.title,
            value: null,
            add: function (data) {
              data.columns.push(col);
            },
            isActive: function () {
              return false;
            }
          });
        });
      }
    }
    if (!hasOperatorCol) {
      columns.push({
        label: i18n("39ccc34fa3ee9be12d8bae7e6fecbac2"),
        value: null,
        isActive: function () {
          return false;
        },
        add: function (data) {
          data.columns.push({
            type: 'operation',
            title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
            buttons: []
          });
        }
      });
    }
    // context.node.
    // // 只有表格才能找到操作列放这个内容，卡片和列表不知道位置
    // if (context.schema.mode === 'table2') {
    //   DataOperators.forEach(op => {
    //     if (!builder.features.includes(op.value)) {
    //       return;
    //     }
    //     operators.push({
    //       ...op,
    //       remove: (schema: any) => {
    //         deepRemove(schema.columns, item => item.behavior === op.value);
    //       },
    //       add: (data: any) => {
    //         this.addDataOperatorSchema(data, op.resolveSchema(data, builder));
    //       },
    //       isActive:(data: any) => {
    //         return this.isFeatActive(data, op.value, 'columns');
    //       }
    //     });
    //   });
    // }
    return columns;
  };
  CRUDPlugin.prototype.addListPanelSetting = function (context) {
    var _this = this;
    var body = context.data;
    var builder = this.dsBuilderMgr.resolveBuilderBySchema(context.context.schema, 'api');
    body.tabs.forEach(function (tab) {
      var _a, _b;
      if (tab.title === i18n("24d67862f87f439db7ca957aecb77cce")) {
        tab.body[0].body.forEach(function (collapse) {
          var _a;
          if (collapse.title === i18n("4092ed98e9035652d4c9ca9441701ed7")) {
            (_a = collapse.body).unshift.apply(_a, __spreadArray(__spreadArray([], __read(builder.makeSourceSettingForm({
              name: 'api',
              label: i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
              feat: 'List',
              inCrud: true
            })), false), [getSchemaTpl('interval'), getSchemaTpl('switch', {
              name: 'syncLocation',
              label: tipedLabel(i18n("569343b4fe5e48131b78611c11eadbeb"), i18n("6dbee29a8c54eef9d042ef3280999ad9")),
              pipeIn: defaultValue(true)
            }), getSchemaTpl('switch', {
              label: i18n("240145572215920ae06db1eeb85b29c0"),
              name: 'selectable'
            }), getSchemaTpl('switch', {
              name: 'keepItemSelectionOnPageChange',
              label: tipedLabel(i18n("099cf136d6a4b6ed4646af4a2ed066b2"), i18n("60011314ed92794f3d4f3e874c359279")),
              visbileOn: 'this.selectable'
            })], false));
          }
          if (collapse.title === i18n("949a8b7bd2c10070a2fae16f9c66afbb")) {
            collapse.body.unshift(getSchemaTpl('switch', {
              name: 'columnsTogglable',
              label: tipedLabel(i18n("2816cea6c4887a53c417831deb5fbe00"), i18n("d3c5079f7e26b1a7374ff76341376de4")),
              onChange: function (value, oldValue, model, form) {
                var schema = cloneDeep(form.data);
                if (value === true) {
                  _this.addFeatToToolbar(schema, {
                    type: 'column-toggler'
                  }, 'header', 'right');
                } else {
                  deepRemove(schema.headerToolbar, function (item) {
                    return item.type === 'column-toggler';
                  });
                }
                form.setValues(schema);
                return undefined;
              }
            }));
            collapse.body.unshift({
              type: 'ae-feature-control',
              label: false,
              features: function () {
                return _this.filterColumns(builder, context.context);
              },
              goFeatureComp: function (feat) {
                return feat.value;
              },
              removeFeature: function (feat) {
                _this.manager.del(feat.value);
              },
              manager: _this.manager,
              addable: true,
              removeable: true
            });
          }
        });
        var moreCollapse = getSchemaTpl('collapseGroup', [{
          title: i18n("4a3ebd0ef27212de3b0c39e6a9701b1d"),
          order: 2,
          body: FilterTypes.map(function (item) {
            // 当前数据源可能不开启这个功能
            if (!builder.features.includes(item.value)) {
              return null;
            }
            var fields = [];
            // await builder.getContextFileds({
            //   schema: context.node.schema,
            //   feat: item.value,
            //   sourceKey: 'api'
            // });
            // 开关配置
            // const moreConfig = builder.makeFieldsSettingForm({
            //   feat: item.value,
            //   inCrud: true,
            //   inScaffold: false
            // });
            var base = {
              label: item.label,
              name: "__".concat(item.value),
              pipeIn: function (value, form) {
                if (item.value === 'FuzzyQuery') {
                  return _this.isFeatActive(form.data, item.value, 'headerToolbar', 'footerToolvar');
                }
                return _this.isFeatActive(form.data, item.value, 'filter');
              },
              onChange: function (value, oldValue, model, form) {
                var schema = cloneDeep(form.data);
                if (value === true) {
                  if (item.value === 'FuzzyQuery') {
                    _this.addFeatToToolbar(schema, item.resolveSchema(schema, builder), 'header', 'right');
                  } else {
                    schema.filter.push(item.resolveSchema(schema, builder));
                  }
                } else if (value === false) {
                  _this.removeFeatSchema(schema, item.value);
                }
                form.setValues(schema);
                return undefined;
              }
            };
            return fields && fields.length ? __assign(__assign({}, base), {
              type: 'ae-switch-more',
              formType: 'extend',
              mode: 'normal',
              form: {
                body: fields
              }
            }) : getSchemaTpl('switch', base);
          })
        }, {
          title: i18n("a9a3a4608d48214efbdfac99888f6e0f"),
          order: 3,
          body: [{
            type: 'ae-feature-control',
            label: false,
            features: _this.filterOperators(builder, context.context),
            goFeatureComp: function (feat) {
              var _a;
              var node = context.context.node;
              if (node.isSecondFactor) {
                node = node.parent;
              }
              return (_a = findTree(node.children, function (item) {
                return item.schema.behavior === feat.value;
              })) === null || _a === void 0 ? void 0 : _a.id;
            },
            manager: _this.manager,
            addable: true,
            addText: i18n("84a2f40385427bbf2edc79e3368e4e0f"),
            removeable: true
          }]
        }, {
          title: i18n("cb43abed5ba14bf32fbb1058e12d2303"),
          order: 4,
          body: [{
            type: 'select',
            label: i18n("48b42e5c3ea447092eaf0a1a13195540"),
            name: '__pgType',
            options: [{
              label: i18n("d81bb206a889656035b929cd8bb1ef10"),
              value: 'none'
            }, {
              label: i18n("3862626c138ce5945e0e273a1bdfbad0"),
              value: 'Pagination'
            }, {
              label: i18n("77281549955309c49f5eef77838a85e5"),
              value: 'LoadMore'
            }].filter(function (i) {
              return i;
            }),
            pipeIn: function (value, form) {
              var pg = findObj([].concat(form.data.headerToolbar).concat(form.data.footerToolbar), function (item) {
                return item && ['Pagination', 'LoadMore'].includes(item.behavior);
              });
              return (pg === null || pg === void 0 ? void 0 : pg.behavior) || 'none';
            },
            onChange: function (value, oldValue, model, form) {
              var schema = cloneDeep(form.data);
              var region = [].concat(schema.headerToolbar).concat(schema.footerToolbar);
              if (value === 'none') {
                deepRemove(region, function (item) {
                  return item && ['Pagination', 'LoadMore'].includes(item.behavior);
                });
              } else {
                var remove_1;
                var content = void 0;
                if (value === 'Pagination') {
                  remove_1 = 'LoadMore';
                  content = {
                    type: 'pagination',
                    behavior: value,
                    layout: ['total', 'perPage', 'pager', 'go']
                  };
                } else {
                  remove_1 = 'Pagination';
                  content = {
                    type: 'button',
                    behavior: value,
                    label: i18n("77281549955309c49f5eef77838a85e5"),
                    onEvent: {
                      click: {
                        actions: [{
                          actionType: 'loadMore',
                          componentId: schema.id
                        }]
                      }
                    }
                  };
                }
                deepRemove(region, function (item) {
                  return item && item.behavior === remove_1;
                });
                _this.addFeatToToolbar(schema, content, 'footer', 'right');
              }
              form.setValues(schema);
              return undefined;
            }
          }, getSchemaTpl('switch', {
            label: tipedLabel(i18n("16b8ff2b147382be4cf8654f829df904"), i18n("d2e20bb1e977f9571a9e2d1b39a7ff10")),
            name: ''
          })]
        }]);
        (_a = tab.body[0].body).splice.apply(_a, __spreadArray([1, 0], __read(moreCollapse.body), false));
        // 让折叠器默认都展开
        (_b = tab.body[0].activeKey).push.apply(_b, __spreadArray([], __read(moreCollapse.activeKey), false));
      }
    });
  };
  CRUDPlugin.prototype.getScaffoldFeatureTab = function () {
    var _this = this;
    var generator = function (feat, featGroup) {
      return _this.dsBuilderMgr.collectFromBuilders(function (builder, builderName) {
        if (!builder.features.includes(feat.value)) {
          return null;
        }
        var content = _this.makeFeatSetting(feat, builder, true);
        if (!content || content.length === 0) {
          return null;
        }
        var isFeatOpened = featGroup ? "data['".concat(featGroup, "'] && ~data['").concat(featGroup, "'].indexOf('").concat(feat.value, "')") : true;
        return {
          title: feat.label,
          visibleOn: "(!data.dsType || data.dsType === '".concat(builderName, "') && ").concat(isFeatOpened),
          body: content.filter(function (i) {
            return i;
          }).map(function (formItem) {
            return __assign(__assign({}, formItem), {
              mode: 'normal'
            });
          })
        };
      });
    };
    return flattenDeep([generator({
      label: i18n("46a0f3086dce242abe54e48bd86e0394"),
      value: 'List',
      resolveSchema: function () {}
    }), Tools.map(function (item) {
      return generator(item, 'tools');
    }), FilterTypes.map(function (item) {
      return generator(item, 'filters');
    }), DataOperators.map(function (item) {
      return generator(item, 'operators');
    })]).filter(function (i) {
      return i;
    });
  };
  /** 将数据资源和数据操作进行填充 */
  CRUDPlugin.prototype.resolveListField = function (setting, schema, builder) {};
  Object.defineProperty(CRUDPlugin.prototype, "scaffoldForm", {
    get: function () {
      var _this = this;
      return {
        title: "".concat(this.name, "\u521B\u5EFA\u5411\u5BFC"),
        mode: {
          mode: 'horizontal',
          horizontal: {
            leftFixed: 'sm'
          }
        },
        className: 'ae-Scaffold-Modal ae-formItemControl',
        stepsBody: true,
        body: [{
          title: i18n("d75a7984d3fa5b32f5d8312e899aeea8"),
          body: __spreadArray([this.dsBuilderMgr.getDSSwitch({
            onChange: function (value, oldValue, model, form) {
              if (value !== oldValue) {
                var data = form.data;
                Object.keys(data).forEach(function (key) {
                  if (key.endsWith('Fields') || key.endsWith('api')) {
                    form.deleteValueByName(key);
                  }
                });
                form.deleteValueByName('__fields');
              }
              return value;
            }
          })], __read(this.dsBuilderMgr.collectFromBuilders(function (builder, builderFlag) {
            return {
              type: 'container',
              visibleOn: "dsType == null || dsType === '".concat(builderFlag, "'"),
              body: flattenDeep([builder.makeSourceSettingForm({
                feat: 'List',
                inScaffold: true,
                inCrud: true
              })])
            };
          })), false)
        }, {
          title: i18n("c2f1f9254c245976e346377515c2e578"),
          body: __spreadArray(__spreadArray([], __read(this.dsBuilderMgr.collectFromBuilders(function (builder, builderName) {
            var check = function (item) {
              return DSFeature[item.value] == null || builder.features.includes(item.value);
            };
            return {
              type: 'container',
              visibleOn: "dsType == null || dsType === '".concat(builderName, "'"),
              body: [{
                type: 'checkboxes',
                label: i18n("012f602372cd2dbd639cd966c63e1f90"),
                name: 'tools',
                joinValues: false,
                extractValue: true,
                multiple: true,
                options: Tools.filter(check)
              }, {
                type: 'checkboxes',
                label: i18n("0943d61befec4c6cf2d21d170c9b066e"),
                name: 'filters',
                multiple: true,
                joinValues: false,
                extractValue: true,
                options: FilterTypes.filter(check)
              }, {
                type: 'checkboxes',
                label: i18n("5246d2c81fa12b1f4f73635c257e232d"),
                name: 'operators',
                multiple: true,
                joinValues: false,
                extractValue: true,
                options: DataOperators.filter(check)
              },
              // 占位，最后一个form item没有间距
              {
                type: 'container'
              }]
            };
          })), false), [{
            type: 'tabs',
            tabsMode: 'vertical',
            className: 'ae-Scaffold-Modal-Tabs',
            tabs: this.getScaffoldFeatureTab()
          }], false)
        }],
        pipeIn: function (value) {
          return (value === null || value === void 0 ? void 0 : value.$$m) || {
            dsType: _this.dsBuilderMgr.getDefaultBuilderName()
          };
        },
        pipeOut: function (value) {
          var _a;
          // 决定组件基础配置和所使用的模式
          var schema = cloneDeep(_this.scaffold);
          var builder = _this.dsBuilderMgr.resolveBuilderBySetting(value);
          if (!builder) {
            return schema;
          }
          // list功能
          builder.resolveSourceSchema({
            schema: schema,
            feat: 'List',
            setting: value,
            name: 'api',
            inCrud: true
          });
          schema.id = (_a = schema.id) !== null && _a !== void 0 ? _a : generateNodeId(); // 先生成一个，方便其他流程生成事件动作
          value.id = schema.id; // 事件动作需要
          schema.$$m = value;
          if (value.filters) {
            schema.filter = [];
            FilterTypes.forEach(function (feat) {
              if (!value.filters.includes(feat.value)) {
                return;
              }
              if (feat.value === 'FuzzyQuery') {
                _this.addFeatToToolbar(schema, feat.resolveSchema(value, builder), 'header', 'right');
                return;
              }
              schema.filter.push(feat.resolveSchema(value, builder));
            });
          }
          if (value.tools) {
            Tools.concat().reverse().forEach(function (feat) {
              if (value.tools.includes(feat.value)) {
                _this.addFeatToToolbar(schema, feat.resolveSchema(value, builder), 'header', feat.align);
              }
            });
            if (value.tools.find(function (obj) {
              return ['BulkEdit', 'BulkDelete'].includes(obj);
            })) {
              schema.multiple = true;
              schema.selectable = true;
            }
          }
          _this.resolveListField(value, schema, builder);
          _this.addFeatToToolbar(schema, {
            type: 'pagination',
            behavior: 'Pagination',
            layout: ['total', 'perPage', 'pager', 'go']
          }, 'footer', 'right');
          return schema;
        },
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  CRUDPlugin.prototype.getRendererInfo = function (context) {
    var renderer = context.renderer,
      schema = context.schema;
    if (this.scaffold && renderer.name === 'crud2' && schema.mode === this.scaffold.mode) {
      return _super.prototype.getRendererInfo.call(this, context);
    }
  };
  CRUDPlugin.prototype.buildDataSchemas = function (node, region) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
      var child, items, builder, fields, childDataSchema, schema;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            child = node.children.find(function (item) {
              return !!~['table2', 'cards', 'list'].indexOf(item.type);
            });
            builder = this.dsBuilderMgr.resolveBuilderBySchema(node.schema, 'api');
            if (!(builder && node.schema.api)) return [3 /*break*/, 2];
            return [4 /*yield*/, builder.getContextFileds({
              schema: node.schema,
              sourceKey: 'api',
              feat: 'List'
            })];
          case 1:
            fields = _d.sent();
            if (fields) {
              items = {
                type: 'object',
                properties: fromPairs(fields.map(function (field) {
                  return [field.value, {
                    type: field.valueType || 'string',
                    title: field.label
                  }];
                }))
              };
            }
            _d.label = 2;
          case 2:
            if (!(items == null)) return [3 /*break*/, 4];
            return [4 /*yield*/, (_b = child === null || child === void 0 ? void 0 : (_a = child.info.plugin).buildDataSchemas) === null || _b === void 0 ? void 0 : _b.call(_a, child, region)];
          case 3:
            childDataSchema = _d.sent();
            items = (_c = childDataSchema === null || childDataSchema === void 0 ? void 0 : childDataSchema.properties) === null || _c === void 0 ? void 0 : _c.items;
            _d.label = 4;
          case 4:
            schema = {
              $id: 'crud2',
              type: 'object',
              properties: __assign(__assign({}, items.properties), {
                items: __assign(__assign({}, items), {
                  title: i18n("fe9e25f4e4b3aeefeb9b7a9c368ede7e")
                }),
                selectedItems: __assign(__assign({}, items), {
                  title: i18n("2c77cfaef73ce2e81131861e9c6d670e")
                }),
                unSelectedItems: __assign(__assign({}, items), {
                  title: i18n("9c9153c49491c381dc2adb2c36fccb04")
                }),
                page: {
                  type: 'number',
                  title: i18n("9a4fe969f1066e197fd2369a44d879ac")
                },
                total: {
                  type: 'number',
                  title: i18n("a7f33a2d99056edcdaced5c8841a9bcb")
                }
              })
            };
            return [2 /*return*/, schema];
        }
      });
    });
  };
  CRUDPlugin.prototype.getAvailableContextFields = function (scopeNode, node, region) {
    return __awaiter(this, void 0, void 0, function () {
      var builder;
      return __generator(this, function (_a) {
        builder = this.dsBuilderMgr.resolveBuilderBySchema(scopeNode.schema, 'api');
        if (builder && scopeNode.schema.api) {
          return [2 /*return*/, builder.getAvailableContextFileds({
            schema: scopeNode.schema,
            sourceKey: 'api',
            feat: 'List'
          }, node)];
        }
        return [2 /*return*/];
      });
    });
  };

  return CRUDPlugin;
}(BasePlugin);
var TableCRUDPlugin = /** @class */function (_super) {
  __extends(TableCRUDPlugin, _super);
  function TableCRUDPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 组件名称
    _this.name = i18n("b339aa87104709397ba68e7ebbc6e5ba");
    _this.isBaseComponent = true;
    _this.description = i18n("7a9f1ec32752de8b69ef21138970f64d");
    _this.order = -1000;
    _this.icon = 'fa fa-table';
    _this.scaffold = {
      type: 'crud2',
      mode: 'table2',
      columns: [{
        name: 'id',
        title: 'ID',
        type: 'container',
        body: [{
          type: 'text'
        }]
      }, {
        name: 'engine',
        title: i18n("1a63ac23010e0573f7c0a8cd3314b8c6"),
        type: 'container',
        body: [{
          type: 'text'
        }]
      }]
    };
    return _this;
  }
  TableCRUDPlugin.prototype.resolveListField = function (setting, schema, builder) {
    var _a;
    builder.resolveTableSchema({
      schema: schema,
      setting: setting,
      inCrud: true
    });
    if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.length) {
      var operators_1 = [];
      DataOperators.forEach(function (feat) {
        var _a;
        if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.includes(feat.value)) {
          operators_1.push(feat.resolveSchema(setting, builder));
        }
      });
      schema.columns.push({
        type: 'operation',
        title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
        buttons: operators_1
      });
    }
  };
  return TableCRUDPlugin;
}(CRUDPlugin);
var CardsCRUDPlugin = /** @class */function (_super) {
  __extends(CardsCRUDPlugin, _super);
  function CardsCRUDPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 组件名称
    _this.name = i18n("093c340f7e1fbde1928ca56b5c7f9cc4");
    _this.isBaseComponent = true;
    _this.description = i18n("a0c35361a003527d123cb581f5c68f4b");
    _this.order = -1000;
    _this.icon = 'fa fa-table';
    _this.scaffold = {
      type: 'crud2',
      mode: 'cards',
      card: {
        type: 'card2',
        body: [{
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            inline: false,
            style: {
              marginTop: '0',
              marginBottom: '0',
              paddingTop: '',
              paddingBottom: ''
            },
            wrapperComponent: 'h2'
          }, {
            type: 'form',
            body: [{
              type: 'static-tpl',
              label: i18n("9caecd931b956381e0763d05aa42835c"),
              tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014")
            }]
          }, {
            type: 'divider'
          }, {
            type: 'button-group'
          }
          // {
          //   type: 'tpl',
          //   tpl: '副标题内容',
          //   inline: false,
          //   wrapperComponent: '',
          //   style: {
          //     color: '#9b9b9b',
          //     marginTop: '0',
          //     marginBottom: '0'
          //   }
          // }
          ]
          // style: {
          //   borderStyle: 'solid',
          //   borderColor: '#ebebeb',
          //   borderWidth: '1px',
          //   'borderRadius': '5px',
          //   'paddingTop': '10px',
          //   'paddingRight': '10px',
          //   'paddingBottom': '0',
          //   'paddingLeft': '10px'
          // }
        }]
      }
    };

    return _this;
  }
  CardsCRUDPlugin.prototype.resolveListField = function (setting, schema, builder) {
    var _a;
    var fields = setting.listFields;
    if (!fields || !fields.length) {
      return;
    }
    schema.card.body[0].body = builder.resolveViewSchema({
      setting: setting,
      feat: 'List'
    });
    if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.length) {
      var operators_2 = [];
      DataOperators.forEach(function (feat) {
        var _a;
        if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.includes(feat.value)) {
          operators_2.push(feat.resolveSchema(setting, builder));
        }
      });
      schema.card.body.push({
        type: 'button-group',
        buttons: operators_2
      });
    }
  };
  /**填充一个数据操作 */
  CardsCRUDPlugin.prototype.fillOperatorSchema = function (schema, content) {
    var col = schema.columns.find(function (item) {
      return item.type === 'operators';
    });
    if (!col) {
      schema.columns.push({
        type: 'operation',
        title: i18n("2b6bc0f293f5ca01b006206c2535ccbc"),
        buttons: [content]
      });
      return;
    }
    col.buttons.push(content);
  };
  /** 判断内容区是否有填充数据操作 */
  CardsCRUDPlugin.prototype.existOperator = function (feat, schema) {
    return findObj(schema.card.body, function (item) {
      return item.behavior === feat;
    });
  };
  return CardsCRUDPlugin;
}(CRUDPlugin);
var ListCRUDPlugin = /** @class */function (_super) {
  __extends(ListCRUDPlugin, _super);
  function ListCRUDPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 组件名称
    _this.name = i18n("3712972d84adf48acbd6ad24b4d75ad0");
    _this.isBaseComponent = true;
    _this.description = i18n("860827796ce2fa94e9ee39e53f011ec0");
    _this.order = -1000;
    _this.icon = 'fa fa-align-justify';
    _this.scaffold = {
      type: 'crud2',
      mode: 'list',
      listItem: {
        body: [{
          type: 'container',
          body: [{
            type: 'tpl',
            tpl: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            inline: false,
            style: {
              marginTop: '0',
              marginBottom: '0',
              paddingTop: '',
              paddingBottom: ''
            },
            wrapperComponent: 'h2'
          }, {
            type: 'tpl',
            tpl: i18n("629645f147f378869fe9d7ee2bbc2857"),
            inline: false,
            wrapperComponent: '',
            style: {
              color: '#9b9b9b',
              marginTop: '0',
              marginBottom: '0'
            }
          }]
        }]
      }
    };
    return _this;
  }
  ListCRUDPlugin.prototype.resolveListField = function (setting, schema, builder) {
    var _a;
    var fields = setting.listFields;
    if (!fields || !fields.length) {
      return;
    }
    schema.listItem.body = builder.resolveViewSchema({
      setting: setting,
      feat: 'List'
    });
    if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.length) {
      var operators_3 = [];
      DataOperators.forEach(function (feat) {
        var _a;
        if ((_a = setting.operators) === null || _a === void 0 ? void 0 : _a.includes(feat.value)) {
          operators_3.push(feat.resolveSchema(setting, builder));
        }
      });
      schema.listItem.body.push({
        type: 'button-group',
        buttons: operators_3
      });
    }
  };
  /** 判断内容区是否有填充数据操作 */
  ListCRUDPlugin.prototype.existOperator = function (feat, schema) {
    return findObj(schema.listItem.body, function (item) {
      return item.behavior === feat;
    });
  };
  return ListCRUDPlugin;
}(CRUDPlugin);
registerEditorPlugin(TableCRUDPlugin);
registerEditorPlugin(CardsCRUDPlugin);
registerEditorPlugin(ListCRUDPlugin);

export { CRUDPlugin, CardsCRUDPlugin, ListCRUDPlugin, TableCRUDPlugin };
