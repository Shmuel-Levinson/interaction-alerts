import {Drug} from "./types";
import axios from "axios";

export async function searchDrugs(term: string): Promise<any> {
    const trimmedTerm = term.trim()
    if (!trimmedTerm) {
        return []
    }
    let res = await axios.get(`https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${trimmedTerm}&ef=RXCUIS`)
    return res.data
}

export async function getInteractionAlerts(drugs: Drug[]): Promise<any> {
    if (!drugs || drugs.length < 1) {
        return []
    }
    const codes = drugs.map(drug => drug.codes[0]).join("+")
    let res = await axios.get(`https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${codes}`)
    return res.data
}

