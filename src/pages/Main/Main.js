import { Button } from '@mantine/core';

import mine from "../../assets/img/mine.png"
import "./Main.css";
export function Main({auth}) {

    return (
        <div className="centered">
            <div className="firstColumn">
                <div className="higherTitle">
                    <span>Лучший</span> и <span>уникальный</span> сайт для игры в сапёра
                </div>
                <div className="title">
                    MINESWEEPER GO
                </div>
                <div className="lowerTitle">
                {/* Играй, побеждай, не подорвись и тд и тп<br/>
                Тут ещё чёт надо написать */}
                <div class="quote">
                    <p>Мы рискуем, когда встаём с постели, переходим дорогу, или суём пальцы в розетку</p>
                    <span class="author">- Лейтенант Френк Дребен</span>
                </div>
                Но настоящий сапер рискует каждую секунду<br/>
                Рискнешь ли ты?
                </div>
                <Button variant="outline" radius="md" size="lg" onClick={auth}>
                    Занять топ
                </Button>
            </div>
            <div className="secondColumn">
                <img src={mine} alt="bomb"/>
            </div>
        </div>
    )
}