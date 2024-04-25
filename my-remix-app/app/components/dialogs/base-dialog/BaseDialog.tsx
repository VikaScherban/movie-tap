import {DialogData} from "../../../models/dialog";
import React from "react";

function BaseDialog({title, children, onClose}: DialogData): React.JSX.Element {
    return (
        <div className="dialog-wrapper" data-testid="dialog">
            <div className="dialog-content">
                <div className="dialog-title">{title}</div>
                <button className="dialog-close-button" data-testid="dialog-close-button" onClick={onClose}>X</button>
                <div className="dialog-form">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BaseDialog;
