/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read } from 'tslib';
import { getSchemaTpl, defaultValue, LayoutBasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

var ContainerPlugin = /** @class */function (_super) {
  __extends(ContainerPlugin, _super);
  function ContainerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'container';
    _this.$schema = '/schemas/ContainerSchema.json';
    // 组件名称
    _this.name = i18n("22c799040acdb2601b437ed5449de076");
    _this.isBaseComponent = true;
    _this.description = i18n("ded228f9173b241dd8df2a4811ea0e98");
    _this.tags = [i18n("5aefca559c5a41d10078e21e6d616825")];
    _this.order = -2;
    _this.icon = 'fa fa-square-o';
    _this.pluginIcon = 'container-plugin';
    _this.scaffold = {
      type: 'container',
      body: [],
      style: {
        position: 'static',
        display: 'block'
      },
      wrapperBody: false
    };
    _this.previewSchema = __assign({}, _this.scaffold);
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.panelTitle = i18n("22c799040acdb2601b437ed5449de076");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var curRendererSchema = context === null || context === void 0 ? void 0 : context.schema;
      (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row' || (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.direction) === 'row-reverse';
      // const isFlexContainer = this.manager?.isFlexContainer(context?.id);
      var isFreeContainer = (curRendererSchema === null || curRendererSchema === void 0 ? void 0 : curRendererSchema.isFreeContainer) || false;
      var isFlexItem = (_a = _this.manager) === null || _a === void 0 ? void 0 : _a.isFlexItem(context === null || context === void 0 ? void 0 : context.id);
      var isFlexColumnItem = (_b = _this.manager) === null || _b === void 0 ? void 0 : _b.isFlexColumnItem(context === null || context === void 0 ? void 0 : context.id);
      var displayTpl = [getSchemaTpl('layout:display'), getSchemaTpl('layout:flexDirection', {
        visibleOn: 'data.style && data.style.display === "flex"'
      }), getSchemaTpl('layout:justifyContent', {
        label: i18n("dde193342b8c350ae29795117c0c5b9a"),
        options: [{
          label: i18n("413f48cc71f71083ce532a86e3efdc21"),
          value: 'flex-start'
        }, {
          label: i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
          value: 'flex-end'
        }, {
          label: i18n("da1b972efb29f850b50e219ad4d98ba5"),
          value: 'space-between'
        }, {
          label: i18n("28968f372fe88c0ef855c7f79f42bbad"),
          value: 'space-evenly'
        }],
        visibleOn: 'data.style && data.style.display === "flex" && data.style.flexDirection === "row" || data.style.flexDirection === "row-reverse"'
      }), getSchemaTpl('layout:justifyContent', {
        label: i18n("5b15af1f73b4f2d5bb152410863602f4"),
        options: [{
          label: i18n("2a6ad292447e6354ca39ee7f40d2fcc8"),
          value: 'flex-start'
        }, {
          label: i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18n("d68c21b6b65e7a2e361762b65b8a5032"),
          value: 'flex-end'
        }, {
          label: i18n("da1b972efb29f850b50e219ad4d98ba5"),
          value: 'space-between'
        }, {
          label: i18n("28968f372fe88c0ef855c7f79f42bbad"),
          value: 'space-evenly'
        }],
        visibleOn: 'data.style && data.style.display === "flex" && (data.style.flexDirection === "column" || data.style.flexDirection === "column-reverse")'
      }), getSchemaTpl('layout:alignItems', {
        label: i18n("dde193342b8c350ae29795117c0c5b9a"),
        options: [{
          label: i18n("413f48cc71f71083ce532a86e3efdc21"),
          value: 'flex-start'
        }, {
          label: i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18n("fd8e9572cc6bf87653c4d8f8b8dd0db9"),
          value: 'flex-end'
        }, {
          label: i18n("ed97c73866617b40a7b1215867e0f489"),
          value: 'baseline'
        }, {
          label: i18n("7ac1519928de413cfe36f5d2e0610430"),
          value: 'stretch'
        }],
        visibleOn: 'data.style && data.style.display === "flex" && (data.style.flexDirection === "column" || data.style.flexDirection === "column-reverse")'
      }), getSchemaTpl('layout:alignItems', {
        label: i18n("5b15af1f73b4f2d5bb152410863602f4"),
        options: [{
          label: i18n("2a6ad292447e6354ca39ee7f40d2fcc8"),
          value: 'flex-start'
        }, {
          label: i18n("56c17ba6a56c01706ae00a31611deb03"),
          value: 'center'
        }, {
          label: i18n("d68c21b6b65e7a2e361762b65b8a5032"),
          value: 'flex-end'
        }, {
          label: i18n("ed97c73866617b40a7b1215867e0f489"),
          value: 'baseline'
        }, {
          label: i18n("cbac406a3f51abad691702015b0784ba"),
          value: 'stretch'
        }],
        visibleOn: 'data.style && data.style.display === "flex" && (data.style.flexDirection === "row" || data.style.flexDirection === "row-reverse")'
      }), getSchemaTpl('layout:flex-wrap', {
        visibleOn: 'data.style && data.style.display === "flex"'
      })];
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            name: 'wrapperComponent',
            label: i18n("a823cfa70cfa46c788e1eedae043f6e5"),
            type: 'select',
            searchable: true,
            options: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'article', 'aside', 'code', 'footer', 'header', 'section'],
            pipeIn: defaultValue('div'),
            validations: {
              isAlphanumeric: true,
              matchRegexp: '/^(?!.*script).*$/' // 禁用一下script标签
            },

            validationErrors: {
              isAlpha: i18n("f7d64e5e79994c3c8853f2608d7b2d25"),
              matchRegexp: i18n("f7d64e5e79994c3c8853f2608d7b2d25")
            },
            validateOnChange: false
          }, getSchemaTpl('layout:padding')]
        }, {
          title: i18n("5aefca559c5a41d10078e21e6d616825"),
          body: __spreadArray(__spreadArray([getSchemaTpl('layout:position', {
            visibleOn: '!data.stickyStatus'
          }), getSchemaTpl('layout:originPosition'), getSchemaTpl('layout:inset', {
            mode: 'vertical'
          })], __read(!isFreeContainer ? displayTpl : []), false), [isFlexItem ? getSchemaTpl('layout:flex', {
            isFlexColumnItem: isFlexColumnItem,
            label: isFlexColumnItem ? i18n("f02f876ee64cc016d97fa4dc498d4857") : i18n("a170a375b264f7fe0c02a7ca8c268784"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative")'
          }) : null, isFlexItem ? getSchemaTpl('layout:flex-grow', {
            visibleOn: 'data.style && data.style.flex === "1 1 auto" && (data.style.position === "static" || data.style.position === "relative")'
          }) : null, isFlexItem ? getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18n("183f00df0922a6be371fea58cd46a60a") : i18n("f92626f9e56b3e2d0c47495a446acf71"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "1 1 auto"'
          }) : null, isFlexItem ? getSchemaTpl('layout:flex-basis', {
            label: isFlexColumnItem ? i18n("c19b79073b676b9bade80613aba2dbfa") : i18n("b591aed69defa2abf0486da6a58dfb5e"),
            visibleOn: 'data.style && (data.style.position === "static" || data.style.position === "relative") && data.style.flex === "0 0 150px"'
          }) : null, getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(isFlexItem && !isFlexColumnItem, " && data.style.flex === '0 0 150px'")
          }), getSchemaTpl('layout:isFixedHeight', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setHeightMutable(value);
            }
          }), getSchemaTpl('layout:height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:max-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:min-height', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem)
          }), getSchemaTpl('layout:overflow-y', {
            visibleOn: "".concat(!isFlexItem || !isFlexColumnItem, " && (data.isFixedHeight || data.style && data.style.maxHeight) || (").concat(isFlexItem && isFlexColumnItem, " && data.style.flex === '0 0 150px')")
          }), getSchemaTpl('layout:isFixedWidth', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem),
            onChange: function (value) {
              context === null || context === void 0 ? void 0 : context.node.setWidthMutable(value);
            }
          }), getSchemaTpl('layout:width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:max-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:min-width', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem)
          }), getSchemaTpl('layout:overflow-x', {
            visibleOn: "".concat(!isFlexItem || isFlexColumnItem, " && (data.isFixedWidth || data.style && data.style.maxWidth)")
          }), !isFlexItem ? getSchemaTpl('layout:margin-center') : null, !isFlexItem && !isFreeContainer ? getSchemaTpl('layout:textAlign', {
            name: 'style.textAlign',
            label: i18n("a3221d2d224767df4afa7a8653ded8fe"),
            visibleOn: 'data.style && data.style.display !== "flex" && data.style.display !== "inline-flex"'
          }) : null, getSchemaTpl('layout:z-index'), getSchemaTpl('layout:sticky', {
            visibleOn: 'data.style && (data.style.position !== "fixed" && data.style.position !== "absolute")'
          }), getSchemaTpl('layout:stickyPosition')], false)
        }, getSchemaTpl('status')])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        className: 'p-none',
        body: getSchemaTpl('collapseGroup', __spreadArray(__spreadArray([], __read(getSchemaTpl('style:common', ['layout'])), false), [getSchemaTpl('style:classNames', {
          isFormItem: false,
          schema: [getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18n("132a78bdf68d6d17bde00aa807bbf032")
          })]
        })], false))
      }]);
    };
    return _this;
  }
  ContainerPlugin.scene = ['layout'];
  return ContainerPlugin;
}(LayoutBasePlugin);
registerEditorPlugin(ContainerPlugin);

export { ContainerPlugin };
