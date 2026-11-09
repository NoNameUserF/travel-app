import {FC} from "react";
import {GsuMobileInputModal, NextArrowIcon} from "@gsu-ai/gsu-ui-core";

import TravelListOfDays from "../../ItineraryStepTravelPoints/TravelListOfDays";

import {ITravelPoint} from "../../../../api/interfaces";

import styles from "./index.module.css";

interface InfoForMapProps {
    daySteps: string[];
    activeIdx: number;
    changeIdx: (index: number) => void;
    activeDayIndex: number;
    activeMenu: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    onMarkerClick: (activity: ITravelPoint | null) => void;
}

const InfoForMap: FC<InfoForMapProps> = ({
    daySteps,
    activeIdx,
    changeIdx,
    activeDayIndex,
    openMenu,
    closeMenu,
    activeMenu,
    onMarkerClick,
}) => {
    return (
        <>
            <div className={styles.travelListOfDaysWrapper}>
                <TravelListOfDays
                    daySteps={daySteps}
                    activeIdx={activeIdx}
                    changeIdx={changeIdx}
                    activeDayIndex={activeDayIndex}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    onMarkerClick={onMarkerClick}
                />
            </div>

            <GsuMobileInputModal
                listName={"Выбрать день"}
                open={activeMenu}
                setOpen={closeMenu}
                maxHeight={false}
                headerTypeClose={false}
            >
                <TravelListOfDays
                    daySteps={daySteps}
                    activeIdx={activeIdx}
                    changeIdx={changeIdx}
                    activeDayIndex={activeDayIndex}
                    openMenu={openMenu}
                    closeMenu={closeMenu}
                    onMarkerClick={onMarkerClick}
                />
            </GsuMobileInputModal>

            <button className={styles.selectDayBtn} onClick={openMenu}>
                {`День ${activeDayIndex + 1}`}
                <span className={styles.iconContainer}>
                    <NextArrowIcon />
                </span>
            </button>
        </>
    );
};

export default InfoForMap;
