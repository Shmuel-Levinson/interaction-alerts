import * as React from 'react';
import {Drug} from "../../types";
import {PrescriptionDatePicker} from "../date-picker";
import closeCircle from "./icons/close-circle.svg"

function getDrugNameAndForm(fullName: string) {
    const split = fullName.split("(")
    return {
        name: split[0],
        form: split[1].slice(0, -1)
    }
}

export function PrescriptionTableItem(props: {
    drug: Drug
    removeItem: Function
    handleDateChange: Function
}) {
    const drugNameAndForm = getDrugNameAndForm(props.drug.name)

    return (
        <div className={'prescription-table-item'}>
            <div className={'prescription-table-item-name-and-form-container'}>
                <div className={'prescription-table-item-name'}>{drugNameAndForm.name}</div>
                <div className={'prescription-table-item-form'}>({drugNameAndForm.form})</div>
            </div>
            <div className={'prescription-table-item-calendar'}>
                <PrescriptionDatePicker onChangeCallback={(date:Date)=>{props.handleDateChange(date)}} prescriptionDate={props.drug.date}/>
            </div>
            <div onClick={() => props.removeItem()}>
                <img className={'icon-img-container'} src={closeCircle} alt={''}/>
            </div>
        </div>
    );
}