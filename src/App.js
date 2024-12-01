import './global.css';
import React, { useState } from 'react';
import SearchParking from './components/SearchParking';
import ParkingMap from './components/ParkingMap';
import FormBooking from './components/FormBooking';
import DetailBooking from './components/DetailBooking';
import dataParkings from './datadummy/dataParkings';
import bookingParking from './datadummy/bookingParking';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Info from './components/Info';

export default function App() {
  const [dataParking, setDataParking] = useState(dataParkings);
  const [booking, setBooking] = useState(bookingParking);
  const [search, setSearch] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleBook = (book) => {
    const spot = dataParking.find((s) => s.spot === book.spot);
    if (spot && spot.available) {
      const updatedDataParking = dataParking.map((s) =>
        s.spot === spot.spot ? { ...s, available: false } : s
      );
      setDataParking(updatedDataParking);
      setBooking([...booking, book]);
    }
  };

  const handleSearch = (value) => {
    setSearch(value.toLowerCase());
  };

  const filteredParking = dataParking.filter((spot) =>
    search ? spot.spot.toLowerCase().includes(search) : true
  );

  const handleSelectedSpot = (id) => {
    console.log(`Spot ${id} selected`);
    setSelectedSpot(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedSpot(null);
  };

  const getSelectedSpotDetails = () => {
    return booking.filter((book) => book.spot === selectedSpotData.spot);
  };

  const selectedSpotData = dataParking.find((spot) => spot.id === selectedSpot);

  return (
    <div className="App">
      <div className='title'>
        <div
          style={{
            width: '50px',
            height: '60px',
            backgroundImage: `url(logo.webp)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            marginTop: '12px',
            borderRadius: '50%',
          }}
        />
        <h1 className='title-h1'>ARKING SPOT CAR SYSTEM</h1>
      </div>
      <SearchParking onSearch={handleSearch} />
      <div className='parking-map'>
        <div className='parking-map-body'>
          <ParkingMap dataParking={filteredParking} onSelectSpot={handleSelectedSpot} search={search}/>
        </div>

        {/* Modal Bootstrap */}
        <Modal show={modalIsOpen} onHide={closeModal} centered size='lg'>
          <Modal.Body>
            <button
              type="button"
              className="btn-close position-absolute top-4 end-0 me-3"
              onClick={closeModal}
              aria-label="Close"
            ></button>
            {selectedSpotData ? (
              <div>
                {selectedSpotData.available === false ? (
                  <DetailBooking onDetail={getSelectedSpotDetails()} spotSelected={selectedSpotData.spot} />
                ) : (
                  <FormBooking onForm={handleBook} spotSelected={selectedSpotData.spot} />
                )}
              </div>
            ) : (
              <p>Spot not found.</p>
            )}
          </Modal.Body>
        </Modal>
      </div>
      <Info />
    </div>
  );
}
