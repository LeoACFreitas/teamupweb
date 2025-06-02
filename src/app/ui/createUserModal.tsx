import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { TOUser } from '../types';
import { useFetch } from '../lib/FetchContext';
import { useSnackbar } from 'notistack';
import ModalBox from './modalBox';
import CountriesInput from './countriesInput';

export default function CreateUserModal({ open, handleClose }: { open: boolean, handleClose: any }) {
    const [country, setCountry] = useState('')
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<TOUser>({})
    const fetchWithAuth = useFetch()
    const { enqueueSnackbar } = useSnackbar();

    function handleChange(value: string) {
        setCountry(value)
        setUser({ ...user, country: value })
    };

    function submitForm() {
        setLoading(true)
        fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, { method: 'POST', body: JSON.stringify(user) }).then((r: any) => {
            try {
                if (!r.ok) {
                    enqueueSnackbar('Operation unsuccessful!', { variant: 'error' })
                    return
                }
                console.log(r)
                handleClose()
                enqueueSnackbar('Operation successful!', { variant: 'success' })
            } catch (e) {
                enqueueSnackbar('Operation unsuccessful!', { variant: 'error' })
                console.log(e);
            }
        })
        .finally(() => setLoading(false))
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <ModalBox>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create User
                    </Typography>
                    <TextField style={{ marginTop: '1em' }}
                        fullWidth
                        id="nickname"
                        label="Nickname"
                        variant="standard"
                        value={user.nickname}
                        onChange={(e) => setUser({ ...user, nickname: e.target.value })} />
                    <CountriesInput value={country} onChange={handleChange} />
                    <Button style={{ marginTop: '2em', display: 'block' }} variant="contained" onClick={submitForm}>Submit</Button>
                    {loading && <CircularProgress style={{ marginTop: '2em' }} />}
                </ModalBox>
            </Modal>
        </>
    )
}
