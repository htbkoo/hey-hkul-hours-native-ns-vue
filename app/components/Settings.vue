<template>
    <Frame>
        <Page>
            <ActionBar title="Detail"/>
            <StackLayout>
                <Button class="settings-button" text="scheduleMessage" @tap="onScheduleButtonTap"/>
                <Button class="settings-button" text="cancel all schedule" @tap="onCancelAllScheduleButtonTap"/>

                <Button @tap="$modal.close" text="Close"/>
            </StackLayout>
        </Page>
    </Frame>
</template>

<script lang="ts">
    import notificationInstaller from "@/components/notificationInstaller";

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
