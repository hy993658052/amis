/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import { getSchemaTpl, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator.js';
import { getEventControlConfig } from '../../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var SelectControlPlugin = /** @class */function (_super) {
  __extends(SelectControlPlugin, _super);
  function SelectControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'select';
    _this.$schema = '/schemas/SelectControlSchema.json';
    _this.order = -480;
    // 组件名称
    _this.name = i18n("006ded9fa277cf030592021f595a07d5");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'select-plugin';
    _this.description = i18n("f2fc416c7d95a93a8da621f760be8417");
    _this.docLink = '/amis/zh-CN/components/form/select';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'select',
      label: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
      name: 'select',
      options: [{
        label: i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A'
      }, {
        label: i18n("f38c0a46797523b11051e35ec0f82a42"),
        value: 'B'
      }]
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [__assign({}, _this.scaffold)]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("006ded9fa277cf030592021f595a07d5");
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
          },
          'event.data.selectedItems': {
            type: 'object',
            title: i18n("029e280e119b028bffc51424d909c07d")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'focus',
      eventLabel: i18n("ab0710b367acefa1d6a78e2338291e86"),
      description: i18n("4638e799b95e1b71edd55f278a6f707c"),
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
      eventName: 'blur',
      eventLabel: i18n("fc96a5f1b79cb734afe08e401b6ba5e7"),
      description: i18n("c776ab86eb24f6b3db35114e43026f75"),
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
      eventName: 'add',
      eventLabel: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
      description: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'object',
            title: i18n("75cc2a992ea150d3a6c68ac4bc486637")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'edit',
      eventLabel: i18n("cd994c38456676f5a55c5593b6a652bf"),
      description: i18n("cd994c38456676f5a55c5593b6a652bf"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'object',
            title: i18n("a13b85bddbcdab63ef2b2d98dd46afe9")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'delete',
      eventLabel: i18n("d015e18748f42f53bb6ab213e9b06187"),
      description: i18n("d015e18748f42f53bb6ab213e9b06187"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'object',
            title: i18n("8aa4d6aedd7957ebc6b87fec655695ef")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
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
          }), getSchemaTpl('label'), getSchemaTpl('clearable'), getSchemaTpl('searchable'), getSchemaTpl('multiple', {
            body: [getSchemaTpl('switch', {
              label: i18n("e19c0792886a147d74fc662d7af138bb"),
              name: 'valuesNoWrap'
            }), {
              type: 'input-number',
              name: 'maxTagCount',
              label: tipedLabel(i18n("b28aa9c36d0b506a71aa78b628e796c6"), i18n("2b23767de575e27fc9e4e0949e885f81"))
            }]
          }), getSchemaTpl('checkAll'), getSchemaTpl('valueFormula', {
            rendererSchema: context === null || context === void 0 ? void 0 : context.schema
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('optionControlV2'), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }),
          // 模板
          getSchemaTpl('optionsMenuTpl', {
            manager: _this.manager,
            onChange: function (value) {}
          }), getSchemaTpl('creatable', {
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [getSchemaTpl('createBtnLabel'), getSchemaTpl('addApi')
              // {
              //   label: '按钮位置',
              //   name: 'valueType',
              //   type: 'button-group-select',
              //   size: 'sm',
              //   tiled: true,
              //   value: 'asUpload',
              //   mode: 'row',
              //   options: [
              //     {
              //       label: '顶部',
              //       value: ''
              //     },
              //     {
              //       label: '底部',
              //       value: ''
              //     },
              //   ],
              // },
              ]
            }
          }), getSchemaTpl('editable', {
            type: 'ae-Switch-More',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [getSchemaTpl('editApi')]
            }
          }), getSchemaTpl('removable', {
            type: 'ae-Switch-More',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [getSchemaTpl('deleteApi')]
            }
          })]
        }, {
          title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [getSchemaTpl('switch', {
            label: tipedLabel(i18n("406af2b98e6210cd42d7f824cb6dfd16"), i18n("fa8d03e8b5458c1a1d742736bc26e25b")),
            name: 'showInvalidMatch'
          }), getSchemaTpl('virtualThreshold'), getSchemaTpl('virtualItemHeight')]
        }, getSchemaTpl('status', {
          isFormItem: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.MultiSelect
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), getSchemaTpl('style:classNames')])]
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
  SelectControlPlugin.scene = ['layout'];
  return SelectControlPlugin;
}(BasePlugin);
registerEditorPlugin(SelectControlPlugin);

export { SelectControlPlugin };
