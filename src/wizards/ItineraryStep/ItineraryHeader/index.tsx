import {FC} from "react";
import {GsuActionsBlock, GsuPagination} from "@gsu-ai/gsu-ui-core";

import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {buildItineraryText} from "../../../helpers/buildItineraryText";

import {ItineraryStepLocationState} from "../ItineraryStepLocation";
import {ITravelPoints} from "../../../api/interfaces";

import styles from "./index.module.css";

interface ItineraryHeaderProps {
    location: ItineraryStepLocationState;
    travelPoints: ITravelPoints[];
    options: IOptions;
    activeKey: string;
    changeKey: (value: string) => void;
}

const ItineraryHeader: FC<ItineraryHeaderProps> = ({location, travelPoints, options, activeKey, changeKey}) => {
    const actionInfo = buildItineraryText(location, travelPoints);
    const saveFileName = location.city ? `Маршрут_${location.city.label.replace(/[,\s]+/g, "_")}` : "";

    return (
        <div className={styles.itineraryHeader}>
            <GsuPagination options={options} activeKey={activeKey} changeKey={changeKey} />
            <GsuActionsBlock
                copy={actionInfo}
                save={actionInfo}
                share={actionInfo}
                saveFileName={saveFileName || "travel"}
            />
        </div>
    );
};

export default ItineraryHeader;
