import React from 'react'

export default () => {
    return (
        <div style={{ position: "fixed", top: "47%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <div className="spinner-border text-info" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
