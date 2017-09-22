const restify = require('restify')
const builder = require('botbuilder')
const config = require('./config.js')

//
//    Bot stuff
//

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
});
const bot = new builder.UniversalBot(connector);

// Event when first message received
bot.dialog('/', (session) => {

})




// Server Init for bot
const server = restify.createServer()
server.listen(process.env.PORT || 8090)
server.post('/', connector.listen())



