import mapboxgl from "mapbox-gl";

const seeAllMarkersOnMap = (map: mapboxgl.Map | null, bounds: mapboxgl.LngLatBounds | null) => {
    if (map && bounds) {
        map.fitBounds(bounds, {padding: 50, duration: 0}); // открывает карту по центру между всеми маркерами
        map.setMaxZoom(20); // переопределяем максимальный зум, что бы user мог увеличить карту
    }
};

export default seeAllMarkersOnMap;
