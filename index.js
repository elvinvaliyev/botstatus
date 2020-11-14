const { Telegraf } = require('telegraf')
const config =require("./config.json")
const bot = new Telegraf(config.TOKEN.token)


bot.start((ctx) => ctx.reply('Şəkilinizə status tapammırsız?Şəkil göndərin! \nP.S Əgər bot qrupdadırsa şəkili bu yazıma reply kimi göndərin :D'))
bot.help((ctx) => ctx.reply('Mövcud olan commandlar bunlardır \n/start - Başlatmaq \n/getstatus - Status vermək'))

bot.hears('salam', (ctx) => ctx.reply('Salam, ' + ctx.message.from.username+'!'))
bot.hears('sağol', (ctx) => ctx.reply('Sağ ol, ' + ctx.message.from.first_name+'!'))
bot.hears('sagol', (ctx) => ctx.reply('Sağ ol, ' + ctx.message.from.first_name+" " +ctx.message.from.last_name+'!'))


bot.command('getstatus',(ctx)=>{
    ctx.telegram.sendMessage(ctx.chat.id,'Status istiyirsiniz?',
    {
        reply_markup:{
            inline_keyboard:[[{text:"Status ver",callback_data:"getStatus"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })
})

bot.command('elaqe',(ctx)=>ctx.reply('Əlaqə üçün \n@ennvva\n@ism_ibrahimm \nmüraciət edin'))

bot.action('close',(ctx)=>{
    ctx.deleteMessage()
})


bot.action('getStatus',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'Hansi nov status?',
    {
        reply_markup:{
            inline_keyboard:[[{text:"Fun",callback_data:"fun"},{text:"Sad",callback_data:"sad"},{text:"Whatever",callback_data:"whatever"}],[{text:"Go Back",callback_data:"goBack"}],[{text:"Bitir",callback_data:"close"}]]
        
        }
    })
})


bot.action('goBack',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'Status istiyirsiniz ya yox?',
    {
        reply_markup:{
            inline_keyboard:[[{text:"Status ver",callback_data:"getStatus"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })
})


bot.action('fun',(ctx)=>{
    ctx.deleteMessage()
let funArr= config.status.fun;
   let funRandom = Math.floor(Math.random() * funArr.length);
    ctx.telegram.sendMessage(ctx.chat.id,funArr[funRandom],
    {
        reply_markup:{
            inline_keyboard:[[{text:"Go Back",callback_data:"goBackSecond"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })
})

bot.action('sad',(ctx)=>{
    ctx.deleteMessage()
    let sadArr= config.status.sad;
    let sadRandom = Math.floor(Math.random() * sadArr.length);

    ctx.telegram.sendMessage(ctx.chat.id,sadArr[sadRandom],
    {
        reply_markup:{
            inline_keyboard:[[{text:"Go Back",callback_data:"goBackSecond"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })

   
})


bot.action('whatever',(ctx)=>{
    ctx.deleteMessage()
    let sadArr= config.status.sad;
    let funArr= config.status.fun;
    let sum =sadArr.length+funArr.length;
    let All = Math.floor(Math.random() * sum);
    var children = sadArr.concat(funArr);
    ctx.telegram.sendMessage(ctx.chat.id,children[All],
    {
        reply_markup:{
            inline_keyboard:[[{text:"Go Back",callback_data:"goBackSecond"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })
})


bot.on('photo', (ctx) =>{
    let sadArr= config.status.sad;
    let funArr= config.status.fun;
    let sum =sadArr.length+funArr.length;
    let All = Math.floor(Math.random() * sum);
    var children = sadArr.concat(funArr);
    ctx.reply(children[All],{reply_to_message_id:ctx.message.message_id})})

bot.action('goBackSecond',(ctx)=>{
    ctx.deleteMessage()
    ctx.telegram.sendMessage(ctx.chat.id,'Status istiyirsiniz ya yox?',
    {
        reply_markup:{
            inline_keyboard:[[{text:"Fun",callback_data:"fun"},{text:"Sad",callback_data:"sad"},{text:"Whatever",callback_data:"whatever"}],[{text:"Go Back",callback_data:"goBack"}],[{text:"Bitir",callback_data:"close"}]]
        }
    })
})
bot.launch()
