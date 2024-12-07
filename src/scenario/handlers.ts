import { SaluteHandler, SaluteRequest } from '@salutejs/scenario';

// Обработчик приветствия
export const runAppHandler: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    req.character === 'joy' ?
        res.setPronounceText("Привет, скажи, что хочешь сделать!") :
        res.setPronounceText("Приветствую вас, скажите, что хотите сделать.")
    res.appendSuggestions(['Запусти игру', 'Помощь'])
    res.setEmotion('radost')
};

// Обработчик помощи
export const help: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    req.character === 'joy' ?
        res.setPronounceText('Скажи "запусти игру", чтобы начать, или "помощь" для получения информации.') :
        res.setPronounceText('Скажите "запусти игру", чтобы начать, или "помощь" для получения информации.')
};

// Закрытие приложения
export const closeAppHander: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.setPronounceText("Спасибо за использование приложения!")
};

// Восстановление состояния приложения (перезапуск)
export const restart: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    res.appendCommand({ type: 'RESET' })
    req.character === 'joy' ?
        res.setPronounceText("Что ты хочешь сделать?") :
        res.setPronounceText("Что вы хотите сделать?")
};

// Обработчик добавления очков левой команды
export const addLeftScore: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    // В данном примере обрабатываем только добавление очков
    res.setPronounceText("Очко добавлено левой команде!");
};

// Обработчик добавления очков правой команды
export const addRightScore: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    // В данном примере обрабатываем только добавление очков
    res.setPronounceText("Очко добавлено правой команде!");
};

// Обработчик объявления победителя
export const announceWinner: SaluteHandler<SaluteRequest> = ({ req, res }) => {
    const winner = req.variables.winner;
    if (winner) {
        res.setPronounceText(`${winner} выиграла!`);
    } else {
        res.setPronounceText('Игра еще не завершена');
    }
};
