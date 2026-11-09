import mapboxgl from "mapbox-gl";

export const drawMap = (
    mapContainer: HTMLElement | null,
    mapCenter: [number, number],
    mapZoom: number,
    mapLanguage: string,
): mapboxgl.Map | null => {
    if (mapContainer) {
        const map = new mapboxgl.Map({
            container: mapContainer,
            center: mapCenter,
            zoom: mapZoom,
            language: mapLanguage,
        });

        map.setProjection("mercator"); // Делает отображение плоским (вместо глобуса)

        return map;
    }

    return null;
};

export const removeMap = (map: mapboxgl.Map | null) => {
    map?.remove();
};
