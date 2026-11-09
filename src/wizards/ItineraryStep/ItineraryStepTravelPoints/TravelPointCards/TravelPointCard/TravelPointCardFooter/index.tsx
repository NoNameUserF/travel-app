import {FC} from "react";

import {ItineraryGoogleMapsIcon, ItineraryGoogleMapsLogoIcon} from "../../../../../../assets/Icons";

import styles from "./index.module.css";

interface TravelPointCardFooterProps {
    onShowMap?: () => void;
    isForMap?: boolean;
    url: string | null;
}

const TravelPointCardFooter: FC<TravelPointCardFooterProps> = ({onShowMap, isForMap, url}) => {
    return (
        <div className={styles.footer}>
            {isForMap ? (
                <div className={styles.googleLogoWrapper}>
                    {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <ItineraryGoogleMapsLogoIcon />
                        </a>
                    ) : (
                        <ItineraryGoogleMapsLogoIcon />
                    )}
                </div>
            ) : (
                <>
                    <button className={styles.showIntoMap} onClick={onShowMap}>
                        Показать на карте
                    </button>
                    <div className={styles.googleLogoWrapper}>
                        {url ? (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <ItineraryGoogleMapsIcon />
                            </a>
                        ) : (
                            <ItineraryGoogleMapsIcon />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default TravelPointCardFooter;
