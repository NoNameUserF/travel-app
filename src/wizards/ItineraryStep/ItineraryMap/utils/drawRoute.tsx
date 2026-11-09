import mapboxgl from "mapbox-gl";

import {ITravelPoint} from "../../../../api/interfaces";

interface drawRoutePorps {
    map: mapboxgl.Map | null;
    points: ITravelPoint[];
}

const drawRoute = ({map, points}: drawRoutePorps) => {
    if (!map) return;
    if (!points || points.length < 2) return; // минимум 2 точки для маршрута

    const coords = points.map((p) => `${p.location.longitude},${p.location.latitude}`).join(";");

    const url = `https://api.mapbox.com/directions/v5/mapbox/walking/${coords}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            if (!data.routes || !data.routes.length) return;
            const route = data.routes[0].geometry;

            // Если слой уже есть — обновим
            if (map.getSource("route")) {
                (map.getSource("route") as mapboxgl.GeoJSONSource).setData({
                    type: "Feature",
                    geometry: route,
                    properties: {},
                });
            } else {
                map.addSource("route", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        geometry: route,
                        properties: {},
                    },
                });

                map.addLayer({
                    id: "route-line-dotted",
                    type: "line",
                    source: "route",
                    layout: {
                        "line-join": "round",
                        "line-cap": "round",
                    },
                    paint: {
                        "line-color": "#007AFF",
                        "line-width": 5,
                        "line-dasharray": [0, 2],
                    },
                });
                map.addLayer({
                    id: "route-arrows",
                    type: "symbol",
                    source: "route",
                    layout: {
                        "symbol-placement": "line",
                        "symbol-spacing": 20,
                        "text-field": "▶",
                        "text-size": 14,
                        "text-keep-upright": false,
                        "text-rotation-alignment": "map",
                    },
                    paint: {
                        "text-color": "#007AFF",
                        "text-halo-color": "#fff",
                        "text-halo-width": 1,
                    },
                });
            }
        });
};

export default drawRoute;
