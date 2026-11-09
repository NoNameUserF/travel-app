import {FC, Fragment, useMemo} from "react";

import {formatDuration, GsuButton, GsuSeparator, GsuTile} from "@gsu-ai/gsu-ui-core";

import {ItineraryBtnMapIcon, ItineraryGoogleMapsLogoIcon, ItineraryTimerIcon} from "../../../../assets/Icons";

import {ITravelPoint} from "../../../../api/interfaces";

import formatPrice from "../../../../helpers/formatPrice";

import getParseUrlRoute from "../../../../helpers/getParseUrlRoute";

import TravelPointCard from "./TravelPointCard";

import styles from "./index.module.css";

interface TravelPointCardsProps {
    dayNumber: string;
    points: ITravelPoint[];
    onToggleMapClick: (value: boolean) => void;
    onMarkerClick: (point: ITravelPoint) => void;
    city: string | undefined;
    userSelectedCurrency: string;
}

const TravelPointCards: FC<TravelPointCardsProps> = ({
    dayNumber,
    points,
    onToggleMapClick,
    onMarkerClick,
    city,
    userSelectedCurrency,
}) => {
    const totalHours = useMemo(() => points.reduce((acc, point) => acc + Number(point.timeToSpend || 0), 0), [points]);
    const handleShowPointOnMap = (point: ITravelPoint) => {
        onToggleMapClick(true);
        onMarkerClick(point);
    };

    const url = getParseUrlRoute({points, city, includeCurrentLocation: false});

    return (
        <GsuTile className={styles.travelPointCards}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <div className={styles.dayInfo}>
                        <h2 className={styles.dayTitle}>{dayNumber}</h2>
                        <div className={styles.duration}>
                            <ItineraryTimerIcon />
                            <span className={styles.time}>~{formatDuration(totalHours.toString())}</span>
                        </div>
                    </div>

                    <div className={styles.travelPointsActions}>
                        <GsuButton
                            btnClassName={styles.mapButton}
                            style={"primary"}
                            text={"На карте"}
                            Icon={ItineraryBtnMapIcon}
                            onClick={() => onToggleMapClick(true)}
                        />
                        {url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <ItineraryGoogleMapsLogoIcon />
                            </a>
                        ) : (
                            <ItineraryGoogleMapsLogoIcon />
                        )}
                    </div>
                </div>
                <GsuSeparator className={styles.travelPointCardsHeaderSeparator}></GsuSeparator>
            </div>

            <div className={styles.list}>
                {points.map((point, idx) => (
                    <Fragment key={idx}>
                        <TravelPointCard
                            point={point}
                            order={idx + 1}
                            title={point.name}
                            description={point.description}
                            price={formatPrice(point.coast, userSelectedCurrency)}
                            duration={formatDuration(point.timeToSpend)}
                            onShowMap={() => handleShowPointOnMap(point)}
                        />
                        {idx < points.length - 1 && (
                            <GsuSeparator withGaps={true} className={styles.internalGsuSeparatorStyles} />
                        )}
                    </Fragment>
                ))}
            </div>
        </GsuTile>
    );
};

export default TravelPointCards;
