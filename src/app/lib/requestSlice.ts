import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        requestsChangedOnSession: 0
    },
    reducers: {
        incrementRequestsChangedOnSession: (state) => {
            state.requestsChangedOnSession += 1
        }
    }
})

export const { incrementRequestsChangedOnSession } = requestSlice.actions
export default requestSlice.reducer