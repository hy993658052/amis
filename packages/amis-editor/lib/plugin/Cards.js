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
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardsPlugin = /** @class */function (_super) {
  tslib.__extends(CardsPlugin, _super);
  function CardsPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'cards';
    _this.$schema = '/schemas/CardsSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("093c340f7e1fbde1928ca56b5c7f9cc4");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("85c17b016309a3f867a1803049b3bcd8");
    _this.docLink = '/amis/zh-CN/components/cards';
    _this.tags = [i18nRuntime.i18n("027446c2f9070b0f5b16a18208bf5fc7")];
    _this.icon = 'fa fa-window-maximize';
    _this.pluginIcon = 'cards-plugin';
    _this.scaffold = {
      type: 'cards',
      data: {
        items: [{
          a: 1,
          b: 2
        }, {
          a: 3,
          b: 4
        }]
      },
      columnsCount: 2,
      card: {
        type: 'card',
        className: 'm-b-none',
        header: {
          title: i18nRuntime.i18n("32c65d8d7431e76029678ec7bb73a5ab"),
          subTitle: i18nRuntime.i18n("72cf373be86a38b29f6d2f15900b0da1")
        },
        body: [{
          name: 'a',
          label: 'A'
        }, {
          name: 'b',
          label: 'B'
        }],
        actions: [{
          label: i18nRuntime.i18n("f26225bde6a250894a04db4c53ea03d0"),
          type: 'button'
        }]
      }
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      className: 'text-left '
    });
    _this.panelTitle = i18nRuntime.i18n("6223c41373004e3111e768225450b4e8");
    _this.panelBodyCreator = function (context) {
      var _a, _b;
      var isCRUDBody = context.schema.type === 'crud';
      var curPosition = (_b = (_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.position;
      var isAbsolute = curPosition === 'fixed' || curPosition === 'absolute';
      return [amisEditorCore.getSchemaTpl('tabs', [{
        title: i18nRuntime.i18n("22b777e6fcb613b8ba83ced9594cd07e"),
        body: [amisEditorCore.getSchemaTpl('layout:originPosition', {
          visibleOn: isAbsolute ? isAbsolute : undefined,
          value: 'left-top'
        }), {
          children: React__default["default"].createElement("div", {
            className: "m-b"
          }, React__default["default"].createElement(amis.Button, {
            level: "success",
            size: "sm",
            block: true,
            onClick: _this.editDetail.bind(_this, context.id)
          }, "\u914D\u7F6E\u5355\u9879\u4FE1\u606F"))
        }, {
          type: 'divider'
        }, amisEditorCore.getSchemaTpl('title'), {
          name: 'href',
          type: 'input-text',
          label: i18nRuntime.i18n("a3f38735bf211edb2066ac4e51b55cb2")
        }, isCRUDBody ? null : {
          name: 'source',
          type: 'input-text',
          label: i18nRuntime.i18n("c11322c9cc43ce3c004cf03f5ac0acd0"),
          pipeIn: amisEditorCore.defaultValue('${items}'),
          description: i18nRuntime.i18n("7ea26d0cb93e59339daf6a1ac68624f3"),
          test: !isCRUDBody
        }, amisEditorCore.getSchemaTpl('cardsPlaceholder')]
      }, {
        title: i18nRuntime.i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
        body: [amisEditorCore.getSchemaTpl('switch', {
          name: 'showHeader',
          label: i18nRuntime.i18n("e18d033cc4baab3ebb329f6b29eb3cef"),
          pipeIn: amisEditorCore.defaultValue(true)
        }), amisEditorCore.getSchemaTpl('switch', {
          name: 'showFooter',
          label: i18nRuntime.i18n("412593f58b9d062a43cbe2ce38f4dc65"),
          pipeIn: amisEditorCore.defaultValue(true)
        }), amisEditorCore.getSchemaTpl('className', {
          label: i18nRuntime.i18n("4434b33a8731a73613ba5fa1eb984efb")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'headerClassName',
          label: i18nRuntime.i18n("e494f1aa112068688ca863db7f39a0b5")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'footerClassName',
          label: i18nRuntime.i18n("d267231d2d8b60e267acc7d7d9955ae2")
        }), amisEditorCore.getSchemaTpl('className', {
          name: 'itemsClassName',
          label: i18nRuntime.i18n("af1af0a7fad9e8bdcd21694d0e036e12")
        }), amisEditorCore.getSchemaTpl('className', {
          pipeIn: amisEditorCore.defaultValue('Grid-col--sm6 Grid-col--md4 Grid-col--lg3'),
          name: 'itemClassName',
          label: i18nRuntime.i18n("b2d2593bfb7a627817c0bd1ef6a254a8")
        }), {
          name: 'columnsCount',
          type: 'input-range',
          visibleOn: '!this.leftFixed',
          min: 0,
          max: 12,
          step: 1,
          label: i18nRuntime.i18n("58e78d512d9ff40c73a263ab616cc652"),
          description: i18nRuntime.i18n("3cf0da9fe51f92842e0a6d375fa5c605")
        }, amisEditorCore.getSchemaTpl('switch', {
          name: 'masonryLayout',
          label: i18nRuntime.i18n("953e91f3df59837ac2965cc04dec4b0d")
        })]
      }, {
        title: i18nRuntime.i18n("33bf801796fd255b5f6147e33146669b"),
        body: [amisEditorCore.getSchemaTpl('ref'), amisEditorCore.getSchemaTpl('visible')]
      }])];
    };
    return _this;
  }
  CardsPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
      value: tslib.__assign({
        type: 'card'
      }, value.card),
      slot: {
        type: 'container',
        body: '$$'
      },
      typeMutable: false,
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          card: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      },
      data: {
        item: 'mocked data',
        index: 0
      }
    });
  };
  CardsPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info,
      schema = _a.schema;
    if (info.renderer.name === 'cards' || info.renderer.name === 'crud' && schema.mode === 'cards') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  CardsPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id,
      schema = _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'cards' || info.renderer.name === 'crud' && schema.mode === 'cards') {
      menus.push('|', {
        label: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  CardsPlugin.prototype.filterProps = function (props) {
    var data = tslib.__assign(tslib.__assign({}, props.defaultData), props.data);
    var arr = Array.isArray(props.value) ? props.value : typeof props.source === 'string' ? amis.resolveVariable(props.source, data) : amis.resolveVariable('items', data);
    if (!Array.isArray(arr) || !arr.length) {
      var mockedData = {
        id: 666,
        title: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
        description: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
        a: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3"),
        b: i18nRuntime.i18n("6cb01692eea2fa7066d20fe2b6ccaea3")
      };
      props.value = amisEditorCore.repeatArray(mockedData, 1).map(function (item, index) {
        return tslib.__assign(tslib.__assign({}, item), {
          id: index + 1
        });
      });
    }
    var $schema = props.$schema,
      rest = tslib.__rest(props, ["$schema"]);
    return tslib.__assign(tslib.__assign({}, amisEditorCore.JSONPipeOut(rest)), {
      $schema: $schema
    });
  };
  CardsPlugin.prototype.getRendererInfo = function (context) {
    var _a;
    var plugin = this;
    var renderer = context.renderer,
      schema = context.schema;
    if (!schema.$$id && ((_a = schema.$$editor) === null || _a === void 0 ? void 0 : _a.renderer.name) === 'crud' && renderer.name === 'cards') {
      return tslib.__assign(tslib.__assign({}, {
        id: schema.$$editor.id
      }), {
        name: plugin.name,
        regions: plugin.regions,
        patchContainers: plugin.patchContainers,
        vRendererConfig: plugin.vRendererConfig,
        wrapperProps: plugin.wrapperProps,
        wrapperResolve: plugin.wrapperResolve,
        filterProps: plugin.filterProps,
        $schema: plugin.$schema,
        renderRenderer: plugin.renderRenderer
      });
    }
    return _super.prototype.getRendererInfo.call(this, context);
  };
  CardsPlugin.scene = ['layout'];
  return CardsPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(CardsPlugin);

exports.CardsPlugin = CardsPlugin;
