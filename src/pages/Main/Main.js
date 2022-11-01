import { Button } from '@mantine/core';

import mine from "../../assets/img/mine.png"
import "./Main.css";
export function Main() {
//https://mantine.dev/styles/responsive/#changing-component-size-based-on-media-query !!!!!!

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
                Играй, побеждай, не подорвись и тд и тп<br/>
                Тут ещё чёт надо написать
                </div>
                <Button variant="outline" radius="md" size="lg">
                    Занять топ
                </Button>
            </div>
            <div className="secondColumn">
                <img src={mine} alt="bomb"/>
            </div>
        </div>
    )
}