/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('tslib');
require('amis');
require('./renderer/event-control/helper.js');
var isString = require('lodash/isString');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var isString__default = /*#__PURE__*/_interopDefaultLegacy(isString);

/**
 * 布局配置项，数值设置时需要
 */
var isAuto = function (value) {
    if (value && isString__default["default"](value) && /^((a)|(au)|(aut)|(auto))$/.test(value)) {
        return true;
    }
    return false;
};

exports.isAuto = isAuto;
