import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {FC, useEffect} from "react";
import ReactGA from "react-ga4";
import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {Head} from "vite-react-ssg";

import {LuggageEmoji} from "../../assets/Icons";
import styles from "../../root/app.module.css";
import {
    errorBtnText,
    errorHeader,
    errorMsg,
    textBlockByRequest,
    textBlockDescription,
} from "../../constants/modalsText";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";

import {BackpackResultsState} from "../../wizards/BackpackStep/BackpackResults";

import TravelStepLoader from "../../components/TravelStepLoader";

import workflow, {BackpackWizardState} from "./workflow";

const header = "Счастливого пути!";
const msg =
    "Если наш сервис пришёлся вам по душе, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше.";
const btnText = "Назад к списку";

const BackpackPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: BackpackWizardState, wizardState: IWizardState, error: GsuError) => {
        return (props: IErrorModal<BackpackWizardState>) =>
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
        return (props: IFinishModal<BackpackResultsState>) => (
            <GsuDefaultWizardFinishModal Emoji={LuggageEmoji} header={header} msg={msg} btnText={btnText} {...props} />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: BackpackWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Багаж — Travel AI</title>
                <meta
                    name="description"
                    content="Не знаете, что взять в поездку? Укажите город, длительность и активности — Travel AI соберёт персональный список вещей под ваш маршрут и стиль отдыха."
                />
                <link rel="canonical" href="https://travel.alivio.ai/luggage" />

                <meta property="og:title" content="Багаж — Travel AI" />
                <meta
                    property="og:description"
                    content="ИИ-сервис соберёт список вещей для поездки под ваш маршрут и стиль отдыха. Больше никаких забытых мелочей и лишних вещей."
                />
                <meta property="og:url" content="https://travel.alivio.ai/luggage" />

                <meta name="twitter:title" content="Багаж — Travel AI" />
                <meta
                    name="twitter:description"
                    content="Travel AI подскажет, что взять с собой в поездку. Персональный список вещей под ваш маршрут, длительность и активности."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Багаж",
                        url: "https://travel.alivio.ai/luggage",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "ИИ Travel AI формирует персональный список вещей под ваш маршрут, длительность поездки, багаж и активный стиль отдыха — без забытых мелочей.",
                        featureList: [
                            "Персональный список вещей",
                            "Учёт маршрута, длительности и активностей",
                            "Советы по упаковке и комфорту в поездке",
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
                        name: "Багаж — Travel AI",
                        url: "https://travel.alivio.ai/luggage",
                        description:
                            "Travel AI поможет собрать багаж под ваш маршрут и стиль отдыха — быстро, удобно и без забытых вещей.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Backpack"}
                    Loader={GsuSpinner}
                    StepLoader={TravelStepLoader}
                    Footer={GsuWizardFooter}
                    ErrorModal={ErrorModal}
                    FinishModal={FinishModal}
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

export default BackpackPage;
