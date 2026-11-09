import {FC} from "react";
import {IGsuInfoContainerCell} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";

interface ICalculatorDataProps {
    cardData: IGsuInfoContainerCell[];
}

const CalculatorData: FC<ICalculatorDataProps> = ({cardData}) => {
    return <GsuInfoContainer cells={cardData} type={"separated"} />;
};
export default CalculatorData;
