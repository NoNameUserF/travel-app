import {FC} from "react";

import {IPlace, IPlaceDetails} from "../../../api/interfaces";
import CardList, {CardListItem} from "../../../components/CardList/CardList";
import {getPlacesCommonInfoList} from "../../../helpers/placeInfoBuilder";

import styles from "./index.module.css";

interface PlaceCardInfoProps {
    place: IPlace | null;
    details: IPlaceDetails | null;
}

const PlaceCardInfo: FC<PlaceCardInfoProps> = ({place, details}) => {
    const items: CardListItem[] = getPlacesCommonInfoList(place, details);
    return (
        <div className={styles.placeCardInfoContainer}>
            <CardList items={items} />
        </div>
    );
};

export default PlaceCardInfo;
