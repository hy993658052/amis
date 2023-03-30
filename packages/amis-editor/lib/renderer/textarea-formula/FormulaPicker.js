/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amis = require('amis');
var cx = require('classnames');
var FormulaEditor = require('amis-ui/lib/components/formula/Editor');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var FormulaEditor__default = /*#__PURE__*/_interopDefaultLegacy(FormulaEditor);

var FormulaPicker = function (props) {
    var variables = props.variables, variableMode = props.variableMode, _a = props.evalMode, evalMode = _a === void 0 ? true : _a;
    var _b = tslib.__read(React__default["default"].useState(''), 2), formula = _b[0], setFormula = _b[1];
    React.useEffect(function () {
        var initable = props.initable, value = props.value;
        if (initable && value) {
            setFormula(value);
        }
    }, [props.value]);
    var handleChange = function (data) {
        setFormula(data);
    };
    var handleClose = function () {
        props.onClose && props.onClose();
    };
    var handleConfirm = function () {
        props.onConfirm && props.onConfirm(formula);
    };
    return (React__default["default"].createElement(amis.Modal, { className: cx__default["default"]('FormulaPicker-Modal'), size: "md", show: true, onHide: handleClose, closeOnEsc: true },
        React__default["default"].createElement(amis.Modal.Body, null,
            React__default["default"].createElement(FormulaEditor__default["default"], { header: "\u8868\u8FBE\u5F0F", variables: variables, variableMode: variableMode, value: formula, evalMode: evalMode, onChange: handleChange })),
        React__default["default"].createElement(amis.Modal.Footer, null,
            React__default["default"].createElement(amis.Button, { onClick: handleClose }, "\u53D6\u6D88"),
            React__default["default"].createElement(amis.Button, { onClick: handleConfirm, level: "primary" }, "\u786E\u8BA4"))));
};

exports["default"] = FormulaPicker;
