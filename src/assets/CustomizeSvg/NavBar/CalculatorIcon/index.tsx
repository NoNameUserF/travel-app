import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";
import {FC} from "react";

import styles from "../index.module.css";

const CustomCalculatorIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={active ? styles.active : styles.default}>
            <path
                d="M14.9987 1.66699H4.9987C4.07822 1.66699 3.33203 2.41318 3.33203 3.33366V16.667C3.33203 17.5875 4.07822 18.3337 4.9987 18.3337H14.9987C15.9192 18.3337 16.6654 17.5875 16.6654 16.667V3.33366C16.6654 2.41318 15.9192 1.66699 14.9987 1.66699Z"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66797 5H13.3346"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.332 11.667V15.0003"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.332 8.33301H13.3404"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 8.33301H10.0083"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66797 8.33301H6.6763"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 11.667H10.0083"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66797 11.667H6.6763"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M10 15H10.0083" stroke="#909090" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M6.66797 15H6.6763"
                stroke="#909090"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CustomCalculatorIcon;
