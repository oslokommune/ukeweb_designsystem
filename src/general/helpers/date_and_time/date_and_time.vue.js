import Vue from 'vue';
import OdsDateTime from './date_and_time';

Vue.filter('OdsDateTimeFormat', (dateFrom, dateTo = null, dateFromOptions = {}, dateToOptions = {}) => OdsDateTime.format(dateFrom, dateTo, dateFromOptions, dateToOptions));
