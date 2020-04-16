import Vue from 'vue'
const Cryptr = require('cryptr')
const cryptr = new Cryptr('okaprendeinglesbolivia')

Vue.prototype.$cryptr = cryptr
