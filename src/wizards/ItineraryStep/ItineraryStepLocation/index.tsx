import {
    CalendarIcon,
    CURRENCIES,
    GsuAsyncAutocomplete,
    GsuButtonSelect,
    GsuOptionsNumberInput,
    GsuPageDescription,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    GsuWizardToggle,
    PairIcon,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";
import {FC, useEffect, useState} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import ACTIVITY_LIST from "../../../constants/activity";
import {INTERCITY_VEHICLES_TYPES} from "../../../constants/transport";
import {countriesCallback, countriesFetch} from "../../../helpers/countries";
import {ICityOption} from "../../../types/globalTypes";
import {ICity} from "../../../api/interfaces";
import {KidsIcon, PersonIcon} from "../../../assets/Icons";

export interface ItineraryStepLocationState {
    city: ICityOption | null;
    budget: number;
    currency: string;
    adult: number;
    children: number;
    couple: boolean;
    days: number;
    transport: string[];
    activity: string[];
}

const ItineraryStepLocation: FC<IWizardStep<ItineraryStepLocationState>> = ({componentState, change}) => {
    const city = componentState.city;
    const budget = componentState.budget;
    const currency = componentState.currency;
    const adult = componentState.adult;
    const children = componentState.children;
    const couple = componentState.couple;
    const days = componentState.days;
    const {transport} = componentState;
    const {activity} = componentState;
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

    const setBudget = (budget: number) => {
        storeDataToStorage("itineraryBudget", budget);
        change({...componentState, budget: budget});
    };

    const setCurrency = (currency: string) => {
        storeDataToStorage("itineraryCurrency", currency);
        change({...componentState, currency: currency});
    };

    const setCity = (city: ICityOption) => {
        storeDataToStorage("itineraryCity", city);
        change({...componentState, city: city});
    };

    const setAdult = (adult: number) => {
        storeDataToStorage("itineraryAdultCount", adult);
        change({...componentState, adult: adult});
    };

    const setCouple = (couple: boolean) => {
        storeDataToStorage("itineraryCouple", couple);
        change({...componentState, couple: couple});
    };

    const setChildren = (children: number) => {
        storeDataToStorage("itineraryChildrenCount", children);
        change({...componentState, children: children});
    };

    const setDays = (days: number) => {
        storeDataToStorage("itineraryDays", days);
        change({...componentState, days: days});
    };

    const setActivity = (activity: string[]) => {
        storeDataToStorage("itineraryActivity", activity);
        change({...componentState, activity: activity});
    };

    const setTransport = (transport: string[]) => {
        storeDataToStorage("itineraryTransport", transport);
        change({...componentState, transport: transport});
    };

    const checkAdult = () => {
        if (adult !== 2) {
            setCouple(false);
        }
    };

    useEffect(() => {
        checkAdult();
    }, [adult]);

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title={"Маршрут"}
                description={
                    "Пройдите небольшой опрос для того, чтобы мы смогли предложить маршрут, подходящий именно вам"
                }
            />
            <GsuWizardGroupContainer>
                <GsuWizardGridSection columns={3} header={"Город назначения и бюджет"}>
                    <GsuAsyncAutocomplete<ICityOption, ICity[]>
                        value={city}
                        fetch={countriesFetch}
                        callback={countriesCallback}
                        placeholder={"Город"}
                        onOptionSelect={setCity}
                        listName={"Город"}
                    />
                    <GsuOptionsNumberInput
                        placeholder="Сумма"
                        value={budget || 0}
                        error={errorBudget}
                        onChangeValue={setBudget}
                        options={CURRENCIES}
                        optionValue={currency}
                        onChangeOption={setCurrency}
                    />
                </GsuWizardGridSection>
                <GsuWizardSection header={"Количество дней и человек"}>
                    <GsuWizardSelectSection>
                        <GsuWizardSelectCount
                            Icon={CalendarIcon}
                            change={setDays}
                            header={"Дни"}
                            value={days}
                            maxCount={7}
                        />
                        <GsuWizardSelectCount
                            Icon={PersonIcon}
                            change={setAdult}
                            header={"Взрослые"}
                            minCount={0}
                            maxCount={8}
                            value={adult}
                        />

                        {adult === 2 && (
                            <GsuWizardToggle Icon={PairIcon} toggled={couple} change={setCouple} header={"Пара"} />
                        )}
                        <GsuWizardSelectCount
                            Icon={KidsIcon}
                            change={setChildren}
                            header={"Дети"}
                            minCount={0}
                            maxCount={8}
                            value={children}
                        />
                    </GsuWizardSelectSection>
                </GsuWizardSection>
                <GsuWizardSection header={"Транспорт по маршруту"}>
                    <GsuButtonSelect
                        values={transport}
                        options={INTERCITY_VEHICLES_TYPES}
                        checkDefaultIfAllSelected={true}
                        change={setTransport}
                    />
                </GsuWizardSection>
                <GsuWizardSection header={"Предпочитаемые активности"}>
                    <GsuButtonSelect
                        values={activity}
                        options={ACTIVITY_LIST}
                        checkDefaultIfAllSelected={true}
                        change={setActivity}
                    />
                </GsuWizardSection>
            </GsuWizardGroupContainer>
        </GsuWizardGroupContainer>
    );
};

export default ItineraryStepLocation;
