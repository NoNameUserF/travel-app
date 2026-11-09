import mapboxgl from "mapbox-gl";

const updateMapBounds = (coordinates: {latitude: number; longitude: number}[]): mapboxgl.LngLatBounds | null => {
    if (coordinates.length === 0) return null;

    const bounds = new mapboxgl.LngLatBounds(
        [coordinates[0].longitude, coordinates[0].latitude],
        [coordinates[1].longitude, coordinates[1].latitude],
    );
    coordinates.forEach((item) => {
        bounds.extend([item.longitude, item.latitude]);
    });

    return bounds;
};

export default updateMapBounds;
