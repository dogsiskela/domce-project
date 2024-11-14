import { Box, Checkbox, FormControlLabel, Grid2, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CustomLabel from "./CustomLabel";

import TerraceIcon from '../../assets/terrace.svg';
import ElevatorIcon from '../../assets/elevator.svg';
import ParkingIcon from '../../assets/parking.svg';
import RenovatedIcon from '../../assets/renovated.svg';
import NewIcon from '../../assets/new.svg';
import FurnitureIcon from '../../assets/furniture.svg';
import BasementIcon from '../../assets/basement.svg';
import DoubleIcon from '../../assets/double.svg';
import RoofIcon from '../../assets/roof.svg';
import GroundIcon from '../../assets/ground.svg';

export default function FlatsFilters({ setFilters }) {
    const [priceRange, setPriceRange] = useState([0, 3000000]);
    const [surface, setSurface] = useState([0, 200]);
    const [rooms, setRooms] = useState([0, 10]);



    const priceMarks = [
        {
            value: 0,
            label: "0 Euro",
        },
        {
            value: 1000000,
            label: "100,000 Euro",
        },
    ];


    const surfaceMarks = [
        {
            value: 0,
            label: "0 Квадрати",
        },
        {
            value: 200,
            label: "200 Квадрати",
        },
    ];

    const roomMarks = [
        {
            value: 0,
            label: "0",
        },
        {
            value: 10,
            label: "10",
        },
    ];
    

    const handleSliderChange = (event, newValue) => {
        setPriceRange(newValue);
        setFilters(prevState => ({ ...prevState, min_price: newValue[0], max_price: newValue[1] }))
    };

    const handleSetSurface = (event, newValue) => {
        setSurface(newValue);
        setFilters(prevState => ({ ...prevState, min_area: newValue[0], max_area: newValue[1] }))

    };
    const handleSetRooms = (event, newValue) => {
        setRooms(newValue);
        setFilters(prevState => ({ ...prevState, min_rooms: newValue[0], max_rooms: newValue[1] }))

    };

    return <Stack sx={{ flex: 1, backgroundColor: "#eeeeee", padding: '20px 40px' }}>
        <Stack>
            <Typography sx={{ color: '#323232', }}>
                Цена
            </Typography>
            <Box sx={{ padding: '0 20px' }}>
                <Slider
                    size="small"
                    value={priceRange}
                    min={0}
                    max={1000000}
                    step={10000}
                    marks={priceMarks}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                    sx={{
                        color: 'orange',
                        '& .MuiSlider-thumb': {
                            borderRadius: '50%',
                        },
                        '& .MuiSlider-valueLabel': {
                            color: 'white',
                        },
                    }}
                />
            </Box>
            <Typography sx={{ color: '#323232', }}>
                Површина
            </Typography>
            <Box sx={{ padding: '0 20px' }}>
                <Slider
                    size="small"
                    value={surface}
                    min={0}
                    max={200}
                    step={1}
                    marks={surfaceMarks}
                    onChange={handleSetSurface}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                    sx={{
                        color: 'orange',
                        '& .MuiSlider-thumb': {
                            borderRadius: '50%',
                        },
                        '& .MuiSlider-valueLabel': {
                            color: 'white',
                        },
                    }}
                />
            </Box>
            <Typography sx={{ color: '#323232', }}>
                Соби
            </Typography>
            <Box sx={{ padding: '0 20px' }}>
                <Slider
                    size="small"
                    value={rooms}
                    min={0}
                    max={10}
                    step={1}
                    onChange={handleSetRooms}
                    marks={roomMarks}
                    valueLabelDisplay="auto"
                    aria-labelledby="price-range-slider"
                    sx={{
                        color: 'orange',
                        '& .MuiSlider-thumb': {
                            borderRadius: '50%',
                        },
                        '& .MuiSlider-valueLabel': {
                            color: 'white',
                        },
                    }}
                />
            </Box>
        </Stack>
        <Grid2>
            <CustomLabel label={'Лифт'} icon={ElevatorIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, elevator: checked }))
            }} />
            <CustomLabel label={'Балкон'} icon={TerraceIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, balcony: checked }))
            }} />
            <CustomLabel label={'Паркинг'} icon={ParkingIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, parking: checked }))
            }} />
            <CustomLabel label={'Реновиран'} icon={RenovatedIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, renovated: checked }))
            }} />
            <CustomLabel label={'Нова градба'} icon={NewIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, new_building: checked }))
            }} />
            <CustomLabel label={'Наместен'} icon={FurnitureIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, furnished: checked }))
            }} />
            <CustomLabel label={'Подрум'} icon={BasementIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, basement: checked }))
            }} />
            <CustomLabel label={'Дуплекс'} icon={DoubleIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, duplex: checked }))
            }} />
            <CustomLabel label={'Поткровје'} icon={RoofIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, attic: checked }))
            }} />
            <CustomLabel label={'Приземје'} icon={GroundIcon} onChecked={(checked: boolean) => {
                setFilters(prevState => ({ ...prevState, ground_floor: checked }))
            }} />
        </Grid2>
    </Stack>
}