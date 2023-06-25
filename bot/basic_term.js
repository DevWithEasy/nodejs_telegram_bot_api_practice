const basic_term =(bot)=>{
//     ------------defaults command------------

// start command response first time users
bot.start((ctx)=>{
    console.log(ctx.from.first_name + ctx.from.last_name)
    ctx.reply(`Hello ${ctx.from.first_name} ${ctx.from.last_name}.wellcome to our doctor appointment service help bot.`)
})
// settings commands
bot.help((ctx)=>{
    ctx.reply('Your have entered help commands')
})
// settings commands
bot.settings((ctx)=>{
    ctx.reply('Your have entered settings commands')
})

// ----------custom commands -------------
// single word commands
bot.command('test', (ctx)=>{
    ctx.reply(`Hi ${ctx.from.first_name}.Your type the commant ${ctx.message.text}`)
})
// multiple word commands
bot.command(['test','Test'], (ctx)=>{
    ctx.reply(`Hi ${ctx.from.first_name}.Your type the commant ${ctx.message.text}`)
})

// ------------hears method -------------
// if it exists with user message then it will response

bot.hears('cat',(ctx)=>{
    ctx.reply('Meow meow me')
})

// ------------on method ---------------
// [text,photo,sticker,document etc] - this detects users messages types and sends them to message handler

bot.on('text',(ctx)=>{
    ctx.reply('This is a text message')
})

bot.on('sticker',(ctx)=>{
    ctx.reply('This is a sticker message')
})

// ------------others mrethod---------------
bot.mention('botfather',(ctx)=>{
    ctx.reply('This is a mention method.')
})

bot.phone('+8801717642515',(ctx)=>{
    ctx.reply('This is a phone method')
})

bot.hashtag('hash',(ctx)=>{
    ctx.reply('This is a hash method')
})

// ------------use method--------------
bot.use((ctx)=>{
    ctx.reply('This is use method')
})

// ------------next middleware--------------
// after this middleware default commnd is worked
bot.use((ctx,next)=>{
    ctx.reply('This is reply from use method')
    next(ctx)
})
bot.settings((ctx)=>{
    ctx.reply('This is reply from hello command')
})

// ------------state and context shortcut----------------
// loclly state stored
bot.use((ctx,next)=>{
    ctx.state.apple = 10
    ctx.reply(`State in Apple is`)
    next(ctx)
})
bot.start((ctx)=>{
    ctx.reply(`${ctx.state.apple}`)
    ctx.telegram.sendMessage(ctx.chat.id,'<b>hello world</b>',{
        parse_mode:'HTML'
    })
})
}

module.exports = basic_term