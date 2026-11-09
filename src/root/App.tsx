import {FC, useEffect, useState} from "react";
import {
    acceptGA,
    GSUApp,
    GsuBannerCookiesModal,
    hasCookiesConsent,
    isAcceptedCookiesConsent,
    rejectGA,
    setMainHost,
    setStage,
    setupGA,
} from "@gsu-ai/gsu-ui-core";

import mapboxgl from "mapbox-gl";

import router from "../core/routes";

import {setApplicationHost} from "../api/api";

import image500 from "/images/error-content/error500.png";

import "./variables.css";
import "./app.module.css";

import shortLogo from "/images/modals/logo-travel-in-modal-about.svg";

const aboutText =
    "Не знаете, как спланировать идеальное путешествие? " +
    "Откройте Travel AI — умный помощник, который превратит каждую поездку в незабываемое приключение. " +
    "Неважно, вы опытный путешественник или впервые собираете чемодан, Travel AI подстроится под ваши предпочтения, бюджет и время." +
    " Создавайте маршруты, собирайте чемоданы, находите лучшие места и наслаждайтесь путешествиями без лишних хлопот." +
    " С Travel AI мир становится ближе, а отдых — проще и интереснее";

const warningText =
    "Все данные на нашем сервисе созданы искусственным интеллектом, поэтому мы не можем гарантировать результат и не несём ответственности за предложенный контент";

import "@gsu-ai/gsu-ui-core/style";

const App: FC = () => {
    const [openCookiesBanner, setOpenCookiesBanner] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setMainHost(import.meta.env.VITE_MAIN_API_URL);
        setApplicationHost(import.meta.env.VITE_APPLICATION_API_URL);
        setStage(import.meta.env.VITE_MAIN_STAGE);
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

        setupGA();
        if (!hasCookiesConsent()) {
            setOpenCookiesBanner(true);
        } else {
            if (isAcceptedCookiesConsent()) {
                acceptGA();
            } else {
                rejectGA();
            }
        }
        setHydrated(true);
    }, []);

    return (
        <>
            {hydrated && openCookiesBanner && (
                <GsuBannerCookiesModal openModal={openCookiesBanner} setOpenModal={setOpenCookiesBanner} />
            )}
            <GSUApp
                img500src={image500}
                appName={"Travel AI"}
                router={router}
                aboutText={aboutText}
                warningText={warningText}
                shortLogo={shortLogo}
            />
        </>
    );
};

export default App;
