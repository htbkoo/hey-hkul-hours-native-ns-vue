import Hour from "hey-hkul-hours/dist/service/hour/model/Hour";

const TIME_FORMAT = "HH:mm";

type FormattedHour = {
    from: string,
    to: string,
}

export default class Session {
    format(session: Hour): FormattedHour {
        if (session.isClosed()) {
            return {
                from: "Closed",
                to: "Closed",
            }
        } else {
            const from = session.getFrom().format(TIME_FORMAT);
            return {
                from,
                to: formatEndTime(session),
            };
        }

        function formatEndTime(session): string {
            const to = session.getTo();
            const isFollowingDay = to.isAfter(session.getFrom(), "day");
            const formattedTime = to.format(TIME_FORMAT);
            if (isFollowingDay) {
                return `${formattedTime} (+1)`
            } else {
                return formattedTime;
            }
        }
    }
}