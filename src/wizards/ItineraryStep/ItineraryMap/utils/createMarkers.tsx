import mapboxgl from "mapbox-gl";
import {createRoot} from "react-dom/client";

import React from "react";

import {formatDuration} from "@gsu-ai/gsu-ui-core";

import MarkerElement from "../CreateMarkerElement/MarkerElement";
import styles from "../CreateMarkerElement/index.module.css";
import {ITravelPoint} from "../../../../api/interfaces";
import TravelPointCard from "../../ItineraryStepTravelPoints/TravelPointCards/TravelPointCard";
import formatPrice from "../../../../helpers/formatPrice";

interface createMarkersProps {
    map: mapboxgl.Map;
    coordinatesRef: React.MutableRefObject<{latitude: number; longitude: number}[]>;
    points: ITravelPoint[];
    onMarkerClick: (activity: ITravelPoint) => void;
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    selectedMarker: ITravelPoint | null;
}

interface drowMarkerElementOnMapProps {
    markerContainer: HTMLDivElement;
    coord: {latitude: number; longitude: number};
    map: mapboxgl.Map;
}

interface createPopupCardProps {
    activity: ITravelPoint;
    index: number;
    popup: mapboxgl.Popup;
    popupContainer: HTMLDivElement;
}

interface drowPopupOnMapProps {
    marker: mapboxgl.Marker;
    popupContainer: HTMLDivElement;
}

interface HandleMarkerClickParams {
    e: MouseEvent;
    marker: mapboxgl.Marker;
    popup: mapboxgl.Popup;
    currentPopupRef: React.MutableRefObject<mapboxgl.Popup | null>;
    activity: ITravelPoint;
    onMarkerClick: (activity: ITravelPoint) => void;
}

export interface IMarkersAndPopups {
    [id: string]: {
        marker: mapboxgl.Marker;
        popup: mapboxgl.Popup;
    };
}

export const handleMarkerClick = ({
    e,
    marker,
    popup,
    currentPopupRef,
    activity,
    onMarkerClick,
}: HandleMarkerClickParams) => {
    if (currentPopupRef.current) {
        currentPopupRef.current.remove();
    }

    marker.togglePopup();
    e.stopPropagation();
    onMarkerClick(activity);

    return popup;
};

const drowMarkerContainerOnMap = ({markerContainer, coord, map}: drowMarkerElementOnMapProps): mapboxgl.Marker => {
    return new mapboxgl.Marker({
        element: markerContainer,
        anchor: "left",
        offset: [-20, 0],
    })
        .setLngLat([coord.longitude, coord.latitude])
        .addTo(map);
};

const drowMarkerElementOnMarkerContainer = (
    activity: ITravelPoint,
    index: number,
    markerContainer: HTMLDivElement,
    selectedMarker: ITravelPoint | null,
    popup: mapboxgl.Popup,
) => {
    const root = createRoot(markerContainer);
    root.render(
        <MarkerElement activity={activity} selectedMarker={selectedMarker} index={index} popup={popup} key={index} />,
    );
};

const createPopupCard = ({activity, index, popup, popupContainer}: createPopupCardProps) => {
    const root = createRoot(popupContainer);

    root.render(
        <TravelPointCard
            order={index + 1}
            point={activity}
            title={activity.name}
            description={activity.description}
            price={formatPrice(activity.coast)}
            duration={formatDuration(activity.timeToSpend)}
            isForMap={true}
            clickCloseButton={() => popup.remove()}
        />,
    );
};

const drowPopupOnMap = ({marker, popupContainer}: drowPopupOnMapProps): mapboxgl.Popup => {
    const popup = new mapboxgl.Popup({
        offset: 32,
        closeButton: false,
        closeOnClick: true,
    }).setDOMContent(popupContainer);

    marker.setPopup(popup);

    return popup;
};

const removeOldMarkers = (queryClass: string) => {
    const containers = document.querySelectorAll(`.${queryClass}`);
    const hasMarkers = containers.length > 0;

    if (hasMarkers) {
        containers.forEach((markerElement) => markerElement.remove());
    }
};

const createMarkers = ({
    map,
    coordinatesRef,
    points,
    onMarkerClick,
    currentPopupRef,
    selectedMarker,
}: createMarkersProps) => {
    removeOldMarkers(`${styles.markerContainer}`);

    const markersAndPopups: IMarkersAndPopups = {};

    coordinatesRef.current.forEach((coord, i) => {
        const activity = points[i];
        const popupContainer = document.createElement("div");
        const markerContainer = document.createElement("div");
        const id: number = +activity.location.longitude + +activity.location.latitude;

        markerContainer.classList.add(styles.markerContainer);

        const marker = drowMarkerContainerOnMap({markerContainer, coord, map}); // Инициализируем маркер на карте с пустым контейнером

        const popup = drowPopupOnMap({marker, popupContainer});

        drowMarkerElementOnMarkerContainer(activity, i, markerContainer, selectedMarker, popup); // Добавляем в markerContainer компонент MarkerElement

        createPopupCard({activity, index: i, popup, popupContainer});

        markerContainer.addEventListener("click", (e) => {
            currentPopupRef.current = handleMarkerClick({
                e,
                marker,
                popup,
                currentPopupRef,
                activity,
                onMarkerClick,
            });
        });
        markersAndPopups[id] = {marker, popup};
    });
    return markersAndPopups;
};

export default createMarkers;
