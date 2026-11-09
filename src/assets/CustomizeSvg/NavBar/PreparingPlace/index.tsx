import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const PreparingIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg
            className={active ? styles.active : styles.default}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M13.8333 4H3" stroke="#909090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M13.8333 9.83398H3"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.66667 15.666H3"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13 14.8327L14.6667 16.4993L18 13.166"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PreparingIcon;
