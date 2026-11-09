import {GsuMainPage} from "@gsu-ai/gsu-ui-core";
import ReactGA from "react-ga4";
import {FC, useEffect} from "react";

import {Head} from "vite-react-ssg";

import MainBlock from "./MainBlock";
import Preferences from "./Preferences";
import Place from "./Place";
import Backpack from "./Backpack";
import Itinerary from "./Itinerary";
import Preparing from "./Preparing";
import Calculator from "./Calculator";

const MainPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);
    return (
        <>
            <Head>
                <title>Travel AI — ваш отдых — наш план</title>
                <meta
                    name="description"
                    content="Поделитесь деталями своей поездки — и Travel AI превратит их в идеальный маршрут. Места, калькулятор, подготовка, багаж и маршрут — всё под ваши интересы и бюджет."
                />
                <link rel="canonical" href="https://travel.alivio.ai/" />

                <meta property="og:title" content="Travel AI — ваш отдых — наш план" />
                <meta
                    property="og:description"
                    content="ИИ подберёт направления, рассчитает бюджет и соберёт маршрут под ваши предпочтения. Планирование поездки — быстро, интуитивно и персонально."
                />
                <meta property="og:url" content="https://travel.alivio.ai/" />

                <meta name="twitter:title" content="Travel AI — ваш отдых — наш план" />
                <meta
                    name="twitter:description"
                    content="Поделитесь деталями поездки — и Travel AI создаст идеальный маршрут. Места, калькулятор, подготовка, багаж и план по дням — всё под вас."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Главная",
                        url: "https://travel.alivio.ai/",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Travel AI — ИИ-сервис для подбора направлений, расчёта бюджета, подготовки к поездке и построения маршрутов. Места, калькулятор, багаж и план — всё под ваши интересы и бюджет.",
                        featureList: [
                            "Подбор направлений",
                            "Калькулятор путешествий",
                            "Подготовка к поездке",
                            "Сбор багажа",
                            "Маршрут по дням",
                        ],
                        creator: {
                            "@type": "Organization",
                            name: "Alivio.ai",
                            url: "https://alivio.ai",
                        },
                    })}
                </script>

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        name: "Travel AI — ваш отдых — наш план",
                        url: "https://travel.alivio.ai/",
                        description:
                            "Лендинг Travel AI: вдохновляюще, мгновенно, интуитивно и персонально. Разделы: Места, Калькулятор, Подготовка, Багаж, Маршрут.",
                        hasPart: [
                            {
                                "@type": "WebPage",
                                name: "Места",
                                url: "https://travel.alivio.ai/place",
                            },
                            {
                                "@type": "WebPage",
                                name: "Калькулятор",
                                url: "https://travel.alivio.ai/calculator",
                            },
                            {
                                "@type": "WebPage",
                                name: "Подготовка к поездке",
                                url: "https://travel.alivio.ai/preparing",
                            },
                            {
                                "@type": "WebPage",
                                name: "Багаж",
                                url: "https://travel.alivio.ai/luggage",
                            },
                            {
                                "@type": "WebPage",
                                name: "Маршрут",
                                url: "https://travel.alivio.ai/itinerary",
                            },
                        ],
                    })}
                </script>
            </Head>

            <GsuMainPage>
                <MainBlock />
                <Preferences />
                <Place />
                <Calculator />
                <Preparing />
                <Backpack />
                <Itinerary />
            </GsuMainPage>
        </>
    );
};

export default MainPage;
