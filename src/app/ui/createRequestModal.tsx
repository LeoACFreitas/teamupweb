import { Alert, Button, CircularProgress, Modal, TextField } from "@mui/material";
import GameAutocomplete from "./gameAutocomplete";
import { TORequest, TOGame } from '../types';
import { useState } from "react";
import ModalBox from "./modalBox";
import { useFetch } from "../lib/fetchContext.js";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { incrementRequestsChangedOnSession } from "../lib/requestSlice";

export default function CreateRequestModal({open, handleClose}: {open: boolean, handleClose: any}) {
    const [request, setRequest] = useState<TORequest>({})
    const [loading, setLoading] = useState(false)
    const fetchWithAuth = useFetch()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    function submitForm() {
        setLoading(true)
        fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/request`, { method: 'POST', body: JSON.stringify(request) })
        .then((response: Response) => {
            if (!response.ok) {
                response.text().then((response) => enqueueSnackbar(response, { variant: 'error' }))
                return
            }
            enqueueSnackbar('Request created successfully!', { variant: 'success' })
            dispatch(incrementRequestsChangedOnSession())
            handleClose()
        })
        .catch(() => enqueueSnackbar('Error on request', { variant: 'error' }))
        .finally(() => setLoading(false))
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalBox>
                <h1>Create Request</h1>
                <GameAutocomplete onChange={(g: TOGame) => setRequest({ ...request, game: { name: g?.name } })} />
                <TextField style={{ marginTop: '1em' }}
                    fullWidth
                    id="description"
                    label="Description"
                    variant="standard"
                    value={request?.description}
                    onChange={(e) => setRequest({ ...request, description: e.target.value })}
                    multiline
                    rows={3}
                    slotProps={{ htmlInput: { maxLength: 200 } }} />
                <Alert severity="warning" style={{ marginTop: '1em' }}>Add your contact. "Contact me on XYZ: user0321"</Alert>
                <Button style={{ marginTop: '2em', display: 'block' }} variant="contained" onClick={submitForm}>Submit</Button>
                {loading && <CircularProgress style={{ marginTop: '2em' }} />}
            </ModalBox>
        </Modal>
    )
}