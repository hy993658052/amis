/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __spreadArray, __read, __assign, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import set from 'lodash/set';
import get from 'lodash/get';
import { InputBox, Switch, Button, FormItem } from 'amis';
import { getSchemaTpl, autobind } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 组件选项组件的可视化编辑控件
 */
var NavSourceControl = /** @class */function (_super) {
  __extends(NavSourceControl, _super);
  function NavSourceControl(props) {
    var _this = _super.call(this, props) || this;
    _this.internalProps = ['checked', 'editing'];
    var source = 'custom';
    if (props.data.hasOwnProperty('source') && props.data.source) {
      var api = props.data.source;
      var url = typeof api === 'string' ? api : typeof api === 'object' ? api.url || '' : '';
      source = !url.indexOf('api://') ? 'apicenter' : 'api';
    }
    _this.state = {
      links: _this.transformOptions(props),
      api: props.data.source,
      source: source
    };
    return _this;
  }
  NavSourceControl.prototype.transformOptions = function (props) {
    var data = props.data;
    return Array.isArray(data.links) ? data.links : [];
  };
  /**
   * 更新options字段的统一出口
   */
  NavSourceControl.prototype.onChange = function () {
    var onBulkChange = this.props.onBulkChange;
    var source = this.state.source;
    var data = {
      source: undefined,
      links: undefined
    };
    if (source === 'custom') {
      var links = this.state.links;
      data.links = links;
    }
    if (source === 'api' || source === 'apicenter') {
      var api = this.state.api;
      data.source = api;
    }
    onBulkChange && onBulkChange(data);
    return;
  };
  /**
   * 切换选项类型
   */
  NavSourceControl.prototype.handleSourceChange = function (source) {
    this.setState({
      source: source
    }, this.onChange);
  };
  /**
   * 删除选项
   */
  NavSourceControl.prototype.handleDelete = function (index) {
    var _this = this;
    var links = this.state.links.concat();
    var indexArr = typeof index === 'string' ? index.split('_') : [index];
    var str = '';
    for (var i = 1; i < indexArr.length; i++) {
      var id = indexArr[i];
      if (i === indexArr.length - 1) {
        str += "children";
      } else {
        str += "children[".concat(id, "].");
      }
    }
    var originChildren = get(links[parseInt(indexArr[0])], str);
    originChildren.splice(indexArr[indexArr.length - 1], 1);
    this.setState({
      links: links
    }, function () {
      return _this.onChange();
    });
  };
  NavSourceControl.prototype.handleAdd = function () {
    var _this = this;
    var links = this.state.links;
    links.push({
      label: '',
      to: '',
      target: '',
      icon: '',
      unfolded: false,
      active: false,
      children: []
    });
    this.setState({
      links: links
    }, function () {
      _this.onChange();
    });
  };
  NavSourceControl.prototype.renderHeader = function () {
    var _this = this;
    var _a;
    var _b = this.props,
      render = _b.render,
      label = _b.label,
      labelRemark = _b.labelRemark,
      useMobileUI = _b.useMobileUI,
      env = _b.env,
      popOverContainer = _b.popOverContainer,
      hasApiCenter = _b.hasApiCenter;
    var classPrefix = (_a = env === null || env === void 0 ? void 0 : env.theme) === null || _a === void 0 ? void 0 : _a.classPrefix;
    var source = this.state.source;
    var optionSourceList = __spreadArray([{
      label: i18n("01820262aa9ad5b130f8f5b86bfd2968"),
      value: 'custom'
    }, {
      label: i18n("f99603414a616bdee85de0e6e3938b65"),
      value: 'api'
    }], __read(hasApiCenter ? [{
      label: i18n("e6ff6a97bf600c02942db3126a7077b8"),
      value: 'apicenter'
    }] : []), false).map(function (item) {
      return __assign(__assign({}, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default.createElement("header", {
      className: "ae-NavControl-header"
    }, React__default.createElement("label", {
      className: cx("".concat(classPrefix, "Form-label"))
    }, label || '', labelRemark ? render('label-remark', {
      type: 'remark',
      icon: labelRemark.icon || 'warning-mark',
      tooltip: labelRemark,
      className: cx("Form-lableRemark", labelRemark === null || labelRemark === void 0 ? void 0 : labelRemark.className),
      useMobileUI: useMobileUI,
      container: popOverContainer ? popOverContainer : env && env.getModalContainer ? env.getModalContainer : undefined
    }) : null), React__default.createElement("div", null, render('validation-control-addBtn', {
      type: 'dropdown-button',
      level: 'link',
      size: 'sm',
      label: '${selected}',
      align: 'right',
      closeOnClick: true,
      closeOnOutside: true,
      buttons: optionSourceList
    }, {
      popOverContainer: null,
      data: {
        selected: optionSourceList.find(function (item) {
          return item.value === source;
        }).label
      }
    })));
  };
  NavSourceControl.prototype.handleEditLabel = function (index, value, key) {
    var _this = this;
    var links = this.state.links.concat();
    var indexArr = typeof index === 'string' ? index.split('_') : [index];
    var str = '';
    for (var i = 1; i < indexArr.length; i++) {
      var id = indexArr[i];
      str += "children[".concat(id, "].");
    }
    str += key;
    set(links[parseInt(indexArr[0])], str, value);
    this.setState({
      links: links
    }, function () {
      return _this.onChange();
    });
  };
  NavSourceControl.prototype.handleAddChildren = function (index, value) {
    var _this = this;
    var links = this.state.links.concat();
    var indexArr = typeof index === 'string' ? index.split('_') : [index];
    var str = '';
    for (var i = 1; i < indexArr.length; i++) {
      var id = indexArr[i];
      str += "children[".concat(id, "].");
    }
    str += 'children';
    var originChildren = get(links[parseInt(indexArr[0])], str) || [];
    originChildren.push({
      label: '',
      to: '',
      target: '',
      icon: '',
      unfolded: false,
      active: false,
      children: []
    });
    if (value) {
      set(links[parseInt(indexArr[0])], str, originChildren);
    } else {
      set(links[parseInt(indexArr[0])], str, []);
    }
    this.setState({
      links: links
    }, function () {
      return _this.onChange();
    });
  };
  NavSourceControl.prototype.renderNav = function (props) {
    var _this = this;
    var index = props.index;
    var render = this.props.render;
    return React__default.createElement("div", {
      key: index
    }, React__default.createElement("div", {
      className: "ae-closeBtn",
      onClick: function () {
        _this.handleDelete(index);
      }
    }, "\u00D7"), React__default.createElement("div", {
      className: "ae-navControlLinks"
    }, "\u83DC\u5355\u540D\u79F0:", React__default.createElement(InputBox, {
      className: "ae-OptionControlItem-input",
      value: props.label,
      placeholder: "\u8BF7\u8F93\u5165\u83DC\u5355\u540D\u79F0",
      onChange: function (value) {
        return _this.handleEditLabel(index, value, 'label');
      }
    })), React__default.createElement("div", {
      className: "ae-navControlLinks"
    }, "\u8DF3\u8F6C\u5730\u5740:", React__default.createElement(InputBox, {
      className: "ae-OptionControlItem-input",
      value: props.to,
      placeholder: "\u8BF7\u8F93\u5165\u8DF3\u8F6C\u5730\u5740",
      onChange: function (value) {
        return _this.handleEditLabel(index, value, 'to');
      }
    })), React__default.createElement("div", {
      className: "ae-navControlLinks"
    }, "\u662F\u5426\u9700\u8981\u65B0\u5F00\u9875\u9762:", React__default.createElement(Switch, {
      value: props.target === '_parent',
      onChange: function (value) {
        return _this.handleEditLabel(index, value ? '_parent' : '_blank', 'target');
      }
    })), React__default.createElement("div", {
      style: {
        height: 40
      }
    }, render('container', getSchemaTpl('icon', {
      name: 'icon',
      label: i18n("5ef69f62dc668c1a3e68b51c50a2530a"),
      mode: 'horizontal',
      onChange: function (icon) {
        _this.handleEditLabel(index, icon, 'icon');
      },
      horizontal: {
        justify: true,
        left: 4
      }
    }))), React__default.createElement("div", {
      className: "ae-navControlLinks"
    }, "\u521D\u59CB\u662F\u5426\u6298\u53E0:", React__default.createElement(Switch, {
      value: props.unfolded,
      onChange: function (value) {
        return _this.handleEditLabel(index, value, 'unfolded');
      }
    })));
  };
  NavSourceControl.prototype.renderOption = function (props) {
    var _this = this;
    var index = props.index,
      children = props.children;
    return React__default.createElement("div", {
      className: "ae-OptionControlItem",
      key: index
    }, this.renderNav(props), React__default.createElement("div", {
      className: "ae-navControlLinks"
    }, "\u5305\u542B\u5B50\u83DC\u5355:", React__default.createElement(Switch, {
      value: !!(children && children.length),
      onChange: function (value) {
        return _this.handleAddChildren(index, value);
      }
    })), children && children.length ? React__default.createElement(React__default.Fragment, null, children.map(function (item, id) {
      return _this.renderOption(__assign(__assign({}, item), {
        index: "".concat(index, "_").concat(id)
      }));
    }), React__default.createElement(Button, {
      onClick: function () {
        return _this.handleAddChildren(index, true);
      }
    }, "\u65B0\u589E\u5B50\u83DC\u5355")) : null);
  };
  NavSourceControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  NavSourceControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      source = _a.source,
      api = _a.api;
    if (source === 'custom') {
      return null;
    }
    return render('api', getSchemaTpl('apiControl', {
      label: i18n("54ea89b497ec3bb319c68844dfa3687f"),
      name: 'source',
      mode: 'normal',
      className: 'ae-ExtendMore',
      visibleOn: 'data.autoComplete !== false',
      value: api,
      onChange: this.handleAPIChange,
      sourceType: source
    }));
  };
  NavSourceControl.prototype.render = function () {
    var _this = this;
    var _a = this.state,
      links = _a.links,
      source = _a.source;
    var className = this.props.className;
    return React__default.createElement("div", {
      className: cx('ae-NavControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default.createElement("div", {
      className: "ae-NavControl-wrapper"
    }, Array.isArray(links) && links.length ? React__default.createElement("div", {
      className: "ae-NavControl-content"
    }, links.map(function (option, index) {
      return _this.renderOption(__assign(__assign({}, option), {
        index: index
      }));
    })) : React__default.createElement("div", {
      className: "ae-NavControl-placeholder"
    }, "\u65E0\u9009\u9879"), React__default.createElement("div", {
      className: "ae-NavControl-footer"
    }, React__default.createElement(Button, {
      level: "enhance",
      onClick: this.handleAdd
    }, "\u6DFB\u52A0\u83DC\u5355"))) : null, this.renderApiPanel());
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleSourceChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleDelete", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleAdd", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Object, String]), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleEditLabel", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String, Boolean]), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleAddChildren", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], NavSourceControl.prototype, "handleAPIChange", null);
  return NavSourceControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(NavSourceControlRenderer, _super);
  function NavSourceControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  NavSourceControlRenderer = __decorate([FormItem({
    type: 'ae-navSourceControl',
    renderLabel: false
  })], NavSourceControlRenderer);
  return NavSourceControlRenderer;
})(NavSourceControl);

export { NavSourceControl as default };
