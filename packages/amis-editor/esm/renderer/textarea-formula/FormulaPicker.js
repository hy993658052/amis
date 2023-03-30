/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import { __read } from 'tslib';
import React__default, { useEffect } from 'react';
import { Modal, Button } from 'amis';
import cx from 'classnames';
import FormulaEditor from 'amis-ui/lib/components/formula/Editor';

var FormulaPicker = function (props) {
    var variables = props.variables, variableMode = props.variableMode, _a = props.evalMode, evalMode = _a === void 0 ? true : _a;
    var _b = __read(React__default.useState(''), 2), formula = _b[0], setFormula = _b[1];
    useEffect(function () {
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
    return (React__default.createElement(Modal, { className: cx('FormulaPicker-Modal'), size: "md", show: true, onHide: handleClose, closeOnEsc: true },
        React__default.createElement(Modal.Body, null,
            React__default.createElement(FormulaEditor, { header: "\u8868\u8FBE\u5F0F", variables: variables, variableMode: variableMode, value: formula, evalMode: evalMode, onChange: handleChange })),
        React__default.createElement(Modal.Footer, null,
            React__default.createElement(Button, { onClick: handleClose }, "\u53D6\u6D88"),
            React__default.createElement(Button, { onClick: handleConfirm, level: "primary" }, "\u786E\u8BA4"))));
};

export { FormulaPicker as default };
