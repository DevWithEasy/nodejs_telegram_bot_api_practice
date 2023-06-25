const echo_bot = (bot)=>{
    const welcomeMsg = `Say something to me
/start - start the bot
/help - command help reference
`
bot.use((ctx, next) => {

    let keys = Object.keys(ctx.message);
    
    if (keys.includes("text")) {
        ctx.telegram.sendMessage(ctx.chat.id,ctx.message.text)
    } else if (keys.includes("sticker")) {
        ctx.replyWithSticker(ctx.message.sticker.file_id)
    } else if (keys.includes("photo")) {
        ctx.replyWithPhoto(ctx.message.photo[0].file_id)
    }
    
    next();
});

bot.start((ctx)=>{
    ctx.reply('Hello I am here demo bot.')
    ctx.reply(welcomeMsg)
})

bot.help((ctx)=>{
    ctx.reply(welcomeMsg)
})

bot.command('echo',(ctx)=>{
    const input = ctx.message.text
    let input_array = input.split(' ')
    let message 

    if (input_array.length === 1){
        message = 'You type only echo'
        ctx.reply(message)
    }else{
        input_array.shift()
        message = input_array.join(" ")
        ctx.reply(message)
    }
    console.log(input)
})
}

module.exports = echo_bot;