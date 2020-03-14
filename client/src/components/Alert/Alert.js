import React from 'react';
import { useSelector } from 'react-redux';

export default () => {
    const alerts = useSelector(state => state.alert);
    console.log(alerts);
    const alertJSX = alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.message}
        </div>
    ));
    return (
        <div style={{ position: "fixed", bottom: 0, right: 0, zIndex: 1000, padding: "1rem", maxWidth: "100%", height: "auto" }}>
            {alertJSX}
        </div>
    );
}