const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you received from @BotFather
const token = '7423058097:AAE9krq8rIfPRorfJltvWn61qUytaAu_-bQ';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const paymentFile = 'paymentStatus.json';
let userPaymentStatus = {};

// Завантаження стану оплат з файлу
function loadPaymentStatus() {
    if (fs.existsSync(paymentFile)) {
        const data = fs.readFileSync(paymentFile, 'utf8');
        userPaymentStatus = JSON.parse(data);
    }
}

// Збереження стану оплат у файл
function savePaymentStatus() {
    fs.writeFileSync(paymentFile, JSON.stringify(userPaymentStatus, null, 2));
}

// Завантаження стану оплат при запуску
loadPaymentStatus();

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Виберіть курс тренувань або оплатіть за тренування:", {
        reply_markup: {
            keyboard: [["Тренування 1"], ["Тренування 2"], ["Тренування 3"], ["Тренування на кожен день"], ["Оплатити"]]
        }
    });
});

bot.onText(/Оплатити/, (msg) => {
    bot.sendInvoice(
        msg.chat.id,
        'Оплата за тренування',
        'Опис тренування, яке ви вибрали',
        'unique_payload', 
        '1661751239:TEST:08re-aFnj-Xx0h-Tzsj',
        'UAH',
        [{
            label: 'название товара', 
            amount: 20000 // Цена в копейках (200 UAH)
        }],
        {
            need_name: true,
            need_phone_number: true,
            need_email: true
        }
    );
});

// Обробка успішної оплати
bot.on('pre_checkout_query', (query) => {
    bot.answerPreCheckoutQuery(query.id, true);
});

bot.on('successful_payment', (msg) => {
    const chatId = msg.chat.id;
    userPaymentStatus[chatId] = true;
    savePaymentStatus();
    bot.sendMessage(chatId, "Оплату успішно здійснено! Тепер ви можете вибрати курс тренувань.");
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!msg.text) {
        return bot.sendMessage(chatId, "Ви нічого не ввели, спробуйте знову.");
    }

    if (!userPaymentStatus[chatId] && msg.text.toLowerCase() !== 'оплатити') {
        return bot.sendMessage(chatId, "Будь ласка, спочатку здійсніть оплату. Натисніть 'Оплатити' у меню.");
    }

    const lowerText = msg.text.toString().toLowerCase();

    switch (lowerText) {
        case "тренування 1":
            sendTrainingVideos1(chatId);
            break;
        case "тренування 2":
            sendTrainingVideo2(chatId);
            break;
        case "тренування 3":
            sendTrainingVideo3(chatId);
            break;
        case "тренування на кожен день":
            sendTrainingVideo4(chatId);
            break;
    }
});

function sendTrainingVideos1(chatId) {
    const videos = [
        { url: 'https://t.me/dksjfdsl/4', description: 'Ходьба по палиці протягом 2хв. Ходимо різними частинами стопи.' },
        { url: 'https://t.me/dksjfdsl/5', description: 'Прокатування ікроножних по 2хв на кожну ногу.' },
        { url: 'https://t.me/dksjfdsl/6', description: 'Спираємось до стіни, сідниці відриваємо. Тягнемо носки на себе 3x30' },
        { url: 'https://t.me/dksjfdsl/7', description: 'Одягаємо резинку на гомілки. Провалюємо стопи і коліна всередину, після розвертаємо в сторони. 3x25-30' },
        { url: 'https://t.me/dksjfdsl/8', description: 'Прокатування бокової частини стегна 2хв кожну ногу.' },
        { url: 'https://t.me/dksjfdsl/9', description: 'Прокатування передньої частини стегна 2хв кожну ногу.' },
        { url: 'https://t.me/dksjfdsl/10', description: 'Відведення прямої ноги на сідничний.Лягаємо в одну лінію. Резинку одягаємо вище колін. Відводимо високо і трішки за спину, стопу можна і на себе і від себе (підбери для себе як краще відчувається сідничний)3х15-20' },
        { url: 'https://t.me/dksjfdsl/11', description: 'Коліно ледь зігнуто. Резинка вище колін. Пряма нога за спиною відводиться в сторону. Носок від себе обов*язково. 2х20-30 на кожну ногу' },
        { url: 'https://t.me/dksjfdsl/12', description: 'Лягаємо в одну лінію. Коліна теж в одну лінію з тілом. Коліна згинаємо приблизно під 90*. Лікоть напроти плеча. Піднімаємось і одночасно відводимо ногу вверх. 3х8-10 на кожну сторону' }
    ];
    videos.forEach(video => {
        bot.sendVideo(chatId, video.url, { caption: video.description });
    });
}

function sendTrainingVideo2(chatId) {
    const videos = [
        { url: 'https://t.me/dksjfdsl/14', description: 'Прокатування поясниці арахісом на протязі 2хв. Опір тримаємо на ліктях, сідниці відриваємо від підлоги. По мірі стихання болі в поясниці можна катати без підтримки ліктів' },
        { url: 'https://t.me/dksjfdsl/15', description: 'Лягаємо на живіт, з’єднавши коліна і стопи, а руки витягуємо в сторони.Повертаємо таз, щоб стопа торкнулася землі, а шию повертаємо в протилежну сторону від ноги. 2х20-30' },
        { url: 'https://t.me/dksjfdsl/16', description: 'Лежачи на животі віджимання з прогином попереку. 3Х15-20' },
        { url: 'https://t.me/dksjfdsl/17', description: 'Ноги ширше плечей. Підніми гантель прямо над головою і зафіксуй руку у вертикальному положенні, а вільна рука рухається вниз по внутрішній частині ноги до підлоги. 3х10 на кожну сторону. Гантель 3 кг' },
        { url: 'https://t.me/dksjfdsl/18', description: 'На вдиху вигинаємось так, щоб опустити живіт якомога ближче до підлоги (максимальний прогин у спині та попереку). Лопатки зводяться разом, шия трохи відводиться вгору і назад (погляд спрямований вперед) Робимо глибокий видих (щоб звільнити легені та максимально округлити спину) 2х15' },
        { url: 'https://t.me/dksjfdsl/19', description: 'Розтягуємо у верхній точці ДО 5 секунд 1х10 на кожну ногу' },
        { url: 'https://t.me/dksjfdsl/20', description: 'Лягаємо на сторону. Однією рукою тримаємо опір для голови, іншою опираємся долонею на підлогу. Верхню ногу позаду нижньої, ставимо цілу стопу. На видиху приводимо ногу вгору при цьому тримаючи носок на себе, на видиху опускаємо. Працюють привідні мʼязи( внутрішня частина стегна)3х15-20' },
        { url: 'https://t.me/dksjfdsl/21', description: 'Сядь на підлогу і зігни ноги під кутом 90 градусів, розстав коліна і стопи на ширині плечей, колінами торкнись підлоги. З цього положення підніми таз вверх і повільно опускайся вниз. 3х15 на кожну сторону.' },
        { url: 'https://t.me/dksjfdsl/22', description: 'Сідничний міст. Стаємо так щоб таз з торсом утворив пряму лінію. В кінці затримуємось на 5-10 секунд.Якщо відчуватимеш поясницю, то напруж прес і підкрути таз вперед.3х10х5-10 секунд' }
    ];
    videos.forEach(video => {
        bot.sendVideo(chatId, video.url, { caption: video.description });
    });
}

function sendTrainingVideo3(chatId) {
    const videos = [
        { url: 'https://t.me/dksjfdsl/24', description: 'Прокатування поясниці арахісом на протязі 2хв. Опір тримаємо на ліктях, сідниці відриваємо від підлоги. По мірі стихання болі в поясниці можна катати без підтримки ліктів' },
        { url: 'https://t.me/dksjfdsl/25', description: 'Лежачи на животі віджимання з прогином попереку. 2х10-15' },
        { url: 'https://t.me/dksjfdsl/26', description: 'Відведення зігнутих ніг разом так, щоб торкнутися колінами підлоги. 1х30' },
        { url: 'https://t.me/dksjfdsl/27', description: 'Почни із положення лежачи на животі, з’єднавши коліна та стопи. Зігни коліна під кутом 90 градусів і поверни таз, щоб стопи торкнулися землі (перші 2-3 тренування роби як на відео, щоб не травмувати спину) Зробіть 1-2 глибоких вдихи і в повернись в протилежний бік. 2х20 поворотів.' },
        { url: 'https://t.me/dksjfdsl/28', description: "Прокатуємо грудний м'яз як на відео. Кожну сторону по 2хв" },
        { url: 'https://t.me/dksjfdsl/29', description: 'Розташуй передпліччя на дверній коробці або стійці, плече під кутом приблизно 90 градусів. Зроби крок вперед, поки не відчуєш розтягнення в області грудей. Виконай 2 повторення з утриманням від 30 до 60 секунд на кожну сторону' },
        { url: 'https://t.me/dksjfdsl/30', description: 'Оберни резинку навколо голови і тримай її руками.  Розтягніть резинку, щоб створити опору на потилиці. Рух шиї вперед і назад. 3х15' },
        { url: 'https://t.me/dksjfdsl/31', description: 'Лягаємо рівно. Одна рука під чоло інша пряма. Перешкоду став напроти голови. Корпус при прокручуванні не повертай, старайся це робити іменно плечем.Темп середній. 3х10-15 на кожну руку' },
        { url: 'https://t.me/dksjfdsl/32', description: 'Лягаємо на сторону, щоб все тіло було прямою лінією. Опорний лікоть напроти плеча. Рука з гантелею під 90 градусів зігнута в лікті. Лікоть притискаємо до торсу. На видиху ротуємо повільно плече. 3х15-20' },
        { url: 'https://t.me/dksjfdsl/33', description: 'Корпус нахилений вперед, хребет прямий, трохи зігни ноги в колінних суглобах, погляд перед собою.Візьми гантелю в руку, починай рух кистею і ліктем вгору одночасно, у верхньому положенні доводимо до горизонталі.Піднімаємо на видиху. 3х15' },
    ];
    videos.forEach(video => {
        bot.sendVideo(chatId, video.url, { caption: video.description });
    });
}

function sendTrainingVideo4(chatId) {
    const videos = [
        { url: 'https://t.me/dksjfdsl/35', description: 'Ліву ногу на стілець. Поклади руки на талію, опусти плечі. Відведи лопатки назад, ліве коліно злегка зігни. Важливо, щоб нога і тулуб утворювали пряму лінію. На вдиху зосередься на тому щоб вдихнути в область під ліве ребро. На видиху: - Зберігати початкове коригувальне положення, - Потягнути маківку по діагоналі вгору і вліво, - потягнути пальці лівої ноги на себе, Виконати 4-5 підходів по 6-7 вдихів, Видихаємо на протязі 7 секунд' },
        { url: 'https://t.me/dksjfdsl/36', description: "Опір на коліна і кисті, починаємо виводити по одній руці та нозі до паралелі з підлогою. Зверни увагу на кисть, що піднімається: долоня дивиться не вниз, а до обличчя. 1х20 на кожну сторону. Обов'язково з резинкою" },
        { url: 'https://t.me/dksjfdsl/37', description: 'Рол під нижню частину лопаток. На вдиху розводимо лікті в сторони, прогинаємо спинку та шию, надуваємо живіт та грудний відділ. На видиху скручуємся та напружуємо прес. 1х10-15 циклів' },
        { url: 'https://t.me/dksjfdsl/38', description: 'На вдиху носом - за спину, на видиху - до живота. 1х15' },
    ];
    videos.forEach(video => {
        bot.sendVideo(chatId, video.url, { caption: video.description });
    });
}

console.log('Bot is running...');

// node my-telegram-bot

// 1661751239:TEST:08re-aFnj-Xx0h-Tzsj

