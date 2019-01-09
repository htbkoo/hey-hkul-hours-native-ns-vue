<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
                <Button class="settings-button" text="scheduleMessage" @tap="onScheduleButtonTap"/>
                <Button class="settings-button" text="register" @tap="onRegisterButtonTap"/>
                <Button class="settings-button" text="cancel all schedule" @tap="onCancelAllScheduleButtonTap"/>

                <Button @tap="$modal.close" text="Close"/>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts">
    import notificationInstaller from "@/components/notificationInstaller";
    import {messaging, Message} from "nativescript-plugin-firebase/messaging";

    import {Observable} from "tns-core-modules/data/observable";
    import {alert, confirm} from "tns-core-modules/ui/dialogs";
    import * as platform from "tns-core-modules/platform";
    import * as applicationSettings from "tns-core-modules/application-settings";

    import * as application from 'tns-core-modules/application';

    console.log(`at Settings`);

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

                return Promise.all([
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
                    )
                ]).then(() => {
                    console.log("Added addOnPushTokenReceivedCallback and addOnMessageReceivedCallback");
                }, err => {
                    console.log("Failed to add addOnPushTokenReceivedCallback or addOnMessageReceivedCallback: " + err);
                });

                /*

                                await messaging.registerForPushNotifications({
                                    onPushTokenReceivedCallback: (token: string): void => {
                                        console.log("Firebase plugin received a push token: " + token);
                                    },

                                    onMessageReceivedCallback: (message: Message) => {
                                        console.log("Push message received: " + message.title);
                                    },

                                    // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
                                    showNotifications: true,

                                    // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
                                    showNotificationsWhenInForeground: true
                                }).then(() => console.log("Registered for push"))
                                    .catch(console.log);
                */


                // note that this will implicitly register for push notifications, so there's no need to call 'registerForPushNotifications'
                /*  messaging.addOnPushTokenReceivedCallback(
                      token => {
                          // you can use this token to send to your own backend server,
                          // so you can send notifications to this specific device
                          console.log("Firebase plugin received a push token: " + token);
                          // var pasteboard = utils.ios.getter(UIPasteboard, UIPasteboard.generalPasteboard);
                          // pasteboard.setValueForPasteboardType(token, kUTTypePlainText);
                      }
                  );
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
                  ).then(() => {
                      console.log("Added addOnMessageReceivedCallback");
                  }, err => {
                      console.log("Failed to add addOnMessageReceivedCallback: " + err);
                  });

  */
            }
        }
    }
</script>

<style scoped>
    ActionBar, .settings-button {
        background-color: #53ba82;
        color: #ffffff;
    }

</style>
