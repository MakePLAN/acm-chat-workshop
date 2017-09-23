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
	session.send("Hello WOrld")
	session.replaceDialog('/greeting')
})

//grreting dialog
bot.dialog('/greeting', (session) => {
	session.send("Hi there, what can I do for you today?")
	var card = createButtoncard(session)
	var msg = new builder.Message(session).addAttachment(card)
	session.send(msg)
})

bot.beginDialogAction('order', '/order')
bot.dialog('/order', (session) => {
	session.send("Ready to order")
})

bot.beginDialogAction('done', '/done')
bot.dialog('/done', (session) => {
	session.send("Thanks again. Come again")
	session.endDialog()
})


function createButtoncard(session){
	return new builder.HeroCard(session)
		.title("What do you want to do today?")
		.subtitle("- Pizza Hut bot")
		.images([
			builder.CardImage.create(session, 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Pizza_Hut_logo.svg/1200px-Pizza_Hut_logo.svg.png')
			])
		.buttons([
				builder.CardAction.dialogAction(session, 'order', '', 'Ready to Order!'),
				builder.CardAction.dialogAction(session, 'done', '', 'No thanks!')
			])
}



// Server Init for bot
const server = restify.createServer()
server.listen(process.env.PORT || 8080)
server.post('/', connector.listen())



