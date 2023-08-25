import * as React from 'react';
import {InteractionAlert} from "../../types";
import {InteractionAlertBubble} from "./interaction-alert-bubble";

export function DrugInteractionAlerts(props: {
    interactionAlerts: InteractionAlert[]
    hasSelectedDrugs: boolean
}) {
    return (
        <div>
            {props.interactionAlerts.length > 0 &&
                props.interactionAlerts.map((alert, index: number) =>
                <InteractionAlertBubble
                    key={`interaction-alert-bubble-${index}`}
                    description={alert.description}
                    severity={alert.severity}
                />
            )}
            {props.hasSelectedDrugs && props.interactionAlerts.length < 1 &&
                <div>No interaction alerts</div>
            }
        </div>
    );
};