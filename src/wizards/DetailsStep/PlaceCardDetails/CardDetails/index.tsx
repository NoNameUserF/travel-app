import {FC} from "react";

import {GsuTile} from "@gsu-ai/gsu-ui-core";

import styles from "../index.module.css";
import {LikeIcon, PlaceIcon} from "../../../../assets/Icons";
import {IPlace} from "../../../../api/interfaces";

interface ICardDetails {
    card: IPlace | null;
}

const CardDetails: FC<ICardDetails> = ({card}) => {
    return (
        <>
            {card && (
                <div className={styles.cardTitleBlock}>
                    <GsuTile className={styles.cardTile}>
                        <div className={styles.cardTileTitle}>
                            <PlaceIcon />
                            <h5 className={styles.cardTitleText}>Описание</h5>
                        </div>
                        <div className={styles.cardDescriptionBlock}>
                            <p className={styles.cardDescription}>{card.description}</p>
                            <div className={styles.cardReasonBlock}>
                                <LikeIcon />
                                <p className={styles.cardReason}>{card.reason}</p>
                            </div>
                        </div>
                    </GsuTile>
                </div>
            )}
        </>
    );
};
export default CardDetails;
