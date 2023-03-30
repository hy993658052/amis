/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var ChainedSelectControlPlugin = /** @class */function (_super) {
  __extends(ChainedSelectControlPlugin, _super);
  function ChainedSelectControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'chained-select';
    _this.$schema = '/schemas/ChainedSelectControlSchema.json';
    // 组件名称
    _this.name = i18n("b6872877e1eb5ddedd904c170db26024");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'chained-select-plugin';
    _this.description = i18n("fdf1664c0790d25f236bd596aef1acef");
    _this.docLink = '/amis/zh-CN/components/form/chain-select';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'chained-select',
      label: i18n("556988a9dc1816dd979e96eb5cd19a85"),
      name: 'chainedSelect',
      joinValues: true
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: __assign({}, _this.scaffold)
    };
    // 事件定义
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
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("c374a44713fa5ff5da2565beb398c7d3")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("8db57ba01ffb9bf29c1656de5f0208f5")
    }, {
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("556988a9dc1816dd979e96eb5cd19a85");
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema,
            mode: 'vertical',
            rendererWrapper: true,
            label: tipedLabel(i18n("225f3ed00750ae78ad1e6ea42c8f5087"), i18n("da3ca8191fb919fb34e8e78fc6f2fc78"))
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("bc8d09093edd98769d5cb39e759aa498"), i18n("2646ee1ebb6922a5c9359de6cd3b3639")),
            name: 'joinValues',
            pipeIn: defaultValue(true)
          }), getSchemaTpl('delimiter', {
            visibleOn: 'data.joinValues !== false',
            clearValueOnHidden: true
          }), getSchemaTpl('extractValue', {
            visibleOn: 'data.joinValues === false',
            clearValueOnHidden: true
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description'), getSchemaTpl('autoFillApi')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('apiControl', {
            name: 'source',
            mode: 'normal',
            label: tipedLabel(i18n("1395eba8d9efe27aa1ecd1a45e3e5dcd"), "<div>\u53EF\u7528\u53D8\u91CF\u8BF4\u660E</div><ul>\n                      <li><code>value</code>\u5F53\u524D\u503C</li>\n                      <li><code>level</code>\u62C9\u53D6\u7EA7\u522B\uFF0C\u4ECE <code>1</code>\u5F00\u59CB\u3002</li>\n                      <li><code>parentId</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u7684 <code>value</code> \u503C</li>\n                      <li><code>parent</code>\u4E0A\u4E00\u5C42\u9009\u4E2D\u9009\u9879\uFF0C\u5305\u542B <code>label</code> \u548C <code>value</code> \u7684\u503C\u3002</li>\n                  </ul>", {
              maxWidth: 'unset'
            })
          }), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), {
            type: 'input-text',
            name: 'labelField',
            label: tipedLabel(i18n("4ea50507bf8b9ceb908677f30fb20e68"), i18n("fe4c9c2eed1ad213040d84036c675454")),
            pipeIn: defaultValue('label')
          }, {
            type: 'input-text',
            name: 'valueField',
            label: tipedLabel(i18n("be43687d4ed1d9e663c729e12618166d"), i18n("f1e6b60c4b6df555a6b03f91033091f4")),
            pipeIn: defaultValue('value')
          }]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), getSchemaTpl('style:classNames', {
          schema: [getSchemaTpl('className', {
            name: 'descriptionClassName',
            label: i18n("3bdd08adab6ea90b9164b20a0e4151ac")
          })]
        })])]
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
  return ChainedSelectControlPlugin;
}(BasePlugin);
registerEditorPlugin(ChainedSelectControlPlugin);

export { ChainedSelectControlPlugin };
