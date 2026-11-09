import {
    CalendarIcon,
    COUNTRIES,
    CURRENCIES,
    GsuAsyncAutocomplete,
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuMultiSelect,
    GsuOptionsNumberInput,
    GsuPageDescription,
    GsuSingleAutocomplete,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    GsuWizardToggle,
    InfinityIcon,
    storeDataToStorage,
    WorldIcon,
} from "@gsu-ai/gsu-ui-core";

import {FC, useEffect, useState} from "react";
import {IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {AdultIcon, ChildrenIcon, CoupleIcon, LocationIcon} from "../../../assets/Icons";
import {countriesCallback, countriesFetch} from "../../../helpers/countries";
import {ICityOption} from "../../../types/globalTypes";
import {TRANSPORT_LIST} from "../../../constants/transport";
import ACTIVITY_LIST from "../../../constants/activity";
import {ICity} from "../../../api/interfaces";

export interface PlaceFirstStepState {
    city: ICityOption | null;
    citizenship: string;
    direction: string;
    region: string[];
    daysCount: number;
    countries: string[];
    adults: number;
    children: number;
    couple: boolean;
    budget: number;
    currency: string;
    transport: string[];
    activities: string[];
}

export const PlaceFirstStep: FC<IWizardStep<PlaceFirstStepState>> = ({componentState, change}) => {
    const city = componentState.city;
    const citizenship = componentState.citizenship;
    const direction = componentState.direction;
    const {countries} = componentState;
    const {region} = componentState;
    const adults = componentState.adults;
    const children = componentState.children;
    const couple = componentState.couple;
    const budget = componentState.budget;
    const currency = componentState.currency;
    const daysCount = componentState.daysCount;
    const {transport} = componentState;
    const {activities} = componentState;
    const [errorBudget, setErrorBudget] = useState("");

    const checkBudget = () => {
        let errorBudget = "";
        const coef = CURRENCIES[componentState.currency]?.coef || 1;

        if (budget / coef < 100) {
            errorBudget = "Слишком маленький бюджет";
        } else if (budget / coef > 100000) {
            errorBudget = "Слишком большой бюджет";
        }
        setErrorBudget(errorBudget);
    };

    useEffect(() => {
        checkBudget();
    }, [componentState]);

    const directions: IOptions = {
        1: {label: "Любой", Icon: LocationIcon},
        2: {label: "В пределах моей страны", Icon: LocationIcon},
        3: {label: "Другая страна", Icon: LocationIcon},
        4: {label: "Регион", Icon: LocationIcon},
    };

    const regionList: IOptions = {
        ANY: {label: "Любое", Icon: InfinityIcon},
        EUROPE: {label: "Европа", Icon: WorldIcon},
        ASIA: {label: "Азия", Icon: WorldIcon},
        AFRICA: {label: "Африка", Icon: WorldIcon},
        AMERICA: {label: "Америка", Icon: WorldIcon},
        OCEANIA: {label: "Австралия и Океания", Icon: WorldIcon},
        ARAB_WORLD: {label: "Ближний Восток", Icon: WorldIcon},
    };

    const setCity = (city: ICityOption) => {
        const currency = COUNTRIES[city.country]?.currency;
        storeDataToStorage("placeCity", city);
        if (currency) {
            storeDataToStorage("placeCurrency", currency);
        }
        change({
            ...componentState,
            city: city,
            ...(currency && {
                currency,
            }),
        });
    };

    const setCitizenship = (citizenship: string) => {
        storeDataToStorage("placeCitizenship", citizenship);
        change({...componentState, citizenship: citizenship});
    };

    const changeCountries = (updatedCounties: string[]) => {
        storeDataToStorage("placeCountries", updatedCounties);
        change({...componentState, countries: updatedCounties});
    };

    const setDirectionState = (updatedDirection: string) => {
        storeDataToStorage("placeDirection", updatedDirection);
        change({...componentState, direction: updatedDirection});
    };

    const changeRegion = (updatedRegion: string[]) => {
        storeDataToStorage("placeRegion", updatedRegion);
        change({...componentState, region: updatedRegion});
    };

    const handleDirection = () => {
        if (direction === "3") {
            return (
                <GsuWizardSection header={"Cтрана и город (регион) назначения маршрута"}>
                    <GsuMultiSelect
                        hasDefaultValue={false}
                        listName={"Страна"}
                        options={COUNTRIES}
                        values={countries}
                        change={(updateCounty) => changeCountries(updateCounty)}
                    />
                </GsuWizardSection>
            );
        } else if (direction === "4") {
            return (
                <GsuWizardSection header={"Регион"}>
                    <GsuButtonSelect
                        values={region}
                        options={regionList}
                        change={(updatedRegion) => changeRegion(updatedRegion)}
                    />
                </GsuWizardSection>
            );
        } else {
            return null;
        }
    };

    const setAdultsCount = (adultsCount: number) => {
        storeDataToStorage("placeAdults", adultsCount);
        change({...componentState, adults: adultsCount});
    };

    const setChildrenCount = (childrenCount: number) => {
        storeDataToStorage("placeChildren", childrenCount);
        change({...componentState, children: childrenCount});
    };

    const setBudget = (budget: number) => {
        storeDataToStorage("placeBudget", budget);
        change({...componentState, budget: budget});
    };

    const setCurrency = (currency: string) => {
        storeDataToStorage("placeCurrency", currency);
        change({...componentState, currency: currency});
    };
    const setDaysCount = (daysCount: number) => {
        storeDataToStorage("placeDaysCount", daysCount);
        change({...componentState, daysCount: daysCount});
    };

    const changeTransport = (updatedTransport: string[]) => {
        storeDataToStorage("placeTransport", updatedTransport);
        change({...componentState, transport: updatedTransport});
    };

    const changeActivities = (updatedActivities: string[]) => {
        storeDataToStorage("placeActivities", updatedActivities);
        change({...componentState, activities: updatedActivities});
    };

    const changePair = (updatedPair: boolean) => {
        if (adults <= 2) {
            storeDataToStorage("placePair", updatedPair);
            change({...componentState, couple: updatedPair});
        }
    };
    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title="Места"
                description="Пройдите небольшой опрос для того, чтобы мы смогли предложить вам подходящие места для посещения"
            />
            <GsuWizardGridSection
                columns={2}
                header={"Город проживания и бюджет"}
                description={"Укажите город проживания, примерный бюджет и валюту расчёта"}
            >
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={city}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город проживания"}
                    onOptionSelect={setCity}
                    listName={"Город проживания"}
                />
                <GsuOptionsNumberInput
                    value={budget}
                    error={errorBudget}
                    onChangeValue={setBudget}
                    options={CURRENCIES}
                    placeholder={"Сумма"}
                    onChangeOption={setCurrency}
                    optionValue={currency}
                />
            </GsuWizardGridSection>
            {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
            <GsuWizardSection header={"Гражданство"} description={"Укажите ваше гражданство"}>
                <GsuSingleAutocomplete
                    options={COUNTRIES}
                    placeholder={"Гражданство"}
                    onOptionSelect={setCitizenship}
                    listName={"Гражданство"}
                    value={citizenship}
                />
            </GsuWizardSection>
            <GsuWizardSection
                header={"Количество дней и человек"}
                description={"Укажите длительность поездки и состав группы"}
            >
                <GsuWizardSelectSection>
                    <GsuWizardSelectCount
                        Icon={CalendarIcon}
                        change={setDaysCount}
                        header={"Дни"}
                        value={daysCount}
                        maxCount={21}
                    />
                    <GsuWizardSelectCount
                        Icon={AdultIcon}
                        change={setAdultsCount}
                        header={"Взрослые"}
                        minCount={0}
                        maxCount={8}
                        value={adults}
                    />
                    {adults === 2 && (
                        <GsuWizardToggle toggled={couple} change={changePair} header={"Пара"} Icon={CoupleIcon} />
                    )}
                    <GsuWizardSelectCount
                        Icon={ChildrenIcon}
                        change={setChildrenCount}
                        header={"Дети"}
                        minCount={0}
                        maxCount={8}
                        value={children}
                    />
                </GsuWizardSelectSection>
            </GsuWizardSection>
            <GsuWizardSection header={"Пункт назначения"}>
                <GsuButtonSingleSelect value={direction} change={setDirectionState} options={directions} />
            </GsuWizardSection>
            {handleDirection()}
            <GsuWizardSection header={"Транспорт до места назначения"}>
                <GsuButtonSelect values={transport} options={TRANSPORT_LIST} change={changeTransport} />
            </GsuWizardSection>
            <GsuWizardSection header={"Предпочитаемые активности"}>
                <GsuButtonSelect values={activities} options={ACTIVITY_LIST} change={changeActivities} />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default PlaceFirstStep;
