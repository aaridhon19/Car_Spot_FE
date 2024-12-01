export default function Info() {
    const infoItems = [
        {
            color: 'rgb(5, 186, 41)',
            label: 'Available'
        },
        {
            color: 'rgb(251, 27, 27)',
            label: 'Booked'
        }
    ];

    return (
        <div className="info">
            {infoItems.map((item, index) => (
                <div key={index} className="info-item">
                    <div className="info-color" style={{ backgroundColor: item.color }}></div>
                    <div className="info-label">{item.label}</div>
                </div>
            ))}
        </div>
    )
}