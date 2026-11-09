import {INTERCITY_VEHICLES_TYPES} from "../constants/transport";
import ACTIVITY_LIST from "../constants/activity";

export const transformTransportData = (transports: string[]) => {
    return transports.map((transport) => INTERCITY_VEHICLES_TYPES[transport].label).join(", ");
};

export const transformActivitiesData = (activities: string[]) => {
    return activities.map((activity) => ACTIVITY_LIST[activity].label).join(", ");
};
