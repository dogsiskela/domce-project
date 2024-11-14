import { Box, Card, Grid2, Typography } from "@mui/material";

import TerraceIcon from '../../assets/terrace.svg';
import ElevatorIcon from '../../assets/elevator.svg';
import ParkingIcon from '../../assets/parking.svg';
import RenovatedIcon from '../../assets/renovated.svg';
import NewIcon from '../../assets/new.svg';
import FurnitureIcon from '../../assets/furniture.svg';
import BasementIcon from '../../assets/basement.svg';
import DoubleIcon from '../../assets/double.svg';
import GroundIcon from '../../assets/ground.svg';

const iconsMap = {
    'balcony': TerraceIcon, 'elevator': ElevatorIcon, 'ground_floor': GroundIcon, 'parking': ParkingIcon, 'attic': BasementIcon, 'new_building': NewIcon, 'furnished': FurnitureIcon, 'basement': BasementIcon, 'duplex': DoubleIcon, 'renovated': RenovatedIcon

}
export default function CardItem({ itemsList }) {
    function getBoxes(item) {
        let items = []
        for (const i in Object.keys(iconsMap)) {
            const itemKey = Object.keys(iconsMap)[i]
            if (item[itemKey]) {
                items.push(<img style={{ border: '1px solid lightgray', width: 'min-content', whiteSpace: 'nowrap', borderRadius: '5px', padding: '2px 5px' }} src={iconsMap[itemKey]} height={20} />)
            }
        }
        return items;
    }
    const getItems = () => {
        const items = []
        for (let i = 0; i < itemsList?.length; i++) {
            const item = itemsList[i]
            items.push(
                <Card sx={{
                    // height: '`0px',
                    width: '250px',
                    background: 'white',
                    margin: '20px',
                    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
                    borderRadius: '15px',
                    border: '1px solid lightgray'
                }}>
                    <Box sx={{ position: 'relative' }}>
                        <img src={item.images[0]} height={150} width={300} style={{ objectFit: 'cover' }} />
                        <Box sx={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', borderRadius: '100px', padding: '2px 10px' }}>
                            Се издава
                        </Box>
                    </Box>
                    <Box sx={{ padding: '10px' }}>
                        <Typography variant='subtitle1' style={{ color: 'green', fontWeight: 'bolder' }}><b>{item.price}</b> {item.currency}</Typography>
                        <Typography variant='body1' sx={{ color: 'black', fontWeight: 500 }}>{item.title}</Typography>
                        <Grid2 container gap='5px'>
                            <Grid2 sx={{ border: '1px solid lightgray', width: 'min-content', whiteSpace: 'nowrap', borderRadius: '5px', padding: '2px 5px' }}>
                                <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>{item.rooms} rooms</Typography>
                            </Grid2>
                            <Grid2 sx={{ border: '1px solid lightgray', width: 'min-content', whiteSpace: 'nowrap', borderRadius: '5px', padding: '2px 5px' }}>
                                <Typography variant='body1' sx={{ color: 'black', fontWeight: 'bold' }}>{item.area}m2</Typography>
                            </Grid2>
                            {getBoxes(item)}
                        </Grid2>
                    </Box>
                </Card >
            );
        }

        return items;
    }

    return <Grid2 container direction={'row'}>
        {getItems()}
    </Grid2>
}