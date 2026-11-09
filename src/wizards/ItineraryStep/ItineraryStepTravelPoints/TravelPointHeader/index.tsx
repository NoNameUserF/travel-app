import {GsuButton, RefreshLeftIcon} from "@gsu-ai/gsu-ui-core";

import {FC} from "react";

import styles from "./index.module.css";

interface TravelPointHeaderProps {
    refresh: () => void;
}

export const TravelPointHeader: FC<TravelPointHeaderProps> = ({refresh}) => {
    return (
        <div className={styles.travelPointContainer}>
            <h2>Маршрут</h2>
            <GsuButton
                btnClassName={styles.travelPointButton}
                style={"outline"}
                onClick={refresh}
                Icon={RefreshLeftIcon}
                text={"Сгенерировать заново"}
            />
        </div>
    );
};

export default TravelPointHeader;
