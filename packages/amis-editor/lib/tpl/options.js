/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var assign = require('lodash/assign');
var cloneDeep = require('lodash/cloneDeep');
var omit = require('lodash/omit');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var assign__default = /*#__PURE__*/_interopDefaultLegacy(assign);
var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);

amisEditorCore.setSchemaTpl('options', function () {
  var i18nEnabled = amisEditorCore.getI18nEnabled();
  return {
    label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
    name: 'options',
    type: 'combo',
    multiple: true,
    draggable: true,
    addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
    scaffold: {
      label: '',
      value: ''
    },
    items: [{
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      name: 'label',
      placeholder: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
      required: true
    }, {
      type: 'select',
      name: 'value',
      pipeIn: function (value) {
        if (typeof value === 'string') {
          return 'text';
        }
        if (typeof value === 'boolean') {
          return 'boolean';
        }
        if (typeof value === 'number') {
          return 'number';
        }
        return 'text';
      },
      pipeOut: function (value, oldValue) {
        if (value === 'text') {
          return String(oldValue);
        }
        if (value === 'number') {
          var convertTo = Number(oldValue);
          if (isNaN(convertTo)) {
            return 0;
          }
          return convertTo;
        }
        if (value === 'boolean') {
          return Boolean(oldValue);
        }
        return '';
      },
      options: [{
        label: i18nRuntime.i18n("97d07614380da93d257f9fbf81aa56fb"),
        value: 'text'
      }, {
        label: i18nRuntime.i18n("55d4790c5d819cd0462cbe89561b0dd4"),
        value: 'number'
      }, {
        label: i18nRuntime.i18n("97b0b6499334ed889b372513290a2a52"),
        value: 'boolean'
      }]
    }, {
      type: 'input-number',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "number"',
      unique: true
    }, {
      type: 'switch',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "boolean"',
      unique: true
    }, {
      type: 'input-text',
      name: 'value',
      placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
      visibleOn: 'typeof data.value === "undefined" || typeof data.value === "string"',
      unique: true
    }]
  };
});
amisEditorCore.setSchemaTpl('tree', {
  label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
  name: 'options',
  type: 'combo',
  multiple: true,
  draggable: true,
  addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
  description: i18nRuntime.i18n("1f08c91da33fc5f0616e8a85c0456a18"),
  scaffold: {
    label: '',
    value: ''
  },
  items: [amisEditorCore.getSchemaTpl('optionsLabel'), {
    type: 'input-text',
    name: 'value',
    placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
    unique: true
  }]
});
amisEditorCore.setSchemaTpl('multiple', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign(tslib.__assign({
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'multiple',
    label: i18nRuntime.i18n("e3be7b8a459a08fec8f378a0660b642b"),
    value: false,
    hiddenOnDefault: true,
    formType: 'extend'
  }, schema.patch || {}), {
    form: {
      body: schema.replace ? schema.body : tslib.__spreadArray([amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter'), amisEditorCore.getSchemaTpl('extractValue')], tslib.__read((schema === null || schema === void 0 ? void 0 : schema.body) || []), false)
    }
  });
});
amisEditorCore.setSchemaTpl('checkAllLabel', {
  type: 'input-text',
  name: 'checkAllLabel',
  label: i18nRuntime.i18n("cf763c357566be6fdaee886a40ddcca7"),
  value: i18nRuntime.i18n("66eeacd93a7c1bda93906fe908ad11a0"),
  mode: 'row'
});
amisEditorCore.setSchemaTpl('checkAll', function () {
  return [amisEditorCore.getSchemaTpl('switch', {
    label: i18nRuntime.i18n("9c541222ced2435288c24b34f8ad1fb8"),
    name: 'checkAll',
    value: false,
    visibleOn: 'data.multiple'
  }), {
    type: 'container',
    className: 'ae-ExtendMore mb-2',
    visibleOn: 'data.checkAll && data.multiple',
    body: [amisEditorCore.getSchemaTpl('switch', {
      label: i18nRuntime.i18n("05bef457e8350e1a5d8007cad41b70e5"),
      name: 'defaultCheckAll',
      value: false
    }), amisEditorCore.getSchemaTpl('checkAllLabel')]
  }];
});
amisEditorCore.setSchemaTpl('joinValues', function () {
  return amisEditorCore.getSchemaTpl('switch', {
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("bc8d09093edd98769d5cb39e759aa498"), i18nRuntime.i18n("2646ee1ebb6922a5c9359de6cd3b3639")),
    name: 'joinValues',
    visibleOn: 'data.multiple',
    value: true
  });
});
amisEditorCore.setSchemaTpl('delimiter', {
  type: 'input-text',
  name: 'delimiter',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1ca0b9b486be3b766a92474189f11fc8"), i18nRuntime.i18n("ab8e2e8cd076bd115cdd600d17ca5020")),
  visibleOn: 'data.multiple && data.joinValues',
  pipeIn: amisEditorCore.defaultValue(',')
});
amisEditorCore.setSchemaTpl('extractValue', {
  type: 'switch',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6df0630b4f00b6bd05de8af09c2f78ad"), i18nRuntime.i18n("d7d810ec89408c206a220f62edde737f")),
  name: 'extractValue',
  inputClassName: 'is-inline',
  visibleOn: 'data.multiple && data.joinValues === false',
  pipeIn: amisEditorCore.defaultValue(false)
});
amisEditorCore.setSchemaTpl('creatable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("4cff56e2b9703018efc48218b83844b1"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'creatable'
  }, schema);
});
amisEditorCore.setSchemaTpl('addApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("d03c96a2da4905c5f13a87c0d8ddbdb4"),
    name: 'addApi',
    mode: 'row',
    visibleOn: 'data.creatable'
  });
});
amisEditorCore.setSchemaTpl('createBtnLabel', {
  label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
  name: 'createBtnLabel',
  type: 'input-text',
  placeholder: i18nRuntime.i18n("26bb8418786593149c0bf9f8970ab6de")
});
amisEditorCore.setSchemaTpl('editable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("a32b3bf74850faad3a9ae6a0a5dac781"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'editable'
  }, schema);
});
amisEditorCore.setSchemaTpl('editApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("ea56ca3dac0d39e463a8233fd40a9eb6"),
    name: 'editApi',
    mode: 'row',
    visibleOn: 'data.editable'
  });
});
amisEditorCore.setSchemaTpl('removable', function (schema) {
  if (schema === void 0) {
    schema = {};
  }
  return tslib.__assign({
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("3c87af7c432e6b1f59e4f415fd5060cf"), i18nRuntime.i18n("457c4cf8e1e2e0daef8949085555563f")),
    type: 'ae-switch-more',
    mode: 'normal',
    name: 'removable'
  }, schema);
});
amisEditorCore.setSchemaTpl('deleteApi', function () {
  return amisEditorCore.getSchemaTpl('apiControl', {
    label: i18nRuntime.i18n("793e260d5b7c67d43b5c6d5e885d2363"),
    name: 'deleteApi',
    mode: 'row',
    visibleOn: 'data.removable'
  });
});
amisEditorCore.setSchemaTpl('ref', function () {
  // {
  //   type: 'input-text',
  //   name: '$ref',
  //   label: '选择定义',
  //   labelRemark: '输入已经在page中设定好的定义'
  // }
  return null;
});
amisEditorCore.setSchemaTpl('selectFirst', {
  type: 'switch',
  label: i18nRuntime.i18n("63bbd68594c9a987d0ff41d645fafa16"),
  name: 'selectFirst'
});
amisEditorCore.setSchemaTpl('hideNodePathLabel', {
  type: 'switch',
  label: amisEditorCore.tipedLabel(i18nRuntime.i18n("0dd2e4469872c176ab1e85b66d99da98"), i18nRuntime.i18n("b7e26fcff328b28b393ef2e57e96e258")),
  name: 'hideNodePathLabel',
  mode: 'horizontal',
  horizontal: {
    justify: true,
    left: 8
  },
  inputClassName: 'is-inline'
});
amisEditorCore.setSchemaTpl('navControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'source',
  type: 'ae-navSourceControl',
  closeDefaultCheck: true // 关闭默认值设置
});

amisEditorCore.setSchemaTpl('optionControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-optionControl'
});
/**
 * 新版选项控件: 不带设置默认值功能
 * 备注: 表单项组件默认值支持公式需要
 */
amisEditorCore.setSchemaTpl('optionControlV2', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-optionControl',
  closeDefaultCheck: true // 关闭默认值设置
});
/**
 * mapping组件映射源
 */
amisEditorCore.setSchemaTpl('mapSourceControl', {
  type: 'ae-mapSourceControl',
  label: i18nRuntime.i18n("8b139ce9fa196b602bb1ee3bd25b25df"),
  mode: 'normal',
  name: 'source'
});
/**
 * 时间轴组件选项控件
 */
amisEditorCore.setSchemaTpl('timelineItemControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  model: 'normal',
  type: 'ae-timelineItemControl'
});
amisEditorCore.setSchemaTpl('treeOptionControl', {
  label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
  mode: 'normal',
  name: 'options',
  type: 'ae-treeOptionControl'
});
amisEditorCore.setSchemaTpl('dataMap', {
  type: 'container',
  body: [amisEditorCore.getSchemaTpl('switch', {
    label: amisEditorCore.tipedLabel(i18nRuntime.i18n("dd10fdec63a2224aa3d28b48d428cb98"), i18nRuntime.i18n("22b47452f52254ce07507287d137d167") + i18nRuntime.i18n("68419387f5bb8487a848b818d78424ae")),
    name: 'dataMapSwitch',
    pipeIn: amisEditorCore.defaultValue(false),
    onChange: function (value, oldValue, model, form) {
      if (value) {
        form.setValues({
          data: {},
          dataMap: {},
          withDefaultData: false
        });
      } else {
        form.deleteValueByName('dataMap');
        form.deleteValueByName('data');
      }
    }
  }), amisEditorCore.getSchemaTpl('combo-container', {
    type: 'container',
    className: 'ae-Combo-items',
    visibleOn: 'this.dataMapSwitch',
    body: [amisEditorCore.getSchemaTpl('switch', {
      label: amisEditorCore.tipedLabel(i18nRuntime.i18n("cb65841ea7dec5ae0af20b3f5e52abfc"), i18nRuntime.i18n("6922790f45faf064e063069816e4d2ec")),
      name: 'withDefaultData',
      className: 'mb-0',
      pipeIn: amisEditorCore.defaultValue(false),
      onChange: function (value, origin, item, form) {
        form.setValues({
          data: value ? {
            '&': '$$'
          } : {},
          dataMap: {}
        });
      }
    }), {
      type: 'input-kv',
      syncDefaultValue: false,
      name: 'dataMap',
      className: 'block -mt-5',
      deleteBtn: {
        icon: 'fa fa-trash'
      },
      itemsWrapperClassName: 'ae-Combo-items',
      pipeIn: function (e, form) {
        var _a;
        var data = cloneDeep__default["default"]((_a = form.data) === null || _a === void 0 ? void 0 : _a.data);
        return data && data['&'] === '$$' ? omit__default["default"](data, '&') : data;
      },
      onChange: function (value, oldValue, model, form) {
        var newData = form.data.withDefaultData ? assign__default["default"]({
          '&': '$$'
        }, value) : cloneDeep__default["default"](value);
        form.setValues({
          data: newData
        });
        return value;
      }
    }]
  })]
});
