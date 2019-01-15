import * as functions from 'firebase-functions';
import firebaseAdmin from "firebase-admin";
import moment from "moment";
import {HEY_HKUL_HOURS_FCM_TOPIC_NAME} from "../../../constants/firebaseCloudMessaging";
import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
import LibraryHours from "hey-hkul-hours/dist/service/hour/model/LibraryHours";
import Hours from "hey-hkul-hours/dist/service/hour/model/Hours";
import Session from "../../../app/services/SessionHoursFormatter";

firebaseAdmin.initializeApp(functions.config().firebase);

const hkuLibraryHoursFetcher = new HkuLibraryHoursFetcher();
const formatter = new Session();

const DEFAULT_ZONE = "Main Library";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const hourly_job = functions.pubsub
    .topic('hourly-tick')
    .onPublish((message) => {
        console.log("This job is run every hour!");
        processTickMessage(message);

        return true;
    });

export const push_notification_daily_open_hours = functions.pubsub
    .topic('daily-tick')
    .onPublish(message => {
        const now = moment();
        const todayString = now.format("DD-MM-YYYY");

        console.log(`Received daily tick, pushing notification through FCM for the opening hours for today: ${todayString}`);
        processTickMessage(message);

        return hkuLibraryHoursFetcher.retrieveHours(now)
            .then(hours => {
                const payload = createPayloadFromHours(hours);

                return firebaseAdmin.messaging().sendToTopic(HEY_HKUL_HOURS_FCM_TOPIC_NAME, payload)
            })
            .then(result => {
                console.log(`Finished pushing notification through FCM for the opening hours for today: ${todayString}`);
                return result;
            });
    });

function processTickMessage(message) {
    if (message.data) {
        const dataString = Buffer.from(message.data, 'base64').toString();
        console.log(`Message Data: ${dataString}`);
    }
}

function createPayloadFromHours(hours: LibraryHours) {
    const actualDate = hours.getDate();
    const allZonesHours = hours.getHoursForAllZones();
    if (isObjectEmpty(allZonesHours)) {
        console.log("ERROR - no close time available");
        return getPayloadForNoHoursError(actualDate);
    } else {
        console.log(`Building notification payload for ${actualDate}`);
        return {
            notification: {
                title: buildTitle(allZonesHours),
                body: buildBody(allZonesHours, actualDate)
            },
            data: {}
        };

    }
}

function getPayloadForNoHoursError(actualDate) {
    return {
        notification: {
            title: `${actualDate} - No library Hours available`,
            body: `Please report to "https://github.com/htbkoo/hey-hkul-hours-native-ns-vue/issues"`
        },
        data: {}
    };
}

function buildTitle(allZonesHours) {
    const allZoneNames = Object.keys(allZonesHours);
    const titleZoneName = (DEFAULT_ZONE in allZonesHours)
        ? DEFAULT_ZONE
        : allZoneNames[0];
    const titleZoneHours = allZonesHours[titleZoneName];
    const titleZoneTime = zoneHoursAsString(titleZoneHours);

    return `${titleZoneTime} (${titleZoneName})`;
}

function buildBody(allZonesHours, actualDate) {
    const allZoneNames = Object.keys(allZonesHours);
    const allZoneTimes = allZoneNames.map(name => allZonesHours[name])
        .map(zoneHoursAsString)
        .join("\n");

    return `${actualDate}
${allZoneTimes}`;
}

function isObjectEmpty(obj) {
    return (Object.keys(obj).length === 0) && (obj.constructor === Object);
}

function zoneHoursAsString(zoneHours: Hours) {
    if (zoneHours.isClosed()) {
        return "Closed";
    } else {
        return zoneHours.asArray()
            .map(formatter.format)
            .map(({from, to}) => `${from}-${to}`)
            .join(", ");
    }
}