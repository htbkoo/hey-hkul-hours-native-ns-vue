<template>
    <Page>
        <ActionBar :title="title" android:flat="true"/>
        <TabView tabBackgroundColor="#53ba82"
                 tabTextColor="#c4ffdf"
                 selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff"
                 androidTabsPosition="bottom">
            <TabViewItem
                    v-for="place in places"
                    v-bind:key="place.id"
                    :title="`${place.meta.name}
@ ${place.meta.location}`">
                <Place :place="place"/>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import hkulDataPopulator from "@/services/hkulDataPopulator";
    import Place from "@/components/Place.vue";

    console.log(`at App`);

    export default {
        components: {
            Place,
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
                        refreshData() {
                            console.log(`refreshing data`);
                            console.log(`place name: ${this.meta.name}`);
                            console.log(`libraries before: ${this.libraries}`);

                            hkulDataPopulator.populateData()
                                .then(librariesProps => this.libraries = librariesProps.slice())
                                .catch(console.error);

                            console.log(`finished refreshing data`);
                        }
                    },
                ],
            }
        },
        created() {
            console.log(`refresh data for all places`);
            this.places.forEach(place => place.refreshData());
        },
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
</style>
