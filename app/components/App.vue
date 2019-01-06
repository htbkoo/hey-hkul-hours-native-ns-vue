<template>
    <Page>
        <ActionBar :title="title" android:flat="true"/>
        <TabView tabBackgroundColor="#53ba82"
                 tabTextColor="#c4ffdf"
                 selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem
                    v-for="place in places"
                    v-bind:key="place.id"
                    :title="`${place.meta.name} @ ${place.meta.location}`">
                <StackLayout columns="*" rows="*">
                    <Image :src="`~/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
                    <ListView for="library in place.libraries" @itemTap="onItemTap">
                        <v-template>
                            <Label class="message" :text="library.name"/>
                        </v-template>

                        <v-template if="$odd">
                            <!-- For items with an odd index, shows the label in red. -->
                            <Label class="message" :text="library.name" color="red"/>
                        </v-template>
                    </ListView>
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import hkulDataPopulator from "@/services/hkulDataPopulator";

    console.log(`at App`);

    export default {
        components: {},
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
                        libraries: []
                    },
                ],
            }
        },
        created() {
            console.log(`load data`);
            hkulDataPopulator.populateData()
                .then(librariesProps => {
                    console.log(`places: ${this.places}`);
                    console.log(`original libraries: ${this.places[0].libraries}`);
                    this.places[0].libraries = librariesProps.slice();
                    console.log(`after libraries: ${this.places[0].libraries}`);
                })
                .catch(console.error)
        },
        methods: {
            onItemTap(event) {
                console.log(`index: ${event.index}`);
            },
        }
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
