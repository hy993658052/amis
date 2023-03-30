/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign } from 'tslib';
import React__default from 'react';
import { getSchemaTpl, getI18nEnabled, defaultValue, tipedLabel, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import cloneDeep from 'lodash/cloneDeep';
import { getArgsWrapper, getEventControlConfig } from '../../renderer/event-control/helper.js';
import { ValidatorTag } from '../../validator.js';
import { i18n } from 'i18n-runtime';

var TreeControlPlugin = /** @class */function (_super) {
  __extends(TreeControlPlugin, _super);
  function TreeControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-tree';
    _this.$schema = '/schemas/TreeControlSchema.json';
    // 组件名称
    _this.name = i18n("479728c411bac59bc44d5ab8dc3cb4f0");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-list-alt';
    _this.pluginIcon = 'input-tree-plugin';
    _this.description = i18n("912beb37a3785e50d6483852be41111f");
    _this.searchKeywords = i18n("0b52d7d00ed28e41f4845fec1622d056");
    _this.docLink = '/amis/zh-CN/components/form/input-tree';
    _this.tags = [i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-tree',
      label: i18n("479728c411bac59bc44d5ab8dc3cb4f0"),
      name: 'tree',
      options: [{
        label: i18n("05f87b331e1c97691776d93a6598373f"),
        value: 'A',
        children: [{
          label: i18n("57a6105deead3fec79028cce7bfa2004"),
          value: 'C'
        }, {
          label: i18n("9bc04a190ce0a5ba1ed473cb628b5ed4"),
          value: 'D'
        }]
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
      body: [__assign(__assign({}, _this.scaffold), {
        label: i18n("ea687c59ff7d980afc55427853af864a"),
        mode: 'normal'
      })]
    };
    _this.notRenderFormZone = true;
    _this.panelTitle = i18n("f77f634e6892c6447c5d9df623e42aff");
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
            title: i18n("b35014ec330e91860bb188200fba12db")
          }
        }
      }]
    }, {
      eventName: 'add',
      eventLabel: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
      description: i18n("0761b99481b1bd10c1d6aad6028a8281"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'object',
            title: i18n("de2392357fc78e9e0f0946bcc0af87b6")
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
            title: i18n("e385c7c6f726dc2641866d9050777efb")
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
            title: i18n("58cbd355c5bdb80653a8ae3d3b316c37")
          },
          'event.data.items': {
            type: 'array',
            title: i18n("cf965b232227a0e9d14f4f7e31b01c62")
          }
        }
      }]
    }, {
      eventName: 'loadFinished',
      eventLabel: i18n("58995b490ba67e5d29dd87f422b14861"),
      description: i18n("ec2fb7a5db150690b14b63f83d9d4b30"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data.value': {
            type: 'object',
            title: i18n("e6b94af26512b3f7ea8eb1433d4a2aaa")
          }
        }
      }]
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'expand',
      actionLabel: i18n("e2edde5adbdf33f6dce59a299cbf5fad"),
      description: i18n("38747bcbc3c47924098076ee87e59933"),
      innerArgs: ['openLevel'],
      descDetail: function (info) {
        var _a;
        return React__default.createElement("div", null, React__default.createElement("span", {
          className: "variable-right"
        }, info === null || info === void 0 ? void 0 : info.__rendererLabel), "\u5C55\u5F00\u5230\u7B2C", React__default.createElement("span", {
          className: "variable-left variable-right"
        }, (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.openLevel), "\u5C42");
      },
      schema: getArgsWrapper(
      /*
      {
        type: 'input-formula',
        variables: '${variables}',
        evalMode: false,
        variableMode: 'tabs',
        label: '展开层级',
        size: 'lg',
        name: 'openLevel',
        mode: 'horizontal'
      },
      */
      {
        name: 'openLevel',
        label: i18n("01356df4561f9da87d2876ec9c0dacfe"),
        type: 'ae-formulaControl',
        variables: '${variables}',
        size: 'lg',
        mode: 'horizontal'
      })
    }, {
      actionType: 'collapse',
      actionLabel: i18n("def9e98b60e3bfc493bcd7693e702096"),
      description: i18n("3ebb9059b6abc8f80a212b5795270ec2")
    }, {
      actionType: 'clear',
      actionLabel: i18n("288f0c404c4e546aa3683ff5054e85e2"),
      description: i18n("d81f0b9079d5a38bbedffeacaad8b905")
    }, {
      actionType: 'reset',
      actionLabel: i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18n("ce5e449208bb568eaf722bab9a20380e")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelDefinitions = {
      options: {
        label: i18n("25ae4ca8d4b8a67b273066a97a516327"),
        name: 'options',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        addButtonText: i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
        scaffold: {
          label: '',
          value: ''
        },
        items: [{
          type: 'group',
          body: [getSchemaTpl('optionsLabel'), {
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
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      var i18nEnabled = getI18nEnabled();
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), getSchemaTpl('formItemName', {
            required: true
          }), getSchemaTpl('label'), {
            type: 'button-group-select',
            name: 'type',
            label: i18n("f0789e79d48f135e5d870753f7a85d05"),
            pipeIn: defaultValue('input-tree'),
            onChange: function (value, oldValue, model, form) {
              var activeEvent = cloneDeep(form.getValueByName('onEvent') || {});
              var eventList = _this.events;
              if (value === 'tree-select') {
                var treeSelectPlugin = _this.manager.plugins.find(function (item) {
                  return item.rendererName === 'tree-select';
                });
                eventList = (treeSelectPlugin === null || treeSelectPlugin === void 0 ? void 0 : treeSelectPlugin.events) || [];
              }
              var _loop_1 = function (key) {
                var hasEventKey = eventList.find(function (event) {
                  return event.eventName === key;
                });
                if (!hasEventKey) {
                  delete activeEvent[key];
                }
              };
              for (var key in activeEvent) {
                _loop_1(key);
              }
              form.setValueByName('onEvent', activeEvent);
            },
            options: [{
              label: i18n("c6e1b91d329a61b691d0d5d2eb343ddd"),
              value: 'input-tree'
            }, {
              label: i18n("a553741d5ebb9c80d7d2a63b202cf4b8"),
              value: 'tree-select'
            }]
          }, getSchemaTpl('clearable', {
            mode: 'horizontal',
            horizontal: {
              justify: true,
              left: 8
            },
            inputClassName: 'is-inline ',
            visibleOn: 'data.type === "tree-select"'
          }), getSchemaTpl('switch', {
            label: i18n("dbdae74eb12668e2b9568b013bf27d45"),
            name: 'searchable',
            visibleOn: 'data.type === "tree-select"'
          }), getSchemaTpl('multiple', {
            body: [{
              type: 'input-number',
              label: tipedLabel(i18n("4e373f3ff64ad29a01da87317eb92088"), i18n("7a377ac3904628fd73e7d33ce6130ae1")),
              name: 'minLength'
            }, {
              type: 'input-number',
              label: tipedLabel(i18n("160cb9a7d57c5b5ca65b5cdf79e8fd28"), i18n("674ddb63a7cd9e14a49813d52cf7e25e")),
              name: 'maxLength'
            }]
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("204770091fd4b7cd0611ddc65bf21d37"), i18n("be7d848c40dfdd3e20f233c373af00a5")),
            name: 'autoCheckChildren',
            hiddenOn: '!data.multiple',
            value: true
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("4c3ed2fc7331db687fc0e8ffb8f672a7"), i18n("0ae8c01434dc2a38a90561fcbf5d79b5")),
            name: 'cascade',
            hiddenOn: '!data.multiple || !data.autoCheckChildren'
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("22c023bf51970a461cc164e711f3d3ff"), i18n("6e19e48a52986659ae5ba1bfe612ba8a")),
            name: 'withChildren',
            hiddenOn: '!data.multiple || !data.autoCheckChildren && data.cascade'
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("cccb3595f8ff536e27d94ec91a49bfdf"), i18n("49ccf100ac35e1cc3d40b7222cdcd1a7")),
            name: 'onlyChildren',
            hiddenOn: '!data.multiple || !data.autoCheckChildren'
          }), getSchemaTpl('valueFormula', {
            rendererSchema: __assign(__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'tree-select'
            }),
            visibleOn: 'this.options && this.options.length > 0'
          }), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description')]
        }, {
          title: i18n("ea15ae2b7fba76c83eec6d0986d15197"),
          body: [getSchemaTpl('treeOptionControl', {
            label: i18n("0d83078816aa273f2941c9b55ec82bf3"),
            showIconField: true
          }), getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), getSchemaTpl('switch', {
            label: i18n("a0e965072593eb1b19b4568fa26d977c"),
            name: 'onlyLeaf'
          }), getSchemaTpl('creatable', {
            formType: 'extend',
            hiddenOnDefault: true,
            label: i18n("8865c6822a31e0da6bc7eece8677d8f0"),
            form: {
              body: [getSchemaTpl('switch', {
                label: i18n("bc560e477282dafc3c37b7a665af4f9c"),
                value: true,
                name: 'rootCreatable'
              }), {
                type: 'input-text',
                label: i18n("89664aa96ba7eb788ea273c0d36467cc"),
                value: i18n("b4eab506cf436d3cdd1cd68fc857ec04"),
                name: 'rootCreateTip',
                hiddenOn: '!data.rootCreatable'
              }, getSchemaTpl('addApi')]
            }
          }), getSchemaTpl('editable', {
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [getSchemaTpl('editApi')]
            }
          }), getSchemaTpl('removable', {
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [getSchemaTpl('deleteApi')]
            }
          })]
        }, {
          title: i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [getSchemaTpl('valueFormula', {
            name: 'highlightTxt',
            label: i18n("2b3073b1ba5f9deab7818d8be02de3a1"),
            type: 'input-text',
            visibleOn: 'data.type === "input-tree"'
          }), {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'enableNodePath',
            label: tipedLabel(i18n("14dc30e68a3d8d53e8ddd98876c1d480"), i18n("68c7da9593da32100cb82ef5106047e1")),
            value: false,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-text',
                label: i18n("9cb417cfac37e6d65dedbc35ee9e916e"),
                value: '/',
                name: 'pathSeparator'
              }]
            }
          }, {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'hideRoot',
            label: i18n("d6840c02c4d9cd5f4f5fd4d9f3e6b916"),
            value: true,
            trueValue: false,
            falseValue: true,
            formType: 'extend',
            form: {
              body: [{
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                label: i18n("e2c310a329c2cf62a0764fc912f2f583"),
                value: i18n("c48d9f48ce8a798772f17d1f47560529"),
                name: 'rootLabel'
              }]
            },
            visibleOn: 'data.type === "input-tree"'
          }, getSchemaTpl('switch', {
            label: tipedLabel(i18n("0aa73cfbe5a84cd34a212de5bab2058d"), i18n("4dabfefd787102b8159b5c4a221aa048")),
            name: 'hideNodePathLabel',
            visibleOn: 'data.type==="tree-select"'
          }), getSchemaTpl('switch', {
            label: i18n("8c9a3a8cd5de83121c03c83f909a7534"),
            name: 'showIcon',
            value: true
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("ae7d563d3190ddbafdda8093fc28fc5f"), i18n("4444d03faa51f8550a8a4547fb471ab7")),
            name: 'showRadio',
            hiddenOn: 'data.multiple'
          }), getSchemaTpl('switch', {
            label: tipedLabel(i18n("0f993a54d2c67716220632577d3b5b51"), i18n("846da282ebfa6dfe61deb1d58145158c")),
            name: 'showOutline'
          }), getSchemaTpl('switch', {
            name: 'withChildren',
            label: i18n("b39c6fb1cdf629d3f3032d6c7d4694a8"),
            visibleOn: 'data.cascade !== true && data.multiple',
            disabledOn: 'data.onlyChildren'
          }), getSchemaTpl('switch', {
            name: 'onlyChildren',
            label: i18n("1fa482fed3042cac9f96c6f43c13f84a"),
            visibleOn: 'data.cascade !== true && data.multiple',
            disabledOn: 'data.withChildren'
          }), {
            type: 'ae-Switch-More',
            mode: 'normal',
            name: 'initiallyOpen',
            label: tipedLabel(i18n("d7eae84550f9b9bc0c78a94e4072ad0d"), i18n("346f7e0c7ef27b6a83f3c9f8f406d737")),
            value: true,
            trueValue: false,
            falseValue: true,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-number',
                label: i18n("b40163733b8e3a420e38f295bfab369d"),
                name: 'unfoldedLevel',
                value: 1,
                hiddenOn: 'data.initiallyOpen'
              }]
            }
          }, getSchemaTpl('virtualThreshold'), getSchemaTpl('virtualItemHeight')]
        }, getSchemaTpl('status', {
          isFormItem: true,
          readonly: true
        }), getSchemaTpl('validation', {
          tag: ValidatorTag.Tree
        })])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [getSchemaTpl('style:formItem', {
          renderer: renderer
        }), getSchemaTpl('style:classNames', {
          schema: [getSchemaTpl('className', {
            label: i18n("24c5febd312d27b5e80354cf03e241f0"),
            name: 'treeContainerClassName'
          })]
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
  return TreeControlPlugin;
}(BasePlugin);
registerEditorPlugin(TreeControlPlugin);

export { TreeControlPlugin };
