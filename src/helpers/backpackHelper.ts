import {IOptions} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

export const capitalizeFirstLetter = (str: string): string => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getLabelsFromCodes = (codes: string[] | undefined, options: IOptions): string => {
    if (!codes || codes.length === 0) return "Не указано";
    return codes.map((code) => options[code]?.label || code).join(", ");
};

export const getLabelFromCode = (code: string | undefined, options: IOptions): string => {
    if (!code) return "Не указано";
    return options[code]?.label || code;
};

const isNumber = (str: string) => {
    if (str.trim() === "") return false;
    return !isNaN(Number(str));
};

export const getQuantityWithLabel = (quantity: string) => {
    return isNumber(quantity) ? `${quantity} шт` : quantity;
};
