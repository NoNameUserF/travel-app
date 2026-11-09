import {FC} from "react";

import {GsuInfoContainer} from "@gsu-ai/gsu-ui-core";

import {IPlace, IPreparingData} from "../../../api/interfaces";

import {PlaceFirstStepState} from "../../PlaceStep/PlaceBasicInfo";

import {getPlaceInfoList, getPreparingPlaceInfoList, PlaceInfoCell} from "../../../helpers/placeInfoBuilder";

import styles from "./index.module.css";

interface PlaceCardGeneralProps {
    place: IPlace | null;
    requestState: PlaceFirstStepState | null;
    preparingData : IPreparingData | null
}

const PlaceCardGeneral: FC<PlaceCardGeneralProps> = ({place, requestState, preparingData}) => {
    const cardData: PlaceInfoCell[] = preparingData ? getPreparingPlaceInfoList (preparingData) : getPlaceInfoList(place, requestState);


    return (
        <>
            {cardData && (
                <div className={styles.placeCardContainer}>
                    <GsuInfoContainer cells={cardData} type={"separated"} />
                </div>
            )}
        </>
    );
};

export default PlaceCardGeneral;
