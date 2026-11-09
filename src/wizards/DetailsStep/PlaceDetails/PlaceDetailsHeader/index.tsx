import {FC} from "react";

import {GsuActionsBlock, GsuPagination} from "@gsu-ai/gsu-ui-core";

import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IPlace} from "../../../../api/interfaces";

import styles from "./index.module.css";

interface IPlaceDetailsHeaderProps {
    place: IPlace;
    tabs: IOptions;
    currentTab: string;
    changeTab: (value: string) => void;
    placeActionInfo: string;
    showInfo?: boolean;
}

const PlaceDetailsHeader: FC<IPlaceDetailsHeaderProps> = ({place, showInfo = true}) => {
    return (
        <>
            {showInfo && (
                <div className={styles.detailsWrapper}>
                    <div>
                        {place.wikiInfo && place.wikiInfo.imageUrl ? (
                            <img src={place.wikiInfo.imageUrl} className={styles.cardImg} alt="city-image" />
                        ) : (
                            <img src="/images/place-step/placeholder.svg" className={styles.cardImg} alt="city-image" />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default PlaceDetailsHeader;
