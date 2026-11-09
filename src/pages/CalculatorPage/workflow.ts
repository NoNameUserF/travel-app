import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";
import ReactGA from "react-ga4";

import CalculatorBasicInfo, {CalculatorBasicInfoState} from "../../wizards/CalculatorStep/CalculatorBasicInfo";
import {APPLICATION_HOST} from "../../api/api";
import CalculatorResults, {CalculatorResultsState} from "../../wizards/CalculatorStep/CalculatorResults";

interface calculatorPeople {
    adultsCount: number;
    kidsCount: number;
    couple?: boolean;
}

const loaderSteps: {title: string; time: number}[] = [
    {
        title: "Анализирую цены",
        time: 3000,
    },
    {
        title: "Рассчитываю бюджет",
        time: 5000,
    },
];

const CALCULATOR_FIRST_STEP: IWorkflowStep<CalculatorBasicInfoState> = {
    uid: "CALCULATORFIRSTSTEP",
    name: "КАЛЬКУЛЯТОР",
    initState: () => {
        return {
            citizenship: getDataFromStorage("calculatorCitizenship") || null,
            city: getDataFromStorage("calculatorCity") || null,
            destination: getDataFromStorage("calculatorDestination") || null,
            currency: getDataFromStorage("calculatorCurrency") || null,
            daysCount: getDataFromStorage("calculatorDaysCount") || 1,
            adults: getDataFromStorage("calculatorAdults") || 0,
            couple: getDataFromStorage("calculatorCouple") || false,
            children: getDataFromStorage("calculatorChildren") || 0,
            internationalVehicle: getDataFromStorage("calculatorInternationalVehicle") || "BUS",
            classOfService: getDataFromStorage("calculatorClassOfService") || "ECONOMY_CLASS",
            intercityVehicles: getDataFromStorage("calculatorIntercityVehicles") || ["ANY"],
            activities: getDataFromStorage("calculatorActivities") || ["ANY"],
            typeOfAccommodation: getDataFromStorage("calculatorTypeOfAccommodation") || "RENTAL_APARTMENTS",
            season: getDataFromStorage("calculatorSeason") || "PEAK_SEASON",
            typeOfFood: getDataFromStorage("calculatorTypeOfFood") || "NO_MEALS",
            transferFromStation: getDataFromStorage("calculatorTransferFromStation") || "NO_NEED",
            bookingTours: getDataFromStorage("calculatorBookingTours") || "NO_NEED",
            typeOfInsurance: getDataFromStorage("calculatorTypeOfInsurance") || "WITHOUT_INSURANCE",
            comfortLevel: getDataFromStorage("calculatorComfortLevel") || "PREMIUM",
            typeOfLuggage: getDataFromStorage("calculatorTypeOfLuggage") || "TWO_OR_MORE_CHECKED_BAGS",
            additionalOptions: getDataFromStorage("calculatorAdditionalOptions") || [],
        };
    },
    cleanState: () => {
        return {
            citizenship: null,
            city: null,
            destination: null,
            currency: "",
            daysCount: 1,
            adults: 1,
            couple: false,
            children: 0,
            internationalVehicle: "BUS",
            classOfService: "ECONOMY_CLASS",
            intercityVehicles: ["ANY"],
            activities: ["ANY"],
            typeOfAccommodation: "RENTAL_APARTMENTS",
            season: "PEAK_SEASON",
            typeOfFood: "NO_MEALS",
            transferFromStation: "NO_NEED",
            bookingTours: "NO_NEED",
            typeOfInsurance: "WITHOUT_INSURANCE",
            comfortLevel: "PREMIUM",
            typeOfLuggage: "TWO_OR_MORE_CHECKED_BAGS",
            additionalOptions: [],
        };
    },
    storageDependencies: [
        "calculatorCitizenship",
        "calculatorCity",
        "calculatorDestination",
        "calculatorCurrency",
        "calculatorDaysCount",
        "calculatorAdults",
        "calculatorCouple",
        "calculatorChildren",
        "calculatorInternationalVehicle",
        "calculatorClassOfService",
        "calculatorIntercityVehicles",
        "calculatorActivities",
        "calculatorTypeOfAccommodation",
        "calculatorSeason",
        "calculatorTypeOfFood",
        "calculatorTransferFromStation",
        "calculatorBookingTours",
        "calculatorTypeOfInsurance",
        "calculatorComfortLevel",
        "calculatorTypeOfLuggage",
        "calculatorAdditionalOptions",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return CalculatorBasicInfo;
    },

    fetch: (componentState) => {
        const people: calculatorPeople = {
            adultsCount: componentState.adults,
            kidsCount: componentState.children,
            couple: false,
        };

        if (componentState.adults === 2) {
            people.couple = componentState.couple;
        }

        const calculator = {
            additionalOptions: componentState.additionalOptions,
            bookingTours: componentState.bookingTours,
            citizenship: componentState.citizenship,
            classOfService: componentState.internationalVehicle === "PLANE" ? componentState.classOfService : null,
            comfortLevel: componentState.comfortLevel,
            currencyCode: componentState.currency,
            daysCount: componentState.daysCount,
            destination: {
                cityName: componentState.destination?.city,
                countryName: componentState.destination?.countryName,
            },
            internationalVehicle: componentState.internationalVehicle,
            people,
            preferences: componentState.activities,
            refresh: true,
            season: componentState.season,
            startLocation: {
                cityName: componentState.city?.city,
                countryName: componentState.city?.countryName,
            },
            transferToThePoint: componentState.transferFromStation,
            typeOfAccommodation: componentState.typeOfAccommodation,
            typeOfFood: componentState.typeOfFood,
            typeOfInsurance: componentState.typeOfInsurance,
            typeOfLuggage: componentState.typeOfLuggage,
            intercityVehicles: componentState.intercityVehicles,
        };

        ReactGA.gtag("event", "fetchCalculator", calculator);
        return fetchPost(APPLICATION_HOST, "/getTravelExpenses", calculator);
    },

    loaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            calculator: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        return (
            (componentState.adults <= 0 && componentState.children <= 0) ||
            !componentState.city ||
            !componentState.destination ||
            !componentState.currency
        );
    },

    nextDisabledTooltip: (componentState) => {
        if (componentState.adults <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы один путешественник";
        } else if (!componentState.city) {
            return "Выберите город отправления";
        } else if (!componentState.destination) {
            return "Выберите город прибытия";
        } else if (!componentState.currency) {
            return "Выберите валюту";
        }

        return "";
    },
};

const CALCULATOR_RESULT: IWorkflowStep<CalculatorResultsState, CalculatorBasicInfoState> = {
    uid: "CALCULATORRESULT",
    name: "КАЛЬКУЛЯТОР РЕЗУЛЬТАТЫ",
    initState: () => {
        return {
            calculator: [],
        };
    },
    component: () => {
        return CalculatorResults;
    },
    refresh: (previousComponentState) => {
        const people: calculatorPeople = {
            adultsCount: previousComponentState.adults,
            kidsCount: previousComponentState.children,
            couple: previousComponentState.couple,
        };

        const calculator = {
            additionalOptions: previousComponentState.additionalOptions,
            bookingTours: previousComponentState.bookingTours,
            citizenship: previousComponentState.citizenship,
            classOfService:
                previousComponentState.internationalVehicle === "PLANE" ? previousComponentState.classOfService : null,
            comfortLevel: previousComponentState.comfortLevel,
            currencyCode: previousComponentState.currency,
            daysCount: previousComponentState.daysCount,
            destination: {
                cityName: previousComponentState.destination?.city,
                countryName: previousComponentState.destination?.countryName,
            },
            internationalVehicle: previousComponentState.internationalVehicle,
            people,
            preferences: previousComponentState.activities,
            season: previousComponentState.season,
            startLocation: {
                cityName: previousComponentState.city?.city,
                countryName: previousComponentState.city?.countryName,
            },
            transferToThePoint: previousComponentState.transferFromStation,
            typeOfAccommodation: previousComponentState.typeOfAccommodation,
            typeOfFood: previousComponentState.typeOfFood,
            typeOfInsurance: previousComponentState.typeOfInsurance,
            typeOfLuggage: previousComponentState.typeOfLuggage,
            intercityVehicles: previousComponentState.intercityVehicles,
            refresh: true,
        };

        ReactGA.gtag("event", "fetchCalculator", calculator);
        return fetchPost(APPLICATION_HOST, "/getTravelExpenses", calculator);
    },
};

const workflow = [CALCULATOR_FIRST_STEP, CALCULATOR_RESULT];

export type CalculatorWizardState = CalculatorBasicInfoState | CalculatorResultsState;
export default workflow;
