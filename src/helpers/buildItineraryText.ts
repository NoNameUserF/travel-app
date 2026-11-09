import {formatDuration} from "@gsu-ai/gsu-ui-core";

import ACTIVITY_LIST from "../constants/activity";
import {INTERCITY_VEHICLES_TYPES} from "../constants/transport";
import {ItineraryStepLocationState} from "../wizards/ItineraryStep/ItineraryStepLocation";
import {ITravelPoints} from "../api/interfaces";

interface ActionItem {
    key: string;
    value?: string | number;
}

export interface TravelPointItem {
    title: string;
    details: ActionItem[];
}

export interface DaySection {
    dayTitle: string;
    items: TravelPointItem[];
}

export const buildHeader = (location: ItineraryStepLocationState): ActionItem[] => {
    return [
        {key: "Город", value: location.city?.city},
        {key: "Бюджет", value: `~${location.budget} USD`},
        {key: "Количество взрослых", value: location.adult},
        {key: "Количество детей", value: location.children},
        {key: "Количество дней", value: location.days},
        {
            key: "Активности",
            value: location.activity
                .map((k) => ACTIVITY_LIST[k]?.label)
                .filter(Boolean)
                .join(", "),
        },
        {
            key: "Транспорт",
            value: location.transport
                .map((k) => INTERCITY_VEHICLES_TYPES[k]?.label)
                .filter(Boolean)
                .join(", "),
        },
    ];
};

const renderActionItems = (items: ActionItem[]): string => {
    return items
        .map((i) => {
            const key = i.key;

            switch (key) {
                case "Описание":
                    return `${key}: ${i.value ?? ""}`;

                case "Время на посещение":
                    return `${key}: ${formatDuration(i.value as string)}`;

                case "Стоимость":
                    return `${key}: ${i.value ? `~${i.value} USD` : "0 USD"} `;

                default:
                    return "";
            }
        })
        .join("\n");
};

const renderTravelPointItem = (item: TravelPointItem, index: number): string => {
    return `${index + 1}. ${item.title}\n${renderActionItems(item.details)}`;
};

const renderDaySection = (section: DaySection): string => {
    const body = section.items.map((it, i) => renderTravelPointItem(it, i)).join("\n\n");
    return `*** ${section.dayTitle} ***\n\n${body}`;
};

const renderSection = (title: string, items: ActionItem[]): string => {
    return `*** ${title} ***\n\n${items.map((elem) => `${elem.key}: ${elem.value ?? ""}`).join("\n")}`;
};

const toDaySections = (src: ITravelPoints[]): DaySection[] => {
    return src.map(
        (d): DaySection => ({
            dayTitle: d.day,
            items: d.travelPoints.map(
                (tp): TravelPointItem => ({
                    title: tp.name,
                    details: [
                        {key: "Описание", value: tp.description},
                        {key: "Время на посещение", value: tp.timeToSpend},
                        {key: "Стоимость", value: tp.coast},
                    ],
                }),
            ),
        }),
    );
};

export const buildItineraryText = (location: ItineraryStepLocationState, travelPoints: ITravelPoints[]): string => {
    const header = buildHeader(location);
    const headerText = renderSection("Общая информация о путешествии", header);

    const daySections = toDaySections(travelPoints);
    const daysText = daySections.map(renderDaySection).join("\n\n");
    const sourceLink = `Спланируйте свое путешествие: ${window.location.href}`;

    return [headerText, daysText, sourceLink].join("\n\n");
};
