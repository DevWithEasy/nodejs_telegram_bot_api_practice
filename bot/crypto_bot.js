const { default: axios } = require("axios");

const crypto_bot = (bot) =>{
    const sendStartMessage = (ctx)=>{
        const welcome = 'Welcome to Crypto Bot.\nThe Crypto Bot give you the ability to information crypto currency information'
        bot.telegram.sendMessage(
            ctx.chat.id,
            welcome,
            {
                reply_markup : {
                    inline_keyboard : [
                        [
                            { text : 'Crypto Prices', callback_data : 'prices' },
                        ],
                        [
                            { text : 'CoinMarketCap', url : 'https://coinmarketcap.com' },
                        ],
                        [
                            { text : 'Bot Info', callback_data : 'info' },
                        ]
                    ]
                }
            }
        )
    }
    bot.start((ctx)=>{
        sendStartMessage(ctx)
    });

    bot.action('info',(ctx)=>{
        ctx.answerCbQuery()
        bot.telegram.sendMessage(
            ctx.chat.id,
            'Bot Information',
            {
                reply_markup : {
                    keyboard : [
                        [
                            {text : 'Credit'},
                            {text : 'API'}
                        ],
                        [
                            {text : 'Keyboard Remove'},
                        ]
                    ],
                    resize_keyboard : true,
                    one_time_keyboard : true
                },
                
            }
        )
    });

    //-------------all actions-------------
    bot.action('start',(ctx)=>{
        ctx.deleteMessage()
        sendStartMessage(ctx)
    });

    bot.action('prices',(ctx) => {
        const pricesMsg = `Get prices information.\nPlease select one of the following options`
        ctx.deleteMessage()
        bot.telegram.sendMessage(
            ctx.chat.id,
            pricesMsg,
            {
                reply_markup : {
                    inline_keyboard : [
                        [
                            { text : 'BTC', callback_data : 'prices-BTC' },
                            { text : 'ETH', callback_data : 'prices-ETH' },
                        ],
                        [
                            { text : 'BCH', callback_data : 'prices-BCH' },
                            { text : 'LTC', callback_data : 'prices-LTC' },
                        ],
                        [
                            { text : 'Back Menu', callback_data : 'start' },
                        ]
                    ]
                }
            }
        )
    })
    const priceActions = ['prices-BTC','prices-ETH','prices-BCH','prices-LTC']

    bot.action(priceActions,async(ctx) => {
        ctx.answerCbQuery()
        const params  = ctx.match.input.split('-')[1]
        try {
            const res = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${params}&tsyms=USD,JPY,EUR&api_key=${process.env.CRYPTO_API_KEY}`)
            
            const message = `USD - ${res.data.USD}\nJPY - ${res.data.JPY}\nEUR - ${res.data.EUR}`

            ctx.deleteMessage()
            bot.telegram.sendMessage(
                ctx.chat.id,
                message,
                {
                    reply_markup : {
                        inline_keyboard : [
                            [
                                { text : 'Back Prices', callback_data : 'prices' },
                            ]
                        ]
                    }
                }
            )
        } catch (error) {
            ctx.reply('something went wrong')
        }
    })

    //-------------hears ---------------
    bot.hears('Credit',(ctx)=>{
        ctx.deleteMessage()
        bot.telegram.sendMessage(
            ctx.chat.id,
            'This bot created by devwitheasy'
        )
    })

    bot.hears('API',(ctx)=>{
        ctx.deleteMessage()
        bot.telegram.sendMessage(
            ctx.chat.id,
            'This bot data created from coincap api'
        )
    })

    bot.hears('Keyboard Remove',(ctx)=>{
        ctx.deleteMessage()
        bot.telegram.sendMessage(
            ctx.chat.id,
            'Keyboard Remove',
            {
                reply_markup : {
                    remove_keyboard : true
                }
            }
        )
    })
}

module.exports = crypto_bot;