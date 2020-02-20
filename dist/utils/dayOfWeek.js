"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateOfWeek = function (date) {
    var week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var dayOfWeek = week[date.getDay()];
    return dayOfWeek;
};
