import {IPlace, IVisaRequirement} from "../../../../api/interfaces";
import {LikeIcon, PlaceIcon, VisaIcon} from "../../../../assets/Icons";

import styles from "./index.module.css";

const PlaceCard = ({card}: {card: IPlace}) => {
    const visaInfoRequirement = (visa: IVisaRequirement): string => {
        const {type, days} = visa;

        const visaTypes = {
            ETA: "Требуется электронное разрешение (ETA)",
            E_VISA: "Требуется электронная виза (E-Visa)",
            NO_ADMISSION: "Въезд запрещен",
            VISA_ON_ARRIVAL: "Виза по прибытии",
            VISA_REQUIRED: "Требуется виза",
            VISA_FREE:
                days === -1
                    ? "Гражданство и предполагаемая страна совпадают. Виза не требуется"
                    : days === 0
                      ? "Въезд без ограничений"
                      : `Безвизовый въезд на ${days} дней`,
        };

        return visaTypes[type];
    };
    return (
        <div className={styles.cardContainer}>
            {card.wikiInfo && card.wikiInfo.imageUrl ? (
                <img src={card.wikiInfo.imageUrl} className={styles.cardImg} alt="city-image" />
            ) : (
                <img src="/images/place-step/placeholder.svg" className={styles.cardImg} alt="city-image" />
                
            )}
            <div className={styles.cardTitleBlock}>
                <PlaceIcon />
                <h6 className={styles.cardTitle}>{`${card.location.countryName}, ${card.location.cityName}`}</h6>
            </div>
            <p className={styles.cardDescription}>{card.description}</p>
            <div className={styles.cardReasonBlock}>
                <LikeIcon />
                <p className={styles.cardReason}>{card.reason}</p>
            </div>
            <div className={styles.cardVisaBlock}>
                <VisaIcon />
                <p className={styles.cardVisa}>
                    {card && card.visaRequirement ? visaInfoRequirement(card.visaRequirement) : ""}
                </p>
            </div>
        </div>
    );
};

export default PlaceCard;
