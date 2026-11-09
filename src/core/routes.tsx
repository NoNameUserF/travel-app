import {IRoute} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {prepareSSGRouter} from "@gsu-ai/gsu-ui-core";

import HomeIcon from "../assets/CustomizeSvg/NavBar/HomeIcon";
import MapIcon from "../assets/CustomizeSvg/NavBar/MapIcon";
import CustomLuggageIcon from "../assets/CustomizeSvg/NavBar/LuggageIcon";
import RouteIcon from "../assets/CustomizeSvg/NavBar/RouteIcon";
import CustomCalculatorIcon from "../assets/CustomizeSvg/NavBar/CalculatorIcon";

import App from "../root/App";

import image404 from "/images/error-content/image-404.png";

import PreparingIcon from "../assets/CustomizeSvg/NavBar/PreparingPlace";

import type {RouteRecord} from "vite-react-ssg";

const routes: IRoute[] = [
    {
        path: "/",
        name: "Главная",
        icon: HomeIcon,
        importer: () => import("../pages/MainPage"),
    },
    {
        path: "/place",
        name: "Места",
        icon: MapIcon,
        importer: () => import("../pages/PlacePage"),
    },
    {
        path: "/calculator",
        name: "Калькулятор",
        icon: CustomCalculatorIcon,
        importer: () => import("../pages/CalculatorPage"),
    },
    {
        path: "/preparing",
        name: "Подготовка",
        icon: PreparingIcon,
        importer: () => import("../pages/PreparingPage"),
    },
    {
        path: "/luggage",
        name: "Багаж",
        icon: CustomLuggageIcon,
        importer: () => import("../pages/BackpackPage"),
    },
    {
        path: "/itinerary",
        name: "Маршрут",
        icon: RouteIcon,
        importer: () => import("../pages/ItineraryPage"),
    },
];

export const ssgRouter: RouteRecord[] = [
    {
        path: "/",
        element: <App />,
        entry: "src/root/App.tsx",
        children: [...prepareSSGRouter(routes, image404)],
    },
];

export default routes;
