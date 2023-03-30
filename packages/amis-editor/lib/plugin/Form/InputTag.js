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

var TagControlPlugin = /** @class */function (_super) {
  tslib.__extends(TagControlPlugin, _super);
  function TagControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-tag';
    _this.$schema = '/schemas/TagControlSchema.json';
    _this.order = -420;
    // 组件名称
    _this.name = i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-tag';
    _this.pluginIcon = 'input-tag-plugin';
    _this.description = i18nRuntime.i18n("74104c62ed33836f0bc74297539dd7c9");
    _this.docLink = '/amis/zh-CN/components/form/input-tag';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-tag',
      label: i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204"),
      name: 'tag',
      options: [i18nRuntime.i18n("52636511861a0e08cbe6a0eb1c27d816"), i18nRuntime.i18n("b2c712c788d3a143206eee22fe24d9f1"), i18nRuntime.i18n("9c9aabab3f7627ff4bb224b2738b26ea")]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: i18nRuntime.i18n("52636511861a0e08cbe6a0eb1c27d816")
      })
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18nRuntime.i18n("14d342362f66aa86e2aa1c1e11aa1204");
    // 事件定义
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("ee167d4c74e600248aefe9d0ba474705"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18nRuntime.i18n("528609917710d813a55e5a6cecf1e458")
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18nRuntime.i18n("ab0710b367acefa1d6a78e2338291e86"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18nRuntime.i18n("528609917710d813a55e5a6cecf1e458")
          },
          'event.data.selectedItems': {
            type: 'array',
            title: i18nRuntime.i18n("029e280e119b028bffc51424d909c07d")
          },
          'event.data.items': {
            type: 'array',
            title: i18nRuntime.i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'blur',
      eventLabel: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18nRuntime.i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18nRuntime.i18n("528609917710d813a55e5a6cecf1e458")
          },
          'event.data.items': {
            type: 'array',
            title: i18nRuntime.i18n("cf965b232227a0e9d14f4f7e31b01c62")
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
      description: i18nRuntime.i18n("770fe9e7899cd310b035ef50a39ab2ae")
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
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('clearable'), amisEditorCore.getSchemaTpl('optionsTip'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
            mode: 'vertical' // 改成上下展示模式
          }), amisEditorCore.getSchemaTpl('joinValues'), amisEditorCore.getSchemaTpl('delimiter'), amisEditorCore.getSchemaTpl('extractValue'), amisEditorCore.getSchemaTpl('autoFillApi', {
            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          }), amisEditorCore.getSchemaTpl('autoFill', {
            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
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
  TagControlPlugin.scene = ['layout'];
  return TagControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TagControlPlugin);

exports.TagControlPlugin = TagControlPlugin;
