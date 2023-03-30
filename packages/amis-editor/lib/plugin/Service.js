/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amis = require('amis');
var React = require('react');
var amisEditorCore = require('amis-editor-core');
var helper = require('../renderer/event-control/helper.js');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ServicePlugin = /** @class */function (_super) {
  tslib.__extends(ServicePlugin, _super);
  function ServicePlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'service';
    _this.$schema = '/schemas/ServiceSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("6a06f12bdf3fc96df6cb45467b9a7c2c");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("9cc50da6bb17ea7ecf44c254c9b37619");
    _this.docLink = '/amis/zh-CN/components/service';
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-server';
    _this.pluginIcon = 'service-plugin';
    _this.scaffold = {
      type: 'service',
      body: [{
        type: 'tpl',
        tpl: i18nRuntime.i18n("2d711b09bd0db0ad240cc83b30dd8014"),
        wrapperComponent: '',
        inline: false
      }]
    };
    _this.previewSchema = {
      type: 'tpl',
      wrapperComponent: '',
      tpl: i18nRuntime.i18n("c5a33208cf3deab68cd9fe34679edff6")
    };
    _this.regions = [{
      key: 'body',
      label: i18nRuntime.i18n("132a78bdf68d6d17bde00aa807bbf032")
    }];
    _this.events = [{
      eventName: 'init',
      eventLabel: i18nRuntime.i18n("2cb472ff9cad0c89a033c53996b52053"),
      description: i18nRuntime.i18n("76ddcc0ad85aa4be6875b73244a64faf"),
      dataSchema: [{
        type: 'object',
        properties: {
          'event.data': {
            type: 'object',
            title: i18nRuntime.i18n("584e4b6108e132be92c9de09d7bbed72")
          }
        }
      }]
    }, {
      eventName: 'fetchInited',
      eventLabel: i18nRuntime.i18n("9328b90ded33d16a873db5c0dbd815b8"),
      description: i18nRuntime.i18n("f3b97bd71a77cca1e9288089a537cf3b")
    }, {
      eventName: 'fetchSchemaInited',
      eventLabel: i18nRuntime.i18n("a6eebb9b4fc7148e2dc41335c74e6393"),
      description: i18nRuntime.i18n("887954cd9bdb290003984fe9a6eb99e2")
    }];
    _this.actions = [{
      actionType: 'reload',
      actionLabel: i18nRuntime.i18n("64ca9bab920a2983bcf270320d850d00"),
      description: i18nRuntime.i18n("9ef5597ac0b4da662bcd967da37eceb4")
    }, {
      actionType: 'rebuild',
      actionLabel: i18nRuntime.i18n("f885d4055567877facf0a3ff376a114e"),
      description: i18nRuntime.i18n("c8f0e77a9eb5de26e6ab62695d8494b6")
    }, {
      actionType: 'setValue',
      actionLabel: i18nRuntime.i18n("e22855f53b7a1ab33e920375c0cd0e3d"),
      description: i18nRuntime.i18n("8b10146a8a896b890b3796eefcc3c6d3")
    }];
    _this.panelTitle = i18nRuntime.i18n("47d68cd0f4c3e91a86d23afe8afccfb8");
    _this.panelBodyCreator = function (context) {
      console.log(context);
      console.log(context.node.parent);
      console.log(context.node.parent.getComponent());
      return amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("24d67862f87f439db7ca957aecb77cce"),
        className: 'p-none',
        body: [amisEditorCore.getSchemaTpl('collapseGroup', [{
          title: i18nRuntime.i18n("4092ed98e9035652d4c9ca9441701ed7"),
          body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
            value: 'left-top'
          }), amisEditorCore.getSchemaTpl('name'), {
            children: React__default["default"].createElement(amis.Button, {
              level: "info",
              size: "sm",
              className: "m-b-sm",
              block: true,
              onClick: function () {
                // this.manager.showInsertPanel('body', context.id);
                _this.manager.showRendererPanel('');
              }
            }, "\u6DFB\u52A0\u5185\u5BB9")
          }]
        }, {
          title: i18nRuntime.i18n("31f8a7a967286a16eb404e3ba237619e"),
          body: [amisEditorCore.getSchemaTpl('apiControl', {
            name: 'api',
            label: i18nRuntime.i18n("31f8a7a967286a16eb404e3ba237619e"),
            messageDesc: i18nRuntime.i18n("54f876a529283de5668426b2dc8adb15")
          }), {
            name: 'ws',
            type: 'input-text',
            label: i18nRuntime.i18n("7fa237c1b62d04aaec0144d1fc89d620")
          }, /** initFetchOn可以通过api的sendOn属性控制 */
          amisEditorCore.getSchemaTpl('switch', {
            name: 'initFetch',
            label: i18nRuntime.i18n("9dfeacc54ab6cd6d2ac08df387777f9e"),
            visibleOn: 'this.api'
          }), {
            name: 'interval',
            label: i18nRuntime.i18n("2af32ab13a9dece315cec2764d6aa7d4"),
            visibleOn: 'this.api',
            type: 'input-number',
            step: 500,
            description: i18nRuntime.i18n("9800f1ce2f78a23b81c8d944ebf9cce9")
          }, amisEditorCore.getSchemaTpl('switch', {
            name: 'silentPolling',
            label: i18nRuntime.i18n("98223d478e88ccbc2406412a46dda8c2"),
            visibleOn: '!!data.interval',
            description: i18nRuntime.i18n("71ae1c76cc4160f8fb76e404e35ca08f")
          }), {
            name: 'stopAutoRefreshWhen',
            label: i18nRuntime.i18n("b897babfafd35cc5d6e66470115c93cf"),
            type: 'input-text',
            visibleOn: '!!data.interval',
            description: i18nRuntime.i18n("32e3a79e80dcf7f7304e8092dd7acc6f")
          }]
        }, {
          title: i18nRuntime.i18n("11bcbff684dfe6edf36e1fd1adc5ba30"),
          body: [amisEditorCore.getSchemaTpl('apiControl', {
            name: 'schemaApi',
            label: i18nRuntime.i18n("8cc3239eba9fe65b99242adb33634b33")
          }), amisEditorCore.getSchemaTpl('switch', {
            name: 'initFetchSchema',
            label: i18nRuntime.i18n("3f423669b0ffeb3993b95085cd8a111e"),
            visibleOn: 'this.schemaApi'
          })]
        }, {
          title: i18nRuntime.i18n("8e8aaafe8db0d8eb05e3b11550cbabe7"),
          body: [amisEditorCore.getSchemaTpl('loadingConfig', {}, {
            context: context
          }), amisEditorCore.getSchemaTpl('data'), {
            type: 'js-editor',
            allowFullscreen: true,
            name: 'dataProvider',
            label: i18nRuntime.i18n("7481babe858320dd6a4adcf307fd151d"),
            description: i18nRuntime.i18n("bfdee34e14602e3113c88a9145843e86")
          }, {
            label: i18nRuntime.i18n("b64292a1903bd969d0e3a558c334f5bf"),
            type: 'combo',
            name: 'messages',
            multiLine: true,
            description: i18nRuntime.i18n("54f876a529283de5668426b2dc8adb15"),
            items: [amisEditorCore.getSchemaTpl('fetchSuccess'), amisEditorCore.getSchemaTpl('fetchFailed')]
          }]
        }, {
          title: i18nRuntime.i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
          body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
        }])]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('className')]
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
  ServicePlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
    if (e === 'fetchInited') {
      var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
      var jsonschema = tslib.__assign({
        $id: 'serviceFetchInitedData'
      }, amisEditorCore.jsonToJsonSchema(data));
      scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
      scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
    }
  };
  return ServicePlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(ServicePlugin);

exports.ServicePlugin = ServicePlugin;
