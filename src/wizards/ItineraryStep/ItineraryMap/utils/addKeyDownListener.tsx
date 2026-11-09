const addKeyDownListener = (handler: (e: KeyboardEvent) => void) => {
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
};

export default addKeyDownListener;
