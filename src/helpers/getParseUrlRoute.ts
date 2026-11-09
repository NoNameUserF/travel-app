import {ITravelPoint} from "../api/interfaces";

interface getParseUrlRoute {
    points: ITravelPoint[];
    city?: string | undefined;
    includeCurrentLocation?: boolean;
}

const getParseUrlRoute = ({points, city, includeCurrentLocation = true}: getParseUrlRoute) => {
    const base = "https://www.google.com/maps/dir/";

    const routeParts = [];

    if (includeCurrentLocation) {
        routeParts.push(encodeURIComponent("Current Location").replace(/%20/g, "+"));
    }

    for (const p of points) {
        const fullName = city ? `${p.originalName} ${city}` : p.originalName;
        const encoded = encodeURIComponent(fullName).replace(/%20/g, "+");

        routeParts.push(encoded);
    }

    return base + routeParts.join("/");
};

export default getParseUrlRoute;
