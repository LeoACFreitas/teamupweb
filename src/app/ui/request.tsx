import { useSelector } from "react-redux"
import { TORequest } from "../types"
import DeleteIcon from '@mui/icons-material/Delete'
import { useFetch } from "../lib/FetchContext"
import { useSnackbar } from "notistack"
import { useState } from "react"
import { format } from "date-fns"

export default function Request({request}: {request: TORequest}) {
    const fetchWithAuth = useFetch()
    const snackbar = useSnackbar()
    const [visible, setVisible] = useState(true)
    const user = useSelector((state: any) => state.auth.user);

    if (!visible) {
        return null
      }
    
    function deleteRequest(requestId: number) {
        fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/request/${requestId}`, { method: 'DELETE' })
            .then((r: Response) => {
                if (!r.ok) {
                    snackbar.enqueueSnackbar('Failed to delete request', { variant: 'error' })
                    return
                }
                snackbar.enqueueSnackbar('Request deleted', { variant: 'success' })
                setVisible(false)
            }).catch(() => {
                snackbar.enqueueSnackbar('Failed to delete request', { variant: 'error' })
            })
    }

    const formattedDate = format(new Date(request.date), 'dd/MM/yyyy HH:mm');

    return (
            <li key={request.request_id} style={{ marginTop: "3em" }}>
            <div style={{ display: "flex" }}>
                <div>
                    <p style={{ fontWeight: "bold", margin: 'unset' }}>{request.game?.name}</p>
                    <p style={{ fontSize: '0.75em', opacity: '0.6', margin: '0.5em 0 0' }}>{formattedDate}</p>
                </div>
                <span style={{ marginLeft: "auto" }}>{request.user?.country}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: "1em" }}>
                <p style={{ display: 'inline-block' }}>{request.description}</p>
                { request.user.user_id === user?.user_id && (
                    <DeleteIcon sx={{ marginLeft: 'auto', cursor: 'pointer', '&:hover': { opacity: 0.5 } }}
                        onClick={() => deleteRequest(request.request_id)} />
                )}
            </div>
            <hr style={{ marginTop: "1em" }} />
        </li>
    )
}
