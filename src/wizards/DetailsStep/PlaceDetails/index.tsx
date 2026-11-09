import {FC} from "react";

import {IPlaceInfoSection} from "../../../api/interfaces";

import styles from "./index.module.css";

interface PlaceDetailsState {
    placeInfoSection: IPlaceInfoSection;
}

export const PlaceDetails: FC<PlaceDetailsState> = ({placeInfoSection}) => {
    return (
        <div key={placeInfoSection.name} className={styles.placeDetailsContainer}>
            <p className={styles.placeDetailsCardTitle}>{placeInfoSection.name}</p>
            <div className={styles.placeDetailsCardDescription}>
                {placeInfoSection.placeInfoParagraphList.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className={styles.placeDetailsCardHeader}>{`${item.header}:`}</p>
                            <p className={styles.placeDetailsCardHeaderDescription}>{item.info}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default PlaceDetails;
