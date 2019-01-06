<template>
    <Label :text="`${formattedSession.from} - ${formattedSession.to}`"/>
</template>

<script lang="ts">
    import SessionHoursFormatter from "@/services/SessionHoursFormatter";

    console.log(`at Session`);

    const formatter = new SessionHoursFormatter();

    export default {
        components: {},
        props: {
            session: {}
        },
        computed: {
            formattedSession() {
                const formattedHour = formatter.format(this.session);
                console.log(`received session: ${JSON.stringify(formattedHour)}`);
                return formattedHour;
            }
        },
    }
</script>

<style scoped>
</style>
