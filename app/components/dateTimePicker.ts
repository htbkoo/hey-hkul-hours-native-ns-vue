import {ModalDatetimepicker} from "nativescript-modal-datetimepicker";
import moment from "moment";

const picker = new ModalDatetimepicker();

export default {
    async showDateModal() {
        return picker.pickDate({
            title: "Select Date", // iOS only
            theme: "light", // ios only
            datePickerMode: "calendar",
        }).then(result => {
            // Note the month is 1-12 (unlike js which is 0-11)
            const date = `${result.day}-${result.month}-${result.year}`;
            console.log(`Picked date is: ${date}`);

            // var jsdate = new Date(result.year, result.month - 1, result.day);
            // this.selectedDate = moment(date, "d-M-YYYY");
            return moment(date, "D-M-YYYY");
        });
    }
}

// Pick Date
// exports.selectDate = function() {};

/*
// Pick Time
exports.selectTime = function() {
    picker
        .pickTime()
        .then(result => {
            console.log("Time is: " + result.hour + ":" + result.minute);
        })
        .catch(error => {
            console.log("Error: " + error);
        });
};
*/