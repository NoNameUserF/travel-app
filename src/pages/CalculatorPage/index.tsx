import {GsuError, IErrorModal, IFinishModal, IWizardState} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC, useEffect} from "react";

import ReactGA from "react-ga4";
import {
    GsuDefaultErrorModal,
    GsuDefaultWizardFinishModal,
    GsuSpinner,
    GsuWizard,
    GsuWizardFooter,
    isGsuServerError,
} from "@gsu-ai/gsu-ui-core";

import {Head} from "vite-react-ssg";

import styles from "../../root/app.module.css";
import httpResponseCodeList from "../../helpers/httpResponseCodeList";
import {
    errorBtnText,
    errorHeader,
    errorMsg,
    textBlockByRequest,
    textBlockDescription,
} from "../../constants/modalsText";
import {CalculatorIcon} from "../../assets/Icons";

import {CalculatorResultsState} from "../../wizards/CalculatorStep/CalculatorResults";

import TravelStepLoader from "../../components/TravelStepLoader";

import workflow, {CalculatorWizardState} from "./workflow";

const header = "Хорошего отдыха!";
const msg =
    "Если расчёт бюджета не подвёл, вы можете поддержать наш проект пожертвованием или поделиться своим отзывом, чтобы помочь нам стать ещё лучше.";
const btnText = "Назад к описанию";

const CalculatorPage: FC = () => {
    useEffect(() => {
        ReactGA.send({hitType: "pageview", page: location.pathname});
    }, []);

    const ErrorModal = (componentState: CalculatorWizardState, wizardState: IWizardState, error: GsuError) => {
        return (props: IErrorModal<CalculatorWizardState>) =>
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
        return (props: IFinishModal<CalculatorResultsState>) => (
            <GsuDefaultWizardFinishModal
                Emoji={CalculatorIcon}
                header={header}
                msg={msg}
                btnText={btnText}
                {...props}
            />
        );
    };

    const wizardContainerStyle = () => {
        return {};
    };

    const wizardWindowStyle = () => {
        return {};
    };

    const wizardContentStyle = (componentState: CalculatorWizardState, wizardState: IWizardState) => {
        return wizardState._loader ? {paddingTop: "0"} : {};
    };

    return (
        <>
            <Head>
                <title>Калькулятор — Travel AI</title>
                <meta
                    name="description"
                    content="Рассчитайте бюджет путешествия с помощью ИИ. Учтите транспорт, сезон, уровень комфорта и активности — и получите расходы по перелётам, жилью, питанию и развлечениям."
                />
                <link rel="canonical" href="https://travel.alivio.ai/calculator" />

                <meta property="og:title" content="Калькулятор — Travel AI" />
                <meta
                    property="og:description"
                    content="ИИ-калькулятор рассчитает стоимость отдыха с учётом сезона, транспорта, уровня комфорта и активностей. Получите точную оценку бюджета за секунды."
                />
                <meta property="og:url" content="https://travel.alivio.ai/calculator" />

                <meta name="twitter:title" content="Калькулятор — Travel AI" />
                <meta
                    name="twitter:description"
                    content="Планируйте бюджет поездки легко: Travel AI рассчитает расходы на транспорт, жильё, питание и развлечения с учётом ваших параметров."
                />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        name: "Travel AI — Калькулятор",
                        url: "https://travel.alivio.ai/calculator",
                        applicationCategory: "TravelApplication",
                        operatingSystem: "Web",
                        inLanguage: "ru-RU",
                        description:
                            "ИИ-калькулятор Travel AI рассчитывает бюджет отдыха по вашим данным: транспорт, сезон, комфорт и активности. Показывает расходы по категориям — перелёты, жильё, питание и развлечения.",
                        featureList: [
                            "Расчёт бюджета путешествия",
                            "Учёт транспорта, сезона и уровня комфорта",
                            "Детализация расходов по категориям",
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
                        name: "Калькулятор — Travel AI",
                        url: "https://travel.alivio.ai/calculator",
                        description:
                            "Планируйте бюджет своей поездки — Travel AI рассчитает расходы на транспорт, жильё, питание и развлечения по заданным параметрам.",
                    })}
                </script>
            </Head>

            <div className={styles.wizardPageContainer}>
                <GsuWizard
                    workflow={workflow}
                    id={"Calculator"}
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

export default CalculatorPage;
