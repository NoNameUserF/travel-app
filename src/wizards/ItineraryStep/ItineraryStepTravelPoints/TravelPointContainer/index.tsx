import {FC} from "react";

import {ItineraryMapIcon} from "../../../../assets/Icons";

import {INTERCITY_VEHICLES_TYPES} from "../../../../constants/transport";
import ACTIVITY_LIST from "../../../../constants/activity";

import styles from "./index.module.css";

export interface ItineraryInfoBlockI {
    infoBlock: {
        cityName?: string;
        budget: number;
        adultsCount: number;
        childrenCount: number;
        daysCount: number;
        preferences: string[];
        intercityVehicles: string[];
        currency: string;
    };
}

export const TravelPointContainer: FC<ItineraryInfoBlockI> = ({infoBlock}) => {
    const transport = infoBlock.intercityVehicles?.map((key) => INTERCITY_VEHICLES_TYPES[key]?.label);
    const activities = infoBlock.preferences?.map((key) => ACTIVITY_LIST[key]?.label);

    return (
        <div className={styles.travelPointInfoContainer}>
            <div className={styles.travelPointInfoHeader}>
                <ItineraryMapIcon />
                <p className={styles.travelPointInfoHeaderData}>Данные</p>
            </div>
            <div className={styles.travelPointInfoBlock}>
                <div className={styles.travelPointInfoRow}>
                    <label>Город:</label>
                    <label className={styles.travelPointInfoRowValue}>{infoBlock.cityName}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Бюджет:</label>
                    <label className={styles.travelPointInfoRowValue}>{infoBlock.budget}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Количество взрослых:</label>
                    <label className={styles.travelPointInfoRowValue}>{infoBlock.adultsCount || 0}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Количество детей:</label>
                    <label className={styles.travelPointInfoRowValue}>{infoBlock.childrenCount || 0}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Количество дней:</label>
                    <label className={styles.travelPointInfoRowValue}>{infoBlock.daysCount}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Активности:</label>
                    <label className={styles.travelPointInfoRowValue}>{activities?.join(", ")}</label>
                </div>
                <div className={styles.travelPointInfoRow}>
                    <label>Транспорт:</label>
                    <label className={styles.travelPointInfoRowValue}>{transport?.join(", ")}</label>
                </div>
            </div>
        </div>
    );
};

export default TravelPointContainer;
