import {CURRENCIES, fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import ItineraryStepLocation, {ItineraryStepLocationState} from "../../wizards/ItineraryStep/ItineraryStepLocation";
import {APPLICATION_HOST} from "../../api/api";
import {
    ItineraryStepTravelPoints,
    ItineraryStepTravelPointState,
} from "../../wizards/ItineraryStep/ItineraryStepTravelPoints";

const loaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Определяю маршрут",
        time: 7500,
    },
    {
        title: "Планирую бюджет",
        time: 7500,
    },
    {
        title: "Подбираю транспорт",
        time: 7500,
    },
    {
        title: "Подбираю активности",
        time: 7500,
    },
];

const ITINERARY_LOCATION: IWorkflowStep<ItineraryStepLocationState> = {
    uid: "ITINERARYLOCATION",
    name: "МАРШРУТ",
    initState: () => {
        return {
            city: getDataFromStorage("itineraryCity") || null,
            budget: getDataFromStorage("itineraryBudget") || 100,
            currency: getDataFromStorage("itineraryCurrency") || "USD",
            adult: getDataFromStorage("itineraryAdultCount") ?? 1,
            children: getDataFromStorage("itineraryChildrenCount") || 0,
            couple: getDataFromStorage("itineraryCouple") || false,
            days: getDataFromStorage("itineraryDays") || 1,
            transport: getDataFromStorage("itineraryTransport") || ["ANY"],
            activity: getDataFromStorage("itineraryActivity") || ["ANY"],
        };
    },
    cleanState: () => {
        return {
            city: null,
            budget: 100,
            currency: "USD",
            adult: 1,
            children: 0,
            couple: false,
            days: 1,
            transport: ["ANY"],
            activity: ["ANY"],
        };
    },
    storageDependencies: [
        "itineraryCity",
        "itineraryBudget",
        "itineraryCurrency",
        "itineraryAdultCount",
        "itineraryChildrenCount",
        "itineraryCouple",
        "itineraryDays",
        "itineraryTransport",
        "itineraryActivity",
    ],
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
    component: () => {
        return ItineraryStepLocation;
    },
    isNextDisabled: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        return (
            !componentState.city ||
            (componentState.adult <= 0 && componentState.children <= 0) ||
            componentState.adult > 12 ||
            componentState.children > 12 ||
            componentState.budget / coef < 100 ||
            componentState.budget / coef > 100000
        );
    },
    nextDisabledTooltip: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (!componentState.city) {
            return "Должен быть выбран город назначения";
        } else if (componentState.adult <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы один путешественник";
        } else if (componentState.budget / coef < 100) {
            return "Слишком маленький бюджет";
        } else if (componentState.budget / coef > 100000) {
            return "Слишком большой бюджет";
        }
        return "";
    },

    fetch: (componentState) => {
        const travelPoint = {
            budget: componentState.budget,
            currencyCode: componentState.currency,
            daysCount: componentState.days,
            intercityVehicles: componentState.transport,

            location: {
                cityName: componentState.city?.city,
                countryName: componentState.city?.countryName,
            },

            people: {
                adultsCount: componentState.adult,
                couple: componentState.couple,
                kidsCount: componentState.children,
            },

            preferences: componentState.activity,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchTravelPoints", travelPoint);
        return fetchPost(APPLICATION_HOST, "/getTravelPoints", travelPoint);
    },
    loaderSteps,
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            travelPoint: fetchResponse,
        };
    },
};

const ITINERARY_TRAVELPOINT: IWorkflowStep<ItineraryStepTravelPointState, ItineraryStepLocationState> = {
    uid: "ITINERARYTRAVELPOINT",
    name: "МАРШРУТ РЕЗУЛЬТАТЫ",
    initState: () => {
        return {
            travelPoint: [],
            selectedMarker: null,
            selectedDay: null,
        };
    },
    component: () => {
        return ItineraryStepTravelPoints;
    },
    refresh: (previousComponentState) => {
        const travelPoint = {
            budget: previousComponentState.budget,
            currencyCode: previousComponentState.currency,
            daysCount: previousComponentState.days,
            intercityVehicles: previousComponentState.transport,

            location: {
                cityName: previousComponentState.city?.city,
                countryName: previousComponentState.city?.countryName,
            },

            people: {
                adultsCount: previousComponentState.adult,
                couple: previousComponentState.couple,
                kidsCount: previousComponentState.children,
            },

            preferences: previousComponentState.activity,
            refresh: true,
        };

        ReactGA.gtag("event", "fetchTravelPoints", travelPoint);
        return fetchPost(APPLICATION_HOST, "/getTravelPoints", travelPoint);
    },
};

const workflow = [ITINERARY_LOCATION, ITINERARY_TRAVELPOINT];

export type ItineraryWizardState = ItineraryStepTravelPointState | ItineraryStepLocationState;
export default workflow;
