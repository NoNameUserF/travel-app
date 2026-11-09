import {COUNTRIES} from "@gsu-ai/gsu-ui-core";

import {IPlace, IPlaceDetails, IVisaRequirement} from "../api/interfaces";
import ACTIVITY_LIST from "../constants/activity";
import {TRANSPORT_LIST} from "../constants/transport";
import {PlaceFirstStepState} from "../wizards/PlaceStep/PlaceBasicInfo";
import {PreparingFirstStepState} from "../wizards/PreparingStep/PlaceBasicInfo";

export const getPlaceActionInfo = (
    selectedPlace: IPlace | null,
    PLACEFIRSTSTEP: PlaceFirstStepState,
    placeDetail: IPlaceDetails | null,
): string => {
    if (!selectedPlace || !placeDetail) return "";

    const activityStr = PLACEFIRSTSTEP.activities.map((key) => ACTIVITY_LIST[key]?.label ?? key).join(", ");

    const transportStr = PLACEFIRSTSTEP.transport.map((key) => TRANSPORT_LIST[key]?.label ?? key).join(", ");

    const visa = (visa: IVisaRequirement): string => {
        switch (visa?.type) {
            case "ETA":
                return "Электронное разрешение на поездку";
            case "E_VISA":
                return "Цифровое разрешение на въезд в страну";
            case "VISA_FREE":
                return "Безвизовый режим";
            case "NO_ADMISSION":
                return "Виза без допуска";
            case "VISA_ON_ARRIVAL":
                return "Виза по прибытии";
            case "VISA_REQUIRED":
                return "Требуется виза";
            default:
                return "Тип визы не определён";
        }
    };

    const visaStr = selectedPlace.visaRequirement
        ? `${visa(selectedPlace.visaRequirement)}${selectedPlace.visaRequirement.days ? ` на ${selectedPlace.visaRequirement.days} дней` : ""}`
        : "Информация о визе недоступна";

    const formattedText = placeDetail.placeInfoList
        .map((section) =>
            section.placeInfoParagraphList.map((p) => `${section.name}\n${p.header}\n${p.info}`).join("\n\n"),
        )
        .join("\n\n");

    return (
        `${selectedPlace.location.countryName}, ${selectedPlace.location.cityName}\n` +
        `${selectedPlace.description}\n` +
        `${selectedPlace.reason}\n` +
        `${formattedText}\n\n` +
        `Город, страна прибытия: ${selectedPlace.location.cityName}, ${selectedPlace.location.countryName}\n` +
        `Город, регион и страна проживания: ${PLACEFIRSTSTEP.city?.label ?? "не указано"}\n\n` +
        `Visa: ${visaStr}\n` +
        `Бюджет: ${PLACEFIRSTSTEP.budget} ${PLACEFIRSTSTEP.currency}\n` +
        `Количество взрослых: ${PLACEFIRSTSTEP.adults}\n` +
        `Количество детей: ${PLACEFIRSTSTEP.children}\n` +
        `Количество дней: ${PLACEFIRSTSTEP.daysCount}\n` +
        `Пара: ${PLACEFIRSTSTEP.couple ? "да" : "нет"}\n` +
        `Активность: ${activityStr}\n` +
        `Транспорт: ${transportStr}\n` +
        `Валюта: ${placeDetail.cityCommonInfo?.currency}\n` +
        `Курс: ${placeDetail.cityCommonInfo?.exchangeRate}\n` +
        `Зимнее время: UTC ${placeDetail.cityCommonInfo?.gmtOffset}\n` +
        `Летнее время: UTC ${placeDetail.cityCommonInfo?.dstOffset}\n` +
        `Язык: ${placeDetail.cityCommonInfo?.languages}\n` +
        `Тип розеток: ${placeDetail.cityCommonInfo?.electricity.plugTypes.join(" ")}\n` +
        `Частота: ${placeDetail.cityCommonInfo?.electricity.frequencies.join(" ")}\n` +
        `Напряжение: ${placeDetail.cityCommonInfo?.electricity.voltages.join(" ")}\n` +
        `Погода: ${placeDetail.cityCommonInfo?.weatherLink}\n\n` +
        `Спланируйте свое путешествие: ${window.location.href}`
    );
};

export const getPreparingPlaceInfo = (
    PREPARINGFIRSTSTEP: PreparingFirstStepState,
    placeDetail: IPlaceDetails | null,
): string => {
    if (!placeDetail) return "";

    const activityStr = ACTIVITY_LIST["ANY"].label;

    const transportStr = TRANSPORT_LIST["ANY"].label;
    const cityName = PREPARINGFIRSTSTEP.location?.city;
    const countryName = PREPARINGFIRSTSTEP.location?.country;
    const startCountry = COUNTRIES[PREPARINGFIRSTSTEP.startCountry].label;

    const formattedText = placeDetail.placeInfoList
        .map(
            (section) =>
                `${section.name}:\n${section.placeInfoParagraphList.map((p) => `\n${p.header}\n${p.info}`).join("\n")}`,
        )
        .join("\n\n");

    return (
        `${formattedText}\n\n` +
        `Город, страна прибытия: ${cityName}, ${countryName}\n` +
        `Город, регион и страна проживания: ${startCountry}\n\n` +
        `Активность: ${activityStr}\n` +
        `Транспорт: ${transportStr}\n` +
        `Валюта: ${placeDetail.cityCommonInfo?.currency}\n` +
        `Курс: ${placeDetail.cityCommonInfo?.exchangeRate}\n` +
        `Зимнее время: UTC ${placeDetail.cityCommonInfo?.gmtOffset}\n` +
        `Летнее время: UTC ${placeDetail.cityCommonInfo?.dstOffset}\n` +
        `Язык: ${placeDetail.cityCommonInfo?.languages}\n` +
        `Тип розеток: ${placeDetail.cityCommonInfo?.electricity.plugTypes.join(" ")}\n` +
        `Частота: ${placeDetail.cityCommonInfo?.electricity.frequencies.join(" ")}\n` +
        `Напряжение: ${placeDetail.cityCommonInfo?.electricity.voltages.join(" ")}\n` +
        `Погода: ${placeDetail.cityCommonInfo?.weatherLink}\n\n` +
        `Спланируйте свое путешествие: ${window.location.href}`
    );
};
