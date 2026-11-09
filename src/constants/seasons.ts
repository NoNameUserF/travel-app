import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {WarmSeasonIcon, WinterSeasonIcon, SpringSeasonIcon, AutumnSeasonIcon} from "../assets/Icons";

const SEASONS_LIST: IOptions = {
    SUMMER: {label: "Лето", Icon: WarmSeasonIcon},
    WINTER: {label: "Зима", Icon: WinterSeasonIcon},
    SPRING: {label: "Весна", Icon: SpringSeasonIcon},
    AUTUMN: {label: "Осень", Icon: AutumnSeasonIcon},
};

export default SEASONS_LIST;
