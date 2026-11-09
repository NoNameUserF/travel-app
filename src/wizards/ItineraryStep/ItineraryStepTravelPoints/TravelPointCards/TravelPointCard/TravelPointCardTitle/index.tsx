import {FC} from "react";

import cn from "classnames/dedupe";

import styles from "./index.module.css";

interface TravelPointCardTitleProps {
    order: number;
    title: string;
    isForMap?: boolean;
}

const TravelPointCardTitle: FC<TravelPointCardTitleProps> = ({order, title, isForMap}) => {
    return (
        <div
            className={cn(styles.pointTitle, {
                [styles.isForMapTitle]: isForMap,
            })}
        >
            <div className={styles.circle}>{order}</div>
            <h6 className={styles.title}>{title}</h6>
        </div>
    );
};

export default TravelPointCardTitle;
