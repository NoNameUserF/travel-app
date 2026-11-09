import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {
    AllInclusiveIcon,
    BusinessClassIcon,
    CarryOnIcon,
    CityIcon,
    ColdSeasonIcon,
    CountrySideIcon,
    DopActivityIcon,
    EconomyClassIcon,
    FirstClassIcon,
    FullBoardIcon,
    HalfBoardIcon,
    HistoricalPlaceIcon,
    NoMealsIcon,
    OffSeasonIcon,
    OneCheckedIcon,
    OnlyBreakfastIcon,
    PremiumClassIcon,
    RetreatsIcon,
    RoutesIcon,
    TwoOrMoreCheckedIcon,
    WarmSeasonIcon,
} from "../assets/Icons";

import {TRANSPORT_LIST} from "./transport";

export const CALCULATOR_TRANSPORT_LIST: IOptions = Object.fromEntries(
    Object.entries(TRANSPORT_LIST).filter(([key]) => key !== "ANY"),
);

export const CLASSES_OF_SERVICE: IOptions = {
    ECONOMY_CLASS: {label: "Эконом класс", Icon: EconomyClassIcon},
    BUSINESS_CLASS: {label: "Бизнес-класс", Icon: BusinessClassIcon},
    FIRST_CLASS: {label: "Первый класс", Icon: FirstClassIcon},
    PREMIUM_ECONOMY: {label: "Премиум-эконом", Icon: PremiumClassIcon},
};

export const TYPES_OF_ACCOMMODATION: IOptions = {
    RENTAL_APARTMENTS: {label: "Аренда или через Airbnb", Icon: CountrySideIcon},
    TWO_OR_THREE_STAR_HOTEL: {label: "Гостиница 2-3 звезды", Icon: FirstClassIcon},
    FOUR_STAR_HOTEL: {label: "Гостиница 4 звезды", Icon: BusinessClassIcon},
    LUX_HOTEL: {label: "Гостиница 5 звёзд", Icon: PremiumClassIcon},
    ALL_INCLUSIVE_ACCOMMODATION: {label: "Премиум-апартаменты", Icon: HistoricalPlaceIcon},
    HOSTEL: {label: "Хостел", Icon: CityIcon},
};

export const SEASONS: IOptions = {
    PEAK_SEASON: {label: "Лето и праздники", Icon: WarmSeasonIcon},
    OFF_SEASON: {label: "Межсезонье", Icon: OffSeasonIcon},
    LOW_SEASON: {label: "Низкий сезон", Icon: ColdSeasonIcon},
};

export const TYPES_OF_FOOD: IOptions = {
    NO_MEALS: {label: "Без питания", Icon: NoMealsIcon},
    ALL_INCLUSIVE: {label: "Всё включено", Icon: AllInclusiveIcon},
    HALF_BOARD: {label: "Завтрак и ужин", Icon: HalfBoardIcon},
    FULL_BOARD: {label: "Полный пансион, все приёмы пищи", Icon: FullBoardIcon},
    BREAKFAST_INCLUDE: {label: "Только завтрак", Icon: OnlyBreakfastIcon},
};

export const TYPES_OF_TOURS: IOptions = {
    NO_NEED: {label: "Нет", Icon: NoMealsIcon},
    PRE_DETERMINED_EXCURSIONS: {label: "Несколько экскурсий", Icon: FirstClassIcon},
    INDIVIDUAL_EXCURSIONS: {label: "Персональные экскурсии", Icon: EconomyClassIcon},
    FULL_TOURIST_PACKAGE: {label: "Полный туристический пакет", Icon: BusinessClassIcon},
};

export const TYPES_OF_INSURANCE: IOptions = {
    WITHOUT_INSURANCE: {label: "Без страховки", Icon: NoMealsIcon},
    BASIC_COVERAGE: {label: "Базовая", Icon: FirstClassIcon},
    EXTENDED_INSURANCE: {label: "Расширенная", Icon: EconomyClassIcon},
    VIP_INSURANCE: {label: "VIP-страховка с доп. услугами", Icon: BusinessClassIcon},
};

export const COMFORT_LEVEL: IOptions = {
    PREMIUM: {label: "Премиум уровень, доп. удобства", Icon: BusinessClassIcon},
    STANDARD: {label: "Cтандартный уровень", Icon: EconomyClassIcon},
    ECONOMY: {label: "Эконом, минимальные удобства", Icon: FirstClassIcon},
};

export const TYPES_OF_LUGGAGE: IOptions = {
    TWO_OR_MORE_CHECKED_BAGS: {label: "Две и более сдаваемых сумок", Icon: TwoOrMoreCheckedIcon},
    ONE_CHECKED_BAG: {label: "Один сдаваемый чемодан", Icon: OneCheckedIcon},
    CARRY_ON_BAGGAGE: {label: "Ручная кладь", Icon: CarryOnIcon},
};

export const TYPES_OF_ADDITIONAL_OPTIONS: IOptions = {
    SPORTS_EQUIPMENT_RENTAL: {label: "Аренда спортивного снаряжения", Icon: DopActivityIcon},
    ADDITIONAL_THEMED_EXCURSIONS: {label: "Дополнительные экскурсии", Icon: RoutesIcon},
    SPA_WELLNESS_TREATMENTS: {label: "Оздоровительные процедуры", Icon: RetreatsIcon},
};
