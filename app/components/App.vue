<template>
    <Page>
        <ActionBar :title="title" android:flat="true">
            <ActionItem @tap="onTapSettings"
                        :ios.systemIcon="IOS_SYSTEM_ICON_BOOKMARK" ios.position="right"
                        text="Settings" android.position="popup"/>
        </ActionBar>
        <TabView tabBackgroundColor="#53ba82"
                 tabTextColor="#c4ffdf"
                 selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff"
                 androidTabsPosition="bottom">
            <TabViewItem
                    v-for="place in places"
                    v-bind:key="place.id"
                    :title="formattedTitle(place)">
                <Place :place="place" :date="date" :onDateChange="onDateChange"/>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import moment from "moment";
    import HkulDataPopulator from "@/services/HkulDataPopulator";
    import {HkuLibraryHoursFetcher} from "hey-hkul-hours";
    import NativeHtmlParser from "@/services/NativeHtmlParser";
    import Place from "@/components/Place.vue";
    import Settings from "@/components/Settings.vue";

    console.log(`at App`);

    const hkulDataPopulator = new HkulDataPopulator(
        new HkuLibraryHoursFetcher({htmlParser: new NativeHtmlParser()})
    );

    export default {
        components: {
            Place, Settings
        },
        props: {
            title: {type: String,}
        },
        data() {
            return {
                places: [
                    {
                        id: 1,
                        meta: {name: "HKU Library", location: "Pok Fu Lam"},
                        banner: {src: "hkul/wikipedia/hkul_banner.jpg", alt: "HKU Main Library"},
                        libraries: [],
                        refreshData(date) {
                            console.log(`refreshing data`);
                            console.log(`place name: ${this.meta.name}`);
                            console.log(`libraries before: ${this.libraries}`);

                            hkulDataPopulator.populateData(date)
                                .then(librariesProps => this.libraries = librariesProps.slice())
                                .catch(console.error);

                            console.log(`finished refreshing data`);
                        }
                    },
                ],
                date: moment(),
                IOS_SYSTEM_ICON_BOOKMARK: "11"
            }
        },
        methods: {
            formattedTitle(place) {
                return `${place.meta.name}
@ ${place.meta.location}`;
            },
            onDateChange(date) {
                this.date = date;
                this.refreshAllData();
            },
            refreshAllData() {
                this.places.forEach(place => place.refreshData(this.date));
            },
            onTapSettings() {
                console.log(`Tapped "Settings"`);
                return this.$showModal(Settings, {props: {libraryDataPopulator: hkulDataPopulator}});
            }
        },
        created() {
            console.log(`refresh data for all places`);
            this.places.forEach(place => place.refreshData(this.date));
        },
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
