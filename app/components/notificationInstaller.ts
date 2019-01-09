import {LocalNotifications} from "nativescript-local-notifications";
import moment from "moment";
import {Color} from "tns-core-modules/color";

const TODAY = new Date();

export default {
    async setupNotification(dataPopulator, date = TODAY) {
        const at = moment().add(2, "s");
        console.log(`showing at ${at.format()}`);

        const libraryProps = await dataPopulator.populateData();
        const mainLib = libraryProps.find(props => props.name === "Main Library");
        const lib = mainLib ? mainLib : libraryProps[0];
        const titleCloseTime = lib.hours.isClosed()
            ? "Closed all day"
            : `Closes at ${lib.hours.asArray()[0].getTo().format("hh:mm")}`;

        return LocalNotifications.schedule([{
            id: 1,
            title: 'Libraries Hours',
            body: `${moment(date).format("D-M-YYYY")} - ${titleCloseTime}`,
            ticker: 'The ticker',
            color: new Color("#53ba82"),
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
            at: at.toDate() // 2 seconds from now
        }]).then(
            function () {
                console.log("Notification scheduled");
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
        )
    },
    async cancelAllSchedule() {
        return LocalNotifications.cancelAll();
    }
}