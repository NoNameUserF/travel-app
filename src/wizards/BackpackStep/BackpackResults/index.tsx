import {FC, useState} from "react";
import {IGsuInfoContainerCell, IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuInfoContainer, GsuWizardResultPage} from "@gsu-ai/gsu-ui-core";

import {BackpackBasicInfoState} from "../BackpackBasicInfo";

import {getBackpackActionsInfo} from "../../../helpers/actionsBuilder";

import {IBackpack, IBagsItem} from "../../../api/interfaces";

import {capitalizeFirstLetter, getQuantityWithLabel} from "../../../helpers/backpackHelper";

import CalculatorResultHeader from "../../CalculatorStep/CalculatorResults/CalculatorResultHeader";

import styles from "./index.module.css";

export interface BackpackResultsState {
    backpack: IBackpack | null;
}

const tabs: IOptions = {
    ADULTS: {
        label: "Взрослые",
    },
    CHILDREN: {
        label: "Дети",
    },
};

export const BackpackResults: FC<IWizardStep<BackpackResultsState>> = ({componentState, refresh, wizardState}) => {
    const [currentTab, setCurrentTab] = useState<string>("ADULTS");
    const {backpack} = componentState;
    const adultsBags = backpack?.adults;
    const childrenBags = backpack?.children;

    const BACKPACKFIRSTSTEP = wizardState.BACKPACKBASICINFO as BackpackBasicInfoState;

    const showTabs: boolean = adultsBags !== undefined && childrenBags !== undefined;
    const itemsToDisplay = showTabs
        ? currentTab === "CHILDREN"
            ? childrenBags
            : adultsBags
        : adultsBags
          ? adultsBags
          : childrenBags;
    const actionInfo = getBackpackActionsInfo(backpack, BACKPACKFIRSTSTEP);
    const infoCells: IGsuInfoContainerCell[] = (itemsToDisplay ?? []).map((item: IBagsItem) => ({
        key: capitalizeFirstLetter(item.name),
        value: getQuantityWithLabel(item.quantity),
    }));
    const saveFileName = BACKPACKFIRSTSTEP.city
        ? `Список_вещей_${BACKPACKFIRSTSTEP.city.label.replace(/[,\s]+/g, "_")}`
        : "";

    return (
        <GsuWizardResultPage title="Список вещей" refresh={refresh}>
            <div className={styles.pageContainer}>
                <CalculatorResultHeader
                    showTabs={showTabs}
                    tabs={tabs}
                    currentTab={currentTab}
                    changeTab={setCurrentTab}
                    actionInfo={actionInfo}
                    saveFileName={saveFileName}
                />
                <GsuInfoContainer cells={infoCells} type={"column-separated"} />
            </div>
        </GsuWizardResultPage>
    );
};

export default BackpackResults;
