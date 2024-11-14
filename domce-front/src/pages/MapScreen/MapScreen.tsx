import { useCallback, useRef, useState } from 'react';

import { Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import CustomMarker from './components/CustomMarker';
import { useQuery } from 'react-query';
import axios from 'axios';
import { CircularProgress, Grid2, Stack, Typography } from '@mui/material';
import { mapTheme } from '../../assets/mapTheme';
import Header from '../../components/Header/Header';
import CardItem from './CardItem';
import FlatsFilters from './FlatsFIlters';

import TerraceIcon from '../../assets/terrace.svg';
import ElevatorIcon from '../../assets/elevator.svg';
import ParkingIcon from '../../assets/parking.svg';
import RenovatedIcon from '../../assets/renovated.svg';
import NewIcon from '../../assets/new.svg';
import FurnitureIcon from '../../assets/furniture.svg';
import BasementIcon from '../../assets/basement.svg';
import DoubleIcon from '../../assets/double.svg';
import GroundIcon from '../../assets/ground.svg';


export default function MapScreen() {
    const iconsMap = {
        'balcony': TerraceIcon, 'elevator': ElevatorIcon, 'ground_floor': GroundIcon, 'parking': ParkingIcon, 'attic': BasementIcon, 'new_building': NewIcon, 'furnished': FurnitureIcon, 'basement': BasementIcon, 'duplex': DoubleIcon, 'renovated': RenovatedIcon

    }

    const [selectedItem, setSelectedItem] = useState(null)
    const [zoom, setZoom] = useState(null);
    const [bounds, setBounds] = useState({});

    const [showMap, setShowMap] = useState(true);

    const [filters, setFilters] = useState({});

    function useDebounce(callback, delay) {
        const timeoutRef = useRef(null);

        const debouncedCallback = useCallback((...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        }, [callback, delay]);

        return debouncedCallback;
    }


    function toQueryString(params) {
        const queryString = Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return `?${queryString}`;
    }

    const {
        isLoading,
        data,
    } = useQuery({
        queryKey: ['locations', filters, bounds],
        queryFn: async ({ pageParam = 0 }) => {
            return axios.get('http://localhost:4000/apartments/all' + toQueryString({ ...filters, ...bounds }))
        },
    });

    const positions = data?.data?.items ? data.data.items.map(el => ({ position: { lat: el.lat, lng: el.lng }, item: el })) : []

    const updateBounds = useDebounce((newBounds) => {
        setBounds(newBounds);
    }, 750);

    const mapPins = () => {
        let pins = []
        positions.map(el => {
            pins.push(<CustomMarker
                position={el.position}
                item={el.item}
                setSelectedItem={setSelectedItem}
                zoom={zoom}
            />)
        })
        return pins;
    }

    function getBoxes(item) {
        let items = []
        for (const i in Object.keys(iconsMap)) {
            const itemKey = Object.keys(iconsMap)[i]
            if (item[itemKey]) {
                items.push(<img style={{ border: '1px solid lightgray', width: 'min-content', whiteSpace: 'nowrap', borderRadius: '5px', padding: '5px 10px', margin: '5px' }} src={iconsMap[itemKey]} height={30} />)
            }
        }
        return items;
    }


    return (
        <Stack sx={{ width: '100vw', height: '100vh', maxHeight: '100vh', overflow: 'auto' }}>
            <Header setFilters={setFilters} />
            <Stack direction={'row'} sx={{ flex: 1, overflow: 'auto' }} >
                <FlatsFilters setFilters={setFilters} />
                <Stack flex={3} sx={{ backgroundColor: "white", padding: '20px 30px', overflow: 'auto' }}>
                    <Typography color={'black'} sx={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => setShowMap(prevState => !prevState)}>{showMap ? "Hide map" : "Show map"}</Typography>
                    <Typography variant="h5" sx={{ color: 'black' }}>{selectedItem ? selectedItem.title : <>Станови во околината на <strong>Скопје, Македонија</strong></>}</Typography>
                    {isLoading && <Stack sx={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}> <CircularProgress sx={{ color: 'orange' }} /></Stack>}
                    {!selectedItem && !isLoading && <Stack>
                        <Typography variant="subtitle1" sx={{ color: 'gray', padding: '10px 0' }}>{data?.data?.items.length} <b>станови</b></Typography>
                        <Grid2 container direction={'row'}>
                            <CardItem itemsList={data?.data?.items} />
                        </Grid2>

                    </Stack>}
                    {selectedItem &&
                        <Stack sx={{ margin: '20px 0 0px 0' }}>
                            <img src={selectedItem.images[0]} height={300} width={'100%'} style={{ objectFit: 'cover' }} />
                            <Stack direction={'row'} sx={{ gap: '10px', alignItems: 'center', padding: '15px 0' }}>
                                <Typography variant='h5' style={{ color: 'green', fontWeight: 'bolder' }}><b>{selectedItem.price}</b> {selectedItem.currency}</Typography>

                                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', border: '1px solid lightgray', color: 'black', width: 'min-content', whiteSpace: 'nowrap', borderRadius: '5px', padding: '5px 10px', margin: '5px' }}>{selectedItem.area}m2</Typography>

                            </Stack>
                            <Grid2 sx={{ margin: '0px 0px 10px 0' }}>{getBoxes(selectedItem)}
                            </Grid2>
                            <Typography variant='body1' color='gray'>Опис</Typography>
                            <Typography variant='subtitle1' style={{ color: 'black', backgroundColor: 'whitesmoke', border: '1px solid #eeeeee', borderRadius: '5px', padding: '5px' }}>{selectedItem.description}</Typography>
                        </Stack>
                    }

                </Stack>

                {showMap && <Stack direction={'row'} flex={3} sx={{ width: '50%', height: '100%' }}>
                    <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: 41.997345, lng: 21.427996 }}
                        onCameraChanged={(ev: MapCameraChangedEvent) => {
                            console.log(
                                "camera changed:",
                                ev.detail.bounds,
                                "zoom:",
                                ev.detail.zoom
                            )
                            updateBounds(ev.detail.bounds);
                            setZoom(ev.detail.zoom)
                        }
                        }
                        styles={mapTheme}
                        mapTypeId={'roadmap'}
                        disableDefaultUI={true}
                        mapId={'123'}
                    >
                        {mapPins()}
                    </Map>
                </Stack>}
            </Stack>
        </Stack >
    )
}