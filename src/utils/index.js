"use strict";

let utils = {};

utils.isSuperSet = async (max, min) => {
    return min.every(val => max.includes(val));
};

module.exports = utils;