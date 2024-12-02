import infoItems from "../datadummy/infoItem"

export default function Info() {
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