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
    import {LibraryProps} from "@/types/LibraryProps";
    import hkulDataPopulator from "@/services/hkulDataPopulator";
    import Hours from "hey-hkul-hours/dist/service/hour/model/Hours";

    const libraries: LibraryProps[] = [
        {name: "testLib", hours: Hours.closed()}
    ];

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
                        libraries
                    },
                ],
                listOfItems: [
                    {text: "1"},
                    {text: "2"},
                    {text: "3"},
                ]
            }
        },
        methods: {
            onItemTap(event) {
                console.log(`index: ${event.index}`);
                console.log(`load data`);
                hkulDataPopulator.populateData()
                    .then(librariesProps => librariesProps.forEach(libraryProps => libraries.push(libraryProps)))
                    .catch(console.error)
                // console.log(event.item);
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
