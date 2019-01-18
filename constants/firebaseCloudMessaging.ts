const HEY_HKUL_HOURS_FCM_TOPIC_NAME_HOURLY = "hey_hkul_hours_fcm_hourly";

export function getHourlyTopicName(hourInDay) {
    return `${HEY_HKUL_HOURS_FCM_TOPIC_NAME_HOURLY}_${hourInDay}`;
}

export const HEY_HKUL_HOURS_FCM_TOPIC_NAME = "hey_hkul_hours_fcm_daily";