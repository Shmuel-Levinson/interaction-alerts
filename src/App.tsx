import React, {useState} from 'react';
import './App.css';
import {DrugSearchForm} from "./components/drug-search-form/drug-search-form";
import {DrugInteractionAlerts} from "./components/drug-interaction-alerts";
import {Drug, InteractionAlert} from "./types";
import {PrescriptionTable} from "./components/prescription-table/prescription-table";
import {getInteractionAlerts} from "./api";
import {parseInteractionAlertsData} from "./data-parsers";
import {cloneDeep} from "lodash";

function App() {
    const [drugsInPrescriptionTable, setDrugsInPrescriptionTable] = useState<Drug[]>([])
    const [alerts, setAlerts] = useState<InteractionAlert[]>([])

    function setDrugsAndRecalculateAlerts(newDrugsList: Drug[]) {
        setDrugsInPrescriptionTable(newDrugsList)
        getInteractionAlerts(newDrugsList).then(alertsData => {
            const alerts = parseInteractionAlertsData(alertsData)
            setAlerts(alerts)
        })

    }

    function removeDrugFromPrescriptionTable(index: number) {
        const newDrugsList: Drug[] = drugsInPrescriptionTable.filter((_, i) => index !== i)
        //filtering by index to avoid removing duplicate drugs in list (they may have different dates for instance)
        setDrugsAndRecalculateAlerts(newDrugsList)
    }

    function updatePrescriptionDate(index: number, date: Date){
        const newDrugsList = [...drugsInPrescriptionTable]
        newDrugsList[index].date = date
        setDrugsInPrescriptionTable(newDrugsList)
        // not recalculating alerts due to assumption that dates are not tested when checking interactions
    }

    function addDrugToPrescriptionTable(drug: Drug) {
        if (!drug) {
            return
        }
        const newDrug = cloneDeep(drug)
        const newDrugsList = [...drugsInPrescriptionTable, newDrug]
        setDrugsAndRecalculateAlerts(newDrugsList)
    }

    return (
        <div className="App">
            <DrugSearchForm
                addDrugToPrescriptionTable={addDrugToPrescriptionTable}
            />
            <PrescriptionTable
                selectedDrugs={drugsInPrescriptionTable}
                removeItem={(index: number) => removeDrugFromPrescriptionTable(index)}
                updatePrescriptionDate={updatePrescriptionDate}
            />

            <DrugInteractionAlerts
                interactionAlerts={alerts}
                hasSelectedDrugs={drugsInPrescriptionTable.length > 0}
            />
        </div>
    );
}

export default App;
