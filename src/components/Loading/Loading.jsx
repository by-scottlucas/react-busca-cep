import './Loading.css';

import PropTypes from 'prop-types';

export default function Loading({ size = 40, border = 6 }) {
    return (
        <div className="loading" role="status" aria-live="polite">
            <div
                aria-hidden="true"
                className={`loading__spinner`}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderWidth: `${border}px`
                }}
            />
        </div>
    );
}

Loading.propTypes = {
    size: PropTypes.number,
    border: PropTypes.number,
};
