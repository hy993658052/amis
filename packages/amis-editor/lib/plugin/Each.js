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

var EachPlugin = /** @class */function (_super) {
  tslib.__extends(EachPlugin, _super);
  function EachPlugin() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    // 关联渲染器名字
    _this.rendererName = 'each';
    _this.$schema = '/schemas/EachSchema.json';
    // 组件名称
    _this.name = i18nRuntime.i18n("ff9f6c2d74c413daa3cd6fb12f8dfd3e");
    _this.isBaseComponent = true;
    _this.description = i18nRuntime.i18n("f34111ff3694a6c6de6e31bef8ebadcb");
    _this.tags = [i18nRuntime.i18n("997c7a5d34f6fc628893f509d0df32e0")];
    _this.icon = 'fa fa-repeat';
    _this.pluginIcon = 'each-plugin';
    _this.scaffold = {
      type: 'each',
      name: 'arr',
      items: {
        type: 'tpl',
        tpl: i18nRuntime.i18n("874268022baac239b06c40600d3ce080"),
        wrapperComponent: '',
        inline: false
      }
    };
    _this.previewSchema = tslib.__assign(tslib.__assign({}, _this.scaffold), {
      value: ['a', 'b', 'c']
    });
    _this.panelTitle = i18nRuntime.i18n("69bdc66bb88ac5b63053e2bb7db41801");
    _this.panelBodyCreator = function (context) {
      return [amisEditorCore.getSchemaTpl('layout:originPosition', {
        value: 'left-top'
      }), {
        type: 'input-text',
        name: 'name',
        label: i18nRuntime.i18n("0a2907a421b8f980986117e4f3044f92"),
        placeholder: 'varname',
        description: i18nRuntime.i18n("b7c16dedc4291d333fba7628ec9eb073")
      }, {
        children: React__default["default"].createElement(amis.Button, {
          size: "sm",
          level: "danger",
          className: "m-b",
          block: true,
          onClick: _this.editDetail.bind(_this, context.id)
        }, "\u914D\u7F6E\u6210\u5458\u6E32\u67D3\u5668")
      }, amisEditorCore.getSchemaTpl('placeholder', {
        label: i18nRuntime.i18n("4c1cff4d8c05daa6ed9352a241ee628c"),
        pipeIn: amisEditorCore.defaultValue(i18nRuntime.i18n("4726ff4e62d3fcfa4b090aaefc393229")),
        description: i18nRuntime.i18n("5d5f9d49fcb2109f94a43590ef796ca7")
      }), amisEditorCore.getSchemaTpl('className')];
    };
    return _this;
  }
  EachPlugin.prototype.filterProps = function (props) {
    props = amisEditorCore.JSONPipeOut(props);
    // 至少显示一个成员，否则啥都不显示。
    if (!props.value) {
      props.value = [{
        item: 'mocked data'
      }];
    }
    return props;
  };
  EachPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
    var id = _a.id,
      info = _a.info;
    if (info.renderer.name === 'each') {
      toolbars.push({
        icon: 'fa fa-expand',
        order: 100,
        tooltip: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onClick: this.editDetail.bind(this, id)
      });
    }
  };
  EachPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
    var id = _a.id;
      _a.schema;
      _a.region;
      var info = _a.info,
      selections = _a.selections;
    if (selections.length || (info === null || info === void 0 ? void 0 : info.plugin) !== this) {
      return;
    }
    if (info.renderer.name === 'each') {
      menus.push('|', {
        label: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
        onSelect: this.editDetail.bind(this, id)
      });
    }
  };
  EachPlugin.prototype.editDetail = function (id) {
    var manager = this.manager;
    var store = manager.store;
    var node = store.getNodeById(id);
    var value = store.getValueOf(id);
    node && value && this.manager.openSubEditor({
      title: i18nRuntime.i18n("39a6853b109ae98f1aabca90283d7edc"),
      value: value.items,
      slot: {
        type: 'container',
        body: '$$'
      },
      typeMutable: true,
      onChange: function (newValue) {
        newValue = tslib.__assign(tslib.__assign({}, value), {
          items: newValue
        });
        manager.panelChangeValue(newValue, amisEditorCore.diff(value, newValue));
      },
      data: {
        item: 'mocked data',
        index: 0
      }
    });
  };
  EachPlugin.scene = ['layout'];
  return EachPlugin;
}(amisEditorCore.BasePlugin);
amisEditorCore.registerEditorPlugin(EachPlugin);

exports.EachPlugin = EachPlugin;
