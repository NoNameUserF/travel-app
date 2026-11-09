import cn from "classnames/dedupe";

import {useEffect, useState} from "react";

import mapboxgl from "mapbox-gl";

import {ITravelPoint} from "../../../../api/interfaces";

import styles from "./index.module.css";

interface MarkerElementProps {
    activity: ITravelPoint;
    selectedMarker: ITravelPoint | null;
    index: number;
    popup: mapboxgl.Popup;
}

const MarkerElement = ({activity, index, selectedMarker, popup}: MarkerElementProps) => {
    const [popupIsOpen, setPopupIsOpen] = useState(true);

    const handleOpen = () => setPopupIsOpen(true);
    const handleClose = () => setPopupIsOpen(false);

    const isActive = activity === selectedMarker;

    useEffect(() => {
        popup.on("open", handleOpen);
        popup.on("close", handleClose);

        return () => {
            popup.off("open", handleOpen);
            popup.off("close", handleClose);
        };
    }, [popup]);

    return (
        <>
            <div
                className={cn(styles.marker, {
                    [styles.active]: isActive && popupIsOpen,
                })}
                data-number={index.toString()}
            >
                <div className={styles.markerCenter}>{index + 1}</div>
            </div>
            {((isActive && !popupIsOpen) || !isActive) && (
                <p
                    className={cn(styles.markerTitle, {
                        [styles.active]: isActive && !popupIsOpen,
                    })}
                >
                    {activity.name}
                </p>
            )}
        </>
    );
};

export default MarkerElement;
