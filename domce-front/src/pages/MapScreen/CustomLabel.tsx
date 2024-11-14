import { Box, Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function CustomLabel({ label, icon, onChecked }) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onChecked(event.target.checked)

    };

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    sx={{
                        display: 'none',
                    }}
                />
            }
            label={<Stack direction={"row"} sx={{ aligItems: 'center', gap: '5px' }}>
                <img height={20} width={20} src={icon} />
                <Typography variant="body2">
                    {label}
                </Typography>
            </Stack>}
            sx={{
                color: 'black',
                backgroundColor: checked ? 'orange' : 'white',
                padding: '5px 10px',
                borderRadius: '100px',
                transition: 'background-color 0.3s ease',
                margin: '5px'
            }}
        />
    );
}