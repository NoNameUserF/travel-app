import {FC} from "react";
import cn from "classnames/dedupe";

import {CloseMapIcon} from "../../../../assets/Icons";

import {ITravelPoint} from "../../../../api/interfaces";

import styles from "./index.module.css";

interface TravelListOfDaysProps {
    daySteps: string[];
    activeIdx: number;
    changeIdx: (index: number) => void;
    activeDayIndex: number;
    openMenu: () => void;
    closeMenu: () => void;
    onMarkerClick: (activity: ITravelPoint | null) => void;
}

const TravelListOfDays: FC<TravelListOfDaysProps> = ({daySteps, activeIdx, changeIdx, closeMenu, onMarkerClick}) => {
    const btnClickHandler = (index: number) => {
        onMarkerClick(null);
        changeIdx(index);
        closeMenu();
    };

    const renderListOfDays = (day: string, index: number) => {
        const isActiveDay = () => activeIdx === index;

        return (
            <button
                key={index}
                className={cn(styles.travelListOfDay, {
                    [styles.activeDay]: isActiveDay(),
                })}
                onClick={() => btnClickHandler(index)}
            >
                {day}
            </button>
        );
    };

    return (
        <div className={styles.travelListOfDaysWrapper}>
            <h2 className={styles.travelListOfDaysTitle}>Выберите день</h2>
            <div className={styles.travelListOfDays}>{daySteps.map((day, index) => renderListOfDays(day, index))}</div>
            <button onClick={closeMenu} className={styles.travelListOfDaysCloseButton}>
                <CloseMapIcon />
            </button>
        </div>
    );
};

export default TravelListOfDays;
