import {
    CalendarIcon,
    PairIcon,
    GsuAsyncAutocomplete,
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuPageDescription,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    storeDataToStorage,
    GsuWizardToggle,
    GsuWizardSelectSection,
} from "@gsu-ai/gsu-ui-core";
import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {KidsIcon, PersonIcon} from "../../../assets/Icons";
import {countriesCallback, countriesFetch} from "../../../helpers/countries";
import {ICityOption} from "../../../types/globalTypes";
import {TRANSPORT_LIST} from "../../../constants/transport";
import ACTIVITY_LIST from "../../../constants/activity";
import LUGGAGE_LIST from "../../../constants/luggage";
import SEASONS_LIST from "../../../constants/seasons";
import {ICity} from "../../../api/interfaces";

export interface BackpackBasicInfoState {
    city: ICityOption | null;
    daysCount: number;
    adults: number;
    children: number;
    luggage: string;
    couple: boolean;
    transport: string[];
    activities: string[];
    season: string;
}

export const BackpackBasicInfo: FC<IWizardStep<BackpackBasicInfoState>> = ({componentState, change}) => {
    const city = componentState.city;
    const daysCount = componentState.daysCount;
    const adults = componentState.adults;
    const children = componentState.children;
    const {luggage} = componentState;
    const couple = componentState.couple;
    const {transport} = componentState;
    const {activities} = componentState;
    const {season} = componentState;

    const setCity = (city: ICityOption) => {
        storeDataToStorage("backpackCity", city);
        change({...componentState, city: city});
    };

    const setDaysCount = (daysCount: number) => {
        storeDataToStorage("backpackDaysCount", daysCount);
        change({...componentState, daysCount: daysCount});
    };

    const setAdultsCount = (adultsCount: number) => {
        storeDataToStorage("backpackAdults", adultsCount);
        change({...componentState, adults: adultsCount});
    };

    const setChildrenCount = (childrenCount: number) => {
        storeDataToStorage("backpackChildren", childrenCount);
        change({...componentState, children: childrenCount});
    };

    const changeLuggage = (updatedLuggage: string) => {
        storeDataToStorage("backpackLuggageSize", updatedLuggage);
        change({...componentState, luggage: updatedLuggage});
    };

    const setCouple = (couple: boolean) => {
        storeDataToStorage("backpackCouple", couple);
        change({...componentState, couple: couple});
    };

    const changeTransport = (updatedTransport: string[]) => {
        storeDataToStorage("backpackTransport", updatedTransport);
        change({...componentState, transport: updatedTransport});
    };

    const changeActivities = (updatedActivities: string[]) => {
        storeDataToStorage("backpackActivities", updatedActivities);
        change({...componentState, activities: updatedActivities});
    };

    const changeSeasons = (updatedSeasons: string) => {
        storeDataToStorage("backpackSeason", updatedSeasons);
        change({...componentState, season: updatedSeasons});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title="Багаж"
                description="Пройдите небольшой опрос для того, чтобы мы смогли предложить список вещей, подходящий вам"
            />
            <GsuWizardSection header={"Город назначения"}>
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={city}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город"}
                    onOptionSelect={setCity}
                    listName={"Выберите город"}
                />
            </GsuWizardSection>

            <GsuWizardSection header={"Количество дней и путешественников"}>
                <GsuWizardSelectSection>
                    <GsuWizardSelectCount
                        Icon={CalendarIcon}
                        change={setDaysCount}
                        header={"Дни"}
                        value={daysCount}
                        maxCount={21}
                    />
                    <GsuWizardSelectCount
                        Icon={PersonIcon}
                        change={setAdultsCount}
                        header={"Взрослые"}
                        minCount={0}
                        maxCount={8}
                        value={adults}
                    />
                    {adults === 2 && (
                        <GsuWizardToggle Icon={PairIcon} toggled={couple} change={setCouple} header={"Пара"} />
                    )}
                    <GsuWizardSelectCount
                        Icon={KidsIcon}
                        change={setChildrenCount}
                        header={"Дети"}
                        minCount={0}
                        maxCount={8}
                        value={children}
                    />
                </GsuWizardSelectSection>
            </GsuWizardSection>

            <GsuWizardSection header={"Размер багажа"}>
                <GsuButtonSingleSelect value={luggage} options={LUGGAGE_LIST} change={changeLuggage} />
            </GsuWizardSection>

            <GsuWizardSection header={"Транспорт до места назначения"}>
                <GsuButtonSelect values={transport} options={TRANSPORT_LIST} change={changeTransport} />
            </GsuWizardSection>

            <GsuWizardSection header={"Предпочитаемые активности"}>
                <GsuButtonSelect values={activities} options={ACTIVITY_LIST} change={changeActivities} />
            </GsuWizardSection>

            <GsuWizardSection header={"Время года"}>
                <GsuButtonSingleSelect value={season} options={SEASONS_LIST} change={changeSeasons} />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default BackpackBasicInfo;
