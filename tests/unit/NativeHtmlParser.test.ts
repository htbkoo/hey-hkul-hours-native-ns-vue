import NativeHtmlParser from "../../app/services/NativeHtmlParser";

import htmlResponseDec from "../resources/expectedHtmlFetchResponse_23-12-2018";
import htmlResponseJan from "../resources/expectedHtmlFetchResponse_05-01-2019";

describe("NativeHtmlParser", function () {
    [
        {
            month: "Dec-2018",
            htmlResponse: htmlResponseDec,
            expectedMappings: {
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
            htmlResponse: htmlResponseJan,
            expectedMappings: {
                "Library": "5 Jan 2019 Saturday",
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
    ].forEach(({month, htmlResponse, expectedMappings}) =>
        it(`should parse html for ${month} with nativescript-xml2js`, async function () {
            // given
            const parser = new NativeHtmlParser();

            // when
            const mappings = await parser.parseHtml(htmlResponse);

            // then
            expect(mappings).toEqual(expectedMappings);
        })
    );
});