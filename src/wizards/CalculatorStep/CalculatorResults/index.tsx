import {
    IGsuCalculatorItem,
    IGsuInfoContainerCell,
    IOptions,
    IWizardStep,
} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC, useState} from "react";

import {GsuActionsBlock, GsuCalculatorContainer, GsuPagination, GsuWizardResultPage} from "@gsu-ai/gsu-ui-core";

import {INTERCITY_VEHICLES_TYPES, TRANSFERS_FROM_STATION, TRANSPORT_LIST} from "../../../constants/transport";
import ACTIVITY_LIST from "../../../constants/activity";
import {getCalculatorActionsInfo} from "../../../helpers/actionsBuilder";

import {CalculatorResult} from "../../../api/interfaces";
import {
    COMFORT_LEVEL,
    SEASONS,
    TYPES_OF_ACCOMMODATION,
    TYPES_OF_ADDITIONAL_OPTIONS,
    TYPES_OF_FOOD,
    TYPES_OF_INSURANCE,
    TYPES_OF_LUGGAGE,
    TYPES_OF_TOURS,
} from "../../../constants/calculator";
import {CalculatorBasicInfoState} from "../CalculatorBasicInfo";

import CalculatorData from "../CalculatorData";

import styles from "./index.module.css";

export interface CalculatorResultsState {
    calculator: CalculatorResult[] | [];
}
const pagination: IOptions = {
    BUDGET: {label: "Бюджет"},
    DATA: {label: "Данные"},
};

const cap = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const CalculatorResults: FC<IWizardStep<CalculatorResultsState>> = ({componentState, refresh, wizardState}) => {
    const [paginationKey, setPaginationKey] = useState<string>("BUDGET");
    const calculatorResponse = componentState.calculator;
    const CALCULATORFIRSTSTEP = wizardState.CALCULATORFIRSTSTEP as CalculatorBasicInfoState;

    const info: IGsuInfoContainerCell[] = [
        {key: "Город прибытия", value: cap(CALCULATORFIRSTSTEP.destination?.city || "Не указан")},
        {key: "Количество дней", value: CALCULATORFIRSTSTEP.daysCount},
        {key: "Количество взрослых", value: CALCULATORFIRSTSTEP.adults},
        {key: "Количество детей", value: CALCULATORFIRSTSTEP.children},
        {key: "Валюта", value: CALCULATORFIRSTSTEP.currency},
        {key: "Транспорт до места", value: cap(TRANSPORT_LIST[CALCULATORFIRSTSTEP.internationalVehicle]?.label || "")},
        {
            key: "Транспорт по городу",
            value: CALCULATORFIRSTSTEP.intercityVehicles
                .map((el: string) => cap(INTERCITY_VEHICLES_TYPES[el]?.label || ""))
                .join(", "),
        },
        {
            key: "Активность",
            value: CALCULATORFIRSTSTEP.activities.map((el: string) => cap(ACTIVITY_LIST[el]?.label || "")).join(", "),
        },
        {
            key: "Тип проживания",
            value: cap(TYPES_OF_ACCOMMODATION[CALCULATORFIRSTSTEP.typeOfAccommodation]?.label || ""),
        },
        {key: "Сезон", value: cap(SEASONS[CALCULATORFIRSTSTEP.season]?.label || "")},
        {key: "Тип питания", value: cap(TYPES_OF_FOOD[CALCULATORFIRSTSTEP.typeOfFood]?.label || "")},
        {
            key: "Трансфер от/до аэропорта",
            value: cap(TRANSFERS_FROM_STATION[CALCULATORFIRSTSTEP.transferFromStation]?.label || ""),
        },
        {key: "Бронь экскурсий", value: cap(TYPES_OF_TOURS[CALCULATORFIRSTSTEP.bookingTours]?.label || "")},
        {key: "Тип страховки", value: cap(TYPES_OF_INSURANCE[CALCULATORFIRSTSTEP.typeOfInsurance]?.label || "")},
        {key: "Уровень комфорта", value: cap(COMFORT_LEVEL[CALCULATORFIRSTSTEP.comfortLevel]?.label || "")},
        {key: "Планируемый тип багажа", value: cap(TYPES_OF_LUGGAGE[CALCULATORFIRSTSTEP.typeOfLuggage]?.label || "")},
        {
            key: "Дополнительные опции",
            value:
                CALCULATORFIRSTSTEP.additionalOptions
                    .map((el: string) => cap(TYPES_OF_ADDITIONAL_OPTIONS[el]?.label || ""))
                    .join(", ") || "Не выбрано",
        },
    ];

    const calculatorActionInfo = getCalculatorActionsInfo(calculatorResponse, info);
    const infoCells: IGsuCalculatorItem[] = calculatorResponse.map((item: CalculatorResult) => ({
        name: cap(item.name),
        value: item.price,
        currency: CALCULATORFIRSTSTEP.currency,
    }));
    const {city = "", countryName = ""} = CALCULATORFIRSTSTEP.destination || {};

    return (
        <GsuWizardResultPage title="Расчёт бюджета" refresh={refresh}>
            <div className={styles.actionsBlockContainer}>
                <GsuPagination activeKey={paginationKey} changeKey={setPaginationKey} options={pagination} />
                <GsuActionsBlock
                    copy={calculatorActionInfo}
                    save={calculatorActionInfo}
                    share={calculatorActionInfo}
                    saveFileName={`${city}_${countryName}_расчёт_бюджета`}
                />
            </div>
            {paginationKey === "BUDGET" && (
                <GsuCalculatorContainer
                    items={infoCells}
                    showTotalValue={true}
                    currency={CALCULATORFIRSTSTEP.currency}
                />
            )}
            {paginationKey === "DATA" && <CalculatorData cardData={info}></CalculatorData>}
        </GsuWizardResultPage>
    );
};

export default CalculatorResults;
