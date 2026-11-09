import {FC} from "react";

import cn from "classnames";

import {ItineraryDonateIcon, ItineraryTimerIcon} from "../../../../../../assets/Icons";

import styles from "./index.module.css";

interface TravelPointCardInfoProps {
    price: string;
    duration: string;
    isForMap?: boolean;
}

const TravelPointCardInfo: FC<TravelPointCardInfoProps> = ({price, duration, isForMap}) => {
    return (
        <div
            className={cn(styles.info, {
                [styles.infoForMap]: isForMap,
            })}
        >
            <div className={styles.wrapperPrice}>
                <ItineraryDonateIcon />
                <span>{price}</span>
            </div>
            <div className={styles.wrapperDuration}>
                <ItineraryTimerIcon />
                <span>{duration}</span>
            </div>
        </div>
    );
};

export default TravelPointCardInfo;
