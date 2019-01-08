import {LocalNotifications} from "nativescript-local-notifications";
import {Color} from "tns-core-modules/color";

const TODAY = new Date();

export default {
    async setupNotification(date = TODAY) {
        return LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            color: new Color("red"),
            badge: 1,
            groupedMessages: ["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            groupSummary: "Summary of the grouped messages above", //android only
            ongoing: true, // makes the notification ongoing (Android only)
            icon: 'res://heart',
            image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
            thumbnail: true,
            interval: 'minute',
            channel: 'My Channel', // default: 'Channel'
            sound: "customsound-ios.wav", // falls back to the default sound on Android
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
        }]).then(
            function () {
                console.log("Notification scheduled");
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
        )
    }
}