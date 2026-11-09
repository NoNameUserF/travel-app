import {FC} from "react";
import {
    GsuMainPageBlock,
    GsuMainPageBlockContainer,
    GsuMainPageDescription,
    GsuMainPageImages,
} from "@gsu-ai/gsu-ui-core";

const textParts = [
    {
        text: "Наш ИИ-калькулятор",
        highlighted: false,
    },
    {
        text: " рассчитает стоимость отдыха ",
        highlighted: true,
    },
    {
        text: "с учётом транспорта, сезона, уровня комфорта и активностей. Задайте параметры — и сразу увидите расходы по перелётам, жилью, питанию и развлечениям.",
        highlighted: false,
    },
    {
        text: " Планировать ",
        highlighted: false,
    },
    {
        text: "бюджет путешествия ",
        highlighted: true,
    },
    {
        text: "ещё никогда не было так",
        highlighted: false,
    },
    {
        text: " просто",
        highlighted: true,
    },
];

const Calculator: FC = () => {
    const renderTextBlock = () => {
        return <GsuMainPageDescription textParts={textParts} btnText={"РАССЧИТАТЬ РАСХОДЫ "} btnLink={"/calculator"} />;
    };

    const renderImagesBlock = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/block7-image1.jpg"}
                image2Src={"/images/main-page-icons/block7-image2.jpg"}
                image1Alt={"Calculator"}
                image2Alt={"Calculator"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"calculator"} background={"gray"} title={"Калькулятор"}>
            <GsuMainPageBlock
                textBlock={renderTextBlock()}
                imagesBlock={renderImagesBlock()}
                imagesPosition="right"
                btnLink={"/calculator"}
                btnText={"РАССЧИТАТЬ РАСХОДЫ "}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Calculator;
