import {FC} from "react";
import cn from "classnames/dedupe";

import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {GsuActionsBlock, GsuPagination} from "@gsu-ai/gsu-ui-core";

import styles from "./index.module.css";

interface ICalculatorResultHeaderProps {
    showTabs: boolean;
    tabs: IOptions;
    currentTab: string;
    changeTab: (value: string) => void;
    actionInfo: string;
    saveFileName?: string;
}

const CalculatorResultHeader: FC<ICalculatorResultHeaderProps> = ({
    showTabs,
    tabs,
    currentTab,
    changeTab,
    actionInfo,
    saveFileName,
}) => {
    return (
        <div
            className={cn(styles.headerActions, {
                [styles.noTabs]: !showTabs,
            })}
        >
            {showTabs && <GsuPagination options={tabs} activeKey={currentTab} changeKey={changeTab} />}
            <GsuActionsBlock
                copy={actionInfo}
                save={actionInfo}
                share={actionInfo}
                saveFileName={saveFileName || "Luggage"}
            />
        </div>
    );
};

export default CalculatorResultHeader;
