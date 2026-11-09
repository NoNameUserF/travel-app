import {FC} from "react";

import {GsuMainPagePreferencesBlock} from "@gsu-ai/gsu-ui-core";

import {Block2Plane, Block2Itinerary, Block2Location, Block2Luggage} from "../../../assets/Icons";

const Preferences: FC = () => {
    const block2Content = [
        {
            icon: Block2Location,
            title: "Вдохновляюще",
            text: "Неожиданные маршруты, новые города и идеи для отдыха — ваши путешествия становятся ярче",
        },
        {
            icon: Block2Plane,
            title: "Мгновенно",
            text: "Забудьте о часах в поисковиках. Наш ИИ подберёт направления, маршрут и бюджет за пару секунд",
        },
        {
            icon: Block2Itinerary,
            title: "Интуитивно",
            text: "Простой и понятный интерфейс — планировать поездку легко, даже если это ваш первый раз",
        },
        {
            icon: Block2Luggage,
            title: "Персонально",
            text: "Город вылета, бюджет, стиль отдыха и любимые активности — сервис строит поездку именно под вас",
        },
    ];

    return <GsuMainPagePreferencesBlock title={"Почему выбирают нас?"} contentItems={block2Content} />;
};

export default Preferences;
