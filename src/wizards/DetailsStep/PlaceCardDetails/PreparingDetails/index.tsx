import {FC} from "react";

import {IPreparingPlace} from "../index";
import styles from "../index.module.css";
import {PlaceIcon} from "../../../../assets/Icons";

interface IPreparingPlaceProps {
    cardPreparingInfo: IPreparingPlace | null;
}
const PreparingDetails: FC<IPreparingPlaceProps> = ({cardPreparingInfo}) => {
    return (
        <>
            {cardPreparingInfo && (
                <div>
                    <div className={styles.cardTitleBlock}>
                        <div className={styles.cardTitleBlockLeft}>
                            <div className={styles.cardTitle}>
                                <PlaceIcon />
                                <h5
                                    className={styles.cardTitlelocationText}
                                >{`${cardPreparingInfo.location.countryName}, ${cardPreparingInfo.location.cityName}`}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default PreparingDetails;
