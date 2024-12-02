import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

export default function ParkingMap({ dataParking, onSelectSpot, search }) {
    const [stageWidth, setStageWidth] = useState(window.innerWidth);
    const [stageHeight, setStageHeight] = useState(window.innerHeight);
    const [hoveredSpot, setHoveredSpot] = useState(null);

    const handleMouseEnter = (id) => {
        setHoveredSpot(id);
    }

    const handleMouseLeave = () => {
        setHoveredSpot(null);
    }

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
        <div className='parking-map-cover'>
            <div className='parking-map-cover-color' />
            {filteredDataParking.length === 0 && search && (
                <div className='parking-map-not-found'>
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
                                    scale={
                                        hoveredSpot === spot.id
                                            ? { x: 1.02, y: 1.02 }
                                            : { x: 1, y: 1 }
                                    }
                                    onMouseEnter={() => handleMouseEnter(spot.id)}
                                    onMouseLeave={handleMouseLeave}
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
