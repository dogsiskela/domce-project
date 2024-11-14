import { Input, Stack, Typography } from "@mui/material"
import Logo from '../../assets/logo.jpg';


export default function Header({ setFilters }) {
    return (<Stack direction={"row"} sx={{ backgroundColor: 'white', height: '80px', minHeight: '50px', borderBottom: '1px solid lightgray', alignItems: 'center', padding: '0 30px' }}>
        <img src={Logo} height={120} width={70} style={{ objectFit: 'cover' }} />
        <Input sx={{
            backgroundColor: "#F0F5F6",
            padding: '5px 15px',
            borderRadius: '100px',
            height: 'min-content',
            width: '300px',
            marginLeft: '30px'
        }}
            onChange={(e) => setFilters(prevState => ({ ...prevState, searchQuery: e.target.value }))}
            disableUnderline={true}
            placeholder="Локација или населба"
        />
        <Stack direction={'row'} sx={{ marginLeft: 'auto', alignItems: 'center', gap: '20px' }}>
            <Typography variant="subtitle1" sx={{ color: 'black', fontWeight: 'bolder' }}>Мапа</Typography>
            <Typography sx={{ color: 'black' }}>За нас</Typography>
            <Typography sx={{ backgroundColor: 'orange', borderRadius: '100px', padding: '5px 15px', color: 'black' }}>Најави се</Typography>
        </Stack>
    </Stack>)
}