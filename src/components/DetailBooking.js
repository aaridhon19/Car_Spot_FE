import 'bootstrap/dist/css/bootstrap.min.css';

export default function DetailBooking({ onDetail, spotSelected }) {
    return (
        <div className='container my-4' style={{paddingLeft:'10px', paddingRight:'10px'}}>
            <div className='text-center mb-4'>
                <h3 className='text-danger fw-bold'>Detail Parking Spot <span>{spotSelected}</span></h3>
            </div>
            {onDetail && onDetail.length === 0 ? (
                <p>No booking</p>
            ) : (
                <div className='card shadow-sm h-100'>
                    {onDetail.map((detail, index) => (
                        <div className='card-body d-flex flex-column justify-content-center align-items-center text-center' key={index} style={{minHeight:'100px'}}>
                            <p className='card-text mb-2'>
                                <strong>Name :</strong> {detail.name}
                            </p>
                            <p className='card-text mb-2'>
                                <strong>Vehicle Number :</strong> {detail.vehicleRegionCode} {detail.vehicleNumberDigits} {detail.vehicleLetterCode}
                            </p>
                            <p className='card-text'>
                                <strong>Duration :</strong> {detail.durationHours} Hours {detail.durationMinutes} Minutes
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
