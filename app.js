const restify = require('restify')
const builder = require('botbuilder')
const config = require('./config.js')

//
//    Bot stuff
//

var concepts = ['Car', 'Campfire', 'Windmill', 'Hammer'];

// Connection to Microsoft Bot Framework
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
});
const bot = new builder.UniversalBot(connector);
// Event when Message received
bot.dialog('/', (session) => {
  

})



function createChoiceCard(session){
	return new builder.HeroCard(session)
        .buttons([
            builder.CardAction.dialogAction(session, 'ready', '', 'I have an idea!'),
            builder.CardAction.dialogAction(session, 'choice', '', 'Suggest me one!')
        ]);
}

function createSocialCard(session){
  return new builder.HeroCard(session)
        .title("Do you want to post your work to your Social Media?")
        .buttons([
            builder.CardAction.dialogAction(session, 'postFB', '', 'Of Course!'),
            builder.CardAction.dialogAction(session, 'finish', '', 'Not Today!')
        ]);
}

function createSketchCard(session){
	return new builder.HeroCard(session)
        .buttons([
            builder.CardAction.dialogAction(session, 'result', '', 'Done Sketch!')
        ]);
}

function createImageCard(session, title, url){
  return new builder.HeroCard(session)
        .title(title)
        .images([
            builder.CardImage.create(session, url)
        ]);
}

function createConceptCard(session){
	var choices = [];
	for (var i = 0; i < concepts.length; i++){
		choices.push( builder.CardAction.dialogAction(session, 'suggest', concepts[i] , concepts[i]) );
	}

	return new builder.HeroCard(session)
        .buttons( choices );
}


function createWordCard(session, title, pictureLink) {
    return new builder.ThumbnailCard(session)
        .buttons([
            builder.CardAction.openUrl(session, pictureLink, title)
        ]);
        
}




// Server Init for bot
const server = restify.createServer()
server.listen(process.env.PORT || 8080)
server.post('/', connector.listen())




