import {GsuCardList, GsuWizardCardPage} from "@gsu-ai/gsu-ui-core";
import {FC} from "react";
import {IWizardStep} from "@gsu-ai/gsu-ui-core/dist/types/types/globalTypes";

import {IPlace} from "../../../api/interfaces";

import PlaceCard from "./PlaceCard";

export interface IPlaceList {
    places: IPlace[];
    selectedPlace: IPlace | null;
}

export const PlaceCardList: FC<IWizardStep<IPlaceList>> = ({componentState, change, refresh}) => {
    const places = componentState.places;
    const selectedPlace = componentState.selectedPlace;
    const setSelectedPlace = (place: IPlace) => {
        change({...componentState, selectedPlace: place});
    };

    return (
        <GsuWizardCardPage refresh={refresh} title="Выберите место">
            <GsuCardList<IPlace>
                CardComponent={(card) => <PlaceCard card={card} />}
                onSelectCard={setSelectedPlace}
                selectedCard={selectedPlace}
                cards={places}
                uid={"description"}
            />
        </GsuWizardCardPage>
    );
};

export default PlaceCardList;
