import React from "react";
import mapboxgl from "mapbox-gl";

interface IHandleMapMove {
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    isUserEventRef: React.MutableRefObject<boolean>;
}

const handleMapMove = ({currentPopupRef, isUserEventRef}: IHandleMapMove) => {
    return () => {
        if (isUserEventRef.current && currentPopupRef.current) {
            currentPopupRef.current.remove();
            currentPopupRef.current = null;
        }
    };
};
export default handleMapMove;
