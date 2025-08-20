import './Toast.css';

import { X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Toast({ message, onClose }) {
  return (
    <div id="toast-default" className="toast" role="alert">
      <span className="toast__message">{message}</span>
      <button
        type="button"
        className="toast__button"
        aria-label="Close"
        onClick={onClose}
      >
        <X size={18} />
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
