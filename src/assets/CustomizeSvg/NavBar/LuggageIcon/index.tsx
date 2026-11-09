import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const CustomLuggageIcon: FC<NavBarIconProps> = ({active}) => {
    return (
        <svg
            className={active ? styles.active : styles.default}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5.00016 16.6666C4.55814 16.6666 4.13421 16.491 3.82165 16.1785C3.50909 15.8659 3.3335 15.442 3.3335 14.9999V6.66661C3.3335 6.22458 3.50909 5.80065 3.82165 5.48809C4.13421 5.17553 4.55814 4.99994 5.00016 4.99994H15.0002C15.4422 4.99994 15.8661 5.17553 16.1787 5.48809C16.4912 5.80065 16.6668 6.22458 16.6668 6.66661V14.9999C16.6668 15.442 16.4912 15.8659 16.1787 16.1785C15.8661 16.491 15.4422 16.6666 15.0002 16.6666"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66675 14.9999V3.33323C6.66675 2.8912 6.84234 2.46728 7.1549 2.15472C7.46746 1.84216 7.89139 1.66656 8.33341 1.66656H11.6667C12.1088 1.66656 12.5327 1.84216 12.8453 2.15472C13.1578 2.46728 13.3334 2.8912 13.3334 3.33323V14.9999"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.3335 16.6666H11.6668"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M13.3334 18.3333C14.2539 18.3333 15.0001 17.5871 15.0001 16.6666C15.0001 15.7461 14.2539 14.9999 13.3334 14.9999C12.4129 14.9999 11.6667 15.7461 11.6667 16.6666C11.6667 17.5871 12.4129 18.3333 13.3334 18.3333Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.66691 18.3333C7.58739 18.3333 8.33358 17.5871 8.33358 16.6666C8.33358 15.7461 7.58739 14.9999 6.66691 14.9999C5.74644 14.9999 5.00024 15.7461 5.00024 16.6666C5.00024 17.5871 5.74644 18.3333 6.66691 18.3333Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default CustomLuggageIcon;
