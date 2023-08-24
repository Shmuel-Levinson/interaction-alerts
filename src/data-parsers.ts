import {InteractionAlert, Drug} from "./types";
import {get} from "lodash"


// in both APIs I deduced response structure from numerous examples that I'd tested, to the best of my ability
export function parseDrugsData(data: any): Drug[] {
    if (!data || data.length < 1) {
        return []
    }
    const drugNames: [] = data[1]
    const drugCodes: string[][] = data[2]['RXCUIS']
    const drugs: Drug[] = drugNames.map((drugName: string, index: number) => {
        return {codes: drugCodes[index], name: drugName, date: new Date()}
    })
    return drugs
}

export function parseInteractionAlertsData(data: any): InteractionAlert[] {
    const fullInteractionType: [] = get(data, ['fullInteractionTypeGroup', 0, 'fullInteractionType'])
    if (!fullInteractionType) {
        return []
    }
    const interactionAlerts: InteractionAlert[] = []
    fullInteractionType.forEach((item: any) => {
        const representativePair = get(item, ['interactionPair', 0])
        if (representativePair) {
            interactionAlerts.push({description: representativePair.description, severity: representativePair.severity})
        }
    })
    return interactionAlerts
}
