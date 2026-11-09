import {CURRENCIES, fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import PlaceCardList, {IPlaceList} from "../../wizards/PlaceStep/PlaceCardList";
import {APPLICATION_HOST} from "../../api/api";
import getDestination from "../../helpers/countriesHelper";

import PlaceFirstStep, {PlaceFirstStepState} from "../../wizards/PlaceStep/PlaceBasicInfo";
import DetailsStep, {PlaceDetailsStepState} from "../../wizards/DetailsStep";

const getPlacesLoaderSteps = [
    {
        title: "Анализирую параметры",
        time: 4000,
    },
    {
        title: "Подбираю направления",
        time: 4000,
    },
    {
        title: "Генерирую описание",
        time: 4000,
    },
];

const getPlaceInfoLoaderSteps = [
    {
        title: "Определяю место",
        time: 4500,
    },
    {
        title: "Получаю информацию",
        time: 4500,
    },
    {
        title: "Подготавливаю описание",
        time: 4500,
    },
    {
        title: "Составляю план",
        time: 4500,
    },
];

const PLACE_FIRST_STEP: IWorkflowStep<PlaceFirstStepState> = {
    uid: "PLACEFIRSTSTEP",
    name: "МЕСТА",

    initState: () => {
        return {
            city: getDataFromStorage("placeCity") || null,
            citizenship: getDataFromStorage("placeCitizenship") || null,
            direction: getDataFromStorage("placeDirection") || "1",
            region: getDataFromStorage("placeRegion") || ["ANY"],
            countries: getDataFromStorage("placeCountries") || [],
            adults: getDataFromStorage("placeAdults") || 0,
            children: getDataFromStorage("placeChildren") || 0,
            couple: getDataFromStorage("placePair") || false,
            budget: getDataFromStorage("placeBudget") || 100,
            currency: getDataFromStorage("placeCurrency") || "USD",
            daysCount: getDataFromStorage("placeDaysCount") || 1,
            transport: getDataFromStorage("placeTransport") || ["ANY"],
            activities: getDataFromStorage("placeActivities") || ["ANY"],
        };
    },
    cleanState: () => {
        return {
            city: null,
            citizenship: "",
            direction: "1",
            region: ["ANY"],
            countries: [],
            adults: 1,
            children: 0,
            couple: false,
            budget: 100,
            currency: "USD",
            daysCount: 1,
            transport: ["ANY"],
            activities: ["ANY"],
        };
    },
    storageDependencies: [
        "placeCity",
        "placeCitizenship",
        "placeDirection",
        "placeRegion",
        "placeCountries",
        "placeAdults",
        "placeChildren",
        "placePair",
        "placeBudget",
        "placeCurrency",
        "placeDaysCount",
        "placeTransport",
        "placeActivities",
    ],
    component: () => {
        return PlaceFirstStep;
    },

    fetch: (componentState) => {
        const place = {
            budget: componentState.budget,
            citizenship: componentState.citizenship,
            daysCount: componentState.daysCount,
            currencyCode: componentState.currency,

            destination: getDestination(componentState),

            internationalVehicles: componentState.transport,

            people: {
                adultsCount: componentState.adults,
                couple: componentState.adults === 2 && componentState.couple,
                kidsCount: componentState.children,
            },

            preferences: componentState.activities,
            refresh: false,
            startLocation: {
                cityName: componentState.city?.city,
                countryName: componentState.city?.countryName,
            },
        };
        ReactGA.gtag("event", "fetchPlace", place);

        return fetchPost(APPLICATION_HOST, "/getPlaces", place);
    },

    loaderSteps: getPlacesLoaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            places: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;
        return (
            (componentState.adults <= 0 && componentState.children <= 0) ||
            componentState.adults > 12 ||
            componentState.children > 12 ||
            !componentState.city ||
            !componentState.citizenship ||
            (componentState.countries.length < 1 && componentState.direction == "3") ||
            componentState.budget / coef < 100 ||
            componentState.budget / coef > 100000
        );
    },

    nextDisabledTooltip: (componentState) => {
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (componentState.adults <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы один путешественник";
        } else if (componentState.adults > 12) {
            return "Количество возрослых должно быть не больше 12";
        } else if (componentState.children > 12) {
            return "Количество детей должно быть не больше 12";
        } else if (!componentState.city) {
            return "Выберите город";
        } else if (!componentState.citizenship) {
            return "Выберите гражданство";
        } else if (componentState.budget / coef < 100) {
            return "Слишком маленький бюджет";
        } else if (componentState.budget / coef > 100000) {
            return "Слишком большой бюджет";
        } else if (componentState.countries.length < 1 && componentState.direction == "3") {
            return "Страна не выбрана";
        }
        return "";
    },
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
};

const PLACE_FIFTH_STEP: IWorkflowStep<IPlaceList, PlaceFirstStepState> = {
    uid: "PLACEFIFTHSTEP",
    name: "СПИСОК МЕСТ",
    initState: () => {
        return {
            places: [],
            selectedPlace: null,
        };
    },

    component: () => {
        return PlaceCardList;
    },
    fetch: (componentState, wizardState) => {
        const firstStep = wizardState["PLACEFIRSTSTEP"] as PlaceFirstStepState;
        const placeDetails = {
            citizenship: firstStep.citizenship,
            currencyCode: firstStep.currency,
            location: {
                cityName: componentState.selectedPlace?.location.cityName,
                countryName: componentState.selectedPlace?.location.countryName,
            },
            refresh: false,
            startCountry: firstStep.city?.country,
        };

        ReactGA.gtag("event", "fetchPlaceDetails", placeDetails);
        return fetchPost(APPLICATION_HOST, "/getPlaceDetails", placeDetails);
    },
    callback: (componentState, wizardState, fetchResponse) => {
        return {
            details: fetchResponse,
        };
    },

    refresh: (previousComponentState) => {
        const place = {
            budget: previousComponentState.budget,
            citizenship: previousComponentState.citizenship,
            daysCount: previousComponentState.daysCount,
            currencyCode: previousComponentState.currency,

            destination: getDestination(previousComponentState),

            internationalVehicles: previousComponentState.transport,

            people: {
                adultsCount: previousComponentState.adults,
                couple: previousComponentState.adults === 2 && previousComponentState.couple,
                kidsCount: previousComponentState.children,
            },

            preferences: previousComponentState.activities,
            refresh: true,
            startLocation: {
                cityName: previousComponentState.city?.city,
                countryName: previousComponentState.city?.countryName,
            },
        };
        ReactGA.gtag("event", "fetchPlace", place);
        return fetchPost(APPLICATION_HOST, "/getPlaces", place);
    },

    loaderSteps: getPlaceInfoLoaderSteps,

    isNextDisabled: (componentState) => {
        return !componentState.selectedPlace;
    },

    nextDisabledTooltip: (componentState) => {
        if (!componentState.selectedPlace) {
            return "Выберите место для продолжения";
        }
        return "";
    },
    nextBtnLabel: "ИЗУЧИТЬ МЕСТО",
};

const PLACE_DETAILS_STEP: IWorkflowStep<PlaceDetailsStepState> = {
    uid: "PLACEDETAILSSTEP",
    name: "МЕСТО ДЕТАЛИ",
    initState: () => {
        return {
            details: null,
            selectedPlace: null,
        };
    },

    component: () => {
        return DetailsStep;
    },

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            details: fetchResponse,
        };
    },

    refresh: (previousComponentState, componentState, wizardState) => {
        const firstStep = wizardState["PLACEFIRSTSTEP"] as PlaceFirstStepState;

        const placeDetails = {
            citizenship: firstStep.citizenship,
            currencyCode: firstStep.currency,
            location: {
                cityName: previousComponentState.selectedPlace?.location.cityName,
                countryName: previousComponentState.selectedPlace?.location.countryName,
            },
            refresh: true,
            startCountry: firstStep.city?.country,
        };

        ReactGA.gtag("event", "fetchPlaceDetails", placeDetails);
        return fetchPost(APPLICATION_HOST, "/getPlaceDetails", placeDetails);
    },
};

const workflow = [PLACE_FIRST_STEP, PLACE_FIFTH_STEP, PLACE_DETAILS_STEP];

export type PlaceWizardState = PlaceFirstStepState | IPlaceList | PlaceDetailsStepState;
export default workflow;
