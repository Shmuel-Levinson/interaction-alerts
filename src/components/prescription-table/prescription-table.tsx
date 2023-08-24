import * as React from 'react';
import {Drug} from "../../types";
import {PrescriptionTableItem} from "./prescription-table-item";


export function PrescriptionTable(props: {
    selectedDrugs: Drug[]
    removeItem: Function
    updatePrescriptionDate: Function
}) {
    const selectedDrugs: Drug[] = props.selectedDrugs
    return (
        <div className={'prescription-table-container'}>
            {selectedDrugs.length === 0 &&
                <div>No drugs selected</div>
            }
            {selectedDrugs.length > 0 &&
                <div className={'prescription-table'}>
                    {selectedDrugs.map((drug: Drug, index: number) =>
                        <PrescriptionTableItem
                            drug={drug}
                            removeItem={() => props.removeItem(index)}
                            handleDateChange={(date: Date) => props.updatePrescriptionDate(index, date)}/>
                    )}
                </div>
            }
        </div>
    );
};