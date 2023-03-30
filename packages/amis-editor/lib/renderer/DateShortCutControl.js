/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var Sortable = require('sortablejs');
var reactDom = require('react-dom');
var amis = require('amis');
var amisEditorCore = require('amis-editor-core');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var Sortable__default = /*#__PURE__*/_interopDefaultLegacy(Sortable);

var RangeType;
(function (RangeType) {
  RangeType["Normal"] = "Normal";
  RangeType["Custom"] = "Custom";
})(RangeType || (RangeType = {}));
var ShortCutItemWrap = function (props) {
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("a", {
    className: klass + 'Item-dragBar'
  }, React__default["default"].createElement(amis.Icon, {
    icon: "drag-bar",
    className: "icon"
  })), React__default["default"].createElement("span", {
    className: klass + 'Item-content'
  }, props.children), React__default["default"].createElement("span", {
    className: klass + 'Item-close',
    onClick: function (e) {
      return props.handleDelete(props.index, e);
    }
  }, React__default["default"].createElement(amis.Icon, {
    icon: "status-close",
    className: "icon"
  })));
};
var klass = 'ae-DateShortCutControl';
var DateShortCutControl = /** @class */function (_super) {
  tslib.__extends(DateShortCutControl, _super);
  function DateShortCutControl(props) {
    var _this = this;
    var _a;
    _this = _super.call(this, props) || this;
    var normalDropDownOption = props.normalDropDownOption,
      customDropDownOption = props.customDropDownOption,
      data = props.data;
    _this.normalDropDownOptionArr = Object.keys(normalDropDownOption).map(function (key) {
      return {
        label: normalDropDownOption[key],
        value: key
      };
    });
    _this.customDropDownOptionArr = Object.keys(customDropDownOption).map(function (key) {
      return {
        label: customDropDownOption[key],
        value: key
      };
    });
    var defaultRanges = ['yesterday', '7daysago', 'prevweek', 'thismonth', 'prevmonth', 'prevquarter'];
    _this.state = {
      options: ((_a = data === null || data === void 0 ? void 0 : data.ranges) !== null && _a !== void 0 ? _a : defaultRanges).map(function (item, index) {
        var _a;
        var arr = item.match(/^(\d+)[a-zA-Z]+/);
        if (arr) {
          return {
            value: arr[1],
            type: RangeType.Custom,
            inputType: (_a = item.match(/[a-zA-Z]+/)) === null || _a === void 0 ? void 0 : _a[0]
          };
        }
        return {
          label: normalDropDownOption[item],
          value: item,
          type: RangeType.Normal
        };
      })
    };
    return _this;
  }
  DateShortCutControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  /*
   * 滚动到底部
   */
  DateShortCutControl.prototype.scrollToBottom = function () {
    var _a, _b;
    this.drag && ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    }));
  };
  /**
   * 初始化拖动
   */
  DateShortCutControl.prototype.initDragging = function () {
    var _this = this;
    var dom = reactDom.findDOMNode(this);
    this.sortable = new Sortable__default["default"](dom.querySelector(".".concat(klass, "-content")), {
      group: 'OptionControlGroup',
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
        var options = _this.state.options.concat();
        options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
        _this.setState({
          options: options
        }, function () {
          return _this.onChangeOptions();
        });
      }
    });
  };
  /**
   * 拖动的销毁
   */
  DateShortCutControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  /**
   * 生成内容体
   */
  DateShortCutControl.prototype.renderContent = function () {
    var _this = this;
    var options = this.state.options;
    return React__default["default"].createElement("div", {
      className: klass + '-wrapper'
    }, options && options.length ? React__default["default"].createElement("ul", {
      className: klass + '-content',
      ref: this.dragRef
    }, options.map(function (option, index) {
      return React__default["default"].createElement("li", {
        className: klass + 'Item',
        key: index
      }, option.type === RangeType.Normal ? _this.renderNormalOption(option, index) : _this.renderCustomOption(option, index));
    })) : React__default["default"].createElement("div", {
      className: klass + '-content ' + klass + '-empty'
    }, "\u672A\u914D\u7F6E"));
  };
  /**
   * 生成固定跨度选项
   */
  DateShortCutControl.prototype.renderNormalOption = function (option, index) {
    return React__default["default"].createElement(ShortCutItemWrap, {
      index: index,
      handleDelete: this.handleDelete
    }, React__default["default"].createElement("span", null, option.label));
  };
  /**
   * 生成自定义跨度选项
   */
  DateShortCutControl.prototype.renderCustomOption = function (option, index) {
    var _this = this;
    var render = this.props.render;
    var renderInput = function (option) {
      if (option.type === 'middle') {
        return render('inner', {
          type: 'input-text',
          prefix: option === null || option === void 0 ? void 0 : option.prefix,
          suffix: option.suffix,
          mode: 'normal',
          placeholder: 'n',
          value: option === null || option === void 0 ? void 0 : option.value,
          onChange: function (value) {
            return _this.handleCustomItemChange(value, index);
          }
        });
      }
      return render('inner', {
        type: 'input-text',
        placeholder: 'n',
        mode: 'normal',
        suffix: option.suffix,
        value: option === null || option === void 0 ? void 0 : option.value,
        onChange: function (value) {
          return _this.handleCustomItemChange(value, index);
        }
      });
    };
    var dateMap = {
      daysago: {
        prefix: i18nRuntime.i18n("046c6233e03af774df7b90b4504fa96c"),
        suffix: i18nRuntime.i18n("249aba763258bbe488af3e79a381d265"),
        type: 'middle'
      },
      dayslater: {
        suffix: i18nRuntime.i18n("2f8ab07bea442bc6ce8a9e99ff88e5c1"),
        type: 'suffix'
      },
      weeksago: {
        prefix: i18nRuntime.i18n("046c6233e03af774df7b90b4504fa96c"),
        suffix: i18nRuntime.i18n("a657f46f5bb00961adfae80d12e41b3d"),
        type: 'middle'
      },
      weekslater: {
        suffix: i18nRuntime.i18n("b1599eaa05dc9b3d90be5aebc5c84338"),
        type: 'suffix'
      },
      monthsago: {
        prefix: i18nRuntime.i18n("046c6233e03af774df7b90b4504fa96c"),
        suffix: i18nRuntime.i18n("e42b99d59954ce6437e66f416850425a"),
        type: 'middle'
      },
      monthslater: {
        suffix: i18nRuntime.i18n("3c690347976de82df1909750cbc82b80"),
        type: 'suffix'
      },
      quartersago: {
        prefix: i18nRuntime.i18n("046c6233e03af774df7b90b4504fa96c"),
        suffix: i18nRuntime.i18n("a483bccf85587055ab31314ad1d2f82a"),
        type: 'middle'
      },
      quarterslater: {
        suffix: i18nRuntime.i18n("b62ba98a627851e911bef8fbb005bd4a"),
        type: 'suffix'
      },
      yearsago: {
        prefix: i18nRuntime.i18n("046c6233e03af774df7b90b4504fa96c"),
        suffix: i18nRuntime.i18n("465260fe80b0c3338d06194bb7a94446"),
        type: 'middle'
      },
      yearslater: {
        suffix: i18nRuntime.i18n("137bcb84f52bbd48623c37d8dfdebdff"),
        type: 'suffix'
      }
    };
    return React__default["default"].createElement(ShortCutItemWrap, {
      index: index,
      handleDelete: this.handleDelete
    }, option.inputType ? renderInput(tslib.__assign(tslib.__assign({}, dateMap[option.inputType]), {
      value: option.value
    })) : null);
  };
  /**
   * 自定义跨度变化
   */
  DateShortCutControl.prototype.handleCustomItemChange = function (value, index) {
    var _this = this;
    var options = tslib.__spreadArray([], tslib.__read(this.state.options), false);
    options[index].value = value;
    this.setState({
      options: options
    }, function () {
      return _this.onChangeOptions();
    });
  };
  /**
   * option添加
   */
  DateShortCutControl.prototype.addItem = function (item, type) {
    var _this = this;
    var _a;
    this.setState({
      options: tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(this.state.options), false), [tslib.__assign({
        label: (_a = item === null || item === void 0 ? void 0 : item.label) !== null && _a !== void 0 ? _a : '',
        type: type,
        value: type === RangeType.Normal ? item.value : ''
      }, type === RangeType.Normal ? {} : {
        inputType: item.value
      })], false)
    }, function () {
      _this.onChangeOptions();
      _this.scrollToBottom();
    });
  };
  /**
   * 删除选项
   */
  DateShortCutControl.prototype.handleDelete = function (index, e) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1);
    this.setState({
      options: options
    }, function () {
      return _this.onChangeOptions();
    });
  };
  /**
   * 更新options字段的统一出口
   */
  DateShortCutControl.prototype.onChangeOptions = function () {
    var options = this.state.options;
    var onBulkChange = this.props.onBulkChange;
    var newOptions = [];
    options.forEach(function (item, index) {
      if (item.type === RangeType.Normal) {
        newOptions[index] = item.value;
      }
      if (item.type === RangeType.Custom && item.value) {
        newOptions[index] = "".concat(item.value).concat(item.inputType);
      }
    });
    onBulkChange && onBulkChange({
      ranges: newOptions
    });
  };
  DateShortCutControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className,
      label = _a.label,
      render = _a.render;
    return React__default["default"].createElement("div", {
      className: cx__default["default"](klass, className)
    }, React__default["default"].createElement("header", {
      className: klass + '-header'
    }, React__default["default"].createElement("label", null, label)), this.renderContent(), React__default["default"].createElement("div", {
      className: klass + '-footer'
    }, React__default["default"].createElement("div", {
      className: klass + '-footer-btn'
    }, render('inner', {
      type: 'dropdown-button',
      label: i18nRuntime.i18n("279d93f2d745ed08e9034022941510dc"),
      closeOnClick: true,
      closeOnOutside: true,
      level: 'enhance',
      buttons: this.normalDropDownOptionArr.map(function (item) {
        return tslib.__assign(tslib.__assign({}, item), {
          type: 'button',
          onAction: function (e, action) {
            return _this.addItem(item, RangeType.Normal);
          }
        });
      })
    }, {
      popOverContainer: null
    })), React__default["default"].createElement("div", {
      className: klass + '-footer-btn'
    }, render('inner', {
      type: 'dropdown-button',
      label: i18nRuntime.i18n("7a1e5f93e362d371519bcb2bfdb0fc9a"),
      closeOnClick: true,
      closeOnOutside: true,
      buttons: this.customDropDownOptionArr.map(function (item) {
        return tslib.__assign(tslib.__assign({}, item), {
          type: 'button',
          onAction: function (e, action) {
            return _this.addItem(item, RangeType.Custom);
          }
        });
      })
    }, {
      popOverContainer: null
    }))));
  };
  DateShortCutControl.defaultProps = {
    label: i18nRuntime.i18n("f7d2996639d97b4a03fc0e40e2eb853a")
  };
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Object]), tslib.__metadata("design:returntype", void 0)], DateShortCutControl.prototype, "dragRef", null);
  tslib.__decorate([amisEditorCore.autobind, tslib.__metadata("design:type", Function), tslib.__metadata("design:paramtypes", [Number, Object]), tslib.__metadata("design:returntype", void 0)], DateShortCutControl.prototype, "handleDelete", null);
  return DateShortCutControl;
}(React__default["default"].PureComponent);
/** @class */(function (_super) {
  tslib.__extends(DateShortCutControlRender, _super);
  function DateShortCutControlRender() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  DateShortCutControlRender = tslib.__decorate([amis.FormItem({
    type: klass,
    renderLabel: false
  })], DateShortCutControlRender);
  return DateShortCutControlRender;
})(DateShortCutControl);

exports.DateShortCutControl = DateShortCutControl;
