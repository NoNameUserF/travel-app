import {FC, useState} from "react";
import {IGsuInfoContainerCell, IOptions, IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {GsuWizardResultPage} from "@gsu-ai/gsu-ui-core";

import ItineraryMap from "../ItineraryMap";

import ItineraryHeader from "../ItineraryHeader";

import {ITravelPoint, ITravelPoints} from "../../../api/interfaces";

import {ItineraryStepLocationState} from "../ItineraryStepLocation";

import InfoForMap from "../ItineraryMap/InfoForMap";

import {transformActivitiesData, transformTransportData} from "../../../helpers/dataTransform";

import TravelData from "./TravelData";

import TravelPointCards from "./TravelPointCards";
import styles from "./index.module.css";

export interface ItineraryStepTravelPointState {
    travelPoint: ITravelPoints[] | [];
    selectedMarker: ITravelPoint | null;
}

export const ItineraryStepTravelPoints: FC<IWizardStep<ItineraryStepTravelPointState>> = ({
    componentState,
    change,
    refresh,
    wizardState,
}) => {
    const [toggled, setToggled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(false);
    const [activeDayIndex, setActiveDayIndex] = useState<number>(0);
    const [activeDay, setActiveDay] = useState<string>("day-1");
    const LOCATION = wizardState.ITINERARYLOCATION as ItineraryStepLocationState;
    const city = LOCATION.city?.city;

    const travelPointResponse = componentState.travelPoint;
    const selectedMarker = componentState.selectedMarker;

    const userSelectedCurrency = LOCATION.currency;

    const ActiveDayIndexHandler = (index: number) => {
        setActiveDayIndex(index);
    };

    const setSelectedMarker = (travelPoint: ITravelPoint | null) => {
        change({...componentState, selectedMarker: travelPoint});
    };

    const handleMarkerClick = (travelPoint: ITravelPoint | null) => {
        setSelectedMarker(travelPoint);
    };

    const openMenu = () => setActiveMenu(true);

    const closeMenu = () => setActiveMenu(false);

    const setActiveDayWithEffect = (activeDay: string) => {
        setActiveDay(activeDay);
        setActiveDayIndex(Number(activeDay.replace("day-", "")) - 1);
    };

    const daySteps = Array.from({length: LOCATION.days}, (_, i) => `День ${i + 1}`);
    const tabs: IOptions = daySteps.reduce((acc: IOptions, day, index) => {
        const key = `day-${index + 1}`;
        acc[key] = {label: day};
        return acc;
    }, {});

    const infoCells: IGsuInfoContainerCell[] = [
        {key: "Страна", value: LOCATION.city?.city},
        {key: "Бюджет", value: `${LOCATION.budget} ${LOCATION.currency}`},
        {key: "Количество взрослых", value: LOCATION.adult || "0"},
        {key: "Количество детей", value: LOCATION.children || "0"},
        {key: "Количество дней", value: LOCATION.days},
        {key: "Активности", value: transformActivitiesData(LOCATION.activity)},
        {key: "Транспорт", value: transformTransportData(LOCATION.transport)},
    ];

    return (
        <>
            <GsuWizardResultPage title={"Маршрут"} refresh={refresh}>
                <div className={styles.pageContainer}>
                    <ItineraryHeader
                        location={LOCATION}
                        travelPoints={travelPointResponse}
                        options={tabs}
                        activeKey={activeDay}
                        changeKey={setActiveDayWithEffect}
                    />
                    <TravelPointCards
                        dayNumber={travelPointResponse[activeDayIndex].day}
                        points={travelPointResponse[activeDayIndex].travelPoints}
                        onToggleMapClick={setToggled}
                        onMarkerClick={handleMarkerClick}
                        userSelectedCurrency={userSelectedCurrency}
                        city={city}
                    />
                    <TravelData cardData={infoCells} />
                </div>
            </GsuWizardResultPage>
            {toggled && (
                <ItineraryMap
                    travelStateActiveDay={travelPointResponse[activeDayIndex]}
                    activeElementToggler={toggled}
                    setActiveElementToggler={setToggled}
                    onMarkerClick={handleMarkerClick}
                    selectedMarker={selectedMarker}
                >
                    <InfoForMap
                        daySteps={daySteps}
                        activeIdx={activeDayIndex}
                        changeIdx={ActiveDayIndexHandler}
                        activeMenu={activeMenu}
                        openMenu={openMenu}
                        closeMenu={closeMenu}
                        activeDayIndex={activeDayIndex}
                        onMarkerClick={handleMarkerClick}
                    />
                </ItineraryMap>
            )}
        </>
    );
};

export default ItineraryStepTravelPoints;
