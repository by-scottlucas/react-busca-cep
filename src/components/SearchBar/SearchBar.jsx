import './SearchBar.css';

import { MapPin, Search } from 'lucide-react';
import PropTypes from 'prop-types';

export default function SearchBar({ cep, onCepChange, onSearch }) {
    return (
        <>
            <div className="logotipo">
                <div className="logotipo__icon-box">
                    <MapPin size={30} className="logotipo__icon" />
                </div>

                <span className="logotipo__label">
                    BUSCA
                    <span className="text-blue-600">CEP</span>
                </span>
            </div>

            <div className="input-box">
                <input
                    type="text"
                    placeholder="00000-000"
                    value={cep}
                    onChange={onCepChange}
                    className="input-box__input"
                />
                <button onClick={onSearch} className="input-box__button">
                    <Search
                        size={24}
                        className="text-white"
                    />
                </button>
            </div>
        </>
    )
}

SearchBar.propTypes = {
  cep: PropTypes.string.isRequired,
  onCepChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};