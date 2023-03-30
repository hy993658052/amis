/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var BaseControl = require('../../component/BaseControl.js');
var i18nRuntime = require('i18n-runtime');

var ListControlPlugin = /** @class */function (_super) {
  tslib.__extends(ListControlPlugin, _super);
  function ListControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'list-select';
    _this.$schema = '/schemas/ListControlSchema.json';
    _this.order = -430;
    // 组件名称
    _this.name = i18nRuntime.i18n("d22dfe420e4b00e000b93f94db3c856e");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-ellipsis-h';
    _this.pluginIcon = 'list-select-plugin';
    _this.description = i18nRuntime.i18n("2c05e451a6f2b2fe1cf55f7afb8c8423");
    _this.docLink = '/amis/zh-CN/components/form/list-select';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'list-select',
      label: i18nRuntime.i18n("3712972d84adf48acbd6ad24b4d75ad0"),
      name: 'list',
      options: [{
        label: i18nRuntime.i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A'
      }, {
        label: i18nRuntime.i18n("f38c0a46797523b11051e35ec0f82a42"),
        value: 'B'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: 'A'
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("d22dfe420e4b00e000b93f94db3c856e");
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18nRuntime.i18n("528609917710d813a55e5a6cecf1e458")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18nRuntime.i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18nRuntime.i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      return BaseControl.formItemControl({
        common: {
          replace: true,
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('multiple'), amisEditorCore.getSchemaTpl('extractValue'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
            mode: 'vertical',
            useSelectMode: true,
            visibleOn: 'this.options && this.options.length > 0'
          })]
        },
        option: {
          body: [amisEditorCore.getSchemaTpl('optionControlV2', {
            description: i18nRuntime.i18n("6f6fa31a91b516b28ebee7a86a9b13e2")
          })]
        },
        status: {}
      }, context);
    };
    return _this;
  }
  return ListControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ListControlPlugin);

exports.ListControlPlugin = ListControlPlugin;
