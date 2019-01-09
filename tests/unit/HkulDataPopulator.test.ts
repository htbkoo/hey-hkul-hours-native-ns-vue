// import "@babel/register";
import moment from "moment";

import HkulDataPopulator from "../../app/services/HkulDataPopulator";

// Unfortunately `jest` with babel does not handle local symlinked dependency well, so cannot work on this until fixed
// reference: https://github.com/facebook/jest/pull/7364
// import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
// import HkuLibraryHoursFetcher from "hey-hkul-hours/dist/fetcher/HkuLibraryHoursFetcher";
// import HkuLibraryHoursFetcher from "../../../../../hey-hkul-hours/dist/fetcher/HkuLibraryHoursFetcher";

console.log(process.env.NODE_ENV);

xdescribe("HkulDataPopulator", function () {
    const HkuLibraryHoursFetcher = require("hey-hkul-hours/dist/fetcher/HkuLibraryHoursFetcher").default;

    [
        {
            month: "Dec-2018",
            givenParseResult: {
                "Library": "23 Dec 2018 Sunday",
                "Main Library": "10:00am - 7:00pm",
                "Collaboration Zone (Level 3)": "10:00am - 6:30pm",
                "Library Corner (G/F) & Study Zone (Level 3)": "10:00am - 6:30pm, 7:00pm - 7:30am of the following day",
                "AV Collection": "10:00am - 7:00pm",
                "Fung Ping Shan Library": "10:00am - 7:00pm",
                "Special Collections": "10:00am - 7:00pm",
                "Dental Library": "Closed",
                "Tin Ka Ping Education Library": "Closed",
                "Lui Che Woo Law Library": "12:00pm - 4:00pm",
                "Music Library": "Closed",
                "Yu Chun Keung Medical Library": "10:00am - 5:00pm",
            }
        },
        {
            month: "Jan-2019",
            givenParseResult: {
                "Library": "23 Dec 2018 Sunday",
                "Main Library": "8:30am - 7:00pm",
                "Collaboration Zone (Level 3)": "8:30am - 6:30pm",
                "Library Corner (G/F) & Study Zone (Level 3)": "8:30am - 6:30pm, 7:00pm - 9:00am of the following day",
                "AV Collection": "8:30am - 7:00pm",
                "Fung Ping Shan Library": "8:30am - 7:00pm",
                "Special Collections": "9:00am - 7:00pm",
                "Dental Library": "9:00am - 6:00pm",
                "Tin Ka Ping Education Library": "9:00am - 6:00pm",
                "Lui Che Woo Law Library": "9:00am - 7:00pm",
                "Music Library": "12:00pm - 5:00pm",
                "Yu Chun Keung Medical Library": "8:30am - 7:00pm",
            }
        }
    ].forEach(({month, givenParseResult}) =>
        it(`should populate data for mocked ${month} data`, async function () {
            // given
            const mockFetcher = new HkuLibraryHoursFetcher({
                htmlFetcher: {
                    async fetchHtml(url: string) {
                        expect(url).toEqual("https://lib.hku.hk/hours/daily/opening_hours_2019-01-08.html");
                        return Promise.resolve("");
                    }
                },
                htmlParser: {
                    async parseHtml(html: string) {
                        return Promise.resolve(givenParseResult);
                    }
                }
            });
            const populator = new HkulDataPopulator(mockFetcher as any);

            // when
            const data = await populator.populateData(moment("2019-01-08"));

            // then
            const {Library, ...expectedZones} = givenParseResult;

            const dataAsObject = data.reduce((obj, {name, hours}) => {
                obj[name] = hours;
                return obj
            }, {});
            Object.keys(expectedZones).forEach(key => expect(dataAsObject).toHaveProperty(key));
        })
    );
});