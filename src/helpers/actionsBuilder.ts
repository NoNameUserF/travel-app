import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {BackpackBasicInfoState} from "../wizards/BackpackStep/BackpackBasicInfo";
import {TRANSPORT_LIST} from "../constants/transport";
import ACTIVITY_LIST from "../constants/activity";
import LUGGAGE_LIST from "../constants/luggage";
import SEASONS_LIST from "../constants/seasons";
import {CalculatorResult, IBackpack, IBagsItem} from "../api/interfaces";

const NOT_INDICATED = "Не указано";

export const getCalculatorActionsInfo = (calculator: CalculatorResult[], info: IGsuInfoContainerCell[]) => {
    if (!calculator) {
        return "";
    }

    const currency = info.find((el) => el.key === "Валюта")?.value;
    const calculatorBasicInfoStr = info.map(({key, value}) => `${key}: ${value}`).join("\n");

    const calculatorTable = calculator.map((el) => `${el.name} --- ${el.price} ${currency}`).join("\n");

    const total = calculator.reduce((sum, item) => sum + item.price, 0);

    return (
        "*** Расчёт бюджета *** \n\n" +
        `${calculatorBasicInfoStr}` +
        "\n\n" +
        " *** Затраты *** \n" +
        `${calculatorTable}; \n` +
        `Итого: ${total} ${currency}\n \n` +
        `Рассчитайте бюджет своего путешествия: ${window.location.href}`
    );
};

export const getBackpackActionsInfo = (backpack: IBackpack | null, backpackBasicInfo: BackpackBasicInfoState) => {
    if (!backpack || !backpackBasicInfo) {
        return "";
    }

    const renderTextForPersonType = (items: IBagsItem[]): string => {
        return items.map((item) => `    - ${item.name.trim()} - ${item.quantity} шт.`).join("\n");
    };

    const backpackBasicInfoStr =
        `Город прибытия: ${backpackBasicInfo.city?.city || "Не указан"}\n` +
        `Количество взрослых: ${backpackBasicInfo.adults?.toString()}\n` +
        `Количество детей: ${backpackBasicInfo.children?.toString()}\n` +
        `Количество дней в путешествии: ${backpackBasicInfo.daysCount?.toString()}\n` +
        `Размер багажа: ${backpackBasicInfo.luggage ? LUGGAGE_LIST[backpackBasicInfo.luggage]?.label || backpackBasicInfo.luggage : NOT_INDICATED}\n` +
        `Транспорт: ${backpackBasicInfo.transport?.length > 0 ? backpackBasicInfo.transport.map((code) => TRANSPORT_LIST[code]?.label || code).join(", ") : NOT_INDICATED}\n` +
        `Активности: ${backpackBasicInfo.activities?.length > 0 ? backpackBasicInfo.activities.map((code) => ACTIVITY_LIST[code]?.label || code).join(", ") : NOT_INDICATED}\n` +
        `Сезон: ${backpackBasicInfo.season ? SEASONS_LIST[backpackBasicInfo.season]?.label || backpackBasicInfo.season : NOT_INDICATED}\n`;

    const hasItems =
        (backpack.adults && backpack.adults.length > 0 && backpackBasicInfo.adults > 0) ||
        (backpack.children && backpack.children.length > 0 && backpackBasicInfo.children > 0);

    return `*** Список вещей *** \n\n${backpackBasicInfoStr}${hasItems ? "\n*** Вещи: *** \n" : ""}${
        backpack.adults && backpack.adults.length > 0 && backpackBasicInfo.adults > 0
            ? `*** Для взрослых ***\n${renderTextForPersonType(backpack.adults)}\n`
            : ""
    }${
        backpack.children && backpack.children.length > 0 && backpackBasicInfo.children > 0
            ? `\n*** Для детей ***\n${renderTextForPersonType(backpack.children)}\n`
            : ""
    }\n\nСоберите идеальный чемодан в поездку: ${window.location.href}`;
};
