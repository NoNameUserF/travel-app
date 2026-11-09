import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {InfinityIcon} from "@gsu-ai/gsu-ui-core";

import {LuggageHandIcon, LuggageIcon, LuggageLargeIcon} from "../assets/Icons";

const LUGGAGE_LIST: IOptions = {
    ANY: {label: "Любой", Icon: InfinityIcon},
    HAND_LUGGAGE: {label: "Ручная кладь (размер S)", Icon: LuggageHandIcon},
    MEDIUM: {label: "Средний (размер M)", Icon: LuggageIcon},
    LARGE: {label: "Большой (размер L)", Icon: LuggageLargeIcon},
};

export default LUGGAGE_LIST;
