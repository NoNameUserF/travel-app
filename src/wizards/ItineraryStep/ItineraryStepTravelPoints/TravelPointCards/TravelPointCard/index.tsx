import {FC} from "react";

import cn from "classnames/dedupe";

import {CloseMapIcon} from "../../../../../assets/Icons";

import {ITravelPoint} from "../../../../../api/interfaces";

import getParseUrl from "../../../../../helpers/getParseUrl";

import styles from "./index.module.css";
import TravelPointCardInfo from "./TravelPointCardInfo";
import TravelPointCardDescription from "./TravelPointCardDescription";
import TravelPointCardTitle from "./TravelPointCardTitle";
import TravelPointCardFooter from "./TravelPointCardFooter";

interface TravelPointCardProps {
    order: number;
    point: ITravelPoint;
    title: string;
    description: string;
    price: string;
    duration: string;
    onShowMap?: () => void;
    clickCloseButton?: () => void;
    isForMap?: boolean;
}

const TravelPointCard: FC<TravelPointCardProps> = ({
    order,
    point,
    title,
    description,
    price,
    duration,
    onShowMap,
    clickCloseButton,
    isForMap = false,
}) => {
    const city = point.location.cityName;
    const originalName = point.originalName;

    const url = getParseUrl({originalName, city});

    return (
        <div
            className={cn(styles.wrapperCard, {
                [styles.isForMapCard]: isForMap,
            })}
        >
            <TravelPointCardTitle order={order} title={title} isForMap={isForMap} />
            {isForMap && <TravelPointCardInfo price={price} duration={duration} isForMap={isForMap} />}
            <TravelPointCardDescription description={description} isForMap={isForMap} />
            {!isForMap && <TravelPointCardInfo price={price} duration={duration} isForMap={isForMap} />}
            <TravelPointCardFooter onShowMap={onShowMap} isForMap={isForMap} url={url} />

            {isForMap && (
                <button onClick={clickCloseButton} className={styles.activitiesCardCloseButton}>
                    <CloseMapIcon />
                </button>
            )}
        </div>
    );
};

export default TravelPointCard;
