import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {fetchGet} from "@gsu-ai/gsu-ui-core";

import {ICity} from "../api/interfaces";
import {APPLICATION_HOST} from "../api/api";
import {ICityOption} from "../types/globalTypes";

export const countriesCallback = (data: ICity[]) => {
    const options: IOptions<ICityOption> = {};
    data.forEach((item) => {
        options[`${item.city}, ${item.region}, ${item.countryName}`] = {
            label: `${item.city}, ${item.region}, ${item.countryName}`,
            city: item.city,
            country: item.country,
            countryName: item.countryName,
            region: item.region,
            population: item.population,
        };
    });
    return options;
};

export const countriesFetch = (value: string) => fetchGet(APPLICATION_HOST, `/getCities?cityName=${value}`);
