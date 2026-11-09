import React, {FC, ReactNode, useEffect, useRef, useState} from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

import {CloseMapIcon} from "../../../assets/Icons";

import {ITravelPoint, ITravelPoints} from "../../../api/interfaces";

import styles from "./index.module.css";
import GsuZoomControl from "./GsuZoomControl/GsuZoomControl";
import {drawMap, removeMap} from "./utils/drawMap";
import "./mapBox.css";
import createOverlayClick from "./utils/handleOverlayClick";
import focusOnMarker from "./utils/focusOnMarker";
import addKeyDownListener from "./utils/addKeyDownListener";
import createMarkers from "./utils/createMarkers";
import handleMapMove from "./utils/handleMapMove";
import updateMapBounds from "./utils/updateMapBounds";
import seeAllMarkersOnMap from "./utils/seeAllMarkersOnMap";
import drawRoute from "./utils/drawRoute";

export interface MapState {
    travelStateActiveDay: ITravelPoints;
    activeElementToggler: boolean;
    setActiveElementToggler: (activeElementToggler: boolean) => void;
    onMarkerClick: (activity: ITravelPoint | null) => void;
    selectedMarker: ITravelPoint | null;
    children?: ReactNode;
}

const ItineraryMap: FC<MapState> = ({
    travelStateActiveDay,
    activeElementToggler,
    setActiveElementToggler,
    onMarkerClick,
    selectedMarker,
    children,
}) => {
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const currentPopupRef = useRef<mapboxgl.Popup | null>(null);
    const boundsRef = useRef<mapboxgl.LngLatBounds | null>(null);
    const isUserEventRef = useRef<boolean>(true);
    const originalViewRef = useRef({
        center: [0, 0] as [number, number],
        zoom: 10,
    });
    const coordinatesRef = useRef(
        travelStateActiveDay.travelPoints.map((point) => ({
            latitude: +point.location.latitude,
            longitude: +point.location.longitude,
        })),
    );
    const handlerZoomIn = () => {
        mapRef.current?.zoomIn();
    };

    const handlerZoomOut = () => {
        mapRef.current?.zoomOut();
    };

    const closeMap = () => {
        setActiveElementToggler(false);
        onMarkerClick(null);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && activeElementToggler) {
            setActiveElementToggler(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        createOverlayClick({
            e,
            styles: {
                wrapperClass: styles.wrapper,
                expandedMapClass: styles.expandedMap,
            },
            activeElementToggler,
            closeMap,
        });
    };

    // Инициализация карты
    useEffect(() => {
        const center = boundsRef.current?.getCenter();

        if (center) {
            originalViewRef.current.center = [center.lng, center.lat];
        }

        mapRef.current = drawMap(
            mapContainerRef.current,
            originalViewRef.current.center,
            originalViewRef.current.zoom,
            "ru",
        );

        mapRef.current?.on("load", () => setMapLoaded(true));

        const interactionHandler = handleMapMove({currentPopupRef, isUserEventRef});

        mapRef.current?.on("movestart", interactionHandler);
        mapRef.current?.on("zoomstart", interactionHandler);

        return () => {
            removeMap(mapRef.current);
            mapRef.current?.off("movestart", interactionHandler);
            mapRef.current?.off("zoomstart", interactionHandler);
        };
    }, []);

    useEffect(() => addKeyDownListener(handleKeyDown), [activeElementToggler]);

    useEffect(() => {
        const map = mapRef.current;
        const points = travelStateActiveDay.travelPoints;

        coordinatesRef.current = travelStateActiveDay.travelPoints.map((point) => ({
            latitude: +point.location.latitude,
            longitude: +point.location.longitude,
        }));

        if (map) {
            const markersAndPopups = createMarkers({
                map,
                coordinatesRef,
                points,
                onMarkerClick,
                currentPopupRef,
                selectedMarker,
            });
            boundsRef.current = updateMapBounds(coordinatesRef.current);

            if (boundsRef.current) {
                seeAllMarkersOnMap(mapRef.current, boundsRef.current);
            }
            focusOnMarker({selectedMarker, map, points, markersAndPopups, currentPopupRef, isUserEventRef});
        }
    }, [travelStateActiveDay.travelPoints, selectedMarker]);

    useEffect(() => {
        if (!mapLoaded) return;

        drawRoute({map: mapRef.current, points: travelStateActiveDay.travelPoints});
    }, [mapLoaded, travelStateActiveDay.travelPoints]);

    return (
        <div className={styles.wrapper} onClick={handleOverlayClick} role="button">
            <div
                ref={mapContainerRef}
                className={styles.expandedMap}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
            >
                {children}

                <GsuZoomControl onClickZoomIn={handlerZoomIn} onClickZoomOut={handlerZoomOut} />

                <button onClick={closeMap} className={styles.expandButton}>
                    <CloseMapIcon />
                </button>
            </div>
        </div>
    );
};

export default ItineraryMap;
