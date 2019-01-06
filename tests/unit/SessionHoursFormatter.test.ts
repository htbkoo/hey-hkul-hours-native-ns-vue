import SessionHoursFormatter from "../../app/services/SessionHoursFormatter";
import Hour from "hey-hkul-hours/dist/service/hour/model/Hour";
import moment, {Moment} from "moment";

const INVALID_MOMENT = moment.invalid();

describe("SessionHoursFormatter", function () {
    [
        {
            scenario: "typical session", from: hour("8:30am"), to: hour("7:00pm"), isClosed: false,
            expectedFormattedSession: {
                from: "08:30",
                to: "19:00",
            }
        },
        {
            scenario: "session that ends in the following day", from: hour("8:00pm"), to: hour("12:34am").add(1, "d"),
            expectedFormattedSession: {
                from: "20:00",
                to: "00:34 (+1)",
            }
        },
    ].forEach(({scenario, from = INVALID_MOMENT, to = INVALID_MOMENT, isClosed = false, expectedFormattedSession}) =>
        it(`should, for ${scenario}, format session hour`, function () {
            // given
            const formatter = new SessionHoursFormatter();

            // when
            const formattedSession = formatter.format(asSession(from, to, isClosed));


            // then
            expect(formattedSession).toEqual(expectedFormattedSession);

        })
    );

    function hour(str: string): Moment {
        return moment(str, "h:ma");
    }

    function asSession(from, to, isClosed): Hour {
        return ({
            getFrom() {
                return from;
            },
            getTo() {
                return to;
            },
            isClosed() {
                return isClosed;
            }
        }) as Hour;
    }
});