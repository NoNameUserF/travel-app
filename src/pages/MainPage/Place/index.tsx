import {FC} from "react";

import {GsuMainPageBlock, GsuMainPageBlockContainer, GsuMainPageImages, GsuMainPageSteps} from "@gsu-ai/gsu-ui-core";

import {Block3Route, Block3Sparkl, Block3Tickets} from "../../../assets/Icons";

const steps = [
    {
        Icon: Block3Tickets,
        title: "Укажите предпочтения:",
        description: " город вылета, даты, транспорт, бюджет, активности и интересы",
    },
    {
        Icon: Block3Route,
        title: "Получите подборку направлений:",
        description: " ИИ предложит 4 города с кратким описанием и причинами выбора",
    },
    {
        Icon: Block3Sparkl,
        title: "Выберите и узнайте:",
        description: " всё о городе — визы, безопасность, погода, культурные особенности и советы для поездки",
    },
];

const description =
    "Не знаете, куда отправиться в путешествие? Наша платформа подберёт для вас лучшие направления под ваши данные, интересы и бюджет — без лишних хлопот";

const Place: FC = () => {
    const renderSteps = () => {
        return <GsuMainPageSteps steps={steps} btnText={"НАЙТИ НАПРАВЛЕНИЕ"} btnLink={"/place"} />;
    };

    const renderImages = () => {
        return (
            <GsuMainPageImages
                image1Src={"/images/main-page-icons/block3-image1.jpg"}
                image2Src={"/images/main-page-icons/block3-image2.jpg"}
                image1Alt={"Place"}
                image2Alt={"Place"}
            />
        );
    };

    return (
        <GsuMainPageBlockContainer id={"place"} background={"primary"} description={description} title={"Места"}>
            <GsuMainPageBlock
                imagesPosition={"right"}
                textBlock={renderSteps()}
                imagesBlock={renderImages()}
                btnText={"НАЙТИ НАПРАВЛЕНИЕ"}
                btnLink={"/place"}
                type={"steps"}
            />
        </GsuMainPageBlockContainer>
    );
};

export default Place;
