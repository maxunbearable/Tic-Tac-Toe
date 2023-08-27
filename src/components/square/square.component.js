import CloseIcon from '@mui/icons-material/Close';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Grid } from "@mui/material";
export default function Square({ value, onSquareClick }) {
    return <Grid onClick={onSquareClick} className={value === 'X' ? 'x square' : 'o square' } minHeight={160} minWidth={160}>
        {
            value === 'X'
                ? (<CloseIcon fontSize="inherit"/>)
                : value === 'O' ? (<RadioButtonUncheckedIcon fontSize="inherit"/>)
                    : ''
        }
    </Grid >;
}