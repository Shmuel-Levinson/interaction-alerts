import React, {forwardRef} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const PrescriptionDatePicker = (props: { onChangeCallback: Function, prescriptionDate?: Date}) => {
    // @ts-ignore
    const CustomInput = forwardRef(({value, onClick}, ref) => (
        // @ts-ignore
        <div className="date-picker-input" onClick={onClick} ref={ref}>
            {value}
        </div>
    ));
    return (
        <DatePicker
            selected={props.prescriptionDate}
            onChange={(date: Date | null) => {
                props.onChangeCallback(date)
            }}
            customInput={<CustomInput/>}
        />
    );
};