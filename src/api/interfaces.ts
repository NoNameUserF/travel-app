export interface ILocation {
    cityName: string;
    countryName: string;
    latitude?: string;
    longitude?: string;
}

export interface IWikiInfo {
    wikiUrl: string;
    imageUrl?: string;
}

export interface IPlaceGeneralInfo {
    currency: string;
    exchangeRate: string;
    gmtOffset?: number;
    dstOffset?: number;
    languages: string[];
    electricity: {
        plugTypes: string[];
        frequencies: number[];
        voltages: number[];
    };
    weatherLink?: string;
    wikiInfo?: IWikiInfo;
}

export type IVisaRequirement = {
    type: "ETA" | "E_VISA" | "VISA_FREE" | "NO_ADMISSION" | "VISA_ON_ARRIVAL" | "VISA_REQUIRED";
    days?: number;
};

export interface IPlace {
    description: string;
    location: ILocation;
    reason: string;
    visaRequirement: IVisaRequirement;
    wikiInfo: IWikiInfo;
}

export interface IPreparingData {
    cityName: string;
    currencyCode: string;
    citizenship: string;
    startCountry: string;
}

export interface ICity {
    country: string;
    countryName: string;
    city: string;
    population: string;
    region: string;
}

export interface IPlaceInfoParagraph {
    header: string;
    info: string;
}

export interface IPlaceInfoSection {
    name: string;
    placeInfoParagraphList: IPlaceInfoParagraph[];
}

export interface IPlaceDetails {
    placeInfoList: IPlaceInfoSection[];
    cityCommonInfo: IPlaceGeneralInfo | null;
}

export interface IBagsItem {
    name: string;
    quantity: string;
}

export interface IBackpack {
    adults: IBagsItem[] | null;
    children: IBagsItem[] | null;
}

export interface CalculatorResult {
    name: string;
    price: number;
}

export interface ITravelPoint {
    name: string;
    originalName: string;
    englishName: string;
    description: string;
    location: {
        cityName?: string;
        countryName?: string;
        latitude: string;
        longitude: string;
    };
    coast: number;
    timeToSpend: string;
}

export interface ITravelPoints {
    day: string;
    travelPoints: ITravelPoint[];
}
