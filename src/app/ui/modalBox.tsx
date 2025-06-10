import { Box, useMediaQuery } from "@mui/material"
import { ReactNode } from "react"

export default function ModalBox({ children }: {children: ReactNode}) {
    const isSmallScreen = useMediaQuery('(max-width:600px)')
    
    const currentBoxStyle = {
        ...boxStyle,
        width: isSmallScreen ? 300 : boxStyle.width
    }
    
    return (
        <Box sx={currentBoxStyle}>
            {children}
        </Box>
    )
}

let boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
