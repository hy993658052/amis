/**
 * amis-editor v5.2.5-beta.3
 * Copyright 2018-2023 @fex
 */

import 'tslib';
import 'amis';
import './renderer/event-control/helper.js';
import isString from 'lodash/isString';

/**
 * 布局配置项，数值设置时需要
 */
var isAuto = function (value) {
    if (value && isString(value) && /^((a)|(au)|(aut)|(auto))$/.test(value)) {
        return true;
    }
    return false;
};

export { isAuto };
