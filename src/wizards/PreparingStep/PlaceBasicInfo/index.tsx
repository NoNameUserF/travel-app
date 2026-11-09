import {
    COUNTRIES,
    CURRENCIES,
    GsuAsyncAutocomplete,
    GsuPageDescription,
    GsuSingleAutocomplete,
    GsuWizardGridSection,
    GsuWizardGroupContainer,
    storeDataToStorage,
} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {countriesCallback, countriesFetch} from "../../../helpers/countries";
import {ICityOption} from "../../../types/globalTypes";

import {ICity} from "../../../api/interfaces";

export interface PreparingFirstStepState {
    startCountry: string;
    location: ICityOption | null;
    citizenship: string;
    currencyCode: string;
}

export const PreparingFirstStep: FC<IWizardStep<PreparingFirstStepState>> = ({componentState, change}) => {
    const city = componentState.location;
    const citizenship = componentState.citizenship;
    const startCountry = componentState.startCountry;
    const currency = componentState.currencyCode;

    const setLocation = (location: ICityOption) => {
        storeDataToStorage("preparingLocation", location);
        change({...componentState, location: location});
    };

    const setCitizenship = (citizenship: string) => {
        storeDataToStorage("preparingCitizenship", citizenship);
        change({...componentState, citizenship: citizenship});
    };

    const setCurrency = (currency: string) => {
        storeDataToStorage("preparingCurrencyCode", currency);
        change({...componentState, currencyCode: currency});
    };

    const setStartingCountry = (startCountry: string) => {
        storeDataToStorage("preparingStartCountry", startCountry);
        change({...componentState, startCountry: startCountry});
    };
    return (
        <GsuWizardGroupContainer>
            <GsuPageDescription
                title="Подготовка"
                description="Пройдите небольшой опрос для того, чтобы мы смогли составить персональный чек-лист подготовки: документы, страховка, связь, валюты, погода и важные нюансы страны"
            />
            <GsuWizardGridSection
                columns={2}
                header={"Страна выезда и гражданство"}
                description={"Гражданство используется для определения необходимого типа визы"}
            >
                <GsuSingleAutocomplete
                    options={COUNTRIES}
                    placeholder={"Страна"}
                    onOptionSelect={setStartingCountry}
                    listName={"Страна"}
                    value={startCountry}
                />
                <GsuSingleAutocomplete
                    options={COUNTRIES}
                    placeholder={"Гражданство"}
                    onOptionSelect={setCitizenship}
                    listName={"Страна"}
                    value={citizenship}
                />
            </GsuWizardGridSection>
            <GsuWizardGridSection columns={2} header={"Город назначения и валюта"}>
                <GsuAsyncAutocomplete<ICityOption, ICity[]>
                    value={city}
                    fetch={countriesFetch}
                    callback={countriesCallback}
                    placeholder={"Город"}
                    onOptionSelect={setLocation}
                    listName={"Город"}
                />
                <GsuSingleAutocomplete
                    options={CURRENCIES}
                    placeholder={"Валюта"}
                    onOptionSelect={setCurrency}
                    listName={"Валюта"}
                    value={currency}
                />
            </GsuWizardGridSection>
        </GsuWizardGroupContainer>
    );
};

export default PreparingFirstStep;
