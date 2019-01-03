<template>
    <Page>
        <ActionBar :title="title" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem
                    v-for="place in places"
                    v-bind:key="place.id"
                    :title="place.meta.name">
                <StackLayout columns="*" rows="*">
                    <Label class="message" :text="place.meta.location" col="0" row="0"/>
                    <Label class="message" :text="`@/assets/images/${place.banner.src}`" col="0" row="0"/>
                    <Image :src="`@/assets/images/${place.banner.src}`" :alt="place.banner.alt" stretch="aspectFit"/>
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    import {LibraryProps} from "../types/LibraryProps";

    const libraries: LibraryProps[] = [];

    export default {
        components: {
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
                        libraries
                    },
                ]
            }
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
