<template>
    <StackLayout columns="*" rows="*">
        <Image :src="`~/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
        <Button :text="selectedDateAsString" @tap="onDateButtonTap"/>
        <!--<DatePicker v-model="selectedDate"/>-->
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
    import {ModalDatetimepicker} from "nativescript-modal-datetimepicker";

    console.log(`at Place`);

    const now = moment();
    console.log(`${now.format("dd-MMM-YYYY").toString()}`);

    export default {
        components: {
            Session
        },
        props: {
            place: {}
        },
        data() {
            return {
                selectedDate: now
            }
        },
        computed: {
            // a computed getter
            selectedDateAsString: function () {
                return this.selectedDate.format("D-MMM-YYYY").toString();
            }
        },
        methods: {
            onItemTap(event) {
                console.log(`index: ${event.index}`);
            },
            onDateButtonTap() {
                console.log("onDateButtonTap");

                const picker = new ModalDatetimepicker();

                picker.pickDate({
                    title: "Select Date", // iOS only
                    theme: "light", // ios only
                    startingDate: this.selectedDate.toDate(),
                    datePickerMode: "calendar",
                }).then(result => {
                    // Note the month is 1-12 (unlike js which is 0-11)
                    const date = `${result.day}-${result.month}-${result.year}`;
                    console.log(`Date is: ${date}`);

                    // var jsdate = new Date(result.year, result.month - 1, result.day);
                    this.selectedDate = moment(date, "D-M-YYYY")
                }).catch(error => {
                    console.log("Error: " + error);
                });

                // Pick Date
                // exports.selectDate = function() {};

                /*
                // Pick Time
                exports.selectTime = function() {
                    picker
                        .pickTime()
                        .then(result => {
                            console.log("Time is: " + result.hour + ":" + result.minute);
                        })
                        .catch(error => {
                            console.log("Error: " + error);
                        });
                };
                */

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
</style>
