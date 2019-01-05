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
                    <!--<Label class="message" :text="place.meta.location" col="0" row="0"/>-->
                    <Image :src="`~/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
                    <ListView for="library in place.libraries" @itemTap="onItemTap">
                        <v-template>
                            <Label :text="item.name"/>
                        </v-template>

                        <v-template if="$odd">
                            <!-- For items with an odd index, shows the label in red. -->
                            <Label :text="item.text" color="red"/>
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

    const libraries: LibraryProps[] = [];

    hkulDataPopulator.populateData().then(librariesProps => librariesProps.forEach(libraryProps => libraries.push(libraryProps)));

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
                console.log(event.index);
                console.log(event.item);
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
