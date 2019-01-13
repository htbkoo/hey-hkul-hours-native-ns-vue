import * as functions from 'firebase-functions';
import firebaseAdmin from "firebase-admin";
import moment from "moment";
// import {HEY_HKUL_HOURS_FCM_TOPIC_NAME} from "../../../constants/firebaseCloudMessaging";
// import {HEY_HKUL_HOURS_FCM_TOPIC_NAME} from "../../../constants/firebaseCloudMessaging";
export const HEY_HKUL_HOURS_FCM_TOPIC_NAME = "hey_hkul_hours_fcm_daily";

firebaseAdmin.initializeApp(functions.config().firebase);

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
    .onPublish((message) => {
        console.log(`Received daily tick, pushing notification through FCM for the opening hours for today: ${moment().format("DD-MM-YYYY")}`);
        processTickMessage(message);

        const today = moment().format("DD-MM-YYYY");

        const payload = {
            notification: {
                title: `hey-hkul-hours: ${today}`,
                body: `hello, try day: ${today}`
            },
            data: {}
        };

        return firebaseAdmin.messaging().sendToTopic(HEY_HKUL_HOURS_FCM_TOPIC_NAME, payload)
            .then(result => {
                console.log(`Finished pushing notification through FCM for the opening hours for today: ${today}`);
                return result;
            });
    });

function processTickMessage(message) {
    if (message.data) {
        const dataString = Buffer.from(message.data, 'base64').toString();
        console.log(`Message Data: ${dataString}`);
    }
}