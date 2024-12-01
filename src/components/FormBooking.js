import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FormBooking({ onForm, spotSelected }) {
    const [formParking, setFormParking] = useState({
        name: '',
        vehicleRegionCode: '',
        vehicleNumberDigits: '',
        vehicleLetterCode: '',
        durationHours: '',
        durationMinutes: '',
        spot: spotSelected || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === "vehicleRegionCode" || name === "vehicleLetterCode") && !/^[a-zA-Z]*$/.test(value)) {
            return;
        }

        if (name === "vehicleNumberDigits" && value !== '' && !/^\d+$/.test(value)) {
            return;
        }

        if ((name === "durationHours" || name === "durationMinutes") && value.length > 2) {
            return;
        }

        setFormParking({
            ...formParking,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, vehicleRegionCode, vehicleNumberDigits, vehicleLetterCode, durationHours, durationMinutes, spot } = formParking;

        if (!name) {
            Swal.fire({
                icon: 'error',
                title: 'Name is required!',
            });
            return;
        }
        if (!vehicleRegionCode || !vehicleNumberDigits || !vehicleLetterCode) {
            Swal.fire({
                icon: 'error',
                title: 'Vehicle Number is required!',
            });
            return;
        }

        if (!durationHours || !durationMinutes) {
            Swal.fire({
                icon: 'error',
                title: 'Duration is required!',
            });
            return;
        }

        Swal.fire({
            title: "Are you sure to order this booking?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: 'rgb(7, 219, 103)',
            cancelButtonText: "No",
            cancelButtonColor: 'rgb(251, 27, 27)',
        }).then((result) => {
            if (result.isConfirmed) {
                onForm({
                    name,
                    vehicleRegionCode,
                    vehicleNumberDigits,
                    vehicleLetterCode,
                    durationHours,
                    durationMinutes,
                    spot,
                });
                setFormParking({
                    name: '',
                    vehicleRegionCode: '',
                    vehicleNumberDigits: '',
                    vehicleLetterCode: '',
                    durationHours: '',
                    durationMinutes: '',
                    spot: spotSelected || ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Success!',
                    text: `Spot ${spotSelected} success booked for ${name}!`,
                });
            }
        });

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='text-center mb-4'>
                <h3 className='text-success fw-bold'>Parking Spot <span>{formParking.spot}</span></h3>
            </div>
            <div className='my-3'>
                <strong className='form-label'>Name</strong>
                <input className='form-control' type="text" name="name" value={formParking.name} onChange={handleChange} placeholder='Your Name' minLength={1} maxLength={25} />
            </div>
            <div className='mb-3'>
                <strong className='form-label'>Vehicle Number</strong>
                <div className='d-flex'>
                    <input className='form-control me-2' type="text" name="vehicleRegionCode" value={formParking.vehicleRegionCode} onChange={handleChange} placeholder='Region Code' maxLength={2} minLength={1} />
                    <input className='form-control me-2' type="text" name="vehicleNumberDigits" value={formParking.vehicleNumberDigits} onChange={handleChange} placeholder='Number' maxLength={4} minLength={0} />
                    <input className='form-control' type="text" name="vehicleLetterCode" value={formParking.vehicleLetterCode} onChange={handleChange} placeholder='Letter Code' minLength={1} maxLength={3} />
                </div>
            </div>
            <div className='mb-3'>
                <strong className='form-label'>Duration</strong>
                <div className='d-flex'>
                    <input className='form-control me-2' type="number" name="durationHours" value={formParking.durationHours} onChange={handleChange} min={0} max={48} placeholder='Hours' />
                    <input className='form-control' type="number" name="durationMinutes" value={formParking.durationMinutes} onChange={handleChange} min={0} max={60} placeholder='Minutes' />
                </div>
            </div>
            <input type="hidden" name="spot" value={formParking.spot} onChange={handleChange} />
            <button className='btn-book' type="submit">Book Spot {formParking.spot}</button>
        </form>
    );
}
