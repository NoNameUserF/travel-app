import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Наш сервис",
        highlighted: false,
    },
    {
        text: " упростит подготовку к поездке. ",
        highlighted: true,
    },
    {
        text: "Достаточно указать город, гражданство и страну выезда — и вы получите всё необходимое: документы, безопасность, погоду, валюту и практичные советы. Вся подготовка —",
        highlighted: false,
    },
    {
        text: " в одном месте",
        highlighted: true,
    },
];

const Preparing: FC = () => {
    const renderTextBlock = () => {
        return (
            <GsuMainPageDescription textParts={textParts} btnText={"ПОДГОТОВИТЬСЯ К ПОЕЗДКЕ"} btnLink={"/preparing"} />
        );
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/block6-image1.jpg"}
                image2Src={"/images/main-page-icons/block6-image2.jpg"}
                image1Alt={"Preparing"}
                image2Alt={"Preparing"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"preparing"} title={"Подготовка"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="left"
                btnLink={"/preparing"}
                btnText={"ПОДГОТОВИТЬСЯ К ПОЕЗДКЕ"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Preparing;
