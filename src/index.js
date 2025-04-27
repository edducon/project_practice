require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const logger = require('./logger');
const { connect } = require('./db');

// Токен и инициализация
const token = process.env.BOT_TOKEN;
if (!token) { console.error('BOT_TOKEN не задан'); process.exit(1); }
const bot = new TelegramBot(token, { polling: true });
console.log('Бот запущен...');

connect().then(() => console.log('MongoDB OK'));

// Команда /start
bot.onText(/\/start/, msg => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'друг';
    bot.sendMessage(chatId, `Привет, ${name}! Введите /help.`);
});

// Команда /help
bot.onText(/\/help/, msg => {
    bot.sendMessage(msg.chat.id, 'Доступные команды:/start,/help,/echo,/weather');
});

// Эхо-режим
bot.onText(/echo (.+)/, (msg, match) => bot.sendMessage(msg.chat.id, `Вы сказали: ${match[1]}`));

// Простой ответ на текст
bot.on('message', msg => {
    if (msg.text && !msg.text.startsWith('/')) bot.sendMessage(msg.chat.id, `Вы: ${msg.text}`);
});

// Погода
bot.onText(/\/weather (.+)/, async (msg, match) => {
    try {
        const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: { q: match[1], appid: process.env.WEATHER_KEY, units: 'metric', lang: 'ru' }
        });
        bot.sendMessage(msg.chat.id, `Погода: ${res.data.main.temp}°C, ${res.data.weather[0].description}`);
    } catch { bot.sendMessage(msg.chat.id, 'Ошибка получения погоды'); }
});