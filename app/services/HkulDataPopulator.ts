import moment from "moment";

import {AllZonesHours} from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import {LibraryProps} from "@/types/LibraryProps";
import {LibraryHoursFetcher} from "hey-hkul-hours";

export default class {
    private fetcher: LibraryHoursFetcher;

    constructor(fetcher: LibraryHoursFetcher) {
        this.fetcher = fetcher;
    }

    populateData(date = moment()) {
        return this.fetcher.retrieveHours(date)
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