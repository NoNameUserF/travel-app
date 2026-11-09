import {FC} from "react";

import {GsuMainPageMainBlock} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

const mainPageAnchors = [
    {label: "Места", anchor: "#place"},
    {label: "Калькулятор", anchor: "#calculator"},
    {label: "Подготовка", anchor: "#preparing"},
    {label: "Багаж", anchor: "#backpack"},
    {label: "Маршрут", anchor: "#itinerary"},
];

const MainBlock: FC = () => {
    return (
        <GsuMainPageMainBlock
            mainPageAnchors={mainPageAnchors}
            appName={"Travel AI"}
            appNameGradientClass={styles.gradientMain}
            title={"ваш отдых — наш план"}
            description={"Поделитесь деталями своей поездки — и мы превратим их в идеальный маршрут для вас"}
            btnName={"ПРИСТУПИТЬ"}
            btnLink={"/place"}
            imgSrc={"/images/main-page-icons/head-section-bg.webp"}
        />
    );
};

export default MainBlock;
