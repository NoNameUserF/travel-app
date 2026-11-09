import {COUNTRIES} from "@gsu-ai/gsu-ui-core";

import ACTIVITY_LIST from "../constants/activity";
import {TRANSPORT_LIST} from "../constants/transport";
import {IPlace, IPlaceDetails, IPreparingData} from "../api/interfaces";
import {PlaceFirstStepState} from "../wizards/PlaceStep/PlaceBasicInfo";
import {CardListItem} from "../components/CardList/CardList";
import {LanguageIcon, MoneyIcon, TimeIcon, TypeIcon, UsdIcon, WeatherIcon, WikiIcon} from "../assets/Icons";

export type PlaceInfoCell = {
    key: string;
    value: string | number | undefined;
};

export const getPlaceInfoList = (place: IPlace | null, requestState: PlaceFirstStepState | null): PlaceInfoCell[] => {
    if (!place || !requestState) {
        return [];
    }
    const activityStr = requestState.activities.map((key) => ACTIVITY_LIST[key]?.label ?? key).join(", ");
    const transportStr = requestState.transport.map((key) => TRANSPORT_LIST[key]?.label ?? key).join(", ");

    return [
        {
            key: "Город",
            value: place.location.cityName,
        },
        {
            key: "Бюджет",
            value: `${requestState.budget} ${requestState.currency}`,
        },
        ...(requestState.adults > 0
            ? [
                  {
                      key: "Количество взрослых",
                      value: requestState.adults,
                  },
              ]
            : []),
        ...(requestState.children > 0
            ? [
                  {
                      key: "Количество детей",
                      value: requestState.children,
                  },
              ]
            : []),
        {
            key: "Количество дней",
            value: requestState.daysCount,
        },
        {
            key: "Активности",
            value: activityStr,
        },
        {
            key: "Транспорт",
            value: transportStr,
        },
    ];
};

export const getPreparingPlaceInfoList = (preparingData: IPreparingData) => {
    return [
        {
            key: "Город назначения",
            value: preparingData.cityName,
        },
        {
            key: "Страна отправления",
            value: COUNTRIES[preparingData.startCountry].label,
        },
        {
            key: "Гражданство",
            value: COUNTRIES[preparingData.citizenship].label,
        },
        {
            key: "Валюта",
            value: preparingData.currencyCode,
        },
    ];
};
export const getPlacesCommonInfoList = (place: IPlace | null, details: IPlaceDetails | null): CardListItem[] => {
    if (!place && !details) {
        return [];
    }
    return [
        ...(details?.cityCommonInfo?.wikiInfo?.wikiUrl
            ? [
                  {
                      label: details.cityCommonInfo.wikiInfo.wikiUrl,
                      isLink: true,
                      href: details.cityCommonInfo.wikiInfo.wikiUrl,
                      target: "_blank" as const,
                      icon: WikiIcon,
                  },
              ]
            : []),
        {
            label: details?.cityCommonInfo?.currency ?? "",
            icon: MoneyIcon,
        },
        {
            label: details?.cityCommonInfo?.exchangeRate ?? "",
            icon: UsdIcon,
        },
        {
            label: (details?.cityCommonInfo?.gmtOffset && details?.cityCommonInfo?.dstOffset) ? `UTC ${details?.cityCommonInfo?.gmtOffset} / UTC ${details?.cityCommonInfo?.dstOffset}` : "",
            icon: TimeIcon,
        },
        {
            label: details?.cityCommonInfo?.languages.join(", ") ?? "",
            icon: LanguageIcon,
        },
        ...(details?.cityCommonInfo?.weatherLink
            ? [
                  {
                      label: "Погода",
                      isLink: true,
                      href: details?.cityCommonInfo?.weatherLink,
                      target: "_blank" as const,
                      icon: WeatherIcon,
                  },
              ]
            : []),
        {
            label: (details?.cityCommonInfo?.electricity.plugTypes && details?.cityCommonInfo?.electricity.voltages && details?.cityCommonInfo?.electricity.frequencies) ? `Type ${details?.cityCommonInfo?.electricity.plugTypes.join(" ")} • ${details?.cityCommonInfo?.electricity.voltages.join(" ")} •
    ${details?.cityCommonInfo?.electricity.frequencies.join(" ")}` : "",
            icon: TypeIcon,
        },
    ];
};
