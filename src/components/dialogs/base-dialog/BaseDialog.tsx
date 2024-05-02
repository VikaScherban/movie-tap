import './BaseDialog.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DialogData } from '../../../models/dialog';

function BaseDialog({ title, children, onClose }: DialogData): React.JSX.Element {
  return (
    <div className="dialog-wrapper" data-testid="dialog">
      <div className="dialog-content">
        <div className="dialog-title">{title}</div>
        <button className="dialog-close-button" data-testid="dialog-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="dialog-form">
          {children}
        </div>
      </div>
    </div>
  );
}

export default BaseDialog;
