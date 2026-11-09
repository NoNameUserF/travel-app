import {FC} from "react";

import {NavBarIconProps} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import styles from "../index.module.css";

const RouteIcon: FC<NavBarIconProps> = ({active}) => {
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
                d="M5 18.334C6.38071 18.334 7.5 17.2147 7.5 15.834C7.5 14.4533 6.38071 13.334 5 13.334C3.61929 13.334 2.5 14.4533 2.5 15.834C2.5 17.2147 3.61929 18.334 5 18.334Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.5 15.8327H14.5833C15.3569 15.8327 16.0987 15.5254 16.6457 14.9784C17.1927 14.4314 17.5 13.6896 17.5 12.916C17.5 12.1425 17.1927 11.4006 16.6457 10.8536C16.0987 10.3066 15.3569 9.99935 14.5833 9.99935H5.41667C4.64312 9.99935 3.90125 9.69206 3.35427 9.14508C2.80729 8.5981 2.5 7.85623 2.5 7.08268C2.5 6.30913 2.80729 5.56727 3.35427 5.02029C3.90125 4.47331 4.64312 4.16602 5.41667 4.16602H12.5"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 6.66602C16.3807 6.66602 17.5 5.54673 17.5 4.16602C17.5 2.7853 16.3807 1.66602 15 1.66602C13.6193 1.66602 12.5 2.7853 12.5 4.16602C12.5 5.54673 13.6193 6.66602 15 6.66602Z"
                stroke="#8F897F"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default RouteIcon;
