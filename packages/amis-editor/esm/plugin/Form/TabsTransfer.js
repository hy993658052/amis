/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import React__default from 'react';
import { getSchemaTpl, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var TabsTransferPlugin = /** @class */function (_super) {
  __extends(TabsTransferPlugin, _super);
  function TabsTransferPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'tabs-transfer';
    _this.$schema = '/schemas/TransferControlSchema.json';
    // 组件名称
    _this.name = i18n("617a63f1b19b5aad029f973479bac917");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'tabs-transfer-plugin';
    _this.description = i18n("4f26f1edebcdeea90f6e4247a501dbaf");
    _this.docLink = '/amis/zh-CN/components/form/transfer';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      label: i18n("617a63f1b19b5aad029f973479bac917"),
      type: 'tabs-transfer',
      name: 'a',
      sortable: true,
      searchable: true,
      options: [{
        label: i18n("ab5dea29793d933fa7b5487a7309df6a"),
        selectMode: 'tree',
        children: [{
          label: i18n("71f8043aefd52572b172e7d1fbd5af57"),
          children: [{
            label: i18n("fda93c79275b812a6c1c189fbebf8b08"),
            value: 'zhugeliang'
          }]
        }, {
          label: i18n("573cb0d34bd1cdc7b368c59db9b7bb7d"),
          children: [{
            label: i18n("e37a86d1a1dbed0cd53c95582977f075"),
            value: 'caocao'
          }, {
            label: i18n("ccddd2de691ff2d56b651877f72d90ed"),
            value: 'zhongwuyan'
          }]
        }, {
          label: i18n("c0db8e7b42528eeae96310c6629e53b3"),
          children: [{
            label: i18n("293040fc607f40caf6d6e16042012182"),
            value: 'libai'
          }, {
            label: i18n("b5256ec780343c4e20e397b43cab96a9"),
            value: 'hanxin'
          }, {
            label: i18n("49dcf9f88e7b7b8ca7448631021d7d12"),
            value: 'yunzhongjun'
          }]
        }]
      }, {
        label: i18n("1fd02a90c38333badc226309fea6fecb"),
        selectMode: 'chained',
        children: [{
          label: i18n("71f8043aefd52572b172e7d1fbd5af57"),
          children: [{
            label: i18n("fda93c79275b812a6c1c189fbebf8b08"),
            value: 'zhugeliang2'
          }]
        }, {
          label: i18n("573cb0d34bd1cdc7b368c59db9b7bb7d"),
          children: [{
            label: i18n("e37a86d1a1dbed0cd53c95582977f075"),
            value: 'caocao2'
          }, {
            label: i18n("ccddd2de691ff2d56b651877f72d90ed"),
            value: 'zhongwuyan2'
          }]
        }, {
          label: i18n("c0db8e7b42528eeae96310c6629e53b3"),
          children: [{
            label: i18n("293040fc607f40caf6d6e16042012182"),
            value: 'libai2'
          }, {
            label: i18n("b5256ec780343c4e20e397b43cab96a9"),
            value: 'hanxin2'
          }, {
            label: i18n("49dcf9f88e7b7b8ca7448631021d7d12"),
            value: 'yunzhongjun2'
          }]
        }]
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18n("617a63f1b19b5aad029f973479bac917");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18n("2fc76872efce1eabd3b74a3e4fd5b976"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'string',
            title: i18n("528609917710d813a55e5a6cecf1e458")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'tab-change',
      eventLabel: i18n("e1112a529dc969a03bbbb409905ff2ec"),
      description: i18n("d202bc660c4d2eeb58e194b6320bd235"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.key': {
            type: 'string',
            title: i18n("9e7a97a3d043f566f2435329e01e09f9")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("91208131116f2823993daf99f15e1325")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("dda222620b789d07c2c5c279475caaf1")
    }, {
      actionType: 'changeTabKey',
      actionLabel: i18n("2ac24a383a1faae33f81772b757b2817"),
      description: i18n("91f894b900f593c848e5b21f2b414b05"),
      descDetail: function (info) {
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), "\u4FEE\u6539\u9009\u4E2Dtab");
      }
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelDefinitions = {
      options: {
        label: i18n("25ae4ca8d4b8a67b273066a97a516327"),
        name: 'options',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        mode: 'normal',
        addButtonText: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
        scaffold: {
          label: '',
          value: ''
        },
        items: [{
          type: 'group',
          body: [getSchemaTpl('label', {
            label: false,
            placeholder: i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
            required: true
          }), {
            type: 'input-text',
            name: 'value',
            placeholder: i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
            unique: true
          }]
        }, {
          $ref: 'options',
          label: i18n("72453d792655604f1fab821146133d7d"),
          name: 'children',
          addButtonText: i18n("210da23d108e85b2f0bbfa85846cb792")
        }]
      }
    };
    // notRenderFormZone = true;
    _this.panelBodyCreator = function (context) {
      context.info.renderer;
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('searchable'), getSchemaTpl('api', {
            label: i18n("791959f9b90734dce08da79f4ac27a41"),
            name: 'searchApi'
          }), {
            label: i18n("6eaeb8ccaa8473e2b985095be2bf3cd1"),
            name: 'searchResultMode',
            type: 'select',
            mode: 'normal',
            options: [{
              label: i18n("6541f1702af367c41a3127ed8511eb50"),
              value: 'list'
            }, {
              label: i18n("d58ba4b5e94680fcb08300e176502fb8"),
              value: 'table'
            }, {
              label: i18n("406573cea6af9b0c6462295108e1f5c0"),
              value: 'tree'
            }, {
              label: i18n("6c5358b981a475da2a83e95e4170647a"),
              value: 'chained'
            }]
          }, getSchemaTpl('sortable'), {
            label: i18n("0911a348aaf24601e633e318ccb8aace"),
            name: 'selectTitle',
            type: 'input-text',
            inputClassName: 'is-inline '
          }, {
            label: i18n("84a76ba52297727f6bb47d8a1cc74094"),
            name: 'resultTitle',
            type: 'input-text',
            inputClassName: 'is-inline '
          }]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [{
            $ref: 'options',
            name: 'options'
          }, getSchemaTpl('source'), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), getSchemaTpl('joinValues'), getSchemaTpl('delimiter'), getSchemaTpl('extractValue'), getSchemaTpl('autoFillApi', {
            visibleOn: '!this.autoFill || this.autoFill.scene && this.autoFill.action'
          }), getSchemaTpl('autoFill', {
            visibleOn: '!this.autoFill || !this.autoFill.scene && !this.autoFill.action'
          })]
        }, {
          title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [getSchemaTpl('virtualThreshold'), getSchemaTpl('virtualItemHeight')]
        }, getSchemaTpl('status', {
          isFormItem: true
        })])
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  return TabsTransferPlugin;
}(BasePlugin);
registerEditorPlugin(TabsTransferPlugin);

export { TabsTransferPlugin };
