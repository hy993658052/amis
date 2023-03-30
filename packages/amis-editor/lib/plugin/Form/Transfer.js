/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../../renderer/event-control/helper.js');
var validator = require('../../validator.js');
var i18nRuntime = require('i18n-runtime');

var TransferPlugin = /** @class */function (_super) {
  tslib.__extends(TransferPlugin, _super);
  function TransferPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'transfer';
    _this.$schema = '/schemas/TransferControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("685e5f4815e87c4690dda7d7aa163904");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-th-list';
    _this.pluginIcon = 'transfer-plugin';
    _this.description = i18nRuntime.i18n("26b4a55f458275a108c1ef213a354ced");
    _this.docLink = '/amis/zh-CN/components/form/transfer';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      label: i18nRuntime.i18n("829abe5a8dcd0579a340d20636b59276"),
      type: 'transfer',
      name: 'transfer',
      options: [{
        label: i18nRuntime.i18n("fda93c79275b812a6c1c189fbebf8b08"),
        value: 'zhugeliang'
      }, {
        label: i18nRuntime.i18n("e37a86d1a1dbed0cd53c95582977f075"),
        value: 'caocao'
      }],
      selectMode: 'list',
      resultListModeFollowSelect: false
    };
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      mode: 'horizontal',
      wrapWithPanel: false,
      body: [tslib.__assign({}, _this.scaffold)]
    };
    _this.panelTitle = i18nRuntime.i18n("685e5f4815e87c4690dda7d7aa163904");
    _this.events = [{
      eventName: 'change',
      eventLabel: i18nRuntime.i18n("755955372bcc0c7ebf161a656bc389b3"),
      description: i18nRuntime.i18n("c776ab86eb24f6b3db35114e43026f75"),
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
    }, {
      eventName: 'selectAll',
      eventLabel: i18nRuntime.i18n("66eeacd93a7c1bda93906fe908ad11a0"),
      description: i18nRuntime.i18n("8b3a9a5c912610c384bc8dc2c8514386"),
      dataSchema: [{
        type: 'object',
        properties: {
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
      description: i18nRuntime.i18n("91208131116f2823993daf99f15e1325")
    }, {
      actionType: 'reset',
      actionLabel: i18nRuntime.i18n("4b9c3271dc2f299dc3aeffb369187513"),
      description: i18nRuntime.i18n("dda222620b789d07c2c5c279475caaf1")
    }, {
      actionType: 'selectAll',
      actionLabel: i18nRuntime.i18n("66eeacd93a7c1bda93906fe908ad11a0"),
      description: i18nRuntime.i18n("8b3a9a5c912610c384bc8dc2c8514386")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("1b09b6621ebf0d10ce98f0178fa1bda1")
    }];
    _this.panelDefinitions = {
      options: {
        label: i18nRuntime.i18n("25ae4ca8d4b8a67b273066a97a516327"),
        name: 'options',
        type: 'combo',
        multiple: true,
        multiLine: true,
        draggable: true,
        addButtonText: i18nRuntime.i18n("65d76d0590aa6e05d61fe8db4c6a11ca"),
        scaffold: {
          label: '',
          value: ''
        },
        items: [{
          type: 'group',
          body: [amisEditorCore.getSchemaTpl('optionsLabel'), {
            type: 'input-text',
            name: 'value',
            placeholder: i18nRuntime.i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
            unique: true
          }]
        }, {
          $ref: 'options',
          label: i18nRuntime.i18n("72453d792655604f1fab821146133d7d"),
          name: 'children',
          addButtonText: i18nRuntime.i18n("210da23d108e85b2f0bbfa85846cb792")
        }]
      }
    };
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var renderer = context.info.renderer;
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), amisEditorCore.getSchemaTpl('valueFormula', {
            rendererSchema: tslib.__assign(tslib.__assign({}, context === null || context === void 0 ? void 0 : context.schema), {
              type: 'select',
              multiple: true
            }),
            visibleOn: 'data.options.length > 0'
          }), amisEditorCore.getSchemaTpl('labelRemark'), amisEditorCore.getSchemaTpl('remark'), amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("439a19857be1fb8d3e6017258e32c486"),
            name: 'statistics'
          })]
        }, {
          title: i18nRuntime.i18n("a2888bca5f435690ff9f5a5d615a968a"),
          body: [{
            label: i18nRuntime.i18n("1e409f26f9c1d58ce0c47a68104d45f0"),
            name: 'selectMode',
            type: 'select',
            options: [{
              label: i18nRuntime.i18n("6541f1702af367c41a3127ed8511eb50"),
              value: 'list'
            }, {
              label: i18nRuntime.i18n("d58ba4b5e94680fcb08300e176502fb8"),
              value: 'table'
            }, {
              label: i18nRuntime.i18n("eebda442c4bff2aaaf8274383d0ed12f"),
              value: 'tree'
            }],
            onChange: function (value, origin, item, form) {
              form.setValues({
                options: undefined,
                columns: undefined,
                value: '',
                valueTpl: ''
              });
              // 主要解决直接设置value、valueTpl为undefined配置面板不生效问题，所以先设置''，后使用setTimout设置为undefined
              setTimeout(function () {
                form.setValues({
                  value: undefined,
                  valueTpl: undefined
                });
              }, 100);
            }
          }, amisEditorCore.getSchemaTpl('optionControl', {
            visibleOn: 'data.selectMode === "list"',
            multiple: true
          }), amisEditorCore.getSchemaTpl('loadingConfig', {
            visibleOn: 'this.source || !this.options'
          }, {
            context: context
          }), {
            type: 'ae-transferTableControl',
            label: i18nRuntime.i18n("0d83078816aa273f2941c9b55ec82bf3"),
            visibleOn: 'data.selectMode === "table"',
            mode: 'normal',
            // 自定义change函数
            onValueChange: function (type, data, onBulkChange) {
              if (type === 'options') {
                onBulkChange(data);
              } else if (type === 'columns') {
                var columns = data.columns;
                if (data.columns.length > 0) {
                  data.valueTpl = "${".concat(columns[0].name, "}");
                }
                onBulkChange(data);
              }
            }
          }, amisEditorCore.getSchemaTpl('treeOptionControl', {
            visibleOn: 'data.selectMode === "tree"'
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("dbdae74eb12668e2b9568b013bf27d45"),
            name: 'searchable'
          }), amisEditorCore.getSchemaTpl('optionsMenuTpl', {
            manager: _this.manager,
            onChange: function (value) {},
            visibleOn: 'data.selectMode !== "table"'
          }), {
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            name: 'selectTitle',
            type: 'input-text',
            inputClassName: 'is-inline '
          }]
        }, {
          title: i18nRuntime.i18n("d5dbf5285b2dbe07b481fbd5d4536c60"),
          body: [{
            type: 'button-group-select',
            label: i18nRuntime.i18n("1e409f26f9c1d58ce0c47a68104d45f0"),
            name: 'resultListModeFollowSelect',
            inputClassName: 'items-center',
            options: [{
              label: i18nRuntime.i18n("6541f1702af367c41a3127ed8511eb50"),
              value: false
            }, {
              label: i18nRuntime.i18n("b720b2abd62161c3c99625c8160df987"),
              value: true
            }],
            onChange: function (value, origin, item, form) {
              form.setValueByName('sortable', !value ? true : undefined);
            }
          }, amisEditorCore.getSchemaTpl('switch', {
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("dbdae74eb12668e2b9568b013bf27d45"), i18nRuntime.i18n("acef03eee638dc4239ee60f627f33d85")),
            name: 'resultSearchable'
          }), amisEditorCore.getSchemaTpl('sortable', {
            label: i18nRuntime.i18n("e3ed623b79100791f156d3586751c652"),
            mode: 'horizontal',
            horizontal: {
              justify: true,
              left: 8
            },
            inputClassName: 'is-inline',
            visibleOn: 'data.selectMode === "list" && !data.resultListModeFollowSelect'
          }), amisEditorCore.getSchemaTpl('optionsMenuTpl', {
            name: 'valueTpl',
            manager: _this.manager,
            onChange: function (value) {},
            visibleOn: '!(data.selectMode === "table" && data.resultListModeFollowSelect)'
          }), {
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            name: 'resultTitle',
            type: 'input-text',
            inputClassName: 'is-inline '
          }]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('virtualThreshold'), amisEditorCore.getSchemaTpl('virtualItemHeight')]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', renderer), amisEditorCore.getSchemaTpl('style:classNames', [amisEditorCore.getSchemaTpl('className', {
          label: i18nRuntime.i18n("3bdd08adab6ea90b9164b20a0e4151ac"),
          name: 'descriptionClassName',
          visibleOn: 'this.description'
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'addOn.className',
          label: 'AddOn',
          visibleOn: 'this.addOn && this.addOn.type === "text"'
        })])])
      }, {
        title: i18nRuntime.i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('eventControl', tslib.__assign({
          name: 'onEvent'
        }, helper.getEventControlConfig(_this.manager, context)))]
      }]);
    };
    return _this;
  }
  return TransferPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TransferPlugin);

exports.TransferPlugin = TransferPlugin;
