import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default function ParkingMap({ dataParking, onSelectSpot, search }) {
    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(window.innerHeight); 

    const maxColumns = 10;
    const gap = 20;

    const spotSize = Math.floor((stageWidth - (maxColumns + 1) * gap) / maxColumns);

    const columns = maxColumns;

    useEffect(() => {
        const handleResize = () => {
            setStageWidth(window.innerWidth);
            setStageHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const filteredDataParking = dataParking.filter(spot =>
        spot.spot.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ backgroundImage: `url(background.png)`, backgroundPosition: 'center', backgroundSize: 'cover', position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)' 
            }}></div>
            
            {filteredDataParking.length === 0 && search && (
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: '10px 20px',
                    borderRadius: '10px'
                }}>
                    Spot Parking Not Found
                </div>
            )}

            <Stage width={stageWidth} height={stageHeight}>
                <Layer>
                    {filteredDataParking.map((spot, index) => {
                        const col = index % columns;
                        const row = Math.floor(index / columns);

                        const x = col * (spotSize + gap) + gap;
                        const y = row * (spotSize + gap) + gap;

                        return (
                            <React.Fragment key={spot.id}>
                                <Rect
                                    x={x}
                                    y={y}
                                    width={spotSize}
                                    height={spotSize}
                                    fill={spot.available ? 'rgb(5, 186, 41)' : 'rgb(251, 27, 27)'}
                                    stroke="black"
                                    strokeWidth={2}
                                    cornerRadius={15}
                                    onClick={() => onSelectSpot(spot.id)}
                                />
                                <Text
                                    x={x + spotSize / 2 - 10}
                                    y={y + spotSize / 2 - 10}
                                    text={spot.spot}
                                    fontSize={16}
                                    fontStyle='bold'
                                    fontFamily="Arial"
                                    fill="white"
                                    align="center"
                                />
                            </React.Fragment>
                        );
                    })}
                </Layer>
            </Stage>
        </div>
    );
}
