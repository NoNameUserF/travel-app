import {FC, Fragment} from "react";

import {GsuSeparator, GsuTile} from "@gsu-ai/gsu-ui-core";

import {ILocation, IPlace, IPlaceInfoSection} from "../../../api/interfaces";

import PlaceDetails from "../PlaceDetails";

import {RecipeIcon} from "../../../assets/Icons";

import styles from "./index.module.css";
import PreparingDetails from "./PreparingDetails";
import CardDetails from "./CardDetails";

export interface IPreparingPlace {
    location: ILocation;
}

interface PlaceCardDetailsProps {
    placeInfoList?: IPlaceInfoSection[];
    card: IPlace | null;
    cardPreparingInfo: IPreparingPlace | null;
}

const PlaceCardDetails: FC<PlaceCardDetailsProps> = ({card, placeInfoList, cardPreparingInfo}) => {
    return (
        <div className={styles.placeCardDetailsContainer}>
            <CardDetails card={card} />
            <GsuTile className={styles.cardTile}>
                <PreparingDetails cardPreparingInfo={cardPreparingInfo} />
                <div className={styles.cardTileTitle}>
                    <RecipeIcon />
                    <h5 className={styles.cardTitleText}>Подготовка к поездке</h5>
                </div>
                {placeInfoList?.map((placeInfoSection, index) => (
                    <Fragment key={index}>
                        <PlaceDetails placeInfoSection={placeInfoSection} />
                        {index < (placeInfoList?.length ?? 0) - 1 && <GsuSeparator withGaps={false} />}
                    </Fragment>
                ))}
            </GsuTile>
        </div>
    );
};

export default PlaceCardDetails;
