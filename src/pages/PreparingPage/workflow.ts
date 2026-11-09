import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {APPLICATION_HOST} from "../../api/api";
import PreparingFirstStep, {PreparingFirstStepState} from "../../wizards/PreparingStep/PlaceBasicInfo";
import DetailsStep, {PlaceDetailsStepState} from "../../wizards/DetailsStep";

const loaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Анализирую бюджет",
        time: 8000,
    },
    {
        title: "Составляю план подготовки",
        time: 9000,
    },
];

const PLACE_FIRST_STEP: IWorkflowStep<PreparingFirstStepState> = {
    uid: "PREPARINGFIRSTSTEP",
    name: "ПОДГОТОВКА К ПОЕЗДКЕ",

    initState: () => {
        return {
            startCountry: getDataFromStorage("preparingStartCountry") || "",
            citizenship: getDataFromStorage("preparingCitizenship") || "",
            location: getDataFromStorage("preparingLocation") || null,
            currencyCode: getDataFromStorage("preparingCurrencyCode") || "USD",
        };
    },
    cleanState: () => {
        return {
            startCountry: "",
            citizenship: "",
            currencyCode: "",
            location: null,
        };
    },
    storageDependencies: ["preparingStartCountry", "placeCitizenship", "preparingLocation", "preparingCurrencyCode"],
    component: () => {
        return PreparingFirstStep;
    },

    fetch: (componentState) => {
        const placeDetails = {
            citizenship: componentState.citizenship,
            currencyCode: componentState.currencyCode,
            location: {
                cityName: componentState.location?.city,
                countryName: componentState.location?.countryName,
            },
            refresh: true,
            startCountry: componentState.startCountry,
        };

        ReactGA.gtag("event", "fetchPlaceDetails", placeDetails);
        return fetchPost(APPLICATION_HOST, "/getPlaceDetails", placeDetails);
    },

    loaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            details: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        return (
            !componentState.startCountry ||
            !componentState.citizenship ||
            !componentState.currencyCode ||
            !componentState.location
        );
    },

    nextDisabledTooltip: (componentState) => {
        if (!componentState.location) {
            return "Должен быть выбран город и страна путешествия";
        } else if (!componentState.currencyCode) {
            return "Выберите валюту";
        } else if (!componentState.citizenship) {
            return "Выберите гражданство";
        } else if (!componentState.startCountry) {
            return "Выберите страну отправления";
        }
        return "";
    },
    nextBtnLabel: "СГЕНЕРИРОВАТЬ",
};

const PLACE_DETAILS_STEP: IWorkflowStep<PlaceDetailsStepState, PreparingFirstStepState> = {
    uid: "PLACEDETAILSSTEP",
    name: "ПОДГОТОВКА К ПОЕЗДКЕ РЕЗУЛЬТАТЫ",
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

    refresh: (previousComponentState) => {
        const placeDetails = {
            citizenship: previousComponentState.citizenship,
            currencyCode: previousComponentState.currencyCode,
            location: {
                cityName: previousComponentState.location?.city,
                countryName: previousComponentState.location?.countryName,
            },
            refresh: true,
            startCountry: previousComponentState.startCountry,
        };

        ReactGA.gtag("event", "fetchPlaceDetails", placeDetails);
        return fetchPost(APPLICATION_HOST, "/getPlaceDetails", placeDetails);
    },
};

const workflow = [PLACE_FIRST_STEP, PLACE_DETAILS_STEP];

export type PreparingWizardState = PreparingFirstStepState | PlaceDetailsStepState;
export default workflow;
