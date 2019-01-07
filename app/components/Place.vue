<template>
    <StackLayout columns="*" rows="*">
        <Image :src="`~/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
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

    console.log(`at App`);

    export default {
        components: {
            Session
        },
        props: {
            place: {}
        },
        methods: {
            onItemTap(event) {
                console.log(`index: ${event.index}`);
            },
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
