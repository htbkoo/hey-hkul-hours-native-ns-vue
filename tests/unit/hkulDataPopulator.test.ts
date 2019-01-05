describe("hkulDataPopulator", function () {
    it('should populate data', function () {

    });
});
import moment from "moment";

import {AllZonesHours} from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
// import {LibraryProps} from "@/types/LibraryProps.ts";
import {LibraryProps} from "@/types/LibraryProps";
import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
// import mockHtmlFetcher from "~/services/mockHtmlFetcher";
import mockHtmlFetcher from "@/services/mockHtmlFetcher";

export default {
    populateData() {
        return new HkuLibraryHoursFetcher({htmlFetcher: mockHtmlFetcher}).retrieveHours(moment())
            .then(libraryHours => {
                    const hoursForAllZones = libraryHours.getHoursForAllZones();
                    const allZones = Object.keys(hoursForAllZones);
                    console.debug(`retrieved library hours - # of zones: ${allZones.length}`);
                    return allZones.map(toLibraryProps(hoursForAllZones));
                }
            );
    }
};

function toLibraryProps(hoursForAllZones: AllZonesHours): (zoneName: string) => LibraryProps {
    return zoneName => ({name: zoneName, hours: hoursForAllZones[zoneName]});
}