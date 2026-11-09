import {FC} from "react";
import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";

import {RouteIcon} from "../../../../assets/Icons";

interface ITravelDataProps {
    cardData: IGsuInfoContainerCell[];
}

const TravelData: FC<ITravelDataProps> = ({cardData}) => {
    return <GsuInfoContainer cells={cardData} header={"Данные:"} Icon={RouteIcon} />;
};
export default TravelData;
