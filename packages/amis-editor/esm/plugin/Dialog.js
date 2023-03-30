/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign } from 'tslib';
import React__default from 'react';
import { noop, getSchemaTpl, defaultValue, BasePlugin, registerEditorPlugin } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper.js';
import { i18n } from 'i18n-runtime';

var DialogPlugin = /** @class */function (_super) {
  __extends(DialogPlugin, _super);
  function DialogPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'dialog';
    _this.$schema = '/schemas/DialogSchema.json';
    // 组件名称
    _this.name = i18n("ab3aec075a09d055b2a28c8b61925ee0");
    _this.isBaseComponent = true;
    _this.wrapperProps = {
      wrapperComponent: InlineModal,
      onClose: noop,
      show: true
    };
    _this.regions = [{
      key: 'body',
      label: i18n("132a78bdf68d6d17bde00aa807bbf032"),
      renderMethod: 'renderBody',
      renderMethodOverride: function (regions, insertRegion) {
        return function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          var info = this.props.$$editor;
          var dom = this.super.apply(this, __spreadArray([], __read(args), false));
          if (info && args[1] === 'body') {
            return insertRegion(this, dom, regions, info, info.plugin.manager);
          }
          return dom;
        };
      }
    }, {
      key: 'actions',
      label: i18n("c8caf94205105bac5833ab31cc2129d7"),
      renderMethod: 'renderFooter',
      wrapperResolve: function (dom) {
        return dom;
      }
    }];
    // 现在没用，后面弹窗优化后有用
    _this.events = [{
      eventName: 'confirm',
      eventLabel: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18n("773ddc154f1e9b80f04e8bc9d83d2caf"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("e9b91e9101059dc2e234d9847dd7b003")
          }
        }
      }]
    }, {
      eventName: 'cancel',
      eventLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18n("08ab4ffcd1bddd249a193e6353bb52bb"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18n("e9b91e9101059dc2e234d9847dd7b003")
          }
        }
      }]
    }];
    _this.actions = [{
      actionType: 'confirm',
      actionLabel: i18n("e83a256e4f5bb4ff8b3d804b5473217a"),
      description: i18n("4708bcefff645287c8781a1de2a0f20b")
    }, {
      actionType: 'cancel',
      actionLabel: i18n("625fb26b4b3340f7872b411f401e754c"),
      description: i18n("af17a4e37e5c6d68fff33c084192801b")
    }, {
      actionType: 'setValue',
      actionLabel: i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18n("0310aa5a05fe07147d8b7ef20616f659")
    }];
    _this.panelTitle = i18n("ab3aec075a09d055b2a28c8b61925ee0");
    _this.panelJustify = true;
    _this.panelBodyCreator = function (context) {
      return getSchemaTpl('tabs', [{
        title: i18n("24d67862f87f439db7ca957aecb77cce"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), {
            label: i18n("32c65d8d7431e76029678ec7bb73a5ab"),
            type: 'input-text',
            name: 'title'
          }, getSchemaTpl('switch', {
            label: i18n("8c8fbec263e20f087555c9abcb6dd07a"),
            name: 'showCloseButton',
            value: true
          }), getSchemaTpl('switch', {
            label: i18n("f29ab26877ed22ffa59636d747d824b9"),
            name: 'closeOnEsc',
            value: false
          }), getSchemaTpl('switch', {
            label: i18n("dcba76890a534e1fe94421be2a17b484"),
            name: 'showErrorMsg',
            value: true
          }), getSchemaTpl('switch', {
            label: i18n("af5876b89583552eef4c781718886dec"),
            name: 'showLoading',
            value: true
          }), getSchemaTpl('dataMap')]
        }])
      }, {
        title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: getSchemaTpl('collapseGroup', [{
          title: i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [{
            label: i18n("c8339fd2a85af4ba66084d28df808de4"),
            type: 'button-group-select',
            name: 'size',
            size: 'sm',
            options: [{
              label: i18n("544fac400db790f57ea8ee4207cbeb6b"),
              value: ''
            }, {
              label: i18n("391b8fa9c747a1799353ab856e666ad5"),
              value: 'sm'
            }, {
              label: i18n("aed1dfbc31703955e64806b799b67645"),
              value: 'md'
            }, {
              label: i18n("ab18e30c0dc4093ceeda8961fac3d1f4"),
              value: 'lg'
            }, {
              label: i18n("949934d97c42801151673a51d3adc421"),
              value: 'xl'
            }],
            pipeIn: defaultValue(''),
            pipeOut: function (value) {
              return value ? value : undefined;
            }
          }]
        }, {
          title: i18n("261bba7ad82914e477f4b37f6a83874e"),
          body: [getSchemaTpl('className', {
            name: 'className',
            label: i18n("5e5d3f13111593b2710673006d4c8297")
          }), getSchemaTpl('className', {
            name: 'bodyClassName',
            label: i18n("33be689a0f0de129ce37f7a96052002e")
          })]
        }])
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
  DialogPlugin.prototype.buildSubRenderers = function () {};
  return DialogPlugin;
}(BasePlugin);
registerEditorPlugin(DialogPlugin);
var InlineModal = /** @class */function (_super) {
  __extends(InlineModal, _super);
  function InlineModal() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  InlineModal.prototype.componentDidMount = function () {};
  InlineModal.prototype.render = function () {
    var children = this.props.children;
    return React__default.createElement("div", {
      className: "ae-InlineModel"
    }, children);
  };
  return InlineModal;
}(React__default.Component);

export { DialogPlugin, InlineModal };
