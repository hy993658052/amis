/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var Dialog = require('./Dialog.js');
var i18nRuntime = require('i18n-runtime');

var DrawerPlugin = /** @class */function (_super) {
  tslib.__extends(DrawerPlugin, _super);
  function DrawerPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'drawer';
    _this.$schema = '/schemas/DrawerSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("33f1fc330b325469b43614c9d96f590e");
    _this.isBaseComponent = true;
    _this.wrapperProps = {
      wrapperComponent: Dialog.InlineModal,
      onClose: amisEditorCore.noop,
      resizable: false,
      show: true
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      renderMethodOverride: function (regions, insertRegion) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var info = this.props.$$editor;
          var dom = this.super.apply(this, tslib.__spreadArray([], tslib.__read(args), false));
          if (info && args[1] === 'body') {
            return insertRegion(this, dom, regions, info, info.plugin.manager);
          }
          return dom;
        };
      }
    }, {
      key: 'actions',
      label: i18nRuntime.i18n("c8caf94205105bac5833ab31cc2129d7"),
      renderMethod: 'renderFooter',
      wrapperResolve: function (dom) {
        return dom;
      }
    }];
    // 现在没用，后面弹窗优化后有用
    _this.events = [{
      eventName: 'confirm',
      eventLabel: i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18nRuntime.i18n("0c5a0448b07419ad2900c36867e8e4e0"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18nRuntime.i18n("ecfd82eb65102274188011a502913d3a")
          }
        }
      }]
    }, {
      eventName: 'cancel',
      eventLabel: i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18nRuntime.i18n("57f215184a2fb83541f7cfa22d039feb"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18nRuntime.i18n("ecfd82eb65102274188011a502913d3a")
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'confirm',
      actionLabel: i18nRuntime.i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18nRuntime.i18n("97b6bad87c4320faac2f6a5cf556c26c")
    }, {
      actionType: 'cancel',
      actionLabel: i18nRuntime.i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18nRuntime.i18n("909ba2872b2d670ec0ecbcacc4c8c833")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18nRuntime.i18n("ab3aec075a09d055b2a28c8b61925ee0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            type: 'input-text',
            name: 'title'
          }, {
            type: 'button-group-select',
            name: 'position',
            label: i18nRuntime.i18n("d4d2a66820d30e07b44c850eb3f116c0"),
            mode: 'horizontal',
            options: [{
              label: i18nRuntime.i18n("d2aff1417831aa621c16cd5b95306b4b"),
              value: 'left'
            }, {
              label: i18nRuntime.i18n("af767b7e4ae069d54f9ea839858d4c6d"),
              value: 'top'
            }, {
              label: i18nRuntime.i18n("4d9c32c23df5d234e629c922c58d8e12"),
              value: 'right'
            }, {
              label: i18nRuntime.i18n("3850a186c3235bc646d4c2f79cebac36"),
              value: 'bottom'
            }],
            pipeIn: amisEditorCore.defaultValue('right'),
            pipeOut: function (value) {
              return value ? value : 'right';
            },
            onChange: function (value, oldValue, model, form) {
              if (value === 'left' || value === 'right') {
                form.deleteValueByName('height');
              } else if (value === 'top' || value === 'bottom') {
                form.deleteValueByName('width');
              }
            }
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'overlay',
            label: i18nRuntime.i18n("bde8a41fc64bfe78d0c4951ac6f93718"),
            pipeIn: amisEditorCore.defaultValue(true)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'showCloseButton',
            label: i18nRuntime.i18n("8c8fbec263e20f087555c9abcb6dd07a"),
            pipeIn: amisEditorCore.defaultValue(true)
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'closeOnOutside',
            label: i18nRuntime.i18n("4a757588f5aee8cd039b1d166b096d1a")
          }), amisEditorCore.getSchemaTpl('switch', {
            label: i18nRuntime.i18n("f29ab26877ed22ffa59636d747d824b9"),
            name: 'closeOnEsc'
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'resizable',
            label: i18nRuntime.i18n("874cf31274d782914c7833cc39836c4e"),
            value: false
          }), amisEditorCore.getSchemaTpl('dataMap')]
        }])
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            type: 'button-group-select',
            name: 'size',
            label: i18nRuntime.i18n("c8339fd2a85af4ba66084d28df808de4"),
            size: 'sm',
            mode: 'horizontal',
            options: [{
              label: i18nRuntime.i18n("544fac400db790f57ea8ee4207cbeb6b"),
              value: ''
            }, {
              label: i18nRuntime.i18n("391b8fa9c747a1799353ab856e666ad5"),
              value: 'sm'
            }, {
              label: i18nRuntime.i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'md'
            }, {
              label: i18nRuntime.i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'lg'
            }, {
              label: i18nRuntime.i18n("949934d97c42801151673a51d3adc421"),
              value: 'xl'
            }],
            pipeIn: amisEditorCore.defaultValue(''),
            pipeOut: function (value) {
              return value ? value : undefined;
            }
          }, amisEditorCore.getSchemaTpl('style:widthHeight', {
            widthSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c28479019e24e0e4745f4948e9e97ee7"), i18nRuntime.i18n("94397b87ac63fe238c779120fadab024")),
              disabledOn: 'this.position === "top" || this.position === "bottom"'
            },
            heightSchema: {
              label: amisEditorCore.tipedLabel(i18nRuntime.i18n("c1df04eec5fa0857bc0df2d68d8e953c"), i18nRuntime.i18n("a6d91e801974dfa735a4ae0e098c522a")),
              disabledOn: 'this.position === "left" || this.position === "right" || !this.position'
            }
          })]
        }, {
          title: i18nRuntime.i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("5e5d3f13111593b2710673006d4c8297")
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("45ce37c24c6e7252d98c6d450e3ca4ad"),
            name: 'headClassName'
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("33be689a0f0de129ce37f7a96052002e"),
            name: 'bodyClassName'
          }), amisEditorCore.getSchemaTpl('className', {
            label: i18nRuntime.i18n("660553eee939d2bd8ea68172fa7216df"),
            name: 'footClassName'
          })]
        }])
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
  DrawerPlugin.prototype.buildSubRenderers = function () {};
  return DrawerPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(DrawerPlugin);

exports.DrawerPlugin = DrawerPlugin;
