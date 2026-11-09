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

import {PlaceDetailsStepState} from "../../wizards/DetailsStep";

import TravelStepLoader from "../../components/TravelStepLoader";

import workflow, {PlaceWizardState} from "./workflow";

const header = "Счастливого пути!";
const msg =
    "Если вам понравились наши места, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше";
const btnText = "Назад к описанию";

const PlacePage = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: PlaceWizardState, wizardState: IWizardState, error: GsuError) => {
        return (props: IErrorModal<PlaceWizardState>) =>
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
        return (props: IFinishModal<PlaceDetailsStepState>) => (
            <GsuDefaultWizardFinishModal Emoji={PlaneIcon} header={header} msg={msg} btnText={btnText} {...props} />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: PlaceWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };
    return (
        <>
            <Head>
                <title>Места — Travel AI</title>
                <meta
                    name="description"
                    content="Не знаете, куда отправиться в путешествие? Укажите город вылета, даты, бюджет и интересы — Travel AI подберёт лучшие направления с описанием, погодой и советами."
                />
                <link rel="canonical" href="https://travel.alivio.ai/place" />

                <meta property="og:title" content="Места — Travel AI" />
                <meta
                    property="og:description"
                    content="ИИ подберёт направления под ваши предпочтения: город вылета, даты, транспорт, бюджет и интересы. Получите 4 подходящих города с описанием и советами."
                />
                <meta property="og:url" content="https://travel.alivio.ai/place" />

                <meta name="twitter:title" content="Места — Travel AI" />
                <meta
                    name="twitter:description"
                    content="Travel AI поможет выбрать, куда поехать. Укажите параметры поездки — и получите лучшие направления с визовой, погодной и культурной информацией."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Места",
                        url: "https://travel.alivio.ai/place",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "ИИ подбирает направления под ваши данные: город вылета, даты, транспорт, бюджет и интересы. Для каждого города — визы, безопасность, погода и советы для поездки.",
                        featureList: [
                            "Подбор направлений под параметры пользователя",
                            "Краткие описания городов и причины выбора",
                            "Информация о визах, погоде, культуре и безопасности",
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
                        name: "Места — Travel AI",
                        url: "https://travel.alivio.ai/place",
                        description:
                            "Найдите лучшие направления под ваш бюджет, интересы и даты вылета. Travel AI подберёт города и предоставит всю нужную информацию для поездки.",
                    })}
                </script>
            </Head>
            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Place"}
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

export default PlacePage;
