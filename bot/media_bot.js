const media_bot = (bot) =>{
    //send photo to user
    bot.command('photo',(ctx)=>{
        bot.telegram.sendChatAction(ctx.chat.id,'upload_photo')
        bot.telegram.sendPhoto(ctx.chat.id, 'https://picsum.photos/400/300')
        // bot.telegram.sendPhoto(ctx.chat.id, {
        //     source : __dirname+'/public/hello_image.jpg'
        // })
    })

    //send multiple photos to the user
    bot.command('photos', (ctx)=>{
        bot.telegram.sendChatAction(ctx.chat.id,'upload_photo')
        bot.telegram.sendMediaGroup(
            ctx.chat.id,
            [
                {
                    type : 'photo', media : 'https://picsum.photos/400/300'
                },
                {
                    type : 'photo', media : 'https://picsum.photos/400/400'
                },
                {
                    type : 'photo', media : 'https://picsum.photos/400/500'
                }
            ]
        )
    })

    //send anime to user
    bot.command('anime', (ctx)=>{
        bot.telegram.sendChatAction(ctx.chat.id,'upload_video')
        bot.telegram.sendAnimation(
            ctx.chat.id,
            'https://www.adorama.com/alc/wp-content/uploads/2021/05/bird-wings-flying-feature.gif',
            {
                reply_to_message_id: ctx.message.message_id
            }
        )
    })

    //send document to user
    bot.command('doc', (ctx)=>{
        bot.telegram.sendDocument(
            ctx.chat.id,
            'https://www.gnu.org/software/hello/manual/hello.txt',
            {
                thumb : 'http://www.gnu.org/software/hello'
            }
        )
    })

    //send location to user
    bot.command('location', (ctx)=>{
        bot.telegram.sendLocation(
            ctx.chat.id,23.042121,91.376681
        )
    })

    
    bot.on('message',async(ctx, next) => {
        let keys = Object.keys(ctx.message);
        try {
            if (keys.includes("animation") && keys.includes("document")) {
                const link = await bot.telegram.getFileLink(ctx.message.animation.file_id)
                ctx.reply("Your Video download link " + link.href)
            }else if (keys.includes("document")) {
                const link = await bot.telegram.getFileLink(ctx.message.document.file_id)
                ctx.reply("Your document download link " + link.href)
            }
        } catch (error) {
            return ctx.reply('Something went wrong')
        }
        
        
        next();
    });
}

module.exports = media_bot;