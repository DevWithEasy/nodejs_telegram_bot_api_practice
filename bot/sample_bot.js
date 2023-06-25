const { default: axios } = require("axios")

const sample_bot = (bot) =>{
    const welcomeMsg = `Say something to me
/start - start the bot
/fortune - command get the fortune quaot
/cat - one random cat image
/cats - ten random cat image
`
    bot.start((ctx)=>{
        ctx.reply('Hello I am here sample bot.')
        ctx.reply(welcomeMsg)
    })

    bot.help((ctx)=>{
        ctx.reply(welcomeMsg)
    })

    bot.command('fortune',async(ctx)=>{
        try{
            const res = await axios.get('http://yerkee.com/api/fortune')
            ctx.reply(res.data.fortune)
        }catch(error){
            ctx.reply('Something went wrong')
        }
    })

    bot.command('cat',async(ctx)=>{
        bot.telegram.sendChatAction(ctx.chat.id,'upload_photo')
        try{
            const res = await axios.get('https://api.thecatapi.com/v1/images/search')

            ctx.replyWithPhoto(res.data[0].url)

        }catch(error){
            ctx.reply('Something went wrong')
        }
    })

    bot.command('cats',async(ctx)=>{
        bot.telegram.sendChatAction(ctx.chat.id,'upload_photo')
        try{
            const res = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10')

            let cats = []

            res.data.forEach(image=>{
                cats.push({
                    type : 'photo',
                    media : image.url
                })
            })

            bot.telegram.sendMediaGroup(ctx.chat.id,cats)
            
        }catch(error){
            ctx.reply('Something went wrong')
        }
    })
}

module.exports = sample_bot