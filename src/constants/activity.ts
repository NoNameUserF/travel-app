import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {
    BeachIcon,
    CityIcon,
    CountrySideIcon,
    CulturalDestinationsIcon,
    HistoricalPlaceIcon,
    IslandIcon,
    MountainIcon,
    NationalParkIcon,
    RetreatsIcon,
} from "../assets/Icons";

const ACTIVITY_LIST: IOptions = {
    ANY: {label: "Любые", Icon: InfinityIcon},
    CITIES: {label: "Городская местность", Icon: CityIcon},
    MOUNTAINS: {label: "Горы", Icon: MountainIcon},
    COUNTRYSIDES: {label: "Загородная местность", Icon: CountrySideIcon},
    HISTORICAL_SITES: {label: "Исторические места", Icon: HistoricalPlaceIcon},
    CULTURAL_DESTINATIONS: {label: "Культурные объекты", Icon: CulturalDestinationsIcon},
    WELLNESS_RETREATS: {label: "Оздоровление", Icon: RetreatsIcon},
    NATIONAL_PARKS: {label: "Парки / Заповедники", Icon: NationalParkIcon},
    BEACHES: {label: "Пляжи", Icon: BeachIcon},
};

export default ACTIVITY_LIST;
