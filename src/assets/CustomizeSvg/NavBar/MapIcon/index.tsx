import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const MapIcon: FC<NavBarIconProps> = ({active}) => {
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
                d="M16.6666 8.33335C16.6666 12.4942 12.0508 16.8275 10.5008 18.1659C10.3564 18.2744 10.1806 18.3331 9.99992 18.3331C9.81925 18.3331 9.64348 18.2744 9.49909 18.1659C7.94909 16.8275 3.33325 12.4942 3.33325 8.33335C3.33325 6.56524 4.03563 4.86955 5.28587 3.61931C6.53612 2.36907 8.23181 1.66669 9.99992 1.66669C11.768 1.66669 13.4637 2.36907 14.714 3.61931C15.9642 4.86955 16.6666 6.56524 16.6666 8.33335Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10 10.8334C11.3807 10.8334 12.5 9.71409 12.5 8.33337C12.5 6.95266 11.3807 5.83337 10 5.83337C8.61929 5.83337 7.5 6.95266 7.5 8.33337C7.5 9.71409 8.61929 10.8334 10 10.8334Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MapIcon;
