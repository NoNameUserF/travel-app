import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Хотите идеальный план? ИИ-сервис",
        highlighted: false,
    },
    {
        text: " построит маршрут ",
        highlighted: true,
    },
    {
        text: "под ваши данные и интересы — без долгих поисков и лишних хлопот. Укажите город, бюджет, длительность и активности — и получите",
        highlighted: false,
    },
    {
        text: " готовый план по дням ",
        highlighted: true,
    },
    {
        text: "с ценами и удобной картой. Ваш маршрут собирается за секунды",
        highlighted: false,
    },
];

const Itinerary: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"НАЙТИ МАРШРУТ"} btnLink={"/itinerary"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/block5-image1.jpg"}
                image2Src={"/images/main-page-icons/block5-image2.jpg"}
                image1Alt={"Itinerary"}
                image2Alt={"Itinerary"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"itinerary"} title={"Маршрут"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="right"
                btnLink={"/itinerary"}
                btnText={"НАЙТИ МАРШРУТ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Itinerary;
