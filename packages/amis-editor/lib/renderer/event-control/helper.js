/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var amisCore = require('amis-core');
var amis = require('amis');
var i18nRuntime = require('i18n-runtime');
var without = require('lodash/without');
var compActionSelect = require('./comp-action-select.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var without__default = /*#__PURE__*/_interopDefaultLegacy(without);

var getArgsWrapper = function (items, multiple, patch) {
  if (multiple === void 0) {
    multiple = false;
  }
  if (patch === void 0) {
    patch = {};
  }
  return tslib.__assign(tslib.__assign({
    type: 'combo',
    name: 'args',
    // label: '动作参数',
    multiple: multiple,
    strictMode: false
  }, patch), {
    items: Array.isArray(items) ? items : [items]
  });
};
// 数据容器范围
var DATA_CONTAINER = ['form', 'dialog', 'drawer', 'wizard', 'service', 'crud', 'page', 'app', 'chart'];
var MSG_TYPES = {
  info: i18nRuntime.i18n("02d9819ddaaaeb1b7b22b12608c7e5ca"),
  warning: i18nRuntime.i18n("900c70fa5f7dbc014e6f762d5e0e885c"),
  success: i18nRuntime.i18n("330363dfc524cff2488f2ebde0500896"),
  error: i18nRuntime.i18n("7030ff64701a938becbc5aa67ddb86e8")
};
// 下拉展示可赋值属性范围
var SELECT_PROPS_CONTAINER = ['form'];
// 是否数据容器
var IS_DATA_CONTAINER = "".concat(JSON.stringify(DATA_CONTAINER), ".includes(data.__rendererName)");
// 是否下拉展示可赋值属性
var SHOW_SELECT_PROP = "".concat(JSON.stringify(SELECT_PROPS_CONTAINER), ".includes(data.__rendererName)");
// 表单项组件
var FORMITEM_CMPTS = ['button-group-select', 'button-toolbar', 'chained-select', 'chart-radios', 'checkbox', 'checkboxes', 'combo', 'input-kv', 'condition-builder', 'diff-editor', 'editor', 'formula', 'hidden', 'icon-picker', 'input-array', 'input-city', 'input-color', 'input-date', 'input-date-range', 'input-datetime-range', 'input-time-range', 'input-excel', 'input-file', 'input-formula', 'input-group', 'input-image', 'input-month-range', 'input-number', 'input-quarter-range', 'input-range', 'input-rating', 'input-repeat', 'input-rich-text', 'input-sub-form', 'input-table', 'input-tag', 'input-text', 'input-password', 'input-email', 'input-url', 'native-date', 'native-time', 'native-number', 'input-tree', 'input-year-range', 'list-select', 'location-picker', 'matrix-checkboxes', 'nested-select', 'cascader-select', 'picker', 'radios', 'select', 'multi-select', 'switch', 'tabs-transfer', 'tabs-transfer-picker', 'textarea', 'transfer', 'transfer-picker', 'tree-select', 'uuid'];
var SUPPORT_STATIC_FORMITEM_CMPTS = without__default["default"].apply(void 0, tslib.__spreadArray([FORMITEM_CMPTS], ['button-toolbar', 'condition-builder', 'diff-editor', 'editor', 'formula', 'hidden', 'icon-picker', 'input-excel', 'input-file', 'input-formula', 'input-image', 'input-repeat', 'input-rich-text', 'input-sub-form', 'input-table', 'picker', 'uuid'], false));
var SUPPORT_DISABLED_CMPTS = ['button-group', 'action', 'button', 'submit', 'reset', 'collapse', 'container', 'dropdown-button', 'flex', 'flex-item', 'grid', 'grid-2d', 'link', 'nav', 'wizard'
// 'card2'
];

var ACTION_TYPE_TREE = function (manager) {
  var variableManager = manager === null || manager === void 0 ? void 0 : manager.variableManager;
  /** 变量列表 */
  var variableOptions = variableManager.getVariableOptions();
  var pageVariableOptions = variableManager.getPageVariablesOptions();
  return [{
    actionLabel: i18nRuntime.i18n("59ceff465ad16932d8972191ad815dfb"),
    actionType: 'page',
    children: [{
      actionLabel: i18nRuntime.i18n("dec2eb7145e149f281cb7e75fbe8972a"),
      actionType: 'url',
      description: i18nRuntime.i18n("ae10a948eca808b3dd77506b24f3fd0e"),
      innerArgs: ['url', 'params', 'blank'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, "\u8DF3\u8F6C\u81F3", React__default["default"].createElement("span", {
          className: "variable-left"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.url) || '-'));
      },
      schema: getArgsWrapper([{
        type: 'wrapper',
        className: 'p-none',
        body: [
        /**
        {
          label: '页面地址',
          type: 'input-formula',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          inputMode: 'input-group',
          name: 'url',
          placeholder: 'http://',
          mode: 'horizontal',
          size: 'lg',
          required: true,
          visibleOn: 'data.actionType === "url"'
        },
        */
        {
          name: 'url',
          label: i18nRuntime.i18n("8f1c078c6d42759e6ccb1a9bf35f1629"),
          type: 'ae-textareaFormulaControl',
          variables: '${variables}',
          mode: 'horizontal',
          // placeholder: 'http://', 长文本暂不支持
          size: 'lg',
          required: true,
          visibleOn: 'data.actionType === "url"'
        }, {
          type: 'combo',
          name: 'params',
          label: i18nRuntime.i18n("0b72392143e4038e98128cb0f6f679b3"),
          multiple: true,
          mode: 'horizontal',
          size: 'lg',
          items: [{
            name: 'key',
            placeholder: i18nRuntime.i18n("c068b579db3bf0a553bd0af4f81cc14f"),
            type: 'input-text'
          },
          /**
           {
            name: 'val',
            placeholder: '参数值',
            type: 'input-formula',
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group',
            size: 'xs'
          },
           */
          {
            type: 'ae-formulaControl',
            variables: '${variables}',
            name: 'val',
            variableMode: 'tabs',
            placeholder: i18nRuntime.i18n("bfed4943c5f487de1b63a82f7230cce2")
          }]
        }, {
          type: 'switch',
          name: 'blank',
          label: i18nRuntime.i18n("56aa76ab3c987377e855ae2c6c612050"),
          onText: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
          offText: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
          mode: 'horizontal',
          pipeIn: amisEditorCore.defaultValue(true)
        }]
      }])
    }, {
      actionLabel: i18nRuntime.i18n("fd5fb471ecce1eea63a6a95b6707f815"),
      actionType: 'link',
      description: i18nRuntime.i18n("67e21dd387607ae3fb59846504fa2c4c"),
      innerArgs: ['link', 'params', 'pageName', '__pageInputSchema'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, "\u6253\u5F00", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.pageName) || '-'), "\u9875\u9762");
      },
      schema: getArgsWrapper([{
        type: 'wrapper',
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('app-page'), amisEditorCore.getSchemaTpl('app-page-args')]
      }])
    }, {
      actionLabel: i18nRuntime.i18n("39e107b7c4aa580f913ccbebc00f7534"),
      actionType: 'refresh',
      description: i18nRuntime.i18n("261242fe62b18b620419802c7dd7da7f")
    }, {
      actionLabel: i18nRuntime.i18n("ca180138a862543561d3a2c4f08b2e1b"),
      actionType: 'goBack',
      description: i18nRuntime.i18n("5f6b9e7a050ae3f34b38191435e14b24"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u8FD4\u56DE\u4E0A\u4E00\u9875");
      }
    }]
  }, {
    actionLabel: i18nRuntime.i18n("f80d12dcd65429fd28841e768062d3c2"),
    actionType: 'dialogs',
    children: [{
      actionLabel: i18nRuntime.i18n("0561589c26e732981f29709a9b574234"),
      actionType: 'openDialog',
      description: i18nRuntime.i18n("256dbc5161ae393ec8a0e83ae6cf9469"),
      actions: [{
        actionType: 'dialog'
      }, {
        actionType: 'drawer'
      }],
      schema: [{
        type: 'radios',
        label: i18nRuntime.i18n("226b0912184333c81babf2f1894ec0c1"),
        name: 'groupType',
        mode: 'horizontal',
        value: 'dialog',
        required: true,
        pipeIn: amisEditorCore.defaultValue('dialog'),
        inputClassName: 'event-action-radio',
        options: [{
          label: i18nRuntime.i18n("6cff4b6d794cc17f5d24dbe0d21e5732"),
          value: 'dialog'
        }, {
          label: i18nRuntime.i18n("2a2924380dfcaea998bd8a49703545a9"),
          value: 'drawer'
        }],
        visibleOn: 'data.actionType === "openDialog"'
      }, {
        name: 'dialog',
        label: i18nRuntime.i18n("507c1d40c5d6b990cf8c832b0a91cadb"),
        mode: 'horizontal',
        required: true,
        pipeIn: amisEditorCore.defaultValue({
          title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
          body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652"),
          showCloseButton: true,
          showErrorMsg: true,
          showLoading: true
        }),
        asFormItem: true,
        visibleOn: 'data.groupType === "dialog"',
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange,
            data = _a.data;
          return React__default["default"].createElement(amis.Button, {
            size: "sm",
            className: "action-btn-width",
            onClick: function () {
              return manager.openSubEditor({
                title: i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
                value: tslib.__assign({
                  type: 'dialog'
                }, value),
                data: data,
                onChange: function (value) {
                  return onChange(value);
                }
              });
            },
            block: true
          }, i18nRuntime.i18n('a532be3ad5f3fda70d228b8542e81835'));
        }
      }, {
        name: 'drawer',
        label: i18nRuntime.i18n("b67cbb1ca7439053f06d59aac5e410dc"),
        mode: 'horizontal',
        required: true,
        pipeIn: amisEditorCore.defaultValue({
          title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
          body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652")
        }),
        asFormItem: true,
        visibleOn: 'data.groupType === "drawer"',
        children: function (_a) {
          var value = _a.value,
            onChange = _a.onChange;
            _a.data;
          return React__default["default"].createElement(amis.Button, {
            size: "sm",
            className: "action-btn-width",
            onClick: function () {
              return manager.openSubEditor({
                title: i18nRuntime.i18n("262c7c7b9874ae5607fb51da468d0e8c"),
                value: tslib.__assign({
                  type: 'drawer'
                }, value),
                onChange: function (value) {
                  return onChange(value);
                }
              });
            },
            block: true
          }, i18nRuntime.i18n('a532be3ad5f3fda70d228b8542e81835'));
        }
      }]
    }, {
      actionLabel: i18nRuntime.i18n("3b02248ca3790e356e47b6900c0e3931"),
      actionType: 'closeDialog',
      description: i18nRuntime.i18n("f33c2c6ff58bcec40d3e74e591bb3df2") // 或者关闭指定弹窗
      // schema: getArgsWrapper({
      //   type: 'wrapper',
      //   className: 'p-none',
      //   body: [
      //     {
      //       type: 'radios',
      //       label: '类型',
      //       name: 'groupType',
      //       mode: 'horizontal',
      //       value: 'closeDialog',
      //       required: true,
      //       pipeIn: defaultValue('closeDialog'),
      //       options: [
      //         {
      //           label: '弹窗',
      //           value: 'closeDialog'
      //         },
      //         {
      //           label: '抽屉',
      //           value: 'closeDrawer'
      //         }
      //       ],
      //       visibleOn: 'data.actionType === "closeDialog"'
      //     }
      //   ]
      // })
    },
    // 暂时下掉，看后面具体设计
    // {
    //   actionLabel: '打开提示对话框',
    //   actionType: 'alert',
    //   description: '弹个提示对话框'
    // },
    // {
    //   actionLabel: '打开确认对话框',
    //   actionType: 'confirm',
    //   description: '弹个确认对话框'
    // },
    {
      actionLabel: i18nRuntime.i18n("e495f416b83e4c7ff3c66ec3be96a76f"),
      actionType: 'toast',
      description: i18nRuntime.i18n("61d7aaa88181c527cfb936d4c686d267"),
      innerArgs: ['title', 'msgType', 'msg', 'position', 'timeout', 'closeButton', 'showIcon'],
      descDetail: function (info) {
        var _a, _b;
        return React__default["default"].createElement("div", null, MSG_TYPES[(_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.msgType] || '', "\u6D88\u606F\uFF1A", React__default["default"].createElement("span", {
          className: "variable-left"
        }, ((_b = info === null || info === void 0 ? void 0 : info.args) === null || _b === void 0 ? void 0 : _b.msg) || '-'));
      },
      schema: getArgsWrapper({
        type: 'wrapper',
        className: 'p-none',
        body: [{
          type: 'button-group-select',
          name: 'msgType',
          label: i18nRuntime.i18n("6d00710a2528332bfcac14b58e412042"),
          value: 'info',
          required: true,
          mode: 'horizontal',
          options: Object.keys(MSG_TYPES).map(function (key) {
            return {
              label: MSG_TYPES[key],
              value: key,
              level: 'default'
            };
          })
        },
        /*
        {
          name: 'msg',
          label: '消息内容',
          mode: 'horizontal',
          type: 'input-formula',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          inputMode: 'input-group',
          size: 'lg',
          required: true
        },
        */
        {
          name: 'msg',
          label: i18nRuntime.i18n("b87b77561e776367e6756e11ea652217"),
          type: 'ae-textareaFormulaControl',
          mode: 'horizontal',
          variables: '${variables}',
          size: 'lg',
          required: true
        },
        /*
        {
        name: 'title',
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        variableMode: 'tabs',
        inputMode: 'input-group',
        label: '标题内容',
        size: 'lg',
        mode: 'horizontal'
        },
        */
        {
          name: 'title',
          label: i18nRuntime.i18n("43ab9af06e1e0f0b2a8767b46cf8b1cf"),
          type: 'ae-textareaFormulaControl',
          variables: '${variables}',
          mode: 'horizontal',
          size: 'lg'
        },
        /*
        {
        name: 'timeout',
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        variableMode: 'tabs',
        inputMode: 'input-group',
        label: '持续时间(ms)',
        size: 'lg',
        mode: 'horizontal'
        },
        */
        {
          name: 'timeout',
          label: i18nRuntime.i18n("f41a94bb85c5223181c4cdf83ea9021b"),
          type: 'ae-formulaControl',
          rendererSchema: {
            type: 'input-number'
          },
          valueType: 'number',
          variables: '${variables}',
          size: 'lg',
          mode: 'horizontal'
        }, {
          type: 'button-group-select',
          name: 'position',
          value: 'top-right',
          mode: 'horizontal',
          label: i18nRuntime.i18n("a0a837f2873de80bc9ec353c30e73171"),
          options: [{
            label: i18nRuntime.i18n("f3296f64a8a1330d7a07f1d269a1db92"),
            value: 'top-left'
          }, {
            label: i18nRuntime.i18n("b97a5adf068bee6c852db9dcea3a9799"),
            value: 'top-center'
          }, {
            label: i18nRuntime.i18n("eafeba264b6338939f11f1b1adf40d2b"),
            value: 'top-right'
          }, {
            label: i18nRuntime.i18n("d429ffb093e9aa3bf80da125f1be318c"),
            value: 'bottom-left'
          }, {
            label: i18nRuntime.i18n("c241aa8f427118a719b94cbd8f2bb22d"),
            value: 'bottom-center'
          }, {
            label: i18nRuntime.i18n("9cd707caffdfb314d939298f2f2c267c"),
            value: 'bottom-right'
          }]
        }, {
          type: 'switch',
          name: 'closeButton',
          value: true,
          label: i18nRuntime.i18n("8c8fbec263e20f087555c9abcb6dd07a"),
          mode: 'horizontal'
        }, {
          type: 'switch',
          name: 'showIcon',
          value: true,
          label: i18nRuntime.i18n("3f3a016027e540ef10a16dbd49fffde9"),
          mode: 'horizontal'
        }]
      })
    }]
  }, {
    actionLabel: i18nRuntime.i18n("47d68cd0f4c3e91a86d23afe8afccfb8"),
    actionType: 'service',
    children: [{
      actionLabel: i18nRuntime.i18n("4f02d2efe05a20232ab9da63c090595c"),
      actionType: 'ajax',
      description: i18nRuntime.i18n("0cd902f953656adb29985b68e6fc9754"),
      innerArgs: ['api', 'options'],
      descDetail: function (info) {
        var _a;
        var apiInfo = (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.api;
        if (typeof apiInfo === 'string') {
          apiInfo = amisCore.normalizeApi(apiInfo);
        }
        return React__default["default"].createElement("div", null, "\u53D1\u9001", React__default["default"].createElement("span", {
          className: "variable-right variable-left"
        }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.method) || '-'), "\u8BF7\u6C42\uFF1A", React__default["default"].createElement("span", {
          className: "variable-left"
        }, (apiInfo === null || apiInfo === void 0 ? void 0 : apiInfo.url) || '-'));
      },
      schema: {
        type: 'wrapper',
        className: 'p-none',
        body: [getArgsWrapper([amisEditorCore.getSchemaTpl('apiControl', {
          name: 'api',
          label: i18nRuntime.i18n("88bdaf32c27ab169d3d686b86b3fae99"),
          mode: 'horizontal',
          size: 'lg',
          inputClassName: 'm-b-none',
          renderLabel: true,
          required: true
        }), {
          name: 'options',
          type: 'combo',
          label: amisEditorCore.tipedLabel(i18nRuntime.i18n("6e6d4269d0dc3324d551062350a2ae9f"), i18nRuntime.i18n("56e13c39822a814ab39b0d5a0867d7dc")),
          mode: 'horizontal',
          items: [{
            type: 'switch',
            name: 'silent',
            label: false,
            onText: i18nRuntime.i18n("cc42dd3170fdf36bdc2b0f58ab23eb84"),
            offText: i18nRuntime.i18n("b15d91274e9fc68608c609999e0413fa"),
            mode: 'horizontal',
            pipeIn: amisEditorCore.defaultValue(false)
          }]
        }], false, {
          className: 'action-apiControl'
        }), {
          name: 'outputVar',
          type: 'input-text',
          label: i18nRuntime.i18n("e3b49b5bbbdea05598525e91dbdfa638"),
          placeholder: i18nRuntime.i18n("4dca05af026848011eedee1b53efa61c"),
          description: i18nRuntime.i18n("4da82260041107e5780bcbb3a14ef791"),
          mode: 'horizontal',
          size: 'lg',
          value: 'responseResult',
          required: true
        }]
      },
      outputVarDataSchema: [{
        type: 'object',
        properties: {
          'event.data.${outputVar}.responseData': {
            type: 'object',
            title: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3")
          },
          'event.data.${outputVar}.responseStatus': {
            type: 'number',
            title: i18nRuntime.i18n("3f9e257178738d5d180ddc2996809c10")
          },
          'event.data.${outputVar}.responseMsg': {
            type: 'string',
            title: i18nRuntime.i18n("99c74120cc62f4bf31d661e3212b7121")
          }
        }
      }]
    }, {
      actionLabel: i18nRuntime.i18n("5dfd5a78e2ba1bc8afb482a8745454ea"),
      actionType: 'download',
      description: i18nRuntime.i18n("89049706952412d790b801def284629e"),
      innerArgs: ['api'],
      schema: {
        type: 'wrapper',
        style: {
          padding: '0'
        },
        body: [getArgsWrapper(amisEditorCore.getSchemaTpl('apiControl', {
          name: 'api',
          label: i18nRuntime.i18n("88bdaf32c27ab169d3d686b86b3fae99"),
          mode: 'horizontal',
          inputClassName: 'm-b-none',
          size: 'lg',
          renderLabel: true,
          required: true
        }), false, {
          className: 'action-apiControl'
        })]
      }
    }]
  }, {
    actionLabel: i18nRuntime.i18n("bb79667f37035e9562ec6bcffd6cf8ef"),
    actionType: 'cmpt',
    children: [{
      actionLabel: i18nRuntime.i18n("c852fb60f1b8ce921c3def1eba000bc5"),
      actionType: 'visibility',
      description: i18nRuntime.i18n("1bd4cfded5e11a7a8ea4dcfd2fa17e15"),
      actions: [{
        actionType: 'show',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u663E\u793A", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7EC4\u4EF6");
        }
      }, {
        actionType: 'hidden',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u9690\u85CF", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7EC4\u4EF6");
        }
      }, {
        actionType: 'visibility',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u7EC4\u4EF6", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u8868\u8FBE\u5F0F\u5DF2\u914D\u7F6E");
        }
      }],
      supportComponents: '*',
      schema: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)), false), [{
        type: 'radios',
        label: i18nRuntime.i18n("69fbb2e5fc9eb3ba06096cbedbf5a622"),
        name: 'groupType',
        mode: 'horizontal',
        value: 'static',
        required: true,
        inputClassName: 'event-action-radio',
        options: [{
          label: i18nRuntime.i18n("8baf21fa26d6d24b4faa872953275d8d"),
          value: 'static'
        }, {
          label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: 'visibility'
        }]
      }, {
        type: 'radios',
        label: i18nRuntime.i18n("edf25860e3d457eb8ca9cb5dca06dfd7"),
        name: '__statusType',
        mode: 'horizontal',
        value: 'show',
        required: true,
        pipeIn: amisEditorCore.defaultValue('show'),
        inputClassName: 'event-action-radio',
        visibleOn: "this.groupType === 'static'",
        options: [{
          label: i18nRuntime.i18n("4d775d4cd79e2ed6a2fc66fd1e7139c8"),
          value: 'show'
        }, {
          label: i18nRuntime.i18n("dce5379cb978a8259ecfca8f08f00817"),
          value: 'hidden'
        }]
      }, {
        type: 'ae-expressionFormulaControl',
        mode: 'horizontal',
        label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        required: true,
        size: 'lg',
        variables: '${variables}',
        evalMode: true,
        name: '__actionExpression',
        visibleOn: "this.groupType === 'visibility'"
      }], false)
    }, {
      actionLabel: i18nRuntime.i18n("12c8d50c55eeec7059ddd5c303e34f77"),
      actionType: 'usability',
      description: i18nRuntime.i18n("5e75800641ec5c1198092bcf9d34f180"),
      actions: [{
        actionType: 'enabled',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u542F\u7528", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7EC4\u4EF6");
        }
      }, {
        actionType: 'disabled',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u7981\u7528", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7EC4\u4EF6");
        }
      }, {
        actionType: 'usability',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, "\u7EC4\u4EF6", React__default["default"].createElement("span", {
            className: "variable-left variable-right"
          }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u8868\u8FBE\u5F0F\u5DF2\u914D\u7F6E");
        }
      }],
      supportComponents: tslib.__spreadArray(tslib.__spreadArray(['form'], tslib.__read(FORMITEM_CMPTS), false), tslib.__read(SUPPORT_DISABLED_CMPTS), false),
      schema: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)), false), [{
        type: 'radios',
        label: i18nRuntime.i18n("69fbb2e5fc9eb3ba06096cbedbf5a622"),
        name: 'groupType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'static',
        required: true,
        options: [{
          label: i18nRuntime.i18n("8baf21fa26d6d24b4faa872953275d8d"),
          value: 'static'
        }, {
          label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
          value: 'usability'
        }]
      }, {
        type: 'radios',
        label: i18nRuntime.i18n("d86d5919f595226b7a1e8264635ca23d"),
        name: '__statusType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'enabled',
        required: true,
        pipeIn: amisEditorCore.defaultValue('enabled'),
        visibleOn: "this.groupType === 'static'",
        options: [{
          label: i18nRuntime.i18n("7854b52a889b3ef0590d9f542efeb4c8"),
          value: 'enabled'
        }, {
          label: i18nRuntime.i18n("710ad08b11419332713360d2750cd707"),
          value: 'disabled'
        }]
      }, {
        type: 'ae-expressionFormulaControl',
        mode: 'horizontal',
        label: i18nRuntime.i18n("a9400c408441f1f7f6d6954deb05ae9a"),
        required: true,
        size: 'lg',
        evalMode: true,
        name: '__actionExpression',
        visibleOn: "this.groupType === 'usability'"
      }], false)
    }, {
      actionLabel: i18nRuntime.i18n("e052287273ad39a1d3fa9fa3decb5fd9"),
      actionType: 'staticStatus',
      description: i18nRuntime.i18n("506f28f48dbebd5d19e19dfc721e13be"),
      actions: [{
        actionType: 'static',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
            className: "variable-right"
          }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7EC4\u4EF6\u5207\u6362\u4E3A\u9759\u6001");
        }
      }, {
        actionType: 'nonstatic',
        descDetail: function (info) {
          return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
            className: "variable-right"
          }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7EC4\u4EF6\u5207\u6362\u4E3A\u8F93\u5165\u6001");
        }
      }],
      supportComponents: tslib.__spreadArray(['form'], tslib.__read(SUPPORT_STATIC_FORMITEM_CMPTS), false),
      schema: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptSelect(i18nRuntime.i18n("d80bc0fcbfb250480320b683e48b1467"), true)), false), [{
        type: 'radios',
        label: i18nRuntime.i18n("d2e930293da37452638759e17d771adf"),
        name: 'groupType',
        mode: 'horizontal',
        inputClassName: 'event-action-radio',
        value: 'nonstatic',
        required: true,
        pipeIn: amisEditorCore.defaultValue('nonstatic'),
        options: [{
          label: i18nRuntime.i18n("b535bea11c97ec5588b1494799de4d60"),
          value: 'nonstatic'
        }, {
          label: i18nRuntime.i18n("f7784642f42d33f506ba05f3daefc3c4"),
          value: 'static'
        }]
      }], false)
    }, {
      actionLabel: i18nRuntime.i18n("c5a9b6e8c522de8a14ad7fab51c1a1e3"),
      actionType: 'reload',
      description: i18nRuntime.i18n("be4b778e7f5aa6aa5a811d7db4e1a8b3"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u5237\u65B0", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7EC4\u4EF6");
      },
      supportComponents: 'byComponent',
      schema: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
        form.setValueByName('args.resetPage', true);
        form.setValueByName('__addParam', true);
        form.setValueByName('__customData', false);
        form.setValueByName('__containerType', 'all');
        form.setValueByName('__reloadParam', []);
      })), false), [{
        type: 'switch',
        name: '__resetPage',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("697af73997072e0ce9ee65b15a7b3715"), i18nRuntime.i18n("d7bf42dd6e66f2818f9a232603c4a53b")),
        onText: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
        offText: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        mode: 'horizontal',
        pipeIn: amisEditorCore.defaultValue(true),
        visibleOn: "data.actionType === \"reload\" && data.__rendererName === \"crud\""
      }, {
        type: 'switch',
        name: '__addParam',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("fee99f2bcced486e4753a8f58f511d3f"), i18nRuntime.i18n("0f9803bd27434940d4017007c105a861")),
        onText: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
        offText: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        mode: 'horizontal',
        pipeIn: amisEditorCore.defaultValue(true),
        visibleOn: "data.actionType === \"reload\" &&  ".concat(IS_DATA_CONTAINER)
      }, {
        type: 'switch',
        name: '__customData',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("fd951a59a7c635d5330bc1aeec22c813"), i18nRuntime.i18n("b62ce3df3c0d5772006c525b60d5eeab")),
        onText: i18nRuntime.i18n("0a60ac8f02ccd2cf723f927284877851"),
        offText: i18nRuntime.i18n("c9744f45e76d885ae1c74d4f4a934b2e"),
        mode: 'horizontal',
        pipeIn: amisEditorCore.defaultValue(true),
        visibleOn: "data.__addParam && data.actionType === \"reload\" && ".concat(IS_DATA_CONTAINER),
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__containerType', 'all');
        }
      }, {
        type: 'radios',
        name: '__containerType',
        mode: 'horizontal',
        label: '',
        pipeIn: amisEditorCore.defaultValue('all'),
        visibleOn: "data.__addParam && data.__customData && data.actionType === \"reload\" && ".concat(IS_DATA_CONTAINER),
        options: [{
          label: i18nRuntime.i18n("77b1081c177fa3334cc93c99f0ecee75"),
          value: 'all'
        }, {
          label: i18nRuntime.i18n("f5c5e3d69daee06ea1606378ef466765"),
          value: 'appoint'
        }],
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__reloadParams', []);
          form.setValueByName('__valueInput', undefined);
        }
      },
      /*
      {
        name: '__valueInput',
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        required: true,
        variableMode: 'tabs',
        inputMode: 'input-group',
        label: '',
        size: 'lg',
        mode: 'horizontal',
        visibleOn: `data.__addParam && data.__customData && data.__containerType === "all" && data.actionType === "reload" && ${IS_DATA_CONTAINER}`
      },
      */
      {
        name: '__valueInput',
        label: '',
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal',
        required: true,
        visibleOn: "data.__addParam && data.__customData && data.__containerType === \"all\" && data.actionType === \"reload\" && ".concat(IS_DATA_CONTAINER)
      }, {
        type: 'combo',
        name: '__reloadParams',
        label: '',
        multiple: true,
        removable: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        size: 'lg',
        mode: 'horizontal',
        items: [{
          name: 'key',
          type: 'input-text',
          placeholder: i18nRuntime.i18n("c068b579db3bf0a553bd0af4f81cc14f"),
          labelField: 'label',
          valueField: 'value',
          required: true
        },
        /*
        {
          name: 'val',
          type: 'input-formula',
          placeholder: '参数值',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          inputMode: 'input-group'
        }
        */
        {
          name: 'val',
          type: 'ae-formulaControl',
          variables: '${variables}',
          placeholder: i18nRuntime.i18n("bfed4943c5f487de1b63a82f7230cce2")
        }],
        visibleOn: "data.__addParam && data.__customData && data.__containerType === \"appoint\" && data.actionType === \"reload\" && ".concat(IS_DATA_CONTAINER)
      }, {
        type: 'radios',
        name: 'dataMergeMode',
        mode: 'horizontal',
        label: amisEditorCore.tipedLabel(i18nRuntime.i18n("2aecb19ca1655d66fc80fc27a783cc9e"), i18nRuntime.i18n("b67b01a3b9170f1daf78082cfd0df793")),
        pipeIn: amisEditorCore.defaultValue('merge'),
        visibleOn: "data.__addParam && data.actionType === \"reload\" && ".concat(IS_DATA_CONTAINER),
        options: [{
          label: i18nRuntime.i18n("bd81577a6fd4956e676cec499bb70d00"),
          value: 'merge'
        }, {
          label: i18nRuntime.i18n("e09fea40f7e4abd4b2a495b315940688"),
          value: 'override'
        }]
      }], false)
    }, {
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      actionType: 'setValue',
      description: i18nRuntime.i18n("2464e9d13bfc84169eb8333b6996203c"),
      innerArgs: ['path', 'value', 'index', 'fromPage', 'fromApp', '__valueInput', '__comboType', '__containerType'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, typeof ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.path) === 'string' && !(info === null || info === void 0 ? void 0 : info.componentId) ? React__default["default"].createElement(React__default["default"].Fragment, null, "\u8BBE\u7F6E\u53D8\u91CF\u300C", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, variableManager.getNameByPath(info.args.path)), "\u300D\u7684\u6570\u636E") : React__default["default"].createElement(React__default["default"].Fragment, null, "\u8BBE\u7F6E\u7EC4\u4EF6\u300C", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u300D\u7684\u6570\u636E"));
      },
      supportComponents: 'byComponent',
      schema: [{
        name: '__actionSubType',
        type: 'radios',
        label: i18nRuntime.i18n("6c6e12c54723170f214527bedaf81f7d"),
        mode: 'horizontal',
        options: [{
          label: i18nRuntime.i18n("1b7e6b2dbf3b7f4b1baf2c42e49a995d"),
          value: 'cmpt'
        }, {
          label: i18nRuntime.i18n("cc6aeb073ebc3cb29734a49164f8964c"),
          value: 'page'
        }, {
          label: '内存变量',
          value: 'app'
        }],
        value: '${args.fromApp ? "app" : args.fromPage ? "page" : "cmpt"}',
        onChange: function (value, oldVal, data, form) {
          form.setValueByName('__valueInput', undefined);
          form.setValueByName('args.value', undefined);
          form.deleteValueByName('args.path');
          if (value === 'page') {
            form.deleteValueByName('args.fromApp');
            form.setValueByName('args.fromPage', true);
          } else if (value === 'app') {
            form.deleteValueByName('args.fromPage');
            form.setValueByName('args.fromApp', true);
          }
        }
      },
      // 组件变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "cmpt"',
        body: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptActionSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true, function (value, oldVal, data, form) {
          form.setValueByName('args.__containerType', 'all');
          form.setValueByName('args.__comboType', 'all');
        })), false), [getArgsWrapper({
          type: 'wrapper',
          className: 'p-none',
          body: [{
            type: 'radios',
            name: '__containerType',
            mode: 'horizontal',
            label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            pipeIn: amisEditorCore.defaultValue('all'),
            visibleOn: "".concat(IS_DATA_CONTAINER),
            options: [{
              label: i18nRuntime.i18n("77b1081c177fa3334cc93c99f0ecee75"),
              value: 'all'
            }, {
              label: i18nRuntime.i18n("f5c5e3d69daee06ea1606378ef466765"),
              value: 'appoint'
            }],
            onChange: function (value, oldVal, data, form) {
              form.setValueByName('value', []);
              form.setValueByName('__valueInput', undefined);
            }
          }, {
            type: 'radios',
            name: '__comboType',
            inputClassName: 'event-action-radio',
            mode: 'horizontal',
            label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            pipeIn: amisEditorCore.defaultValue('all'),
            visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'",
            options: [{
              label: i18nRuntime.i18n("c60ad696dee4e1eeff6f0f2c2e9b9fc0"),
              value: 'all'
            }, {
              label: i18nRuntime.i18n("139294edcce271bf483dda437c421c29"),
              value: 'appoint'
            }],
            onChange: function (value, oldVal, data, form) {
              form.setValueByName('index', undefined);
              form.setValueByName('value', []);
              form.setValueByName('__valueInput', undefined);
            }
          }, {
            type: 'input-number',
            required: true,
            name: 'index',
            mode: 'horizontal',
            label: i18nRuntime.i18n("a7b0b80a7bea1e5e973967c179866ef0"),
            size: 'lg',
            placeholder: i18nRuntime.i18n("e887792fbbd65d21e43e832a5cd63aac"),
            visibleOn: "(data.__rendererName === 'input-table' || data.__rendererName === 'combo')\n                      && data.__comboType === 'appoint'"
          }, {
            type: 'combo',
            name: 'value',
            label: '',
            multiple: true,
            removable: true,
            required: true,
            addable: true,
            strictMode: false,
            canAccessSuperData: true,
            size: 'lg',
            mode: 'horizontal',
            items: [{
              name: 'key',
              type: 'input-text',
              placeholder: i18nRuntime.i18n("a25657422b40023f2731619587940bc7"),
              source: '${__setValueDs}',
              labelField: 'label',
              valueField: 'value',
              required: true
            },
            /*
            {
              name: 'val',
              type: 'input-formula',
              placeholder: '字段值',
              variables: '${variables}',
              evalMode: false,
              variableMode: 'tabs',
              inputMode: 'input-group'
            }
            */
            {
              name: 'val',
              type: 'ae-formulaControl',
              variables: '${variables}',
              placeholder: i18nRuntime.i18n("a33903526e8fb3d1ac3066da70e7941e")
            }],
            visibleOn: "".concat(IS_DATA_CONTAINER, " && data.__containerType === 'appoint' || data.__comboType === 'appoint'")
          }, {
            type: 'combo',
            name: 'value',
            label: '',
            multiple: true,
            removable: true,
            required: true,
            addable: true,
            strictMode: false,
            canAccessSuperData: true,
            mode: 'horizontal',
            size: 'lg',
            items: [{
              type: 'combo',
              name: 'item',
              label: false,
              renderLabel: false,
              multiple: true,
              removable: true,
              required: true,
              addable: true,
              strictMode: false,
              canAccessSuperData: true,
              className: 'm-l',
              size: 'lg',
              mode: 'horizontal',
              items: [{
                name: 'key',
                type: 'input-text',
                source: '${__setValueDs}',
                labelField: 'label',
                valueField: 'value',
                required: true,
                visibleOn: "data.__rendererName"
              },
              /*
              {
                name: 'val',
                type: 'input-formula',
                variables: '${variables}',
                evalMode: false,
                variableMode: 'tabs',
                inputMode: 'input-group'
              }
              */
              {
                name: 'val',
                type: 'ae-formulaControl',
                variables: '${variables}'
              }]
            }],
            visibleOn: "(data.__rendererName === 'combo' || data.__rendererName === 'input-table')\n                      && data.__comboType === 'all'"
          },
          /*
          {
            name: '__valueInput',
            type: 'input-formula',
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group',
            label: '',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: `(${IS_DATA_CONTAINER} || ${SHOW_SELECT_PROP}) && data.__containerType === 'all'`,
            required: true
          },
          */
          {
            name: '__valueInput',
            label: '',
            type: 'ae-formulaControl',
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: "(".concat(IS_DATA_CONTAINER, " || ").concat(SHOW_SELECT_PROP, ") && data.__containerType === 'all'"),
            required: true
          },,
          /*
          {
            name: '__valueInput',
            type: 'input-formula',
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group',
            label: '数据设置',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: `data.__rendererName && !${IS_DATA_CONTAINER} && data.__rendererName !== 'combo'`,
            required: true
          }
          */
          {
            name: '__valueInput',
            label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            type: 'ae-formulaControl',
            variables: '${variables}',
            size: 'lg',
            mode: 'horizontal',
            visibleOn: "data.__rendererName && !".concat(IS_DATA_CONTAINER, " && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'"),
            required: true
          }]
        })], false)
      },
      // 页面变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "page"',
        body: [getArgsWrapper([{
          type: 'wrapper',
          className: 'p-none',
          body: [{
            type: 'tree-select',
            name: 'path',
            label: i18nRuntime.i18n("cc6aeb073ebc3cb29734a49164f8964c"),
            multiple: false,
            mode: 'horizontal',
            required: true,
            placeholder: i18nRuntime.i18n("844a7a7aacc5be82d0fd6225edc6bf63"),
            showIcon: false,
            size: 'lg',
            hideRoot: false,
            rootLabel: i18nRuntime.i18n("cc6aeb073ebc3cb29734a49164f8964c"),
            options: pageVariableOptions
          }, {
            type: 'input-formula',
            name: 'value',
            label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group',
            size: 'lg',
            mode: 'horizontal',
            required: true,
            placeholder: i18nRuntime.i18n("85451d2eb59327a23e8f745161066d4a")
          }]
        }])]
      },
      // 内存变量
      {
        type: 'container',
        visibleOn: '__actionSubType === "app"',
        body: [getArgsWrapper([{
          type: 'wrapper',
          className: 'p-none',
          body: [{
            type: 'tree-select',
            name: 'path',
            label: '内存变量',
            multiple: false,
            mode: 'horizontal',
            required: true,
            placeholder: i18nRuntime.i18n("844a7a7aacc5be82d0fd6225edc6bf63"),
            showIcon: false,
            size: 'lg',
            hideRoot: false,
            rootLabel: '内存变量',
            options: variableOptions
          }, {
            type: 'input-formula',
            name: 'value',
            label: i18nRuntime.i18n("e7af71fb102cc86ab3be6a2fb32b5e3f"),
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group',
            size: 'lg',
            mode: 'horizontal',
            required: true,
            placeholder: i18nRuntime.i18n("85451d2eb59327a23e8f745161066d4a")
          }]
        }])]
      }]
    }, {
      actionLabel: i18nRuntime.i18n("4e34003861eee3de1e0c9c1222249bbb"),
      actionType: 'submit',
      description: i18nRuntime.i18n("a360c5d4e723ad78a5e52eb1f5f3f2a2"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u63D0\u4EA4", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7684\u6570\u636E");
      },
      supportComponents: 'form',
      schema: renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)
    }, {
      actionLabel: i18nRuntime.i18n("4a3deab45c0a7218b8ae58a33fd24c28"),
      actionType: 'clear',
      description: i18nRuntime.i18n("82986a4cab1d0efdbc23b3ac5f0fd509"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u6E05\u7A7A", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7684\u6570\u636E");
      },
      supportComponents: 'form',
      schema: renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)
    }, {
      actionLabel: i18nRuntime.i18n("1b6f5cc49e71c90a5b85a796285e3135"),
      actionType: 'reset',
      description: i18nRuntime.i18n("f457845da8c119a8688e333a3554284f"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u91CD\u7F6E", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7684\u6570\u636E");
      },
      supportComponents: 'form',
      schema: renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)
    }, {
      actionLabel: i18nRuntime.i18n("17f2bf425eeb7d20d79c595344e9dc94"),
      actionType: 'validate',
      description: i18nRuntime.i18n("a84a1311bea7370f1749341ffa6f75e1"),
      descDetail: function (info) {
        return React__default["default"].createElement("div", null, "\u6821\u9A8C", React__default["default"].createElement("span", {
          className: "variable-left variable-right"
        }, (info === null || info === void 0 ? void 0 : info.rendererLabel) || '-'), "\u7684\u6570\u636E");
      },
      supportComponents: 'form',
      schema: renderCmptSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"), true)
    }, {
      actionLabel: i18nRuntime.i18n("51325230409d4b7c64aaeb3db9904801"),
      actionType: 'component',
      description: i18nRuntime.i18n("98d130cb9a360df782f6510abacbc022"),
      supportComponents: '*',
      schema: renderCmptActionSelect(i18nRuntime.i18n("6afde638796d237377b0755506d08ded"))
    }]
  }, {
    actionLabel: i18nRuntime.i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
    actionType: 'others',
    children: [{
      actionLabel: i18nRuntime.i18n("6a086902a84969a835423002718e86b4"),
      actionType: 'copy',
      description: i18nRuntime.i18n("557d01c07aa7c4450a414932e6c1ed2a"),
      innerArgs: ['content', 'copyFormat'],
      descDetail: function (info) {
        var _a;
        return React__default["default"].createElement("div", null, "\u590D\u5236\u5185\u5BB9\uFF1A", React__default["default"].createElement("span", {
          className: "variable-left"
        }, ((_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.content) || '-'));
      },
      schema: getArgsWrapper({
        type: 'wrapper',
        className: 'p-none',
        body: [
        /*
         {
          name: 'content',
          type: 'input-formula',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          inputMode: 'input-group',
          label: '内容模板',
          mode: 'horizontal',
          size: 'lg',
          visibleOn: 'data.actionType === "copy"',
          required: true
        },
        */
        {
          name: 'content',
          label: i18nRuntime.i18n("ac04259507be8ba6b891dc9dc208f491"),
          type: 'ae-textareaFormulaControl',
          variables: '${variables}',
          mode: 'horizontal',
          size: 'lg',
          visibleOn: 'data.actionType === "copy"',
          required: true
        }, {
          type: 'select',
          name: 'copyFormat',
          mode: 'horizontal',
          value: 'text/plain',
          size: 'lg',
          options: [{
            label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371"),
            value: 'text/plain'
          }, {
            label: i18nRuntime.i18n("e2591e971f4c28db7c80a5f546084a1d"),
            value: 'text/html'
          }],
          label: i18nRuntime.i18n("c28f4d63beabc4833b17aaa10ca550db")
        }]
      })
    }, {
      actionLabel: i18nRuntime.i18n("c7f16d729f3bca8f6936416884a74fb8"),
      actionType: 'custom',
      description: i18nRuntime.i18n("1b5a6299ef404c1f7b4292c290b80f55"),
      schema: {
        type: 'js-editor',
        allowFullscreen: true,
        required: true,
        name: 'script',
        label: i18nRuntime.i18n("c7f16d729f3bca8f6936416884a74fb8"),
        mode: 'horizontal',
        options: {
          automaticLayout: true,
          lineNumbers: 'off',
          glyphMargin: false,
          tabSize: 2,
          fontSize: '12px',
          wordWrap: 'on',
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          selectOnLineNumbers: true,
          scrollBeyondLastLine: false,
          folding: true
        },
        className: 'ae-event-control-action-js-editor',
        value: "/* \u81EA\u5B9A\u4E49JS\u4F7F\u7528\u8BF4\u660E\uFF1A\n  * 1.\u52A8\u4F5C\u6267\u884C\u51FD\u6570doAction\uFF0C\u53EF\u4EE5\u6267\u884C\u6240\u6709\u7C7B\u578B\u7684\u52A8\u4F5C\n  * 2.\u901A\u8FC7\u4E0A\u4E0B\u6587\u5BF9\u8C61context\u53EF\u4EE5\u83B7\u53D6\u5F53\u524D\u7EC4\u4EF6\u5B9E\u4F8B\uFF0C\u4F8B\u5982context.props\u53EF\u4EE5\u83B7\u53D6\u8BE5\u7EC4\u4EF6\u76F8\u5173\u5C5E\u6027\n  * 3.\u4E8B\u4EF6\u5BF9\u8C61event\uFF0C\u5728doAction\u4E4B\u540E\u6267\u884Cevent.stopPropagation = true;\u53EF\u4EE5\u963B\u6B62\u540E\u7EED\u52A8\u4F5C\u6267\u884C\n*/\nconst myMsg = '\u6211\u662F\u81EA\u5B9A\u4E49JS';\ndoAction({\n  actionType: 'toast',\n  args: {\n    msg: myMsg\n  }\n});\n"
      }
    }
    // {
    //   actionLabel: '广播',
    //   actionType: 'broadcast',
    //   description: '发送广播事件',
    //   schema: {
    //     type: 'wrapper',
    //     className: 'p-none',
    //     body: [
    //       {
    //         type: 'input-text',
    //         name: 'eventName',
    //         label: '广播标识',
    //         mode: 'horizontal',
    //         required: true,
    //         description: '广播事件标识派发出去后，其他组件可以进行监听并作出响应'
    //       },
    //       {
    //         type: 'input-text',
    //         label: '广播名称',
    //         name: 'eventLabel',
    //         mode: 'horizontal',
    //         required: true
    //       },
    //       {
    //         type: 'textarea',
    //         label: '描述',
    //         name: 'description',
    //         mode: 'horizontal',
    //         required: true
    //       }
    //     ]
    //   }
    // }
    ]
  }];
};
// 渲染组件选择配置项
var renderCmptSelect = function (componentLabel, required, onChange) {
  return [{
    type: 'tree-select',
    name: 'componentId',
    label: componentLabel || i18nRuntime.i18n("d80bc0fcbfb250480320b683e48b1467"),
    showIcon: false,
    searchable: true,
    required: required,
    selfDisabledAffectChildren: false,
    size: 'lg',
    source: '${__cmptTreeSource}',
    mode: 'horizontal',
    autoFill: {
      __rendererLabel: '${label}',
      __rendererName: '${type}',
      __nodeId: '${id}',
      __nodeSchema: '${schema}'
    },
    onChange: function (value, oldVal, data, form) {
      return tslib.__awaiter(void 0, void 0, void 0, function () {
        return tslib.__generator(this, function (_a) {
          onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
          return [2 /*return*/];
        });
      });
    }
  }];
};
// 渲染组件特性动作配置项
var renderCmptActionSelect = function (componentLabel, required, onChange) {
  return tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(renderCmptSelect(componentLabel || i18nRuntime.i18n("d80bc0fcbfb250480320b683e48b1467"), true, function (value, oldVal, data, form) {
    return tslib.__awaiter(void 0, void 0, void 0, function () {
      var rendererType, dataSchema, dataSchemaIns, variables;
      var _a, _b;
      return tslib.__generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            rendererType = form.data.__rendererName;
            if (!form.data.__nodeId) return [3 /*break*/, 2];
            return [4 /*yield*/, (_b = (_a = form.data).getContextSchemas) === null || _b === void 0 ? void 0 : _b.call(_a, form.data.__nodeId, true)];
          case 1:
            dataSchema = _c.sent();
            dataSchemaIns = new amisCore.DataSchema(dataSchema || []);
            variables = (dataSchemaIns === null || dataSchemaIns === void 0 ? void 0 : dataSchemaIns.getDataPropsAsOptions()) || [];
            form.setValueByName('__cmptDataSchema', dataSchema);
            form.setValueByName('__cmptVariables', variables); // 组件上下文（不含父级）
            form.setValueByName('__cmptVariablesWithSys', tslib.__spreadArray([
            // 组件上下文+页面+系统
            {
              label: "".concat(form.data.__rendererLabel, "\u53D8\u91CF"),
              children: variables
            }], tslib.__read(form.data.rawVariables.filter(function (item) {
              return [i18nRuntime.i18n("cc6aeb073ebc3cb29734a49164f8964c"), i18nRuntime.i18n("979a50681e278dcc0be18f68459e8217")].includes(item.label);
            })), false));
            if (form.data.actionType === 'setValue') {
              // todo:这里会闪一下，需要从amis查下问题
              form.setValueByName('args.value', []);
              form.setValueByName('args.__comboType', undefined);
              form.setValueByName('args.__valueInput', undefined);
              form.setValueByName('args.__containerType', undefined);
              if (SELECT_PROPS_CONTAINER.includes(rendererType)) {
                form.setValueByName('__setValueDs', variables.filter(function (item) {
                  return item.value !== '$$id';
                }));
              } else {
                form.setValueByName('__setValueDs', []);
              }
            }
            _c.label = 2;
          case 2:
            form.setValueByName('groupType', '');
            onChange === null || onChange === void 0 ? void 0 : onChange(value, oldVal, data, form);
            return [2 /*return*/];
        }
      });
    });
  })), false), [{
    asFormItem: true,
    label: i18nRuntime.i18n("8deee3cdecdf06a05d22fcacc7031492"),
    name: 'groupType',
    mode: 'horizontal',
    required: true,
    visibleOn: 'data.actionType === "component"',
    component: compActionSelect["default"],
    description: '${__cmptActionDesc}'
  }], false);
};
// 动作配置项schema map
var COMMON_ACTION_SCHEMA_MAP = {
  setValue: {
    innerArgs: ['value'],
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u8BBE\u7F6E", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7684\u6570\u636E");
    },
    schema: getArgsWrapper({
      type: 'wrapper',
      className: 'p-none',
      body: [{
        type: 'combo',
        name: 'value',
        label: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        multiple: true,
        removable: true,
        required: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        mode: 'horizontal',
        items: [{
          name: 'key',
          type: 'input-text',
          placeholder: i18nRuntime.i18n("a25657422b40023f2731619587940bc7"),
          source: '${__setValueDs}',
          labelField: 'label',
          valueField: 'value',
          required: true
        },
        /*
        {
          name: 'val',
          type: 'input-formula',
          placeholder: '变量值',
          variables: '${variables}',
          evalMode: false,
          variableMode: 'tabs',
          inputMode: 'input-group'
        }
        */
        {
          name: 'val',
          type: 'ae-formulaControl',
          variables: '${variables}',
          placeholder: i18nRuntime.i18n("9a2ee7044ff04234a8892a13583d14b6")
        }],
        visibleOn: "".concat(IS_DATA_CONTAINER)
      }, {
        type: 'combo',
        name: 'value',
        label: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        multiple: true,
        removable: true,
        required: true,
        addable: true,
        strictMode: false,
        canAccessSuperData: true,
        mode: 'horizontal',
        items: [{
          type: 'combo',
          name: 'item',
          label: false,
          renderLabel: false,
          multiple: true,
          removable: true,
          required: true,
          addable: true,
          strictMode: false,
          canAccessSuperData: true,
          className: 'm-l',
          mode: 'horizontal',
          items: [{
            name: 'key',
            type: 'input-text',
            required: true
          },
          /*
          {
            name: 'val',
            type: 'input-formula',
            variables: '${variables}',
            evalMode: false,
            variableMode: 'tabs',
            inputMode: 'input-group'
          }
          */
          {
            name: 'val',
            type: 'ae-formulaControl',
            variables: '${variables}'
          }]
        }],
        visibleOn: "data.__rendererName === 'combo' || data.__rendererName === 'input-table'"
      },
      /*
      {
        name: '__valueInput',
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        variableMode: 'tabs',
        inputMode: 'input-group',
        label: '变量赋值',
        size: 'lg',
        mode: 'horizontal',
        visibleOn: `!${IS_DATA_CONTAINER} && data.__rendererName !== 'combo'`,
        required: true
      }
      */
      {
        name: '__valueInput',
        label: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal',
        visibleOn: "!".concat(IS_DATA_CONTAINER, " && data.__rendererName !== 'combo' && data.__rendererName !== 'input-table'"),
        required: true
      }]
    })
  },
  reload: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u5237\u65B0", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7EC4\u4EF6");
    }
  },
  clear: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u6E05\u7A7A", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7684\u6570\u636E");
    }
  },
  reset: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u91CD\u7F6E", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7684\u6570\u636E");
    }
  },
  submit: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u63D0\u4EA4", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18nRuntime.i18n("fe9e25f4e4b3aeefeb9b7a9c368ede7e") : i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"));
    }
  },
  validate: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u6821\u9A8C", React__default["default"].createElement("span", {
        className: "variable-left variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u7684\u6570\u636E");
    }
  },
  prev: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? i18nRuntime.i18n("186c8d63db1c09c38bcfd048fb15846e") : null, (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18nRuntime.i18n("d9b6b8e29d63ac6bb7a0381e994ebcb5") : null);
    }
  },
  next: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), (info === null || info === void 0 ? void 0 : info.__rendererName) === 'carousel' ? i18nRuntime.i18n("47b9cbf9f3a3f08264b19f4a1228e865") : null, (info === null || info === void 0 ? void 0 : info.__rendererName) === 'wizard' ? i18nRuntime.i18n("832efcc5c30746b84b910cde8630d491") : null);
    }
  },
  collapse: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u6536\u8D77");
    }
  },
  selectAll: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u9009\u4E2D\u6240\u6709\u9009\u9879");
    }
  },
  focus: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, React__default["default"].createElement("span", {
        className: "variable-right"
      }, info === null || info === void 0 ? void 0 : info.rendererLabel), "\u83B7\u53D6\u7126\u70B9");
    }
  },
  refresh: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u5237\u65B0\u9875\u9762");
    }
  },
  alert: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u6253\u5F00\u63D0\u793A\u5BF9\u8BDD\u6846");
    }
  },
  confirm: {
    descDetail: function (info) {
      return React__default["default"].createElement("div", null, "\u6253\u5F00\u786E\u8BA4\u5BF9\u8BDD\u6846");
    }
  }
};
// 获取动作树中指定的动作
var findActionNode = function (actions, actionType) {
  return amisCore.findTree(actions, function (node) {
    return node.actionType === actionType;
  });
};
// 获取包含指定子动作的动作
var findSubActionNode = function (actions, actionType) {
  return amisCore.findTree(actions, function (node) {
    var _a;
    return (_a = node.actions) === null || _a === void 0 ? void 0 : _a.find(function (item) {
      return item.actionType === actionType;
    });
  });
};
// 获取真实的动作类型
var getActionType = function (action, hasSubActionNode) {
  return action.groupType === 'component' ? 'component' : hasSubActionNode ? hasSubActionNode.actionType : action.actionType;
};
// 获取事件Label文案
var getEventLabel = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.eventLabel;
};
// 获取事件描述文案
var getEventDesc = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.description;
};
var getEventStrongDesc = function (events, name) {
  var _a;
  return (_a = events.find(function (item) {
    return item.eventName === name;
  })) === null || _a === void 0 ? void 0 : _a.strongDesc;
};
// 判断插件动作中是否存在指定动作
var hasActionType = function (actionType, actions) {
  if (!Array.isArray(actions)) {
    return false;
  }
  return !!(actions === null || actions === void 0 ? void 0 : actions.find(function (item) {
    return [item.actionType, 'component'].includes(actionType);
  }));
};
// 获取动作配置，主要是为了获取config和desc，schema强制捆绑在动作树节点（动作配置可能在插件动作中 > 树节点 or 子动作）
var getPropOfAcion = function (action, propName, actionTree, pluginActions, commonActions, allComponents) {
  var _a, _b, _c, _d, _e, _f, _g;
  var prop = null;
  if (action.componentId) {
    // 优先从组件特性动作中找
    var node = amisCore.findTree(allComponents !== null && allComponents !== void 0 ? allComponents : [], function (item) {
      return item.value === action.componentId;
    });
    prop = node && ((_b = (_a = pluginActions[node.type]) === null || _a === void 0 ? void 0 : _a.find(function (item) {
      return item.actionType === action.actionType;
    })) === null || _b === void 0 ? void 0 : _b[propName]);
  }
  if (!prop) {
    prop = (_c = findActionNode(actionTree, action.actionType)) === null || _c === void 0 ? void 0 : _c[propName];
  }
  if (!prop) {
    var commonActionConfig = tslib.__assign(tslib.__assign({}, COMMON_ACTION_SCHEMA_MAP), commonActions);
    var hasSubActionNode = findSubActionNode(actionTree, action.actionType);
    if (propName === 'actionLabel') {
      prop = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actionLabel;
    } else {
      prop = (_f = (_e = (_d = hasSubActionNode === null || hasSubActionNode === void 0 ? void 0 : hasSubActionNode.actions) === null || _d === void 0 ? void 0 : _d.find(function (item) {
        return item.actionType === action.actionType;
      })) === null || _e === void 0 ? void 0 : _e[propName]) !== null && _f !== void 0 ? _f : (_g = commonActionConfig[action.actionType]) === null || _g === void 0 ? void 0 : _g[propName];
    }
  }
  return prop;
};
var getOldActionSchema = function (manager, context) {
  var isInDialog = /(?:\/|^)dialog\/.+$/.test(context.path);
  return {
    type: 'tooltip-wrapper',
    content: i18nRuntime.i18n("9654916723a8d1d82f5ab9d2911edf93"),
    inline: true,
    tooltipTheme: 'dark',
    body: [{
      type: 'button',
      label: i18nRuntime.i18n("88f7a3aef4888dd507482aedc02bb808"),
      className: 'block old-action-btn',
      actionType: 'dialog',
      dialog: {
        type: 'dialog',
        title: i18nRuntime.i18n("c500cfabdec9b2761fe9f1aa543933eb"),
        body: {
          type: 'form',
          body: [{
            label: i18nRuntime.i18n("88d1257b0cf667319085f3e0033b9607"),
            type: 'select',
            name: 'actionType',
            pipeIn: amisEditorCore.defaultValue(''),
            options: [{
              label: i18nRuntime.i18n("18c63459a2c069022c7790430f761214"),
              value: ''
            }, {
              label: i18nRuntime.i18n("ab3aec075a09d055b2a28c8b61925ee0"),
              value: 'dialog'
            }, {
              label: i18nRuntime.i18n("f10f0be4aa9684eef9d78234072fe08b"),
              value: 'drawer'
            }, {
              label: i18nRuntime.i18n("4f02d2efe05a20232ab9da63c090595c"),
              value: 'ajax'
            }, {
              label: i18nRuntime.i18n("5dfd5a78e2ba1bc8afb482a8745454ea"),
              value: 'download'
            }, {
              label: i18nRuntime.i18n("4e58f9c94d345e14e2d69cc8496b7b5a"),
              value: 'link'
            }, {
              label: i18nRuntime.i18n("982db3084a2c470d1a9b34efa024511c"),
              value: 'url'
            }, {
              label: i18nRuntime.i18n("f20d9579ebdc9dfc30a212ae6cae931f"),
              value: 'reload'
            }, {
              label: i18nRuntime.i18n("6a086902a84969a835423002718e86b4"),
              value: 'copy'
            }, {
              label: i18nRuntime.i18n("939d5345ad4345dbaabe14798f6ac0f1"),
              value: 'submit'
            }, {
              label: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
              value: 'reset'
            }, {
              label: i18nRuntime.i18n("fa476b76ccbd4ac9316f0fd80257b77a"),
              value: 'reset-and-submit'
            }, {
              label: i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
              value: 'confirm'
            }, {
              label: i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c"),
              value: 'cancel'
            }, {
              label: i18nRuntime.i18n("0fc26855080a4219bbfad638029a795c"),
              value: 'next'
            }, {
              label: i18nRuntime.i18n("8ba8a1bead7ca55554cff1c85246ae09"),
              value: 'prev'
            }]
          }, {
            type: 'input-text',
            name: 'content',
            visibleOn: 'data.actionType == "copy"',
            label: i18nRuntime.i18n("deb65aca8dba2ff9d0cfaed0a3441068")
          }, {
            type: 'select',
            name: 'copyFormat',
            options: [{
              label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371"),
              value: 'text/plain'
            }, {
              label: i18nRuntime.i18n("e2591e971f4c28db7c80a5f546084a1d"),
              value: 'text/html'
            }],
            visibleOn: 'data.actionType == "copy"',
            label: i18nRuntime.i18n("c28f4d63beabc4833b17aaa10ca550db")
          }, {
            type: 'input-text',
            name: 'target',
            visibleOn: 'data.actionType == "reload"',
            label: i18nRuntime.i18n("21fa07f18f80bee50695686831ae1286"),
            required: true
          }, {
            name: 'dialog',
            pipeIn: amisEditorCore.defaultValue({
              title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
              body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652"),
              showCloseButton: true,
              showErrorMsg: true,
              showLoading: true
            }),
            asFormItem: true,
            children: function (_a) {
              var value = _a.value,
                onChange = _a.onChange,
                data = _a.data;
              return data.actionType === 'dialog' ? React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: "danger",
                className: "m-b",
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18nRuntime.i18n("c3c8422fcecd8c1cc922cba15ab5cbc0"),
                    value: tslib.__assign({
                      type: 'dialog'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                },
                block: true
              }, "\u914D\u7F6E\u5F39\u6846\u5185\u5BB9") : null;
            }
          }, {
            visibleOn: 'data.actionType == "drawer"',
            name: 'drawer',
            pipeIn: amisEditorCore.defaultValue({
              title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
              body: i18nRuntime.i18n("1a9aaf05889002e65708c4950012a652")
            }),
            asFormItem: true,
            children: function (_a) {
              var value = _a.value,
                onChange = _a.onChange,
                data = _a.data;
              return data.actionType == 'drawer' ? React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: "danger",
                className: "m-b",
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18nRuntime.i18n("262c7c7b9874ae5607fb51da468d0e8c"),
                    value: tslib.__assign({
                      type: 'drawer'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                },
                block: true
              }, "\u914D\u7F6E\u62BD\u51FA\u5F0F\u5F39\u6846\u5185\u5BB9") : null;
            }
          }, amisEditorCore.getSchemaTpl('api', {
            label: i18nRuntime.i18n("5eb694a4252528628929ced97ca95823"),
            visibleOn: 'data.actionType == "ajax"'
          }), {
            name: 'feedback',
            pipeIn: amisEditorCore.defaultValue({
              title: i18nRuntime.i18n("8a089992349df754f182a5d02de8e8e0"),
              body: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014")
            }),
            asFormItem: true,
            children: function (_a) {
              var onChange = _a.onChange,
                value = _a.value,
                data = _a.data;
              return data.actionType == 'ajax' ? React__default["default"].createElement("div", {
                className: "m-b"
              }, React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: value ? 'danger' : 'info',
                onClick: function () {
                  return manager.openSubEditor({
                    title: i18nRuntime.i18n("0cc0fff6eb667b140d3fd06e34a8c69f"),
                    value: tslib.__assign({
                      type: 'dialog'
                    }, value),
                    onChange: function (value) {
                      return onChange(value);
                    }
                  });
                }
              }, "\u914D\u7F6E\u53CD\u9988\u5F39\u6846\u5185\u5BB9"), value ? React__default["default"].createElement(amis.Button, {
                size: "sm",
                level: "link",
                className: "m-l",
                onClick: function () {
                  return onChange('');
                }
              }, "\u6E05\u7A7A\u8BBE\u7F6E") : null) : null;
            }
          }, {
            name: 'feedback.visibleOn',
            label: i18nRuntime.i18n("7984d95c01b725a2709fb8f5ee330fb4"),
            type: 'input-text',
            visibleOn: 'this.feedback',
            autoComplete: false,
            description: i18nRuntime.i18n("dfa07586a471e24b23fe68e11f5dc41a")
          }, {
            name: 'feedback.skipRestOnCancel',
            label: i18nRuntime.i18n("47186f00df86d3edad3b5595ba8c2a0a"),
            type: 'switch',
            mode: 'inline',
            className: 'block',
            visibleOn: 'this.feedback'
          }, {
            name: 'feedback.skipRestOnConfirm',
            label: i18nRuntime.i18n("4f21e04fe35d39c79e7779cdf2f4e232"),
            type: 'switch',
            mode: 'inline',
            className: 'block',
            visibleOn: 'this.feedback'
          }, {
            type: 'input-text',
            label: i18nRuntime.i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
            name: 'link',
            visibleOn: 'data.actionType == "link"'
          }, {
            type: 'input-text',
            label: i18nRuntime.i18n("6ab20dc4b64021b85886ad9c12b6e0cc"),
            name: 'url',
            visibleOn: 'data.actionType == "url"',
            placeholder: 'http://'
          }, {
            type: 'switch',
            name: 'blank',
            visibleOn: 'data.actionType == "url"',
            mode: 'inline',
            className: 'w-full',
            label: i18nRuntime.i18n("0bbc3ec26c36a87c9df3183def6ca9e0"),
            pipeIn: amisEditorCore.defaultValue(true)
          }, isInDialog ? {
            visibleOn: 'data.actionType == "submit" || data.type == "submit"',
            name: 'close',
            type: 'switch',
            mode: 'inline',
            className: 'w-full',
            pipeIn: amisEditorCore.defaultValue(true),
            label: i18nRuntime.i18n("d0c3025a64b26e5fbf22005f400c06d7")
          } : {}, {
            name: 'confirmText',
            type: 'textarea',
            label: i18nRuntime.i18n("0c15a924dc3bedefb79c958972bef2b9"),
            description: i18nRuntime.i18n("06b13b11740f7663af325bf5426930ba")
          }, {
            type: 'input-text',
            name: 'reload',
            label: i18nRuntime.i18n("fa9a0a79f29fef72e3060ea1af93c305"),
            visibleOn: 'data.actionType != "link" && data.actionType != "url"',
            description: i18nRuntime.i18n("437d629f00e62cf99b3ad288f84ade46")
          }, {
            type: 'input-text',
            name: 'target',
            visibleOn: 'data.actionType != "reload"',
            label: i18nRuntime.i18n("b01f08bf5b9f8e3ef9d49e31d89bf770"),
            description: i18nRuntime.i18n("f667748a8e9717498da714d4e5087af2")
          }, {
            type: 'js-editor',
            allowFullscreen: true,
            name: 'onClick',
            label: i18nRuntime.i18n("80ddab8a52f74d707765501b0caae21f"),
            description: i18nRuntime.i18n("babbd439bc04241ed3536f892668c250")
          }, {
            type: 'input-text',
            name: 'hotKey',
            label: i18nRuntime.i18n("867ade50f0bbb10bac65a5c3bc7895e9")
          }]
        },
        onConfirm: function (values) {
          manager.panelChangeValue(values[0]);
        }
      }
    }]
  };
};
/**
 * 对象转Combo组件对象数组
 * @param obj
 * @returns
 */
var objectToComboArray = function (obj) {
  return Object.entries(obj).map(function (_a) {
    var _b = tslib.__read(_a, 2),
      key = _b[0],
      val = _b[1];
    return {
      key: key,
      val: val
    };
  });
};
/**
 * Combo组件对象数组转对象
 * @param arr
 * @returns
 */
var comboArrayToObject = function (arr) {
  var obj = {};
  arr === null || arr === void 0 ? void 0 : arr.forEach(function (item) {
    obj[item.key] = item.val;
  });
  return obj;
};
/**
 * 获取事件动作面板所需属性配置
 */
var getEventControlConfig = function (manager, context) {
  var _a, _b, _c, _d, _e;
  var isSubEditor = manager.store.isSubEditor;
  // 通用动作配置
  var commonActions = (_b = (_a = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _a === void 0 ? void 0 : _a.customActionGetter) === null || _b === void 0 ? void 0 : _b.call(_a, manager);
  // 动作树
  var actionTree = ((_c = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _c === void 0 ? void 0 : _c.actionTreeGetter) ? (_d = manager === null || manager === void 0 ? void 0 : manager.config.actionOptions) === null || _d === void 0 ? void 0 : _d.actionTreeGetter(ACTION_TYPE_TREE(manager)) : ACTION_TYPE_TREE(manager);
  var allComponents = (_e = manager === null || manager === void 0 ? void 0 : manager.store) === null || _e === void 0 ? void 0 : _e.getComponentTreeSource();
  var checkComponent = function (node, action) {
    var _a;
    var actionType = action.actionType;
    var actions = manager === null || manager === void 0 ? void 0 : manager.pluginActions[node.type];
    var haveChild = !!((_a = node.children) === null || _a === void 0 ? void 0 : _a.length);
    var isSupport = false;
    if (typeof action.supportComponents === 'string') {
      isSupport = action.supportComponents === '*' || action.supportComponents === node.type;
      // 内置逻辑
      if (action.supportComponents === 'byComponent') {
        isSupport = hasActionType(actionType, actions);
      }
    } else if (Array.isArray(action.supportComponents)) {
      isSupport = action.supportComponents.includes(node.type);
    }
    if (actionType === 'component' && !(actions === null || actions === void 0 ? void 0 : actions.length)) {
      node.disabled = true;
    }
    if (isSupport) {
      return true;
    } else if (haveChild) {
      node.disabled = true;
      return true;
    }
    return false;
  };
  return {
    showOldEntry: !!context.schema.actionType || ['submit', 'reset'].includes(context.schema.type),
    actions: manager === null || manager === void 0 ? void 0 : manager.pluginActions,
    events: manager === null || manager === void 0 ? void 0 : manager.pluginEvents,
    actionTree: actionTree,
    commonActions: commonActions,
    owner: '',
    addBroadcast: manager === null || manager === void 0 ? void 0 : manager.addBroadcast,
    removeBroadcast: manager === null || manager === void 0 ? void 0 : manager.removeBroadcast,
    allComponents: allComponents,
    getContextSchemas: function (id, withoutSuper) {
      return tslib.__awaiter(void 0, void 0, void 0, function () {
        var dataSchema;
        return tslib.__generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, manager.getContextSchemas(id !== null && id !== void 0 ? id : context.id, withoutSuper)];
            case 1:
              dataSchema = _a.sent();
              // 存在指定id时，只需要当前层上下文
              if (id) {
                return [2 /*return*/, dataSchema];
              }
              return [2 /*return*/, manager.dataSchema];
          }
        });
      });
    },
    getComponents: function (action) {
      var _a;
      var components = (_a = manager === null || manager === void 0 ? void 0 : manager.store) === null || _a === void 0 ? void 0 : _a.getComponentTreeSource();
      var finalCmpts = [];
      if (isSubEditor) {
        var editorData = manager.store.getSuperEditorData;
        while (components) {
          if (editorData === null || editorData === void 0 ? void 0 : editorData.__curCmptTreeWrap) {
            components = [tslib.__assign(tslib.__assign({}, editorData.__curCmptTreeWrap), {
              children: components
            })];
          }
          finalCmpts = tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(finalCmpts), false), tslib.__read(components), false);
          components = editorData === null || editorData === void 0 ? void 0 : editorData.__superCmptTreeSource;
          editorData = editorData === null || editorData === void 0 ? void 0 : editorData.__super;
        }
      } else {
        finalCmpts = components;
      }
      var result = amisCore.filterTree(finalCmpts, function (node) {
        return checkComponent(node, action);
      }, 1, true);
      return result;
    },
    actionConfigInitFormatter: function (action, variables) {
      return tslib.__awaiter(void 0, void 0, void 0, function () {
        var config, innerArgs, tmpArgs_1, hasSubActionNode, datasource, schema, dataSchema, dataSchemaIns;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        return tslib.__generator(this, function (_w) {
          switch (_w.label) {
            case 0:
              config = tslib.__assign({}, action);
              if (['link', 'url'].includes(action.actionType) && ((_a = action.args) === null || _a === void 0 ? void 0 : _a.params)) {
                config.args = tslib.__assign(tslib.__assign({}, config.args), {
                  params: objectToComboArray((_b = action.args) === null || _b === void 0 ? void 0 : _b.params)
                });
              }
              if (['setValue'].includes(action.actionType) && ((_c = action.args) === null || _c === void 0 ? void 0 : _c.value)) {
                !config.args && (config.args = {});
                if (Array.isArray((_d = action.args) === null || _d === void 0 ? void 0 : _d.value)) {
                  config.args.value = (_e = action.args) === null || _e === void 0 ? void 0 : _e.value.reduce(function (arr, valueItem, index) {
                    if (!arr[index]) {
                      arr[index] = {};
                    }
                    arr[index].item = objectToComboArray(valueItem);
                    return arr;
                  }, []);
                  // 目前只有给combo赋值会是数组，所以认为是全量的赋值方式
                  config.args['__comboType'] = 'all';
                } else if (typeof ((_f = action.args) === null || _f === void 0 ? void 0 : _f.value) === 'object') {
                  config.args.value = objectToComboArray((_g = action.args) === null || _g === void 0 ? void 0 : _g.value);
                  config.args['__containerType'] = 'appoint';
                  // 如果有index，认为是给指定序号的combo赋值，所以认为是指定序号的赋值方式
                  if (action.args.index !== undefined) {
                    config.args['__comboType'] = 'appoint';
                  }
                } else if (action.actionType === 'setValue' && typeof ((_h = action.args) === null || _h === void 0 ? void 0 : _h.path) === 'string' && typeof ((_j = action.args) === null || _j === void 0 ? void 0 : _j.value) === 'string') {
                  /** 应用变量赋值 */
                  config.args['__containerType'] = 'all';
                } else if (action.actionType === 'setValue' && typeof ((_k = action.args) === null || _k === void 0 ? void 0 : _k.value) === 'string') {
                  config.args['__containerType'] = 'all';
                  config.args['__valueInput'] = config.args['value'];
                  (_l = config.args) === null || _l === void 0 ? true : delete _l.value;
                }
              }
              if (['show', 'hidden', 'enabled', 'disabled'].includes(action.actionType)) {
                // 兼容老逻辑，初始化actionType
                config.__statusType = action.actionType;
                config.__actionType = 'static';
              }
              if (['usability', 'visibility'].includes(action.actionType)) {
                // 初始化条件参数
                config.__actionExpression = (_m = action.args) === null || _m === void 0 ? void 0 : _m.value;
              }
              if (action.actionType === 'ajax' && typeof ((_o = action === null || action === void 0 ? void 0 : action.args) === null || _o === void 0 ? void 0 : _o.api) === 'string') {
                action.args.api = amisCore.normalizeApi((_p = action === null || action === void 0 ? void 0 : action.args) === null || _p === void 0 ? void 0 : _p.api);
              }
              innerArgs = getPropOfAcion(action, 'innerArgs', actionTree, manager.pluginActions, commonActions);
              // 处理刷新组件动作的追加参数
              if (config.actionType === 'reload') {
                config.__resetPage = (_q = config.args) === null || _q === void 0 ? void 0 : _q.resetPage;
                config.__addParam = config.data === undefined || !!config.data;
                config.__customData = !!config.data;
                if (config.data && typeof config.data === 'object' || config.args && !Object.keys(config.args).length && config.data === undefined) {
                  config.__customData = true;
                  config.__containerType = 'appoint';
                  config.dataMergeMode = 'override';
                }
                if (config.__addParam && config.__customData && config.data) {
                  if (typeof config.data === 'string') {
                    config.__containerType = 'all';
                    config.__valueInput = config.data;
                  } else {
                    config.__containerType = 'appoint';
                    config.__reloadParams = objectToComboArray(config.data);
                  }
                } else if (config.args && !Object.keys(config.args).length && config.data === undefined) {
                  config.__reloadParams = objectToComboArray(config.args);
                }
              }
              delete config.data;
              // 处理下 combo - addItem 的初始化
              if (action.actionType === 'addItem' && typeof ((_r = action.args) === null || _r === void 0 ? void 0 : _r.item) === 'object') {
                config.args = tslib.__assign(tslib.__assign({}, config.args), {
                  item: objectToComboArray((_s = action.args) === null || _s === void 0 ? void 0 : _s.item)
                });
              }
              // 还原args为可视化配置结构(args + addOnArgs)
              if (config.args) {
                if (innerArgs) {
                  tmpArgs_1 = {};
                  config.addOnArgs = [];
                  Object.keys(config.args).forEach(function (key) {
                    var _a;
                    var _b, _c;
                    // 筛选出附加配置参数
                    if (!innerArgs.includes(key)) {
                      config.addOnArgs = tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(config.addOnArgs), false), [{
                        key: key,
                        val: (_b = config.args) === null || _b === void 0 ? void 0 : _b[key]
                      }], false);
                    } else {
                      tmpArgs_1 = tslib.__assign(tslib.__assign({}, tmpArgs_1), (_a = {}, _a[key] = (_c = config.args) === null || _c === void 0 ? void 0 : _c[key], _a));
                    }
                  });
                  config.args = tmpArgs_1;
                }
              }
              hasSubActionNode = findSubActionNode(actionTree, action.actionType);
              datasource = [];
              if (!((_t = action.args) === null || _t === void 0 ? void 0 : _t.componentId)) return [3 /*break*/, 2];
              schema = (_u = manager === null || manager === void 0 ? void 0 : manager.store) === null || _u === void 0 ? void 0 : _u.getSchema((_v = action.args) === null || _v === void 0 ? void 0 : _v.componentId, 'id');
              return [4 /*yield*/, manager.getContextSchemas(schema === null || schema === void 0 ? void 0 : schema.$$id, true)];
            case 1:
              dataSchema = _w.sent();
              dataSchemaIns = new amisCore.DataSchema(dataSchema || []);
              datasource = (dataSchemaIns === null || dataSchemaIns === void 0 ? void 0 : dataSchemaIns.getDataPropsAsOptions()) || [];
              _w.label = 2;
            case 2:
              return [2 /*return*/, tslib.__assign(tslib.__assign({}, config), {
                actionType: getActionType(action, hasSubActionNode),
                args: tslib.__assign(tslib.__assign({}, config.args), {
                  __dataContainerVariables: (datasource === null || datasource === void 0 ? void 0 : datasource.length) ? tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(variables.eventVariables), false), [{
                    label: i18nRuntime.i18n("c0a8088f2bbc993500c5a01b0f0a1887"),
                    children: datasource
                  }], false), tslib.__read(variables.rawVariables), false) : tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(variables.eventVariables), false), tslib.__read(variables.rawVariables), false)
                })
              })];
          }
        });
      });
    },
    actionConfigSubmitFormatter: function (config) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
      var action = tslib.__assign(tslib.__assign({}, config), {
        groupType: undefined
      });
      action.__title = (_a = findActionNode(actionTree, config.actionType)) === null || _a === void 0 ? void 0 : _a.actionLabel;
      // 修正动作名称
      if (config.actionType === 'component') {
        action.actionType = config.groupType;
        // 标记一下组件特性动作
        action.groupType = config.actionType;
      }
      var hasSubActionNode = findSubActionNode(actionTree, config.groupType);
      if (hasSubActionNode) {
        // 修正动作
        action.actionType = config.groupType;
      }
      // 合并附加的动作参数
      if (config.addOnArgs) {
        config.addOnArgs.forEach(function (args) {
          var _a;
          var _b;
          action.args = (_b = action.args) !== null && _b !== void 0 ? _b : {};
          action.args = tslib.__assign(tslib.__assign({}, action.args), (_a = {}, _a[args.key] = args.val, _a));
        });
        delete action.addOnArgs;
      }
      // 刷新组件时，处理是否追加事件变量
      if (config.actionType === 'reload') {
        action.data = null;
        action.dataMergeMode = undefined;
        action.args = action.__rendererName === 'crud' ? tslib.__assign(tslib.__assign({}, action.args), {
          resetPage: (_b = config.__resetPage) !== null && _b !== void 0 ? _b : true
        }) : undefined;
        if (config.__addParam) {
          action.dataMergeMode = config.dataMergeMode || 'merge';
          action.data = undefined;
          if (config.__customData) {
            action.data = config.__containerType === 'all' ? config.__valueInput : comboArrayToObject(config.__reloadParams || []);
          }
        }
      }
      // 转换下格式
      if (['link', 'url'].includes(action.actionType)) {
        var params = (_c = config.args) === null || _c === void 0 ? void 0 : _c.params;
        if (params && params.length) {
          action.args = tslib.__assign(tslib.__assign({}, action.args), {
            params: comboArrayToObject(params)
          });
        }
      }
      // 转换下格式
      if (action.actionType === 'setValue') {
        if ((_d = config.args) === null || _d === void 0 ? void 0 : _d.hasOwnProperty('path')) {
          /** 应用变量赋值 */
          action.args = {
            path: config.args.path,
            value: (_f = (_e = config.args) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : '',
            fromPage: (_g = action.args) === null || _g === void 0 ? void 0 : _g.fromPage,
            fromApp: (_h = action.args) === null || _h === void 0 ? void 0 : _h.fromApp
          };
          action.hasOwnProperty('componentId') && delete action.componentId;
          return action;
        } else {
          ((_j = action === null || action === void 0 ? void 0 : action.args) === null || _j === void 0 ? void 0 : _j.hasOwnProperty('path')) && delete action.args.path;
          if (((_k = config.args) === null || _k === void 0 ? void 0 : _k.__valueInput) !== undefined) {
            action.args = {
              value: (_l = config.args) === null || _l === void 0 ? void 0 : _l.__valueInput
            };
          } else if (Array.isArray((_m = config.args) === null || _m === void 0 ? void 0 : _m.value)) {
            action.args = (_o = action.args) !== null && _o !== void 0 ? _o : {};
            if ((action.__rendererName === 'combo' || action.__rendererName === 'input-table') && ((_p = action.args) === null || _p === void 0 ? void 0 : _p.index) === undefined) {
              // combo、input-table特殊处理
              var tempArr_1 = [];
              (_q = config.args) === null || _q === void 0 ? void 0 : _q.value.forEach(function (valueItem, index) {
                valueItem.item.forEach(function (item) {
                  if (!tempArr_1[index]) {
                    tempArr_1[index] = {};
                  }
                  tempArr_1[index][item.key] = item.val;
                });
              });
              action.args = tslib.__assign(tslib.__assign({}, action.args), {
                value: tempArr_1
              });
            } else {
              action.args = tslib.__assign(tslib.__assign({}, action.args), {
                value: comboArrayToObject((_r = config.args) === null || _r === void 0 ? void 0 : _r.value)
              });
            }
          }
        }
      }
      if (action.actionType === 'addItem' && action.__rendererName === 'combo') {
        action.args = tslib.__assign(tslib.__assign({}, action.args), {
          item: comboArrayToObject((_s = config.args) === null || _s === void 0 ? void 0 : _s.item)
        });
      }
      // 转换下格式
      if (['visibility', 'usability'].includes(config.actionType)) {
        action.args = action.actionType !== 'static' ? {
          value: action.__actionExpression
        } : undefined;
        action.actionType === 'static' && (action.actionType = config.__statusType);
        delete action.__actionExpression;
        delete action.__statusType;
      }
      delete action.config;
      return action;
    }
  };
};

exports.ACTION_TYPE_TREE = ACTION_TYPE_TREE;
exports.COMMON_ACTION_SCHEMA_MAP = COMMON_ACTION_SCHEMA_MAP;
exports.DATA_CONTAINER = DATA_CONTAINER;
exports.FORMITEM_CMPTS = FORMITEM_CMPTS;
exports.IS_DATA_CONTAINER = IS_DATA_CONTAINER;
exports.SELECT_PROPS_CONTAINER = SELECT_PROPS_CONTAINER;
exports.SHOW_SELECT_PROP = SHOW_SELECT_PROP;
exports.SUPPORT_DISABLED_CMPTS = SUPPORT_DISABLED_CMPTS;
exports.SUPPORT_STATIC_FORMITEM_CMPTS = SUPPORT_STATIC_FORMITEM_CMPTS;
exports.findActionNode = findActionNode;
exports.findSubActionNode = findSubActionNode;
exports.getActionType = getActionType;
exports.getArgsWrapper = getArgsWrapper;
exports.getEventControlConfig = getEventControlConfig;
exports.getEventDesc = getEventDesc;
exports.getEventLabel = getEventLabel;
exports.getEventStrongDesc = getEventStrongDesc;
exports.getOldActionSchema = getOldActionSchema;
exports.getPropOfAcion = getPropOfAcion;
exports.hasActionType = hasActionType;
exports.renderCmptActionSelect = renderCmptActionSelect;
exports.renderCmptSelect = renderCmptSelect;
