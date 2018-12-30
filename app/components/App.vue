<template>
    <Page>
        <ActionBar :title="titleData" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Tab 1">
                <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                    <!--<Image src="res://icon" stretch="aspectFill" />-->
                    <Image src="~/assets/images/hkul/wikipedia/hkul_banner.jpg" stretch="aspectFit"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                    <DatePicker year="2018" month="1" day="15" minDate="1970-01-01" maxDate="2100-12-31"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                msg: 'Hello World!',
                titleData: "Libraries Hours"
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
