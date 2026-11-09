import {GsuActionsBlock, GsuPagination, GsuWizardResultPage} from "@gsu-ai/gsu-ui-core";

import {FC, useState} from "react";
import {IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {PlaceFirstStepState} from "../PlaceStep/PlaceBasicInfo";
import {IPlaceList} from "../PlaceStep/PlaceCardList";

import {IPlaceDetails} from "../../api/interfaces";

import {PreparingFirstStepState} from "../PreparingStep/PlaceBasicInfo";

import {getPlaceActionInfo, getPreparingPlaceInfo} from "../../helpers/actionsPlace";

import PlaceCardGeneral from "./PlaceCardGeneral";

import PlaceCardDetails from "./PlaceCardDetails";
import PlaceDetailsHeader from "./PlaceDetails/PlaceDetailsHeader";
import PlaceCardInfo from "./PlaceCardInfo";
import styles from "./PlaceDetails/PlaceDetailsHeader/index.module.css";

export interface PlaceDetailsStepState {
    details: IPlaceDetails | null;
}

export const DetailStep: FC<IWizardStep<PlaceDetailsStepState>> = ({componentState, refresh, wizardState}) => {
    const [currentTab, setCurrentTab] = useState<string>("DESCRIPTION");
    const placeDetail = componentState.details;
    const PLACEFIRSTSTEP = wizardState.PLACEFIRSTSTEP ? (wizardState.PLACEFIRSTSTEP as PlaceFirstStepState) : null;
    const PLACEFIFTHSTEP = wizardState.PLACEFIFTHSTEP ? (wizardState.PLACEFIFTHSTEP as IPlaceList) : null;
    const PREPARINGFIRSTSTEP = wizardState.PREPARINGFIRSTSTEP
        ? (wizardState.PREPARINGFIRSTSTEP as PreparingFirstStepState)
        : null;

    let cardPreparingInfo = null;
    let preparingData = null;
    const selectedPlace = PLACEFIFTHSTEP ? PLACEFIFTHSTEP.selectedPlace : null;
    const placeActionInfo = selectedPlace
        ? getPlaceActionInfo(selectedPlace, PLACEFIRSTSTEP!, placeDetail)
        : getPreparingPlaceInfo(PREPARINGFIRSTSTEP!, placeDetail);

    if (wizardState._id == "Preparing") {
        cardPreparingInfo = {
            location: {
                cityName: PREPARINGFIRSTSTEP!.location!.city,
                countryName: PREPARINGFIRSTSTEP!.location!.countryName,
            },
        };

        preparingData = {
            cityName: PREPARINGFIRSTSTEP!.location!.city,
            currencyCode: PREPARINGFIRSTSTEP!.currencyCode,
            citizenship: PREPARINGFIRSTSTEP!.citizenship,
            startCountry: PREPARINGFIRSTSTEP!.startCountry,
        };
    }

    const shareFileName = PLACEFIFTHSTEP
        ? `${selectedPlace?.location.cityName}_${selectedPlace?.location.countryName}`
        : `${cardPreparingInfo!.location.cityName}_${cardPreparingInfo!.location.countryName}`;

    const isBasicInfo = placeDetail?.cityCommonInfo && Object.entries(placeDetail?.cityCommonInfo).filter(
        ([_, value]) => value !== undefined
    );

    const tabs: IOptions = {
        DESCRIPTION: {
            label: "Описание",
        },
        ...((
          (isBasicInfo && isBasicInfo.length > 1) ||
          (selectedPlace?.wikiInfo?.wikiUrl && isBasicInfo && isBasicInfo.length > 0)
        ) && {
          INFORMATION: {
            label: "Общая информация",
          },
        }),
        DATA: {
            label: "Данные",
        },
    };
    const resultPageTitle: string = selectedPlace
        ? `${selectedPlace?.location.countryName}, ${selectedPlace?.location.cityName}`
        : "Информация о поездке";

    return (
        <GsuWizardResultPage refresh={refresh} title={resultPageTitle}>
            <div className={styles.headerActions}>
                <GsuPagination options={tabs} activeKey={currentTab} changeKey={setCurrentTab} />
                <GsuActionsBlock
                    copy={placeActionInfo}
                    save={placeActionInfo}
                    share={placeActionInfo}
                    saveFileName={shareFileName}
                />
            </div>
            {selectedPlace && (
                <PlaceDetailsHeader
                    place={selectedPlace}
                    placeActionInfo={placeActionInfo}
                    tabs={tabs}
                    currentTab={currentTab}
                    changeTab={setCurrentTab}
                    showInfo={currentTab === "DESCRIPTION"}
                />
            )}
            {currentTab === "DESCRIPTION" && (
                <PlaceCardDetails
                    cardPreparingInfo={cardPreparingInfo}
                    card={selectedPlace}
                    placeInfoList={placeDetail?.placeInfoList}
                />
            )}
            {(currentTab === "INFORMATION" && (isBasicInfo && isBasicInfo?.length > 1 || selectedPlace?.wikiInfo?.wikiUrl && isBasicInfo && isBasicInfo?.length > 0)) && <PlaceCardInfo place={selectedPlace} details={placeDetail} />}
            {currentTab === "DATA" && (
                <PlaceCardGeneral
                    place={selectedPlace}
                    preparingData={preparingData}
                    requestState={wizardState.PLACEFIRSTSTEP as PlaceFirstStepState}
                />
            )}
        </GsuWizardResultPage>
    );
};

export default DetailStep;
