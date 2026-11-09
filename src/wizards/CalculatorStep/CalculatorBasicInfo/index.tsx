import {FC} from "react";

import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {
    CalendarIcon,
    COUNTRIES,
    CURRENCIES,
    GsuAsyncAutocomplete,
    GsuButtonMultiSelect,
    GsuButtonSelect,
    GsuButtonSingleSelect,
    GsuPageDescription,
    GsuSingleAutocomplete,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    GsuWizardSection,
    GsuWizardSelectCount,
    GsuWizardSelectSection,
    GsuWizardToggle,
    PairIcon,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {ICityOption} from "../../../types/globalTypes";
import {ChildrenIcon, PersonIcon} from "../../../assets/Icons";
import ACTIVITY_LIST from "../../../constants/activity";
import {ICity} from "../../../api/interfaces";
import {countriesCallback, countriesFetch} from "../../../helpers/countries";
import {INTERCITY_VEHICLES_TYPES, TRANSFERS_FROM_STATION} from "../../../constants/transport";
import {
    CALCULATOR_TRANSPORT_LIST,
    CLASSES_OF_SERVICE,
    COMFORT_LEVEL,
    SEASONS,
    TYPES_OF_ACCOMMODATION,
    TYPES_OF_ADDITIONAL_OPTIONS,
    TYPES_OF_FOOD,
    TYPES_OF_INSURANCE,
    TYPES_OF_LUGGAGE,
    TYPES_OF_TOURS,
} from "../../../constants/calculator";

export interface CalculatorBasicInfoState {
    citizenship: string | null;
    city: ICityOption | null;
    destination: ICityOption | null;
    currency: string;
    daysCount: number;
    adults: number;
    couple: boolean;
    children: number;
    internationalVehicle: string;
    classOfService: string;
    intercityVehicles: string[];
    activities: string[];
    typeOfAccommodation: string;
    season: string;
    typeOfFood: string;
    transferFromStation: string;
    bookingTours: string;
    typeOfInsurance: string;
    comfortLevel: string;
    typeOfLuggage: string;
    additionalOptions: string[];
}

export const CalculatorBasicInfo: FC<IWizardStep<CalculatorBasicInfoState>> = ({componentState, change}) => {
    const citizenship = componentState.citizenship;
    const city = componentState.city;
    const destination = componentState.destination;
    const currency = componentState.currency;
    const daysCount = componentState.daysCount;
    const adults = componentState.adults;
    const couple = componentState.couple;
    const children = componentState.children;
    const internationalVehicle = componentState.internationalVehicle;
    const classOfService = componentState.classOfService;
    const {intercityVehicles} = componentState;
    const {activities} = componentState;
    const typeOfAccommodation = componentState.typeOfAccommodation;
    const season = componentState.season;
    const typeOfFood = componentState.typeOfFood;
    const transferFromStation = componentState.transferFromStation;
    const bookingTours = componentState.bookingTours;
    const typeOfInsurance = componentState.typeOfInsurance;
    const comfortLevel = componentState.comfortLevel;
    const typeOfLuggage = componentState.typeOfLuggage;
    const {additionalOptions} = componentState;

    const setCitizenship = (citizenship: string) => {
        storeDataToStorage("calculatorCitizenship", citizenship);
        change({...componentState, citizenship: citizenship});
    };

    const setCity = (city: ICityOption) => {
        storeDataToStorage("calculatorCity", city);
        change({...componentState, city: city});
    };

    const setDestination = (destination: ICityOption) => {
        storeDataToStorage("calculatorDestination", destination);
        change({...componentState, destination: destination});
    };

    const setCurrency = (currency: string) => {
        storeDataToStorage("calculatorCurrency", currency);
        change({...componentState, currency: currency});
    };

    const setDaysCount = (daysCount: number) => {
        storeDataToStorage("calculatorDaysCount", daysCount);
        change({...componentState, daysCount: daysCount});
    };

    const setAdultsCount = (adultsCount: number) => {
        storeDataToStorage("calculatorAdults", adultsCount);
        change({...componentState, adults: adultsCount});
    };

    const setCouple = (couple: boolean) => {
        storeDataToStorage("calculatorCouple", couple);
        change({...componentState, couple: couple});
    };

    const setChildrenCount = (childrenCount: number) => {
        storeDataToStorage("calculatorChildren", childrenCount);
        change({...componentState, children: childrenCount});
    };

    const changeInternationalVehicle = (updatedInternationalVehicle: string) => {
        storeDataToStorage("calculatorInternationalVehicle", updatedInternationalVehicle);
        change({...componentState, internationalVehicle: updatedInternationalVehicle});
    };

    const changeClassOfService = (updatedClassOfService: string) => {
        storeDataToStorage("calculatorClassOfService", updatedClassOfService);
        change({...componentState, classOfService: updatedClassOfService});
    };

    const changeIntercityVehicles = (updatedIntercityVehicles: string[]) => {
        storeDataToStorage("calculatorIntercityVehicles", updatedIntercityVehicles);
        change({...componentState, intercityVehicles: updatedIntercityVehicles});
    };

    const changeActivities = (updatedActivities: string[]) => {
        storeDataToStorage("calculatorActivities", updatedActivities);
        change({...componentState, activities: updatedActivities});
    };

    const changeTypeOfAccommodation = (updatedTypeOfAccommodation: string) => {
        storeDataToStorage("calculatorTypeOfAccommodation", updatedTypeOfAccommodation);
        change({...componentState, typeOfAccommodation: updatedTypeOfAccommodation});
    };

    const changeSeason = (updatedSeason: string) => {
        storeDataToStorage("calculatorSeason", updatedSeason);
        change({...componentState, season: updatedSeason});
    };

    const changeTypeOfFood = (updatedTypeOfFood: string) => {
        storeDataToStorage("calculatorTypeOfFood", updatedTypeOfFood);
        change({...componentState, typeOfFood: updatedTypeOfFood});
    };

    const changeTransferFromStation = (updatedTransferFromStation: string) => {
        storeDataToStorage("calculatorTransferFromStation", updatedTransferFromStation);
        change({...componentState, transferFromStation: updatedTransferFromStation});
    };

    const changeBookingTours = (updatedBookingTours: string) => {
        storeDataToStorage("calculatorBookingTours", updatedBookingTours);
        change({...componentState, bookingTours: updatedBookingTours});
    };

    const changeTypeOfInsurance = (updatedTypeOfInsurance: string) => {
        storeDataToStorage("calculatorTypeOfInsurance", updatedTypeOfInsurance);
        change({...componentState, typeOfInsurance: updatedTypeOfInsurance});
    };

    const changeComfortLevel = (updatedComfortLevel: string) => {
        storeDataToStorage("calculatorComfortLevel", updatedComfortLevel);
        change({...componentState, comfortLevel: updatedComfortLevel});
    };

    const changeTypeOfLuggage = (updatedTypeOfLuggage: string) => {
        storeDataToStorage("calculatorTypeOfLuggage", updatedTypeOfLuggage);
        change({...componentState, typeOfLuggage: updatedTypeOfLuggage});
    };

    const changeAdditionalOptions = (updatedAdditionalOptions: string[]) => {
        storeDataToStorage("calculatorAdditionalOptions", updatedAdditionalOptions);
        change({...componentState, additionalOptions: updatedAdditionalOptions});
    };

    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title="Калькулятор"
                description="Пройдите небольшой опрос для того, чтобы мы смогли рассчитать бюджет вашего путешествия"
            />

            <GsuWizardGridSection
                columns={3}
                header={"Город отправления и гражданство"}
                description={"Гражданство используется для определения необходимого типа визы"}
            >
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={city}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город отправления"}
                    onOptionSelect={setCity}
                    listName={"Город отправления"}
                />

                <GsuSingleAutocomplete
                    options={COUNTRIES}
                    placeholder={"Гражданство"}
                    onOptionSelect={setCitizenship}
                    listName={"Страна"}
                    value={citizenship}
                />
            </GsuWizardGridSection>

            <GsuWizardGridSection columns={3} header={"Город прибытия и валюта"}>
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={destination}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город прибытия"}
                    onOptionSelect={setDestination}
                    listName={"Город прибытия"}
                />

                <GsuSingleAutocomplete
                    options={CURRENCIES}
                    placeholder={"Валюта"}
                    onOptionSelect={setCurrency}
                    listName={"Валюта"}
                    value={currency}
                />
            </GsuWizardGridSection>

            <GsuWizardSection header={"Количество дней и человек"}>
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
                    {adults == 2 && (
                        <GsuWizardToggle Icon={PairIcon} change={setCouple} header={"Пара"} toggled={couple} />
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
            <GsuWizardSection header={"Транспорт до места назначения"}>
                <GsuButtonSingleSelect
                    value={internationalVehicle}
                    options={CALCULATOR_TRANSPORT_LIST}
                    change={(updatedTransport) => changeInternationalVehicle(updatedTransport)}
                />
            </GsuWizardSection>
            {internationalVehicle?.includes("PLANE") && (
                <GsuWizardSection header={"Класс обслуживания самолёта"}>
                    <GsuButtonSingleSelect
                        value={classOfService}
                        change={(updatedClassOfService) => changeClassOfService(updatedClassOfService)}
                        options={CLASSES_OF_SERVICE}
                    />
                </GsuWizardSection>
            )}
            <GsuWizardSection header={"Способы передвижения по городу"}>
                <GsuButtonSelect
                    values={intercityVehicles}
                    options={INTERCITY_VEHICLES_TYPES}
                    change={(updatedIntercityVehicles) => changeIntercityVehicles(updatedIntercityVehicles)}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Предпочитаемые активности"}>
                <GsuButtonSelect
                    values={activities}
                    options={ACTIVITY_LIST}
                    change={(updatedActivities) => changeActivities(updatedActivities)}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Тип проживания"}>
                <GsuButtonSingleSelect
                    value={typeOfAccommodation}
                    change={(updatedTypeOfAccommodation) => changeTypeOfAccommodation(updatedTypeOfAccommodation)}
                    options={TYPES_OF_ACCOMMODATION}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Сезон"}>
                <GsuButtonSingleSelect
                    value={season}
                    change={(updatedSeason) => changeSeason(updatedSeason)}
                    options={SEASONS}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Тип питания"}>
                <GsuButtonSingleSelect
                    value={typeOfFood}
                    change={(updatedTypeOfFood) => changeTypeOfFood(updatedTypeOfFood)}
                    options={TYPES_OF_FOOD}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Трансфер от/до аэропорта или вокзала"}>
                <GsuButtonSingleSelect
                    value={transferFromStation}
                    change={(updatedTransferFromStation) => changeTransferFromStation(updatedTransferFromStation)}
                    options={TRANSFERS_FROM_STATION}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Дополнительная бронь экскурсий"}>
                <GsuButtonSingleSelect
                    value={bookingTours}
                    change={(updatedBookingTours) => changeBookingTours(updatedBookingTours)}
                    options={TYPES_OF_TOURS}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Тип туристической страховки"}>
                <GsuButtonSingleSelect
                    value={typeOfInsurance}
                    change={(updatedTypeOfInsurance) => changeTypeOfInsurance(updatedTypeOfInsurance)}
                    options={TYPES_OF_INSURANCE}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Уровень комфорта"}>
                <GsuButtonSingleSelect
                    value={comfortLevel}
                    change={(updatedComfortLevel) => changeComfortLevel(updatedComfortLevel)}
                    options={COMFORT_LEVEL}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Планируемый тип багажа"}>
                <GsuButtonSingleSelect
                    value={typeOfLuggage}
                    change={(updatedTypeOfLuggage) => changeTypeOfLuggage(updatedTypeOfLuggage)}
                    options={TYPES_OF_LUGGAGE}
                />
            </GsuWizardSection>
            <GsuWizardSection header={"Дополнительные опции"}>
                <GsuButtonMultiSelect
                    values={additionalOptions}
                    options={TYPES_OF_ADDITIONAL_OPTIONS}
                    change={changeAdditionalOptions}
                />
            </GsuWizardSection>
        </GsuWizardGroupContainer>
    );
};

export default CalculatorBasicInfo;
