import {FC} from "react";
import {GsuStepLoaderProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuBasicStepLoader} from "@gsu-ai/gsu-ui-core";

import {LogoRoundedIcon} from "../../assets/Icons";

const TravelStepLoader: FC<GsuStepLoaderProps> = ({steps, terminated, onComplete}) => {
    return <GsuBasicStepLoader steps={steps} terminated={terminated} onComplete={onComplete} Logo={LogoRoundedIcon} />;
};

export default TravelStepLoader;
