import {ModalDatetimepicker} from "nativescript-modal-datetimepicker";
import moment from "moment";

const TODAY = new Date();

const picker = new ModalDatetimepicker();

export default {
    async showDateModal(date = TODAY) {
        return picker.pickDate({
            title: "Select Date", // iOS only
            theme: "light", // ios only
            startingDate: date,
            datePickerMode: "calendar",
        }).then(result => {
            // Note the month is 1-12 (unlike js which is 0-11)
            const date = `${result.day}-${result.month}-${result.year}`;
            console.log(`Picked date is: ${date}`);

            return moment(date, "D-M-YYYY");
        });
    }
}