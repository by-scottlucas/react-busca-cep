import './AddressCard.css';

import { MapPin } from 'lucide-react';
import PropTypes from 'prop-types';

import AddressMap from '../AddressMap/AddressMap';

export default function AddressCard({ cepData }) {
    if (!cepData) return null;

    const addressFields = [
        { label: "CEP", value: cepData.cep },
        { label: "Logradouro", value: cepData.logradouro },
        { label: "Bairro", value: cepData.bairro },
        { label: "Cidade", value: cepData.localidade },
        { label: "Estado", value: cepData.uf },
    ];

    if (cepData.complemento) {
        addressFields.push({
            label: "Complemento",
            value: cepData.complemento
        });
    }

    return (
        <section className="address-card">
            <div className="address-card__header">
                <MapPin size={28} className='text-blue-600' />
                <span className='address-card__header--label'>Endereço Encontrado</span>
            </div>

            <div className="address-card__infos">
                {addressFields.map(({ label, value }) => (
                    <span key={label} className="address-card__info">
                        <p className="address-card__label text-gray-500">{label}</p>
                        <p className="address-card__value text-black font-bold">{value}</p>
                    </span>
                ))}

                <div className='flex flex-col gap-2'>
                    <label className='address-card__label'>
                        Número (Opcional)
                    </label>
                    <input
                        type="text"
                        placeholder="Ex.: 123, 45A, S/N"
                        className="address-card__input"
                    />
                    <span className='text-sm text-gray-500'>
                        Adicione o número para uma localização mais precisa no mapa
                    </span>
                </div>
            </div>

            <AddressMap cep={cepData.cep} />
        </section>
    );
}

AddressCard.propTypes = {
  cepData: PropTypes.string.isRequired
};