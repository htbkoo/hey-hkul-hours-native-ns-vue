<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
                <Button class="settings-button" text="Schedule message (local)" @tap="onScheduleButtonTap"/>
                <Button class="settings-button" text="Cancel all schedule (local)" @tap="onCancelAllScheduleButtonTap"/>
                <Button class="settings-button" text="Register for notification" @tap="onRegisterButtonTap"/>
                <Button class="settings-button" text="Unregister for notification" @tap="onUnregisterButtonTap"/>

                <Button @tap="$modal.close" text="Close"/>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts">
    import notificationInstaller from "@/components/notificationInstaller";
    import {messaging} from "nativescript-plugin-firebase/messaging";
    import * as application from 'tns-core-modules/application';
    import {HEY_HKUL_HOURS_FCM_TOPIC_NAME} from "../../constants/firebaseCloudMessaging";

    const getCircularReplacer = () => {
        const seen = new WeakSet;
        return (key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    console.log(`at Settings`);

    export default {
        props: {
            libraryDataPopulator: {},
        },
        data() {
            return {}
        },
        methods: {
            onScheduleButtonTap() {
                console.log("onScheduleButtonTap");

                return notificationInstaller.setupNotification(this.libraryDataPopulator);
            },
            onCancelAllScheduleButtonTap() {
                console.log("onCancelAllScheduleButtonTap");

                return notificationInstaller.cancelAllSchedule();
            },
            onRegisterButtonTap() {
                console.log("onRegisterButtonTap");

                console.log(`android api level: ${android.os.Build.VERSION.SDK_INT}`);

                console.log(`application.android.context: ${typeof application.android.context}`);
                console.log(`enabled?: ${typeof android.support.v4.app.NotificationManagerCompat.from}`);
                console.log(`enabled?: ${typeof android.support.v4.app.NotificationManagerCompat.from(application.android.context)}`);
                console.log(`enabled?: ${android.support.v4.app.NotificationManagerCompat.from(application.android.context).areNotificationsEnabled()}`);
                console.log(`Notifications enabled? ${messaging.areNotificationsEnabled()}`);

                const senderIdResourceId = application.android.context.getResources().getIdentifier("gcm_defaultSenderId", "string", application.android.context.getPackageName());
                console.log(`senderIdResourceId: ${senderIdResourceId}`);
                console.log("after onScheduleButtonTap");

                const promiseAddCallbacks = Promise.all([
                    messaging.addOnPushTokenReceivedCallback(
                        token => {
                            // you can use this token to send to your own backend server,
                            // so you can send notifications to this specific device
                            console.log("Firebase plugin received a push token: " + token);
                            // var pasteboard = utils.ios.getter(UIPasteboard, UIPasteboard.generalPasteboard);
                            // pasteboard.setValueForPasteboardType(token, kUTTypePlainText);
                        }
                    ),
                    messaging.addOnMessageReceivedCallback(
                        message => {
                            console.log("Push message received in push-view-model: " + JSON.stringify(message, getCircularReplacer()));

                            setTimeout(() => {
                                alert({
                                    title: "Push message!",
                                    message: (message !== undefined && message.title !== undefined ? message.title : ""),
                                    okButtonText: "Sw33t"
                                });
                            }, 500);
                        }
                    ),
                    messaging.subscribeToTopic(HEY_HKUL_HOURS_FCM_TOPIC_NAME)
                ]);

                return promiseAddCallbacks.then(() => {
                    console.log("Added addOnPushTokenReceivedCallback and addOnMessageReceivedCallback");
                }, err => {
                    console.log("Failed to add addOnPushTokenReceivedCallback or addOnMessageReceivedCallback: " + err);
                });
            },
            onUnregisterButtonTap() {
                console.log("onUnregisterButtonTap");
                const promiseUnregisterCallbacks = Promise.all([
                    messaging.subscribeToTopic(HEY_HKUL_HOURS_FCM_TOPIC_NAME),
                    messaging.unregisterForPushNotifications()
                ]);

                return promiseUnregisterCallbacks
                    .then(() => console.log("Unregistered For Push Notifications"))
                    .catch(err => console.log(`Failed to Unregistered For Push Notifications: ${err}`));
            },
        }
    }
</script>

<style scoped>
    ActionBar, .settings-button {
        background-color: #53ba82;
        color: #ffffff;
    }

</style>
