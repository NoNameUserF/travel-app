import {FC} from "react";

import {MinusIcon, PlusIcon} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

interface GsuZoomControlProps {
    onClickZoomIn: () => void;
    onClickZoomOut: () => void;
}

const GsuZoomControl: FC<GsuZoomControlProps> = ({onClickZoomIn, onClickZoomOut}) => {
    return (
        <div className={styles.controlContainer}>
            <div className={styles.zoomContainer}>
                <button className={styles.controlZoomIn} onClick={onClickZoomIn}>
                    <PlusIcon />
                </button>
                <button className={styles.controlZoomOut} onClick={onClickZoomOut}>
                    <MinusIcon />
                </button>
            </div>
        </div>
    );
};

export default GsuZoomControl;
