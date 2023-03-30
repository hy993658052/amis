/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var amisPostcss = require('amis-postcss');
var _ = require('lodash');
var i18nRuntime = require('i18n-runtime');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var valueMap = {
  'margin-top': 'marginTop',
  'margin-right': 'marginRight',
  'margin-bottom': 'marginBottom',
  'margin-left': 'marginLeft',
  'padding-top': 'paddingTop',
  'padding-right': 'paddingRight',
  'padding-bottom': 'paddingBottom',
  'padding-left': 'paddingLeft',
  'border-top-width': 'top-border-width',
  'border-right-width': 'right-border-width',
  'border-bottom-width': 'bottom-border-width',
  'border-left-width': 'left-border-width',
  'border-top-style': 'top-border-style',
  'border-right-style': 'right-border-style',
  'border-bottom-style': 'bottom-border-style',
  'border-left-style': 'left-border-style',
  'border-top-color': 'top-border-color',
  'border-right-color': 'right-border-color',
  'border-bottom-color': 'bottom-border-color',
  'border-left-color': 'left-border-color',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'line-height': 'lineHeight'
};
var fontStyle = ['color', 'font-weight', 'font-size', 'font-style', 'text-decoration', 'text-align', 'vertical-align', 'font-family', 'line-height'];
function AmisStyleCodeEditor(props) {
  var name = props.name,
    classname = props.value,
    suffix = props.suffix;
  var _a = tslib.__read(React.useState(''), 2),
    value = _a[0],
    setValue = _a[1];
  function getCssAndSetValue(classname, name, suffix) {
    try {
      var id = (classname === null || classname === void 0 ? void 0 : classname.replace(name + '-', '')) + (suffix ? '-' + suffix : '');
      var dom = document.getElementById(id || '') || null;
      var content = (dom === null || dom === void 0 ? void 0 : dom.innerHTML) || '';
      var ast = amisPostcss.parse(content);
      var nodes_1 = [];
      ast.nodes.forEach(function (node) {
        var selector = node.selector;
        if (!selector.endsWith('.hover') && !selector.endsWith('.active')) {
          nodes_1.push(node);
        }
      });
      ast.nodes = nodes_1;
      var css = nodes_1.map(function (node) {
        var style = node.nodes.map(function (n) {
          return "".concat(n.prop, ": ").concat(n.value, ";");
        });
        return "".concat(node.selector, " {\n  ").concat(style.join('\n  '), "\n}");
      }).join('\n\n');
      setValue(css);
    } catch (error) {
      console.error(error);
    }
  }
  React.useEffect(function () {
    getCssAndSetValue(classname, name, suffix);
  }, []);
  function handleChange(value) {
    setValue(value);
    editorChange(value);
  }
  var editorChange = _.debounce(function (value) {
    var _a;
    try {
      var ast = amisPostcss.parse(value);
      var data = props.data,
        onBulkChange = props.onBulkChange,
        name_1 = props.name;
      var sourceCss = data.css || {};
      var className_1 = {};
      ast.nodes.forEach(function (node) {
        var nodes = node.nodes;
        var selector = node.selector;
        var state = 'default';
        if (!!~selector.indexOf(':hover:active')) {
          state = 'active';
        } else if (!!~selector.indexOf(':hover')) {
          state = 'hover';
        }
        nodes.forEach(function (item) {
          var prop = item.prop;
          var cssValue = item.value;
          if (!!~prop.indexOf('radius')) {
            var type = 'radius:' + state;
            !className_1[type] && (className_1[type] = {});
            var radius = cssValue.split(' ');
            className_1[type]['top-left-border-radius'] = radius[0];
            className_1[type]['top-right-border-radius'] = radius[1];
            className_1[type]['bottom-right-border-radius'] = radius[2];
            className_1[type]['bottom-left-border-radius'] = radius[3];
          } else if (!!~prop.indexOf('border')) {
            !className_1['border:' + state] && (className_1['border:' + state] = {});
            className_1['border:' + state][valueMap[prop] || prop] = cssValue;
          } else if (!!~prop.indexOf('padding') || !!~prop.indexOf('margin')) {
            !className_1['padding-and-margin:' + state] && (className_1['padding-and-margin:' + state] = {});
            className_1['padding-and-margin:' + state][valueMap[prop] || prop] = cssValue;
          } else if (fontStyle.includes(prop)) {
            !className_1['font:' + state] && (className_1['font:' + state] = {});
            className_1['font:' + state][valueMap[prop] || prop] = cssValue;
          } else {
            className_1[(valueMap[prop] || prop) + ':' + state] = cssValue;
          }
        });
      });
      var newCss = tslib.__assign(tslib.__assign({}, sourceCss), (_a = {}, _a[name_1] = className_1, _a));
      onBulkChange && onBulkChange({
        css: newCss
      });
    } catch (error) {
      console.error(error);
    }
  });
  return React__default["default"].createElement("div", {
    className: "ThemeClassName-editor"
  }, React__default["default"].createElement("div", {
    className: "ThemeClassName-editor-title"
  }, "\u81EA\u5B9A\u4E49\u6837\u5F0F\u6E90\u7801"), React__default["default"].createElement("div", {
    className: "ThemeClassName-editor-close"
  }, React__default["default"].createElement(amisUi.Button, {
    onClick: props.onHide,
    level: "link"
  }, React__default["default"].createElement(amisUi.Icon, {
    icon: "close",
    className: "icon"
  }))), React__default["default"].createElement("div", {
    className: "ThemeClassName-editor-content"
  }, React__default["default"].createElement(amisUi.Editor, {
    value: value,
    language: "css",
    onChange: handleChange,
    options: {
      automaticLayout: true,
      lineNumbers: 'off',
      glyphMargin: false,
      tabSize: 2,
      wordWrap: 'on',
      lineDecorationsWidth: 0,
      lineNumbersMinChars: 0,
      selectOnLineNumbers: true,
      scrollBeyondLastLine: false,
      folding: true,
      minimap: {
        enabled: false
      }
    }
  })));
}
function ThemeClassName(props) {
  var ref = React.useRef(null);
  var value = props.value;
  var _a = tslib.__read(React.useState(false), 2),
    showEditor = _a[0],
    setShowEditor = _a[1];
  function handleShowEditor() {
    setShowEditor(true);
  }
  return React__default["default"].createElement(React__default["default"].Fragment, null, React__default["default"].createElement("div", {
    ref: ref,
    className: "ThemeClassName"
  }, React__default["default"].createElement(amisUi.Button, {
    onClick: handleShowEditor,
    level: "link",
    className: ":ThemeClassName-button"
  }, React__default["default"].createElement(amisUi.Icon, {
    icon: "file",
    className: "icon"
  })), amisCore.render({
    type: 'input-tag',
    name: 'class',
    placeholder: i18nRuntime.i18n("ec8f3e4a298160dface2fda5c0125df2"),
    delimiter: ' ',
    value: value,
    onChange: function (value) {
      props.onChange && props.onChange(value);
    }
  })), React__default["default"].createElement(amisUi.Overlay, {
    container: document.body,
    placement: "left",
    target: ref.current,
    show: showEditor,
    rootClose: false
  }, React__default["default"].createElement(amisUi.PopOver, {
    overlay: true,
    onHide: function () {
      return setShowEditor(false);
    }
  }, React__default["default"].createElement(AmisStyleCodeEditor, tslib.__assign({}, props, {
    onHide: function () {
      return setShowEditor(false);
    }
  })))));
}
/** @class */(function (_super) {
  tslib.__extends(BorderRenderer, _super);
  function BorderRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BorderRenderer.prototype.render = function () {
    return React__default["default"].createElement(ThemeClassName, tslib.__assign({}, this.props));
  };
  BorderRenderer = tslib.__decorate([amisCore.FormItem({
    type: 'theme-classname',
    strictMode: false
  })], BorderRenderer);
  return BorderRenderer;
})(React__default["default"].Component);
