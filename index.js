require('dotenv').config()
const {Telegraf} = require('telegraf')
const echo_bot = require('./bot/echo_bot')
const basic_term = require('./bot/basic_term')
const media_bot = require('./bot/media_bot')
const sample_bot = require('./bot/sample_bot')
const crypto_bot = require('./bot/crypto_bot')

const bot = new Telegraf(process.env.BOT_TOKEN)

basic_term(bot)
echo_bot(bot)
media_bot(bot)
sample_bot(bot)
crypto_bot(bot)

bot.launch()