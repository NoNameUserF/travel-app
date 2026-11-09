import {FC} from "react";

import cn from "classnames/dedupe";

import styles from "./index.module.css";

interface TravelPointCardDescriptionProps {
    description: string;
    isForMap: boolean;
}

const TravelPointCardDescription: FC<TravelPointCardDescriptionProps> = ({description, isForMap}) => {
    return (
        <p
            className={cn(styles.desc, {
                [styles.isForMapDesc]: isForMap,
            })}
        >
            {description}
        </p>
    );
};

export default TravelPointCardDescription;
