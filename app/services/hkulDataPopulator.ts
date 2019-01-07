import moment from "moment";

import {AllZonesHours} from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import {LibraryProps} from "@/types/LibraryProps";
import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
import NativeHtmlParser from "@/services/NativeHtmlParser";

export default {
    populateData(date = moment()) {
        return new HkuLibraryHoursFetcher({
            htmlParser: new NativeHtmlParser()
        }).retrieveHours(date)
            .then(libraryHours => {
                    const hoursForAllZones = libraryHours.getHoursForAllZones();
                    const allZones = Object.keys(hoursForAllZones);
                    console.log(`retrieved library hours - # of zones: ${allZones.length}`);
                    return allZones.map(toLibraryProps(hoursForAllZones));
                }
            );
    }
};

function toLibraryProps(hoursForAllZones: AllZonesHours): (zoneName: string) => LibraryProps {
    return zoneName => ({name: zoneName, hours: hoursForAllZones[zoneName]});
}