import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Не знаете, что взять? ИИ-сервис соберёт",
        highlighted: false,
    },
    {
        text: " список вещей ",
        highlighted: true,
    },
    {
        text: "под ваш маршрут и стиль отдыха — без лишних списков и забытых мелочей. Укажите город, длительность, багаж и активности — и получите",
        highlighted: false,
    },
    {
        text: " готовый список ",
        highlighted: true,
    },
    {
        text: "именно",
        highlighted: false,
    },
    {
        text: " для вас",
        highlighted: true,
    },
    {
        text: ". Собираться в дорогу ещё никогда не было так просто",
        highlighted: false,
    },
];

const Backpack: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"УПАКОВАТЬ БАГАЖ"} btnLink={"/luggage"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/block4-image1.jpg"}
                image2Src={"/images/main-page-icons/block4-image2.jpg"}
                image1Alt={"Backpack"}
                image2Alt={"Backpack"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"backpack"} title={"Багаж"} background={"gray"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="left"
                btnLink={"/luggage"}
                btnText={"УПАКОВАТЬ БАГАЖ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Backpack;
