import { InfoBox } from '@react-google-maps/api';
import { AdvancedMarker, InfoWindow, Marker, Pin } from '@vis.gl/react-google-maps';
import { useState } from 'react';

import FlatIcon from '../../../assets/house.svg';
import { Box, Stack } from '@mui/material';

export default function CustomMarker({ position, item, setSelectedItem, zoom }) {
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    console.log(zoom)
    return (
        <AdvancedMarker position={position}
            onClick={() => {
                setShowInfoWindow(true);
                setSelectedItem(item)
            }}
        // onMouseLeave={() => setShowInfoWindow(false)}
        >
            {/* <Pin
                background={'#d19f0a'}
                borderColor={'#323232'}
                glyphColor={'#323232'}

            /> */}
            <Stack sx={{
                height: '35px', width: '35px', alignItems: 'center', justifyContent: 'center', backgroundColor: '#323232', borderRadius: '100px', border: '2px solid orange',
                "&:before": {
                    position: 'absolute',
                    display: 'block',
                    content: '""',
                    height: (zoom - 15) > 0 ? 70 * ((zoom - 15) * (zoom - 15)) : 0 + 'px',
                    width: (zoom - 15) > 0 ? 70 * ((zoom - 15) * (zoom - 15)) : 0 + 'px',
                    zIndex: -1,
                    borderRadius: '1000px',
                    backgroundColor: 'orange',
                    opacity: 0.2
                }
            }}>
                <img height={20} width={20} src={FlatIcon} />
            </Stack>
            {
                showInfoWindow && <InfoWindow style={{ height: '300px', width: '300px' }} position={position} onCloseClick={() => {
                    setShowInfoWindow(false);
                    setSelectedItem(null)
                }}>
                    <img src={item.images[0]} height={100} width={200} style={{ objectFit: 'cover' }} />
                    <h2 style={{ color: 'black' }}>{item.title}</h2>
                    <p style={{ color: 'black' }}><b>{item.price}</b> {item.currency}</p>
                    <p style={{ color: 'black' }}>{item.description}</p>
                </InfoWindow>
            }
        </AdvancedMarker >
    );
}