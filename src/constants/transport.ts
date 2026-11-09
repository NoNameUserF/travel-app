import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {
    AirplaneIcon,
    AutobusIcon,
    BicycleIcon,
    BoatIcon,
    CarIcon,
    MotorBikeIcon,
    NoMealsIcon,
    OnFootIcon,
    TaxiIcon,
    TrainIcon,
} from "../assets/Icons";

export const TRANSPORT_LIST: IOptions = {
    ANY: {label: "Любой", Icon: InfinityIcon},
    BUS: {label: "Автобус", Icon: AutobusIcon},
    SHIP: {label: "Лодка / Паром", Icon: BoatIcon},
    CAR: {label: "Машина", Icon: CarIcon},
    TRAIN: {label: "Поезд", Icon: TrainIcon},
    PLANE: {label: "Самолёт", Icon: AirplaneIcon},
};

export const INTERCITY_VEHICLES_TYPES: IOptions = {
    ANY: {label: "Любой", Icon: InfinityIcon},
    CAR_RENTAL: {label: "Арендованный автомобиль", Icon: CarIcon},
    BICYCLE_SCOOTER: {label: "Велосипед / Самокат", Icon: BicycleIcon},
    MOTORBIKE: {label: "Мотоцикл", Icon: MotorBikeIcon},
    PUBLIC_TRANSPORT: {label: "Общественный транспорт", Icon: AutobusIcon},
    ON_FOOT: {label: "Пешком", Icon: OnFootIcon},
    TAXI: {label: "Такси", Icon: TaxiIcon},
};

export const TRANSFERS_FROM_STATION: IOptions = {
    NO_NEED: {label: "Не нужен", Icon: NoMealsIcon},
    CAR_RENTAL_WITH_DRIVER: {label: "Аренда авто с водителем", Icon: CarIcon},
    STANDARD: {label: "Стандартный трансфер", Icon: AutobusIcon},
    PRIVATE: {label: "Частный трансфер", Icon: TaxiIcon},
};
