import {
    createUserScenario,
    createSystemScenario,
    createSaluteRequest,
    createSaluteResponse,
    createScenarioWalker,
    createMatchers,
} from '@salutejs/scenario';
import { SaluteMemoryStorage } from '@salutejs/storage-adapter-memory';
// @ts-ignore
import { handleScoreChange, resetGame } from './handlers'; // Ваши функции из React компонента

const { regexp, action } = createMatchers();

const userScenario = createUserScenario({
    // Обработчик изменения счета
    addLeftScore: {
        match: regexp(/^Добавь очко левой команде$/i),
        handle: () => handleScoreChange('left', 'add'),
    },
    subtractLeftScore: {
        match: regexp(/^Убери очко у левой команды$/i),
        handle: () => handleScoreChange('left', 'subtract'),
    },
    addRightScore: {
        match: regexp(/^Добавь очко правой команде$/i),
        handle: () => handleScoreChange('right', 'add'),
    },
    subtractRightScore: {
        match: regexp(/^Убери очко у правой команды$/i),
        handle: () => handleScoreChange('right', 'subtract'),
    },
    // Обработчик перезапуска игры
    resetGame: {
        match: regexp(/^Перезапустить игру$/i),
        handle: resetGame,
    },
    // Обработчик запроса на объявление победителя
    announceWinner: {
        match: action('announceWinner'),
        handle: (req, res) => {
            const winner = req.variables.winner;
            if (winner) {
                res.setPronounceText(`${winner} выиграла!`);
            } else {
                res.setPronounceText('Игра еще не завершена');
            }
        }
    }
});

const systemScenario = createSystemScenario({
    // Сценарий запуска приложения
    RUN_APP: ({ req, res }) => {
        res.setPronounceText("Привет! Начни игру с команды или перезапусти.");
        res.appendSuggestions(["Перезапустить игру", "Добавить очко левой команде", "Добавить очко правой команде"]);
    },
    // Сценарий для случаев, когда система не понимает запрос
    NO_MATCH: ({ req, res }) => {
        res.setPronounceText("Извините, я не понял команду. Попробуйте снова.");
    }
});

const scenarioWalker = createScenarioWalker({
    systemScenario,
    userScenario
});

const storage = new SaluteMemoryStorage();

export const handleNlpRequest = async (request) => {
    const req = createSaluteRequest(request);
    const res = createSaluteResponse(request);

    const sessionId = request.uuid.userId;
    const session = await storage.resolve(sessionId);

    await scenarioWalker({ req, res, session });
    await storage.save({ id: sessionId, session });

    return res.message;
};
