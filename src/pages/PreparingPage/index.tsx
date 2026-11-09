import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {useEffect} from "react";
import ReactGA from "react-ga4";

import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

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

import TravelStepLoader from "../../components/TravelStepLoader";

import workflow, {PreparingWizardState} from "./workflow";

const header = "Счастливого пути!";
const msg =
    "Если вам понравились наши места, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const PreparingPage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: PreparingWizardState, wizardState: IWizardState, error: GsuError) => {
        return (props: IErrorModal<PreparingWizardState>) =>
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
        return (props: IFinishModal<PreparingWizardState>) => (
            <GsuDefaultWizardFinishModal Emoji={PlaneIcon} header={header} msg={msg} btnText={btnText} {...props} />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: PreparingWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };
    return (
        <>
            <Head>
                <title>Подготовка к поездке — Travel AI</title>
                <meta
                    name="description"
                    content="Укажите город, гражданство и страну выезда — и Travel AI подготовит всё необходимое для поездки: документы, безопасность, погоду, валюту и советы."
                />
                <link rel="canonical" href="https://travel.alivio.ai/preparing" />

                <meta property="og:title" content="Подготовка к поездке — Travel AI" />
                <meta
                    property="og:description"
                    content="ИИ поможет подготовиться к поездке: документы, безопасность, погода, валюта и полезные советы — всё в одном месте."
                />
                <meta property="og:url" content="https://travel.alivio.ai/preparing" />

                <meta name="twitter:title" content="Подготовка к поездке — Travel AI" />
                <meta
                    name="twitter:description"
                    content="Travel AI соберёт всё нужное для вашей поездки — документы, погоду, безопасность и советы, исходя из города и страны выезда."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Подготовка к поездке",
                        url: "https://travel.alivio.ai/preparing",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "Сервис Travel AI упростит подготовку к поездке: введите город, гражданство и страну выезда, и получите всё необходимое — документы, безопасность, погоду, валюту и советы.",
                        featureList: [
                            "Подбор документов и визовых требований",
                            "Советы по безопасности и климату",
                            "Информация о валюте и погоде",
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
                        name: "Подготовка к поездке — Travel AI",
                        url: "https://travel.alivio.ai/preparing",
                        description:
                            "Введите данные о поездке, и Travel AI предоставит список документов, погоду, советы и важную информацию для путешествия.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Preparing"}
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

export default PreparingPage;
