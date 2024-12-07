import React, { useState } from "react";
import "./App.css";

function App() {
    const [leftScore, setLeftScore] = useState(0);
    const [rightScore, setRightScore] = useState(0);
    const [winner, setWinner] = useState(null);

    const handleScoreChange = (team, action) => {
        if (winner) return; // Останавливаем изменение счета, если есть победитель

        let newLeftScore = leftScore;
        let newRightScore = rightScore;

        if (team === "left") {
            if (action === "add") {
                newLeftScore = leftScore + 1;
            } else if (action === "subtract" && leftScore > 0) {
                newLeftScore = leftScore - 1;
            }
        } else if (team === "right") {
            if (action === "add") {
                newRightScore = rightScore + 1;
            } else if (action === "subtract" && rightScore > 0) {
                newRightScore = rightScore - 1;
            }
        }

        // Обновляем счет независимо от того, есть ли победитель или нет
        setLeftScore(newLeftScore);
        setRightScore(newRightScore);

        // Проверка на победу
        if (
            (newLeftScore >= 25 && newLeftScore - newRightScore >= 2) ||
            (newRightScore >= 25 && newRightScore - newLeftScore >= 2)
        ) {
            setWinner(team === "left" ? "Левая команда" : "Правая команда");
        }
    };

    const resetGame = () => {
        setLeftScore(0);
        setRightScore(0);
        setWinner(null);
    };

    return (
        <div className="App">
            <div className="header">
                <div className="total-score">
                    {leftScore} - {rightScore}
                </div>
                <button className="reset-btn" onClick={resetGame}>
                    Перезапустить
                </button>
            </div>
            <div className="court">
                {/* Левая команда */}
                <div
                    className="team-area left"
                    onClick={(e) => {
                        const { clientX, target } = e;
                        const middleX = target.offsetLeft + target.offsetWidth / 2;
                        if (clientX < middleX) {
                            handleScoreChange("left", "subtract");
                        } else {
                            handleScoreChange("left", "add");
                        }
                    }}
                >
                    <span className="score">{leftScore}</span>
                </div>

                {/* Правая команда */}
                <div
                    className="team-area right"
                    onClick={(e) => {
                        const { clientX, target } = e;
                        const middleX = target.offsetLeft + target.offsetWidth / 2;
                        if (clientX < middleX) {
                            handleScoreChange("right", "subtract");
                        } else {
                            handleScoreChange("right", "add");
                        }
                    }}
                >
                    <span className="score">{rightScore}</span>
                </div>
            </div>

            {/* Баннеер с победителем */}
            {winner && (
                <div className="winner-banner">
                    <h2>{winner} выиграла!</h2>
                </div>
            )}
        </div>
    );
}

export default App;
