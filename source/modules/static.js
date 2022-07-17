const {static} = require('express');
const {resolve} = require('path');
module.exports = (folder) => static(resolve(__dirname,folder))