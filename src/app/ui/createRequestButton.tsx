import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import CreateRequestModal from "./createRequestModal";
import { useState } from "react";

export default function CreateRequestButton() {
    const isAuthd = useSelector((state: any) => state.auth.isAuthenticated)
    const [open, setOpen] = useState<boolean>(false)

    return (
        isAuthd &&
            <>
                <Button variant="contained" onClick={() => setOpen(true)}>
                    <AddIcon />
                </Button>
                <CreateRequestModal open={open} handleClose={() => setOpen(false)} />
            </>
    )
}