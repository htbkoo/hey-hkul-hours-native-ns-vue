<template>
    <StackLayout columns="*" rows="*">
        <Image :src="`~/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
        <Button class="date-button" :text="selectedDateAsString" @tap="onDateButtonTap"/>
        <ListView for="library in place.libraries" @itemTap="onItemTap">
            <v-template>
                <StackLayout columns="*" rows="*">
                    <Label class="message" :text="library.name"/>
                    <StackLayout columns="*" rows="*" v-for="session in library.hours.asArray()">
                        <Session :session="session"/>
                    </StackLayout>
                </StackLayout>
            </v-template>

            <v-template if="library.hours.isClosed()">
                <StackLayout columns="*" rows="*">
                    <Label class="message" :text="library.name"/>
                    <Label text="Closed"/>
                </StackLayout>
            </v-template>
        </ListView>
    </StackLayout>
</template>

<script lang="ts">
    import Session from "@/components/Session.vue";
    import moment from "moment";
    import dateTimePicker from "@/components/dateTimePicker";

    console.log(`at Place`);

    const now = moment();
    console.log(`${now.format("DD-MMM-YYYY").toString()}`);

    export default {
        components: {
            Session
        },
        props: {
            place: {},
            date: {},
            onDateChange: {},
        },
        data() {
            return {}
        },
        computed: {
            // a computed getter
            selectedDateAsString: function () {
                return this.date.format("D-MMM-YYYY").toString();
            }
        },
        methods: {
            onItemTap(event) {
                console.log(`index: ${event.index}`);
            },
            onDateButtonTap() {
                console.log("onDateButtonTap");

                return dateTimePicker.showDateModal(this.date.toDate())
                    .then(this.onDateChange)
                    .catch(error => console.log("Error caught when picking date: " + error));
            }
        }
    }
</script>

<style scoped>
    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .date-button {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
