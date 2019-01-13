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

                const promiseAddCallbacks = Promise.resolve();

                return promiseAddCallbacks.then(() => {
                    console.log("Added addOnPushTokenReceivedCallback and addOnMessageReceivedCallback");
                }, err => {
                    console.log("Failed to add addOnPushTokenReceivedCallback or addOnMessageReceivedCallback: " + err);
                });
            },
            onUnregisterButtonTap() {
                console.log("onUnregisterButtonTap");

                return messaging.unregisterForPushNotifications()
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
