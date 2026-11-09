import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {useEffect} from "react";
import ReactGA from "react-ga4";

import {Head} from "vite-react-ssg";

import {PlaneIcon} from "../../assets/Icons";
import styles from "../../root/app.module.css";

import {
    errorBtnText,
    errorHeader,
    errorMsg,
    textBlockByRequest,
    textBlockDescription,
} from "../../constants/modalsText";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";

import {ItineraryStepTravelPointState} from "../../wizards/ItineraryStep/ItineraryStepTravelPoints";

import TravelStepLoader from "../../components/TravelStepLoader";

import workflow, {ItineraryWizardState} from "./workflow";

const header = "Счастливого пути!";
const msg =
    "Если вам понравились наши места, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const ItineraryPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: ItineraryWizardState, wizardState: IWizardState, error: GsuError) => {
        return (props: IErrorModal<ItineraryWizardState>) =>
            isGsuServerError(error) && error.status === httpResponseCodeList.tooManyRequests ? (
                <GsuDefaultErrorModal
                    header={textBlockByRequest}
                    description={textBlockDescription}
                    btnLabel={errorBtnText}
                    action={props.reset}
                    {...props}
                />
            ) : (
                <GsuDefaultErrorModal
                    header={errorHeader}
                    description={errorMsg}
                    btnLabel={errorBtnText}
                    action={props.reset}
                    {...props}
                />
            );
    };

    const FinishModal = () => {
        return (props: IFinishModal<ItineraryStepTravelPointState>) => (
            <GsuDefaultWizardFinishModal Emoji={PlaneIcon} header={header} msg={msg} btnText={btnText} {...props} />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: ItineraryWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Маршрут — Travel AI</title>
                <meta
                    name="description"
                    content="Хотите идеальный маршрут? Укажите город, бюджет, длительность и активности — Travel AI создаст готовый план по дням с ценами и картой."
                />
                <link rel="canonical" href="https://travel.alivio.ai/itinerary" />

                <meta property="og:title" content="Маршрут — Travel AI" />
                <meta
                    property="og:description"
                    content="ИИ-сервис построит персональный маршрут под ваши интересы, бюджет и длительность поездки. Подробный план по дням с ценами и картой."
                />
                <meta property="og:url" content="https://travel.alivio.ai/itinerary" />

                <meta name="twitter:title" content="Маршрут — Travel AI" />
                <meta
                    name="twitter:description"
                    content="Travel AI создаст персональный маршрут под ваш город, бюджет и интересы. Подробный план по дням с ценами и интерактивной картой."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Маршрут",
                        url: "https://travel.alivio.ai/itinerary",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "ИИ Travel AI строит маршрут под ваши данные и интересы. Укажите город, бюджет, длительность и активности — получите готовый план по дням с ценами и интерактивной картой.",
                        featureList: [
                            "Построение маршрута по интересам и бюджету",
                            "Планирование по дням с ценами",
                            "Интерактивная карта маршрута",
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
                        name: "Маршрут — Travel AI",
                        url: "https://travel.alivio.ai/itinerary",
                        description:
                            "Travel AI построит для вас персональный маршрут с учётом бюджета, длительности и интересов — готовый план по дням с ценами и картой.",
                    })}
                </script>
            </Head>
            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Itinerary"}
                    Loader={GsuSpinner}
                    StepLoader={TravelStepLoader}
                    Footer={GsuWizardFooter}
                    FinishModal={FinishModal}
                    ErrorModal={ErrorModal}
                    styles={{
                        container: wizardContainerStyle,
                        window: wizardWindowStyle,
                        content: wizardContentStyle,
                    }}
                    classes={{
                        container: styles.wizardContainer,
                        window: styles.wizardWindow,
                        content: styles.wizardContent,
                    }}
                />
            </div>
        </>
    );
};

export default ItineraryPage;
