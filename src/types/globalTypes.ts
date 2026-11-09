import {IOption} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

export interface ICityOption extends IOption {
    country: string;
    countryName: string;
    city: string;
    population: string;
    region: string;
}
