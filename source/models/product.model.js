const fs = require('fs');
const {resolve} = require('path');
const index = () => JSON.parse(fs.readFileSync(resolve(__dirname,'..','data','products.json')))
const one = id => index().find(e => e.id == id)
const create = data => Object({
    id: index().length > 1 ? index().pop().id + 1 : 1,
    ...data,
    price: parseInt(data.price)
})
const write = data => fs.writeFileSync(resolve(__dirname,'..','data','products.json'),JSON.stringify(data,null,2))
module.exports = {index,one,create,write}