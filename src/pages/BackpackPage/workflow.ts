import {fetchPost, getDataFromStorage} from "@gsu-ai/gsu-ui-core";

import ReactGA from "react-ga4";

import {IGsuStepLoaderStep, IWorkflowStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import BackpackBasicInfo, {BackpackBasicInfoState} from "../../wizards/BackpackStep/BackpackBasicInfo";
import BackpackResults, {BackpackResultsState} from "../../wizards/BackpackStep/BackpackResults";
import {APPLICATION_HOST} from "../../api/api";

const loaderSteps: IGsuStepLoaderStep[] = [
    {
        title: "Обрабатываю информацию",
        time: 10000,
    },
    {
        title: "Формирую списки",
        time: 7000,
    },
];

const BACKPACK_BASIC_INFO: IWorkflowStep<BackpackBasicInfoState> = {
    uid: "BACKPACKBASICINFO",
    name: "БАГАЖ",
    initState: () => {
        return {
            city: getDataFromStorage("backpackCity") || null,
            daysCount: getDataFromStorage("backpackDaysCount") || 1,
            adults: getDataFromStorage("backpackAdults") || 0,
            children: getDataFromStorage("backpackChildren") || 0,
            luggage: getDataFromStorage("backpackLuggageSize") || "ANY",
            couple: getDataFromStorage("backpackCouple") || false,
            transport: getDataFromStorage("backpackTransport") || ["ANY"],
            activities: getDataFromStorage("backpackActivities") || ["ANY"],
            season: getDataFromStorage("backpackSeason") || "SUMMER",
        };
    },
    cleanState: () => {
        return {
            city: null,
            daysCount: 1,
            adults: 1,
            children: 0,
            luggage: "ANY",
            couple: false,
            transport: ["ANY"],
            activities: ["ANY"],
            season: "SUMMER",
        };
    },
    storageDependencies: [
        "backpackCity",
        "backpackDaysCount",
        "backpackAdults",
        "backpackChildren",
        "backpackLuggageSize",
        "backpackCouple",
        "backpackTransport",
        "backpackActivities",
        "backpackSeason",
    ],
    nextBtnLabel: "СОБРАТЬ БАГАЖ",
    component: () => {
        return BackpackBasicInfo;
    },

    fetch: (componentState) => {
        const backpack = {
            location: {
                cityName: componentState.city?.city,
                countryName: componentState.city?.countryName,
            },
            daysCount: componentState.daysCount,
            luggageSize: componentState.luggage,
            people: {
                adultsCount: componentState.adults,
                couple: componentState.adults === 2 && componentState.couple,
                kidsCount: componentState.children,
            },
            internationalVehicles: componentState.transport,
            preferences: componentState.activities,
            season: componentState.season,
            refresh: false,
        };

        ReactGA.gtag("event", "fetchBackpack", backpack);
        return fetchPost(APPLICATION_HOST, "/getPackingBag", backpack);
    },

    loaderSteps,

    callback: (componentState, wizardState, fetchResponse) => {
        return {
            backpack: fetchResponse,
        };
    },

    isNextDisabled: (componentState) => {
        return !componentState.city || (componentState.adults <= 0 && componentState.children <= 0);
    },

    nextDisabledTooltip: (componentState) => {
        if (!componentState.city) {
            return "Выберите город";
        } else if (componentState.adults <= 0 && componentState.children <= 0) {
            return "Должен быть хотя бы один путешественник";
        }
        return "";
    },
};

const BACKPACK_RESULTS: IWorkflowStep<BackpackResultsState, BackpackBasicInfoState> = {
    uid: "BACKPACKRESULTS",
    name: "БАГАЖ РЕЗУЛЬТАТЫ",
    initState: () => {
        return {
            backpack: null,
        };
    },

    component: () => {
        return BackpackResults;
    },

    refresh: (previousComponentState) => {
        const backpack = {
            location: {
                cityName: previousComponentState.city?.city,
                countryName: previousComponentState.city?.countryName,
            },
            daysCount: previousComponentState.daysCount,
            luggageSize: previousComponentState.luggage,
            people: {
                adultsCount: previousComponentState.adults,
                couple: previousComponentState.adults === 2 && previousComponentState.couple,
                kidsCount: previousComponentState.children,
            },
            internationalVehicles: previousComponentState.transport,
            preferences: previousComponentState.activities,
            season: previousComponentState.season,
            refresh: true,
        };

        ReactGA.gtag("event", "refreshBackpack", backpack);
        return fetchPost(APPLICATION_HOST, "/getPackingBag", backpack);
    },
};

const workflow = [BACKPACK_BASIC_INFO, BACKPACK_RESULTS];

export type BackpackWizardState = BackpackBasicInfoState | BackpackResultsState;
export default workflow;
