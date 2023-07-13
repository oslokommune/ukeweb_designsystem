import Vue from 'vue';
import { OsgDateTime } from './date_and_time.js';

Vue.filter('OsgDateTimeFormat', (dateFrom, dateTo = null, dateFromOptions = {}, dateToOptions = {}) => OsgDateTime.format(dateFrom, dateTo, dateFromOptions, dateToOptions));
