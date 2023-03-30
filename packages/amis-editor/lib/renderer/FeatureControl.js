/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var reactDom = require('react-dom');
var cx = require('classnames');
var amis = require('amis');
var _ = require('lodash');
var GoConfigControl = require('./GoConfigControl.js');
var Sortable = require('sortablejs');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

/**
 * @file 控制功能开关的控件，这里的功能指需要加子组件来支持的功能
 */
var klass = 'ae-FeatureControl';
var FeatureControl = /** @class */function (_super) {
  tslib.__extends(FeatureControl, _super);
  function FeatureControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = FeatureControl.initState(props.data, props.features);
    return _this;
  }
  FeatureControl.getDerivedStateFromProps = function (nextProps, preState) {
    return FeatureControl.initState(nextProps.data, nextProps.features, preState.inUseFeat, preState.unUseFeat);
  };
  FeatureControl.initState = function (data, features, lastInUseFeat, lastUnUseFeat) {
    var inUseFeat = [];
    var unUseFeat = [];
    if (!Array.isArray(features)) {
      features = features(data);
    }
    features.forEach(function (item) {
      var _a;
      if (item.isActive == null || ((_a = item.isActive) === null || _a === void 0 ? void 0 : _a.call(item, data))) {
        inUseFeat.push(item);
      } else if (item.add) {
        unUseFeat.push(item);
      }
    });
    return {
      inUseFeat: inUseFeat,
      unUseFeat: unUseFeat
    };
  };
  FeatureControl.prototype.handleRemove = function (item, index) {
    var _a;
    var _b = this.props,
      removeFeature = _b.removeFeature,
      data = _b.data,
      onBulkChange = _b.onBulkChange;
    var _c = this.state,
      inUseFeat = _c.inUseFeat,
      unUseFeat = _c.unUseFeat;
    (_a = item.remove) === null || _a === void 0 ? void 0 : _a.call(item, data);
    removeFeature === null || removeFeature === void 0 ? void 0 : removeFeature(item, data);
    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(data);
    _.remove(inUseFeat, item);
    item.add && unUseFeat.push(item);
    this.setState({
      inUseFeat: inUseFeat,
      unUseFeat: unUseFeat
    });
  };
  FeatureControl.prototype.handleAdd = function (item) {
    var _a;
    var _b = this.props,
      addFeature = _b.addFeature,
      data = _b.data,
      onBulkChange = _b.onBulkChange;
    var _c = this.state,
      inUseFeat = _c.inUseFeat,
      unUseFeat = _c.unUseFeat;
    inUseFeat.push(item);
    _.remove(unUseFeat, item);
    var schema = _.clone(data);
    (_a = item.add) === null || _a === void 0 ? void 0 : _a.call(item, schema);
    addFeature === null || addFeature === void 0 ? void 0 : addFeature(item, schema);
    onBulkChange === null || onBulkChange === void 0 ? void 0 : onBulkChange(schema);
  };
  FeatureControl.prototype.dragRef = function (ref) {
    var sortable = this.props.sortable;
    if (!sortable) {
      return;
    }
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  /**
   * 初始化拖动
   */
  FeatureControl.prototype.initDragging = function () {
    var _this = this;
    var dom = reactDom.findDOMNode(this);
    this.sortable = new Sortable__default["default"](dom.querySelector(".".concat(klass, "-features")), {
      group: 'FeatureControlGroup',
      animation: 150,
      handle: ".".concat(klass, "Item-dragBar"),
      ghostClass: "".concat(klass, "Item-dragging"),
      onEnd: function (e) {
        // 没有移动
        if (e.newIndex === e.oldIndex) {
          return;
        }
        // 换回来
        var parent = e.to;
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var value = _this.state.inUseFeat.concat();
        value[e.oldIndex] = value.splice(e.newIndex, 1, value[e.oldIndex])[0];
        _this.setState({
          inUseFeat: value
        }, function () {
          var _a, _b;
          (_b = (_a = _this.props).onSort) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        });
      }
    });
  };
  /**
   * 拖动的销毁
   */
  FeatureControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  FeatureControl.prototype.renderItem = function (item, index) {
    var _this = this;
    var _a = this.props,
      sortable = _a.sortable,
      goFeatureComp = _a.goFeatureComp;
      _a.node;
      var manager = _a.manager;
    var content = null;
    if (goFeatureComp) {
      content =
      // @ts-ignore
      React__default["default"].createElement(GoConfigControl.GoConfigControl, {
        className: cx__default["default"]("".concat(klass, "Item-go")),
        label: item.label,
        manager: manager,
        compId: function () {
          return goFeatureComp(item);
        }
      });
    } else {
      content = React__default["default"].createElement("div", {
        className: cx__default["default"]("".concat(klass, "Item-label"))
      }, item.label);
    }
    return React__default["default"].createElement("li", {
      className: klass + 'Item',
      key: index
    }, sortable && React__default["default"].createElement("a", {
      className: klass + 'Item-dragBar'
    }, React__default["default"].createElement(amis.Icon, {
      icon: "drag-bar",
      className: "icon"
    })), content, React__default["default"].createElement(amis.Button, {
      className: klass + 'Item-action',
      onClick: function () {
        return _this.handleRemove(item, index);
      }
    }, React__default["default"].createElement(amis.Icon, {
      icon: "delete-btn",
      className: "icon"
    })));
  };
  FeatureControl.prototype.renderAction = function () {
    var _this = this;
    var _a = this.props,
      addable = _a.addable,
      addText = _a.addText,
      render = _a.render;
    if (!addable) {
      return null;
    }
    return render('action', {
      type: 'dropdown-button',
      closeOnClick: true,
      label: i18nRuntime.i18n("b58c7549c0246c55b9cac96383200338") || addText,
      className: "".concat(klass, "-action"),
      btnClassName: "".concat(klass, "-action--btn"),
      menuClassName: "".concat(klass, "-action--menus"),
      buttons: this.state.unUseFeat.map(function (item) {
        return {
          label: item.label,
          onClick: function () {
            return _this.handleAdd(item);
          }
        };
      }, {
        popOverContainer: null // amis 渲染挂载节点会使用 this.target
      })
    });
  };

  FeatureControl.prototype.render = function () {
    var _this = this;
    var className = this.props.className;
    return React__default["default"].createElement("div", {
      className: cx__default["default"]('ae-FeatureControl', className)
    }, React__default["default"].createElement("ul", {
      className: cx__default["default"]('ae-FeatureControl-features'),
      ref: this.dragRef
    }, this.state.inUseFeat.map(function (item, index) {
      return _this.renderItem(item, index);
    })), this.renderAction());
  };
  tslib.__decorate([amis.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object, Number]), tslib.__metadata("design:returntype", void 0)], FeatureControl.prototype, "handleRemove", null);
  tslib.__decorate([amis.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], FeatureControl.prototype, "handleAdd", null);
  tslib.__decorate([amis.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], FeatureControl.prototype, "dragRef", null);
  return FeatureControl;
}(React__default["default"].Component);
/** @class */(function (_super) {
  tslib.__extends(FeatureControlRenderer, _super);
  function FeatureControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FeatureControlRenderer = tslib.__decorate([amis.FormItem({
    type: 'ae-feature-control'
  })], FeatureControlRenderer);
  return FeatureControlRenderer;
})(FeatureControl);

exports["default"] = FeatureControl;
