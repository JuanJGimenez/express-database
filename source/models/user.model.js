const fs = require('fs');
const {resolve} = require('path');
const {hashSync} = require('bcryptjs');
const index = () => JSON.parse(fs.readFileSync(resolve(__dirname,'..','data','users.json')))
const one = id => index().find(e => e.id == id)
const create = data => Object({
    id: index().length > 1 ? index().pop().id + 1 : 1,
    ...data,
    password: hashSync(data.password,10),
    isAdmin: String(data.username).toLowerCase().includes('@dh')
})
const write = data => fs.writeFileSync(resolve(__dirname,'..','data','users.json'),JSON.stringify(data,null,2))
module.exports = {index,one,create,write}
