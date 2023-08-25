import * as React from 'react';
import circleInformation from './icons/circle-information.svg'
import triangleExclamation from './icons/triangle-exclamation.svg'

export function InteractionAlertBubble(props: { description: string, severity: string }) {
    const highSeverity = props.severity === 'high'
    const severityClass = highSeverity ? 'high-severity-interaction-alert' : 'normal-severity-interaction-alert'
    const alertIcon = highSeverity ? triangleExclamation : circleInformation
    return (
        <div className={`interaction-alert-container ${severityClass}`}>
            <div className={'interaction-alert-icon-container'}>
                <img src={alertIcon} className={'icon-img-container'} alt={''}/>
            </div>
            <div className={'interaction-alert-description'}>{props.description}</div>
        </div>
    );
}