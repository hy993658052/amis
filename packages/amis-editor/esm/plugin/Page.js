/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign } from 'tslib';
import { ContainerWrapper, getSchemaTpl, defaultValue, tipedLabel, jsonToJsonSchema, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var PagePlugin = /** @class */function (_super) {
  __extends(PagePlugin, _super);
  function PagePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'page';
    _this.$schema = '/schemas/PageSchema.json';
    // 组件名称
    _this.name = i18n("59ceff465ad16932d8972191ad815dfb");
    _this.isBaseComponent = true;
    // 只有顶级才会用到这个page组件
    _this.disabledRendererPlugin = true;
    _this.description = i18n("243e91d5fbc5a03a5c54da6d8e662e4f");
    _this.docLink = '/amis/zh-CN/components/page';
    _this.tags = i18n("22c799040acdb2601b437ed5449de076");
    _this.icon = 'fa fa-desktop';
    // pluginIcon = 'page-plugin'; // 暂无新 icon
    _this.scaffold = {
      type: 'page',
      regions: ['body'],
      body: [{
        type: 'tpl',
        tpl: i18n("2d711b09bd0db0ad240cc83b30dd8014")
      }]
    };
    _this.previewSchema = {
      type: 'page',
      className: 'text-left b-a',
      asideClassName: 'w-xs',
      title: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
      subTitle: i18n("72cf373be86a38b29f6d2f15900b0da1"),
      aside: i18n("54002bbf7eb3da8346dd4be61d642bca"),
      body: i18n("2d711b09bd0db0ad240cc83b30dd8014")
    };
    _this.events = [{
      eventName: 'init',
      eventLabel: i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("584e4b6108e132be92c9de09d7bbed72")
          }
        }
      }]
    }, {
      eventName: 'inited',
      eventLabel: i18n("9328b90ded33d16a873db5c0dbd815b8"),
      description: i18n("f3b97bd71a77cca1e9288089a537cf3b"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("9787088794f42c7e476cf7580f81447e")
          }
        }
      }]
    }, {
      eventName: 'pullRefresh',
      eventLabel: i18n("5d758dc5e33ba0122c256d80c1572e88"),
      description: i18n("d6fdfa4f989be6586a7a29ea85522f24")
    }];
    // 动作定义
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    // 普通容器类渲染器配置
    _this.regions = [{
      key: 'toolbar',
      label: i18n("012f602372cd2dbd639cd966c63e1f90"),
      preferTag: i18n("56e6db657d4775698984f883b71cb379")
    }, {
      key: 'aside',
      label: i18n("54002bbf7eb3da8346dd4be61d642bca"),
      placeholder: i18n("4f9fa9ee5b0604d97da73e77fdbc281e")
    }, {
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      placeholder: i18n("40fd4b2a194b2b1284a7f7f738b69640")
    }];
    _this.wrapper = ContainerWrapper;
    _this.panelTitle = i18n("59ceff465ad16932d8972191ad815dfb");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return [getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: [getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'checkboxes',
            name: 'regions',
            label: i18n("0e82bfaaec104a9f0eeb14820b42e7c8"),
            pipeIn: function (value) {
              return Array.isArray(value) ? value : ['body', 'toolbar', 'aside', 'header'];
            },
            pipeOut: function (value) {
              return Array.isArray(value) && value.length ? value : ['body', 'toolbar', 'aside', 'header'];
            },
            joinValues: false,
            extractValue: true,
            inline: false,
            options: [{
              label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
              value: 'body'
            }, {
              label: i18n("391555a3772260743f19278f01adf75e"),
              value: 'header'
            }, {
              label: i18n("012f602372cd2dbd639cd966c63e1f90"),
              value: 'toolbar'
            }, {
              label: i18n("54002bbf7eb3da8346dd4be61d642bca"),
              value: 'aside'
            }]
          }, getSchemaTpl('pageTitle'), getSchemaTpl('pageSubTitle'), getSchemaTpl('remark', {
            label: i18n("3ba265c6b63bde0319822afd6b9a649d"),
            hiddenOn: 'data.regions && !data.regions.includes("header") || !data.title'
          }), {
            type: 'ae-Switch-More',
            name: 'asideResizor',
            mode: 'normal',
            label: i18n("e7f2f04f7c2b2e9e07b69767ea28d6ab"),
            hiddenOn: 'data.regions && !data.regions.includes("aside")',
            value: false,
            hiddenOnDefault: true,
            formType: 'extend',
            form: {
              body: [{
                type: 'input-number',
                label: i18n("a2b62974f4d7564bb68b570116f25a10"),
                min: 0,
                name: 'asideMinWidth',
                pipeIn: defaultValue(160),
                pipeOut: function (value) {
                  return value || 0;
                }
              }, {
                type: 'input-number',
                label: i18n("99b57d8c9244ff9a695fcd519b4e2e57"),
                min: 0,
                name: 'asideMaxWidth',
                pipeIn: defaultValue(350),
                pipeOut: function (value) {
                  return value || 0;
                }
              }]
            }
          }, {
            type: 'switch',
            label: tipedLabel(i18n("28d602809bd1dc6b47ceb38cb54f32de"), i18n("36bded76593f98fab62453c7430b2918")),
            name: 'asideSticky',
            inputClassName: 'is-inline',
            pipeIn: defaultValue(true),
            hiddenOn: 'data.regions && !data.regions.includes("aside")'
          }]
        }, {
          title: i18n("0d83078816aa273f2941c9b55ec82bf3"),
          body: [getSchemaTpl('combo-container', {
            type: 'input-kv',
            mode: 'normal',
            name: 'data',
            label: i18n("c70638412c6cffd150117ae403dea939")
          }), getSchemaTpl('apiControl', {
            name: 'initApi',
            mode: 'row',
            labelClassName: 'none',
            label: tipedLabel(i18n("b4bc91701b86fe8543d649e97daea602"), i18n("4143d7418de740e8bc26ef4b27c63534"))
          })]
        },, {
          title: i18n("c95e748d5811faae5c52bdc07bee51a0"),
          body: [{
            type: 'combo',
            name: 'pullRefresh',
            mode: 'normal',
            noBorder: true,
            items: [{
              type: 'ae-Switch-More',
              mode: 'normal',
              label: i18n("5d758dc5e33ba0122c256d80c1572e88"),
              name: 'disabled',
              formType: 'extend',
              value: true,
              trueValue: false,
              falseValue: true,
              autoFocus: false,
              form: {
                body: [{
                  name: 'pullingText',
                  label: tipedLabel(i18n("04f767eaa571383ea271432bee6deedf"), i18n("e24bc5fd094c7c272725c6340d8aeb8e")),
                  type: 'input-text'
                }, {
                  name: 'loosingText',
                  label: tipedLabel(i18n("0b3eef4f8a8061baa22416dc1e5dad03"), i18n("717b23399e04873441478fef1cc16d43")),
                  type: 'input-text'
                }]
              }
            }]
          }]
        }])]
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: [getSchemaTpl('collapseGroup', __spreadArray(__spreadArray([], __read(getSchemaTpl('theme:common', ['layout'])), false), [getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            name: 'headerClassName',
            label: i18n("c949729cd1a1e425595c1a297649c7c6")
          }), getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18n("132a78bdf68d6d17bde00aa807bbf032")
          }), getSchemaTpl('className', {
            name: 'asideClassName',
            label: i18n("54002bbf7eb3da8346dd4be61d642bca")
          }), getSchemaTpl('className', {
            name: 'toolbarClassName',
            label: i18n("012f602372cd2dbd639cd966c63e1f90")
          })]
        })], false))]
      }, {
        title: i18n("10b2761db5a8e089049df39675abc550"),
        className: 'p-none',
        body: [getSchemaTpl('eventControl', __assign({
          name: 'onEvent'
        }, getEventControlConfig(_this.manager, context)))]
      }
      // {
      //   type: 'combo',
      //   name: 'definitions',
      //   multiple: true,
      //   multiLine: true,
      //   label: '定义',
      //   description: '定义类型，定义完成后可被子节点引用。',
      //   pipeIn: (value: any) =>
      //     value
      //       ? Object.keys(value).map(key => ({
      //           key,
      //           value: value[key]
      //         }))
      //       : [],
      //   pipeOut: (value: any) =>
      //     Array.isArray(value)
      //       ? value.reduce(
      //           (obj, current) => ({
      //             ...obj,
      //             [current.key || '']: current.value
      //               ? current.value
      //               : {type: 'tpl', tpl: '内容', wrapperComponent: ''}
      //           }),
      //           {}
      //         )
      //       : undefined,
      //   items: [
      //     {
      //       type: 'input-text',
      //       name: 'key',
      //       label: 'Key',
      //       required: true
      //     },
      //     {
      //       children: ({index}: any) => (
      //         <Button
      //           size="sm"
      //           level="danger"
      //           // onClick={this.handleEditDefinitionDetail.bind(
      //           //   this,
      //           //   index
      //           // )}
      //           block
      //         >
      //           配置详情
      //         </Button>
      //       )
      //     }
      //   ]
      // }
      // ]
      // }
      ])];
    };

    return _this;
  }
  PagePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'init') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = __assign({
        $id: 'pageInitData'
      }, jsonToJsonSchema(data));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
    if (e === 'inited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = __assign({
        $id: 'pageInitedData'
      }, jsonToJsonSchema(data));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  return PagePlugin;
}(BasePlugin);
registerEditorPlugin(PagePlugin);

export { PagePlugin };
