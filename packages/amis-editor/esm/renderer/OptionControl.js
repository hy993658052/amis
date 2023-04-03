/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __read, __spreadArray, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import { findDOMNode } from 'react-dom';
import cx from 'classnames';
import uniqBy from 'lodash/uniqBy';
import omit from 'lodash/omit';
import Sortable from 'sortablejs';
import { Icon, Checkbox, render, Button, FormItem } from 'amis';
import { value2array } from 'amis-ui/lib/components/Select';
import { getI18nEnabled, getSchemaTpl, tipedLabel, autobind } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 组件选项组件的可视化编辑控件
 */
var OptionControl = /** @class */function (_super) {
  __extends(OptionControl, _super);
  function OptionControl(props) {
    var _this = _super.call(this, props) || this;
    _this.internalProps = ['checked', 'editing'];
    var source = 'custom';
    if (props.data.hasOwnProperty('source') && props.data.source) {
      var api = props.data.source;
      var url = typeof api === 'string' ? api : typeof api === 'object' ? api.url || '' : '';
      source = !url.indexOf('api://') ? 'apicenter' : 'api';
    }
    _this.state = {
      options: _this.transformOptions(props),
      api: props.data.source,
      labelField: props.data.labelField,
      valueField: props.data.valueField,
      source: source
    };
    return _this;
  }
  /**
   * 获取当前选项值的类型
   */
  OptionControl.prototype.getOptionValueType = function (value) {
    if (typeof value === 'string') {
      return 'text';
    }
    if (typeof value === 'boolean') {
      return 'boolean';
    }
    if (typeof value === 'number') {
      return 'number';
    }
    return 'text';
  };
  /**
   * 将当前选项值转换为选择的类型
   */
  OptionControl.prototype.normalizeOptionValue = function (value, valueType) {
    if (valueType === 'text') {
      return String(value);
    }
    if (valueType === 'number') {
      var convertTo = Number(value);
      if (isNaN(convertTo)) {
        return 0;
      }
      return convertTo;
    }
    if (valueType === 'boolean') {
      return !value || value === 'false' ? false : true;
    }
    return '';
  };
  /**
   * 处理填入输入框的值
   */
  OptionControl.prototype.transformOptionValue = function (value) {
    return typeof value === 'undefined' || value === null ? '' : typeof value === 'string' ? value : JSON.stringify(value);
  };
  OptionControl.prototype.transformOptions = function (props) {
    var ctx = props.data,
      options = props.value;
    var defaultValue = ctx.value;
    var valueArray = value2array(defaultValue, ctx).map(function (item) {
      var _a;
      return item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value'];
    });
    return Array.isArray(options) ? options.map(function (item) {
      var _a;
      return {
        label: item.label,
        // 为了使用户编写label时同时生效到value
        value: item.label === item.value ? null : item.value,
        checked: !!~valueArray.indexOf(item[(_a = ctx === null || ctx === void 0 ? void 0 : ctx.valueField) !== null && _a !== void 0 ? _a : 'value'])
      };
    }) : [];
  };
  /**
   * 处理当前组件的默认值
   */
  OptionControl.prototype.normalizeValue = function () {
    var _this = this;
    var _a = this.props,
      _b = _a.data,
      ctx = _b === void 0 ? {} : _b,
      multipleProps = _a.multiple;
    var _c = ctx.joinValues,
      joinValues = _c === void 0 ? true : _c,
      extractValue = ctx.extractValue,
      multiple = ctx.multiple,
      delimiter = ctx.delimiter,
      valueField = ctx.valueField;
    var checkedOptions = this.state.options.filter(function (item) {
      return item.checked;
    }).map(function (item) {
      return omit(item, _this.internalProps);
    });
    var value;
    if (!checkedOptions.length) {
      return '';
    }
    if (multiple || multipleProps) {
      value = checkedOptions;
      if (joinValues) {
        value = checkedOptions.map(function (item) {
          return item[valueField || 'value'] || item[valueField || 'label'];
        }).join(delimiter || ',');
      } else if (extractValue) {
        value = checkedOptions.map(function (item) {
          return item[valueField || 'value'] || item[valueField || 'label'];
        });
      }
    } else {
      value = checkedOptions[0];
      if (joinValues || extractValue) {
        value = value[valueField || 'value'] || value[valueField || 'label'];
      }
    }
    return value;
  };
  /**
   * 更新options字段的统一出口
   */
  OptionControl.prototype.onChange = function () {
    var source = this.state.source;
    var onBulkChange = this.props.onBulkChange;
    var defaultValue = this.normalizeValue();
    var data = {
      source: undefined,
      options: undefined,
      labelField: undefined,
      valueField: undefined
    };
    if (source === 'custom') {
      var options = this.state.options;
      data.options = options.map(function (item) {
        return {
          label: item.label,
          value: item.value == null || item.value === '' ? item.label : item.value
        };
      });
      data.value = defaultValue || undefined;
    }
    if (source === 'api' || source === 'apicenter') {
      var _a = this.state,
        api = _a.api,
        labelField = _a.labelField,
        valueField = _a.valueField;
      data.source = api;
      data.labelField = labelField || undefined;
      data.valueField = valueField || undefined;
    }
    onBulkChange && onBulkChange(data);
    return;
  };
  OptionControl.prototype.targetRef = function (ref) {
    this.target = ref ? findDOMNode(ref) : null;
  };
  OptionControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  OptionControl.prototype.initDragging = function () {
    var _this = this;
    var dom = findDOMNode(this);
    this.sortable = new Sortable(dom.querySelector('.ae-OptionControl-content'), {
      group: 'OptionControlGroup',
      animation: 150,
      handle: '.ae-OptionControlItem-dragBar',
      ghostClass: 'ae-OptionControlItem--dragging',
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
          return _this.onChange();
        });
      }
    });
  };
  OptionControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  OptionControl.prototype.scroll2Bottom = function () {
    var _a, _b;
    this.drag && ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    }));
  };
  /**
   * 切换选项类型
   */
  OptionControl.prototype.handleSourceChange = function (source) {
    this.setState({
      source: source
    }, this.onChange);
  };
  /**
   * 删除选项
   */
  OptionControl.prototype.handleDelete = function (index) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  /**
   * 设置默认选项
   */
  OptionControl.prototype.handleToggleDefaultValue = function (index, checked, shift) {
    var _this = this;
    var _a, _b, _c;
    var options = this.state.options.concat();
    var isMultiple = ((_b = (_a = this.props) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.multiple) || ((_c = this.props) === null || _c === void 0 ? void 0 : _c.multiple);
    if (isMultiple) {
      options.splice(index, 1, __assign(__assign({}, options[index]), {
        checked: checked
      }));
    } else {
      options = options.map(function (item, itemIndex) {
        return __assign(__assign({}, item), {
          checked: itemIndex === index ? checked : false // 支持重复点击取消选中
        });
      });
    }

    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  /**
   * 编辑选项
   */
  OptionControl.prototype.toggleEdit = function (index) {
    var options = this.state.options;
    options[index].editing = !options[index].editing;
    this.setState({
      options: options
    });
  };
  OptionControl.prototype.handleEditLabel = function (index, value) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1, __assign(__assign({}, options[index]), {
      label: value
    }));
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleAdd = function () {
    var _this = this;
    var options = this.state.options;
    options.push({
      label: '',
      value: null,
      checked: false
    });
    this.setState({
      options: options
    }, function () {
      _this.onChange();
    });
  };
  OptionControl.prototype.handleValueTypeChange = function (index, type) {
    var _this = this;
    var options = this.state.options.concat();
    options[index].value = this.normalizeOptionValue(options[index].value, type);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleValueChange = function (index, value) {
    var _this = this;
    var options = this.state.options.concat();
    var type = this.getOptionValueType(options[index].value);
    options[index].value = this.normalizeOptionValue(value, type);
    this.setState({
      options: options
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.handleBatchAdd = function (values, action) {
    var _this = this;
    var options = this.state.options.concat();
    var addedOptions = values.batchOption.split('\n').map(function (option) {
      var item = option.trim();
      if (~item.indexOf(' ')) {
        var _a = __read(item.split(' '), 2),
          label = _a[0],
          value = _a[1];
        return {
          label: label.trim(),
          value: value.trim(),
          checked: false
        };
      }
      return {
        label: item,
        value: item,
        checked: false
      };
    });
    var newOptions = uniqBy(__spreadArray(__spreadArray([], __read(options), false), __read(addedOptions), false), 'value');
    this.setState({
      options: newOptions
    }, function () {
      return _this.onChange();
    });
  };
  OptionControl.prototype.renderHeader = function () {
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
    }] : []
    // {
    //   label: '表单实体',
    //   value: 'form'
    // }
    ), false).map(function (item) {
      return __assign(__assign({}, item), {
        onClick: function () {
          return _this.handleSourceChange(item.value);
        }
      });
    });
    return React__default.createElement("header", {
      className: "ae-OptionControl-header"
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
  OptionControl.prototype.renderOption = function (props) {
    var _this = this;
    var checked = props.checked,
      index = props.index,
      editing = props.editing,
      multipleProps = props.multipleProps,
      closeDefaultCheck = props.closeDefaultCheck;
    var render$1 = this.props.render;
    var ctx = this.props.data;
    var isMultiple = (ctx === null || ctx === void 0 ? void 0 : ctx.multiple) === true || multipleProps;
    var i18nEnabled = getI18nEnabled();
    var label = this.transformOptionValue(props.label);
    var value = this.transformOptionValue(props.value);
    var valueType = this.getOptionValueType(props.value);
    var editDom = editing ? React__default.createElement("div", {
      className: "ae-OptionControlItem-extendMore"
    }, render$1('option', {
      type: 'container',
      className: 'ae-ExtendMore right mb-2',
      body: [{
        type: 'button',
        className: 'ae-OptionControlItem-closeBtn',
        label: '×',
        level: 'link',
        onClick: function () {
          return _this.toggleEdit(index);
        }
      }, {
        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
        placeholder: i18n("b4fdf79b8f54856b072ec3874b830d1f"),
        label: i18n("97d07614380da93d257f9fbf81aa56fb"),
        mode: 'horizontal',
        value: label,
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        onChange: function (v) {
          return _this.handleEditLabel(index, v);
        }
      }, {
        type: 'input-group',
        name: 'input-group',
        label: i18n("fe7509e0ed085b86f07e3e9975cc5b3d"),
        labelClassName: 'ae-OptionControlItem-EditLabel',
        valueClassName: 'ae-OptionControlItem-EditValue',
        mode: 'horizontal',
        body: [{
          type: 'select',
          name: 'valueType',
          value: valueType,
          options: [{
            label: i18n("97d07614380da93d257f9fbf81aa56fb"),
            value: 'text'
          }, {
            label: i18n("55d4790c5d819cd0462cbe89561b0dd4"),
            value: 'number'
          }, {
            label: i18n("97b0b6499334ed889b372513290a2a52"),
            value: 'boolean'
          }],
          checkAll: false,
          onChange: function (v) {
            return _this.handleValueTypeChange(index, v);
          }
        }, {
          type: 'input-text',
          placeholder: i18n("f4ab507e2fa2d2bd66bcdeafd9fef797"),
          name: 'value',
          value: value,
          visibleOn: "this.optionValueType !== 'boolean'",
          onChange: function (v) {
            return _this.handleValueChange(index, v);
          }
        }, {
          type: 'input-text',
          placeholder: i18n("f4ab507e2fa2d2bd66bcdeafd9fef797"),
          name: 'value',
          value: value,
          visibleOn: "this.optionValueType === 'boolean'",
          onChange: function (v) {
            return _this.handleValueChange(index, v);
          },
          options: [{
            label: 'true',
            value: true
          }, {
            label: 'false',
            value: false
          }]
        }]
      }]
    })) : null;
    var operationBtn = [{
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18n("95b351c86267f3aedf89520959bce689"),
      onClick: function () {
        return _this.toggleEdit(index);
      }
    }, {
      type: 'button',
      className: 'ae-OptionControlItem-action',
      label: i18n("2f4aaddde33c9b93c36fd2503f3d122b"),
      onClick: function () {
        return _this.handleDelete(index);
      }
    }];
    // 单选模式，选中时增加取消操作
    if (!closeDefaultCheck && !isMultiple && checked) {
      operationBtn.unshift({
        type: 'button',
        className: 'ae-OptionControlItem-action',
        label: i18n("aafda9e8f6b7b613680677c513edb7a6"),
        onClick: function () {
          return _this.handleToggleDefaultValue(index, false);
        }
      });
    }
    return React__default.createElement("li", {
      className: "ae-OptionControlItem",
      key: index
    }, React__default.createElement("div", {
      className: "ae-OptionControlItem-Main"
    }, React__default.createElement("a", {
      className: "ae-OptionControlItem-dragBar"
    }, React__default.createElement(Icon, {
      icon: "drag-bar",
      className: "icon"
    })), !this.props.closeDefaultCheck && this.props.data.defaultCheckAll !== true && React__default.createElement("span", {
      className: "inline-flex",
      "data-tooltip": "\u9ED8\u8BA4\u9009\u4E2D\u6B64\u9879"
    }, React__default.createElement(Checkbox, {
      className: "ae-OptionControlItem-checkbox",
      checked: checked,
      type: isMultiple ? 'checkbox' : 'radio',
      onChange: function (newChecked, shift) {
        return _this.handleToggleDefaultValue(index, newChecked, shift);
      }
    })), render({
      type: i18nEnabled ? 'input-text-i18n' : 'input-text',
      className: 'ae-OptionControlItem-input',
      value: label,
      placeholder: i18n("5d26b8a41e805204c9dcd5ea7e23b150"),
      clearable: false,
      onChange: function (value) {
        _this.handleEditLabel(index, value);
      }
    }), render$1('dropdown', {
      type: 'dropdown-button',
      className: 'ae-OptionControlItem-dropdown',
      btnClassName: 'px-2',
      icon: 'fa fa-ellipsis-h',
      hideCaret: true,
      closeOnClick: true,
      align: 'right',
      menuClassName: 'ae-OptionControlItem-ulmenu',
      buttons: operationBtn
    }, {
      popOverContainer: null // amis 渲染挂载节点会使用 this.target
    })), editDom);
  };
  OptionControl.prototype.buildBatchAddSchema = function () {
    return {
      type: 'action',
      actionType: 'dialog',
      label: i18n("22de6ef85ed60ec54dbdc1d8583e5104"),
      dialog: {
        title: i18n("421252e16c6cb544fe9ce0be94a190e0"),
        headerClassName: 'font-bold',
        closeOnEsc: true,
        closeOnOutside: false,
        showCloseButton: true,
        body: [{
          type: 'alert',
          level: 'warning',
          body: [{
            type: 'tpl',
            tpl: i18n("c130bd5b55edefdaf8923269e9a52439")
          }],
          showIcon: true,
          className: 'mb-2.5'
        }, {
          type: 'form',
          wrapWithPanel: false,
          mode: 'normal',
          wrapperComponent: 'div',
          resetAfterSubmit: true,
          autoFocus: true,
          preventEnterSubmit: true,
          horizontal: {
            left: 0,
            right: 12
          },
          body: [{
            name: 'batchOption',
            type: 'textarea',
            label: '',
            placeholder: i18n("1e2f96a69fbef8caa8823a3067ebbdc7"),
            trimContents: true,
            minRows: 10,
            maxRows: 50,
            required: true
          }]
        }]
      }
    };
  };
  OptionControl.prototype.handleAPIChange = function (source) {
    this.setState({
      api: source
    }, this.onChange);
  };
  OptionControl.prototype.handleLableFieldChange = function (labelField) {
    this.setState({
      labelField: labelField
    }, this.onChange);
  };
  OptionControl.prototype.handleValueFieldChange = function (valueField) {
    this.setState({
      valueField: valueField
    }, this.onChange);
  };
  OptionControl.prototype.renderApiPanel = function () {
    var render = this.props.render;
    var _a = this.state,
      source = _a.source,
      api = _a.api,
      labelField = _a.labelField,
      valueField = _a.valueField;
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
      sourceType: source,
      footer: [{
        label: tipedLabel(i18n("7e9c83e86beb612377a94e6e8d1fc644"), i18n("26ff46d82166741297ce666b2792af85")),
        type: 'input-text',
        name: 'labelField',
        value: labelField,
        placeholder: i18n("6d4ce0631f37676a887c9599691fabec"),
        onChange: this.handleLableFieldChange
      }, {
        label: i18n("2e01f5f5889e33d003bec7857cd38445"),
        type: 'input-text',
        name: 'valueField',
        value: valueField,
        placeholder: i18n("959c27193eb0a41d01f4b53dcc4b9245"),
        onChange: this.handleValueFieldChange
      }]
    }));
  };
  OptionControl.prototype.render = function () {
    var _this = this;
    var _a = this.state,
      options = _a.options,
      source = _a.source;
    var _b = this.props,
      render = _b.render,
      className = _b.className,
      multipleProps = _b.multiple;
    return React__default.createElement("div", {
      className: cx('ae-OptionControl', className)
    }, this.renderHeader(), source === 'custom' ? React__default.createElement("div", {
      className: "ae-OptionControl-wrapper"
    }, Array.isArray(options) && options.length ? React__default.createElement("ul", {
      className: "ae-OptionControl-content",
      ref: this.dragRef
    }, options.map(function (option, index) {
      return _this.renderOption(__assign(__assign({}, option), {
        index: index,
        multipleProps: multipleProps
      }));
    })) : React__default.createElement("div", {
      className: "ae-OptionControl-placeholder"
    }, "\u65E0\u9009\u9879"), React__default.createElement("div", {
      className: "ae-OptionControl-footer"
    }, React__default.createElement(Button, {
      level: "enhance",
      onClick: this.handleAdd,
      ref: this.targetRef
    }, "\u6DFB\u52A0\u9009\u9879"), render('inner', this.buildBatchAddSchema(), {
      onSubmit: this.handleBatchAdd
    }))) : null, this.renderApiPanel());
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "targetRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleSourceChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Number, String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleEditLabel", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleAdd", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object, Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleBatchAdd", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleAPIChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleLableFieldChange", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [String]), __metadata("design:returntype", void 0)], OptionControl.prototype, "handleValueFieldChange", null);
  return OptionControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(OptionControlRenderer, _super);
  function OptionControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  OptionControlRenderer = __decorate([FormItem({
    type: 'ae-optionControl',
    renderLabel: false
  })], OptionControlRenderer);
  return OptionControlRenderer;
})(OptionControl);

export { OptionControl as default };
