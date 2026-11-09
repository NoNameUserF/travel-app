import {PlaceFirstStepState} from "../wizards/PlaceStep/PlaceBasicInfo";

const getDestination = (firstStep: PlaceFirstStepState) => {
    switch (firstStep.direction) {
        case "1":
            return {
                abroadTravel: true,
                countries: [],
                regions: ["ANY"],
                visitedLocations: [],
            };
        case "2":
            return {
                abroadTravel: false,
                countries: [],
                regions: [],
                visitedLocations: [
                    {
                        cityName: firstStep.city?.city,
                        countryName: firstStep.city?.country,
                    },
                ],
            };
        case "3":
            return {
                abroadTravel: true,
                countries: firstStep.countries,
                regions: [],
                visitedLocations: [],
            };
        case "4":
            return {
                abroadTravel: true,
                countries: [],
                regions: firstStep.region,
                visitedLocations: [],
            };
        default:
            return [];
    }
};

export default getDestination;
