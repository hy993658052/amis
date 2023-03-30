/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var amisCore = require('amis-core');
var validator = require('../../validator.js');
var cloneDeep = require('lodash/cloneDeep');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var cloneDeep__default = /*#__PURE__*/_interopDefaultLegacy(cloneDeep);

var TableControlPlugin = /** @class */function (_super) {
  tslib.__extends(TableControlPlugin, _super);
  function TableControlPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'input-table';
    _this.$schema = '/schemas/TableControlSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("e41fd1934b82f93f5737827be7323119");
    _this.isBaseComponent = true;
    _this.icon = 'fa fa-table';
    _this.pluginIcon = 'table-plugin';
    _this.description = i18nRuntime.i18n("a5c2dba5ccf62851b24cfa12d4958ce2");
    _this.docLink = '/amis/zh-CN/components/form/input-table';
    _this.tags = [i18nRuntime.i18n("55b45c73ae417c4dead67905b1550e85")];
    _this.scaffold = {
      type: 'input-table',
      name: 'table',
      label: i18nRuntime.i18n("4ba0387a2daf11ad9c67a75b52819eb3"),
      columns: [{
        label: i18nRuntime.i18n("d7ec2d3fea4756bc1642e0f10c180cf5"),
        name: 'name',
        quickEdit: {
          type: 'input-text',
          name: 'name1'
        }
      }, {
        label: i18nRuntime.i18n("b34422e637c90181d3fca4485a97c712"),
        name: 'score',
        quickEdit: {
          type: 'input-number',
          mode: 'inline',
          name: 'score'
        }
      }, {
        label: i18nRuntime.i18n("95e0d70d1809d5267c2419eda58e78ca"),
        name: 'level',
        quickEdit: {
          type: 'select',
          name: 'level',
          options: [{
            label: 'A',
            value: 'A'
          }, {
            label: 'B',
            value: 'B'
          }, {
            label: 'C',
            value: 'C'
          }]
        }
      }],
      addable: false,
      footerAddBtn: {
        label: i18nRuntime.i18n("66ab5e9f24c8f46012a25c89919fb191"),
        icon: 'fa fa-plus'
      },
      strictMode: true
    };
    _this.regions = [{
      key: 'columns',
      label: i18nRuntime.i18n("1f9794dd5634220ed0a498c666cf46fe"),
      renderMethod: 'renderTableContent',
      preferTag: i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7"),
      dndMode: 'position-h'
    }];
    _this.previewSchema = {
      type: 'form',
      className: 'text-left',
      wrapWithPanel: false,
      mode: 'horizontal',
      body: tslib.__assign(tslib.__assign({}, _this.scaffold), {
        value: [{
          color: 'green',
          name: i18nRuntime.i18n("b2c712c788d3a143206eee22fe24d9f1")
        }]
      })
    };
    _this.notRenderFormZone = true;
    _this.panelJustify = true;
    _this.panelTitle = i18nRuntime.i18n("13c250c68608118463871ce7cd8b292c");
    _this.events = [
      // {
      //   eventName: 'addConfirm',
      //   eventLabel: '确认添加',
      //   description: '开启needConfirm，点击添加按钮，填入数据后点击“保存”按钮后触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '添加项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '添加项的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'addSuccess',
      //   eventLabel: '添加成功',
      //   description: '开启needConfirm并且配置addApi，点击“保存”后调用接口成功时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '添加项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '添加项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'addFail',
      //   eventLabel: '添加失败',
      //   description: '开启needConfirm并且配置addApi，点击“保存”后调用接口失败时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '添加项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '添加项所在的行索引'
      //         },
      //         'event.data.error': {
      //           type: 'object',
      //           title: 'addApi请求失败后接口返回的错误信息'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'edit',
      //   eventLabel: '编辑行',
      //   description: '点击某一行右侧操作栏“编辑”按钮时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '编辑项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '编辑项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'editConfirm',
      //   eventLabel: '编辑确认',
      //   description: '开启needConfirm，点击“编辑”按钮，填入数据后点击“保存”按钮后触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '编辑项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '编辑项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'editSuccess',
      //   eventLabel: '编辑成功',
      //   description: '开启needConfirm并且配置updateApi，点击“保存”后调用接口成功时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '编辑项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '编辑项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'editFail',
      //   eventLabel: '编辑失败',
      //   description: '开启needConfirm并且配置updateApi，点击“保存”后调用接口失败时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '编辑项数据'
      //         },
      //         'event.data.index': {
      //           type: 'number',
      //           title: '编辑项所在的行索引'
      //         },
      //         'event.data.error': {
      //           type: 'object',
      //           title: 'updateApi请求错误后返回的错误信息'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'delete',
      //   eventLabel: '删除行',
      //   description: '点击某一行右侧操作栏“删除”按钮时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '删除项数据'
      //         },
      //         'event.data.index': {
      //           type: 'object',
      //           title: '删除项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'deleteSuccess',
      //   eventLabel: '删除成功',
      //   description: '配置了deleteApi，调用接口成功时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '删除项数据'
      //         },
      //         'event.data.index': {
      //           type: 'object',
      //           title: '删除项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'deleteFail',
      //   eventLabel: '删除失败',
      //   description: '配置了deleteApi，调用接口失败时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         },
      //         'event.data.item': {
      //           type: 'object',
      //           title: '编辑项数据'
      //         },
      //         'event.data.index': {
      //           type: 'object',
      //           title: '编辑项所在的行索引'
      //         }
      //       }
      //     }
      //   ]
      // },
      // {
      //   eventName: 'change',
      //   eventLabel: '值变化',
      //   description: '组件数据发生改变时触发',
      //   dataSchema: [
      //     {
      //       type: 'object',
      //       properties: {
      //         'event.data.value': {
      //           type: 'array',
      //           title: '表格数据'
      //         }
      //       }
      //     }
      //   ]
      // }
    ];
    _this.actions = [{
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("8f40db3b25528063f1b6a59602a05cd5"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelBodyCreator = function (context) {
      context.schema.type === 'crud';
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('formItemName', {
            required: true
          }), amisEditorCore.getSchemaTpl('label'), {
            type: 'ae-switch-more',
            name: 'needConfirm',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1205e138ba64dddf61c1f8e6eb3a1aa7"), i18nRuntime.i18n("3d4d83f05a12364e2522fcfb265d8ce8")),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [{
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'confirmBtnLabel',
                label: i18nRuntime.i18n("1d96dc9b36793e242322dd1e092a010c"),
                placeholder: i18nRuntime.i18n("1d96dc9b36793e242322dd1e092a010c")
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'confirmBtnIcon',
                label: i18nRuntime.i18n("c18169dd6fceab2f023216fa6f7d22c1"),
                pipeIn: amisEditorCore.defaultValue('check')
              }), {
                type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                name: 'cancelBtnLabel',
                label: i18nRuntime.i18n("e0698c2a2d5c568edfc5a0b1a1d298eb"),
                placeholder: i18nRuntime.i18n("e0698c2a2d5c568edfc5a0b1a1d298eb")
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'cancelBtnIcon',
                label: i18nRuntime.i18n("5720057e62e80f7a04489dc4c035b4f1"),
                pipeIn: amisEditorCore.defaultValue('close')
              })]
            },
            pipeIn: amisEditorCore.defaultValue(true)
          }, {
            type: 'ae-switch-more',
            name: 'addable',
            label: i18nRuntime.i18n("8865c6822a31e0da6bc7eece8677d8f0"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('apiControl', {
                label: i18nRuntime.i18n("d03c96a2da4905c5f13a87c0d8ddbdb4"),
                name: 'addApi',
                mode: 'row'
              }), amisEditorCore.getSchemaTpl('switch', {
                name: 'showTableAddBtn',
                label: i18nRuntime.i18n("738b58219dda4a849e293c0f75d06438"),
                value: true
              }), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'addBtnLabel',
                visibleOn: 'this.showTableAddBtn',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'addBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                visibleOn: 'this.showTableAddBtn',
                pipeIn: amisEditorCore.defaultValue('plus')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'copyable',
            label: i18nRuntime.i18n("f9a9fcc3bf6a3c8ff1e99fa48ed6d03d"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [{
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'copyBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'copyBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('copy')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'editable',
            label: i18nRuntime.i18n("a32b3bf74850faad3a9ae6a0a5dac781"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('apiControl', {
                label: i18nRuntime.i18n("ea56ca3dac0d39e463a8233fd40a9eb6"),
                name: 'updateApi',
                mode: 'row'
              }), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'editBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'editBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('pencil')
              })]
            }
          }, {
            type: 'ae-switch-more',
            name: 'removable',
            label: i18nRuntime.i18n("3c87af7c432e6b1f59e4f415fd5060cf"),
            mode: 'normal',
            formType: 'extend',
            hiddenOnDefault: true,
            form: {
              body: [amisEditorCore.getSchemaTpl('deleteApi'), {
                label: i18nRuntime.i18n("cf6e87cb9edfa398ccfc3db377e34ca4"),
                name: 'deleteBtnLabel',
                type: i18nEnabled ? 'input-text-i18n' : 'input-text'
              }, amisEditorCore.getSchemaTpl('icon', {
                name: 'deleteBtnIcon',
                label: i18nRuntime.i18n("ae3816c5b00fcff4111842ac19f0a706"),
                pipeIn: amisEditorCore.defaultValue('minus')
              })]
            }
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'showIndex',
            label: i18nRuntime.i18n("d173fb23320acba326a4424133969256"),
            pipeIn: amisEditorCore.defaultValue(false)
          }), {
            type: 'input-number',
            name: 'perPage',
            label: i18nRuntime.i18n("26eb498526ba909386befc43466db79d"),
            placeholder: i18nRuntime.i18n("306abb77f96a1048cf6e61bfe6e7bae4")
          }, {
            type: 'input-number',
            name: 'minLength',
            label: i18nRuntime.i18n("52029187eaa09f55193b6a15387e45ca"),
            pipeIn: amisEditorCore.defaultValue(0)
          }, {
            type: 'input-number',
            name: 'maxLength',
            label: i18nRuntime.i18n("3d99d1f17ebf865877e681397c61dc9d")
          }, amisEditorCore.getSchemaTpl('description'), amisEditorCore.getSchemaTpl('placeholder'), amisEditorCore.getSchemaTpl('labelRemark')]
        }, {
          title: i18nRuntime.i18n("dfac151de712ab0b3618072c8a7f0a0f"),
          body: [amisEditorCore.getSchemaTpl('switch', {
            name: 'strictMode',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("98d52b737d6bc171b6d5bad9a42f6e23"), i18nRuntime.i18n("aa8b2a821e8e32196a720eaaa41b64d3")),
            pipeIn: amisEditorCore.defaultValue(false)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'canAccessSuperData',
            label: amisEditorCore.tipedLabel(i18nRuntime.i18n("1c1618f67cfea6fefb5f287932be2c27"), i18nRuntime.i18n("2aa56a9b94ee3fde76a15711c94fdabc")),
            pipeIn: amisEditorCore.defaultValue(false)
          })]
        }, amisEditorCore.getSchemaTpl('status', {
          isFormItem: true
        }), amisEditorCore.getSchemaTpl('validation', {
          tag: validator.ValidatorTag.MultiSelect
        })])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [amisEditorCore.getSchemaTpl('style:formItem', {
          renderer: context.info.renderer
        }), amisEditorCore.getSchemaTpl('style:classNames', {
          schema: [amisEditorCore.getSchemaTpl('className', {
            name: 'rowClassName',
            label: i18nRuntime.i18n("53a9db06d0b7e3482dc21e53f150e257")
          })]
        })])
      }]);
    };
    return _this;
  }
  Object.defineProperty(TableControlPlugin.prototype, "scaffoldForm", {
    get: function () {
      var i18nEnabled = amisEditorCore.getI18nEnabled();
      return {
        title: i18nRuntime.i18n("afccc17d5d672b10a1292dcd671ef534"),
        body: [{
          name: 'columns',
          type: 'input-table',
          label: false,
          needConfirm: false,
          addable: true,
          removable: true,
          columns: [{
            type: 'text',
            name: 'label',
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            quickEdit: {
              type: i18nEnabled ? 'input-text-i18n' : 'input-text',
              mode: 'inline'
            }
          }, {
            type: 'text',
            name: 'name',
            label: i18nRuntime.i18n("41a344642681efaaa418c228ba7fb45c"),
            quickEdit: {
              type: 'input-text',
              mode: 'inline'
            }
          }, {
            type: 'text',
            name: 'type',
            label: i18nRuntime.i18n("1711a82f9b0825015c2c49d9659c9837"),
            width: 140,
            quickEdit: {
              type: 'select',
              options: [{
                value: 'text',
                label: i18nRuntime.i18n("ffb01e5bcf4c00447f5150d3cba81371")
              }, {
                value: 'tpl',
                label: i18nRuntime.i18n("59cf15fe6b8d659c9bd2f86143534a06")
              }, {
                value: 'container',
                label: i18nRuntime.i18n("22c799040acdb2601b437ed5449de076")
              }, {
                value: 'image',
                label: i18nRuntime.i18n("20def7942674282277c3714ed7ea6ce0")
              }, {
                value: 'date',
                label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
              }, {
                value: 'datetime',
                label: i18nRuntime.i18n("0c3bf4fce50589b1073baf15f8a00d36")
              }, {
                value: 'time',
                label: i18nRuntime.i18n("19fcb9eb2594059036dfede5f4ec53e8")
              }, {
                value: 'status',
                label: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b")
              }, {
                value: 'mapping',
                label: i18nRuntime.i18n("9da188491dd34c4382a5b9f006194e41")
              }],
              pipeIn: amisEditorCore.defaultValue('text')
            }
          }, {
            type: 'text',
            name: 'quickEdit.type',
            label: i18nRuntime.i18n("63bb911d6392cb2740140d406ab83d37"),
            quickEdit: {
              type: 'select',
              clearable: true,
              placeholder: i18nRuntime.i18n("c13998e4c837dc40b8e90828d99561df"),
              options: [{
                value: 'input-text',
                label: i18nRuntime.i18n("5ac57ce6df8c2a19668b7429aebd9f33")
              }, {
                value: 'input-number',
                label: i18nRuntime.i18n("1e65b8181e9a40e76b86e2c261cafbe0")
              }, {
                value: 'select',
                label: i18nRuntime.i18n("6530334ebf5ca810e576858eba168685")
              }, {
                value: 'input-color',
                label: i18nRuntime.i18n("f25cb224e4543c1dc0228fca8dbfaf1c")
              }, {
                value: 'checkboxes',
                label: i18nRuntime.i18n("1145703a07e11b6e680ee2ec8afae0b4")
              }, {
                value: 'radios',
                label: i18nRuntime.i18n("9913107b19cb6012250134ff91377430")
              }, {
                value: 'input-date',
                label: i18nRuntime.i18n("4ff1e74e43a3586339251494117185ad")
              }, {
                value: 'input-date-range',
                label: i18nRuntime.i18n("7866226eb814f681dcc4037e7489aab8")
              }, {
                value: 'switch',
                label: i18nRuntime.i18n("a6beb974cc0b50eebd18120b8110a88b")
              }, {
                value: 'nested-select',
                label: i18nRuntime.i18n("24d9de25721d1fb0ecf89ef81c43d877")
              }, {
                value: 'input-city',
                label: i18nRuntime.i18n("a877779dc422c5321057b638d6d520e5")
              }, {
                value: 'input-tree',
                label: i18nRuntime.i18n("479728c411bac59bc44d5ab8dc3cb4f0")
              }]
            },
            width: 210
          }]
        }],
        pipeOut: function (schema) {
          var columns = cloneDeep__default["default"](schema.columns || []);
          var rawColumns = [];
          columns.forEach(function (column) {
            var _a;
            var rawColumn = tslib.__assign(tslib.__assign({}, column), {
              type: column.type,
              quickEdit: ((_a = column.quickEdit) === null || _a === void 0 ? void 0 : _a.type) ? {
                type: column.quickEdit.type,
                name: column.name
              } : false
            });
            rawColumns.push(rawColumn);
          });
          schema.columns = rawColumns;
          return tslib.__assign({}, schema);
        },
        canRebuild: true
      };
    },
    enumerable: false,
    configurable: true
  });
  TableControlPlugin.prototype.filterProps = function (props) {
    var arr = Array.isArray(props.value) ? props.value : typeof props.source === 'string' ? amis.resolveVariable(props.source, props.data) : amis.resolveVariable('items', props.data);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData_1 = {};
      if (Array.isArray(props.columns)) {
        props.columns.forEach(function (column) {
          if (column.name) {
            amisCore.setVariable(mockedData_1, column.name, amisEditorCore.mockValue(column));
          }
        });
      }
      props.value = amisEditorCore.repeatArray(mockedData_1, 1).map(function (item, index) {
        return tslib.__assign(tslib.__assign({}, item), {
          id: index + 1
        });
      });
    } else {
      // 只取10条预览，否则太多卡顿
      props.value = arr.slice(0, 10);
    }
    return props;
  };
  // 自动插入 label
  TableControlPlugin.prototype.beforeInsert = function (event) {
    var _a, _b, _c, _d;
    var context = event.context;
    if ((context.info.plugin === this || ((_a = context.node.sameIdChild) === null || _a === void 0 ? void 0 : _a.info.plugin) === this) && context.region === 'columns') {
      context.data = tslib.__assign(tslib.__assign({}, context.data), {
        label: (_d = (_b = context.data.label) !== null && _b !== void 0 ? _b : (_c = context.subRenderer) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : i18nRuntime.i18n("bcee820bc20342a4d388a35ed32a35fe")
      });
    }
  };
  return TableControlPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(TableControlPlugin);

exports.TableControlPlugin = TableControlPlugin;
