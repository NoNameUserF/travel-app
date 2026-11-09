import React from "react";

interface createOverlayClickProps {
    e: React.MouseEvent;
    styles: {
        wrapperClass: string;
        expandedMapClass: string;
    };
    activeElementToggler: boolean;
    closeMap: () => void;
}

const createOverlayClick = ({e, styles, activeElementToggler, closeMap}: createOverlayClickProps) => {
    const target = e.target as HTMLElement;
    const isWrapper = target.classList.contains(styles.wrapperClass) && !target.closest(`.${styles.expandedMapClass}`);
    if (isWrapper && activeElementToggler) {
        closeMap();
    }
};
export default createOverlayClick;
