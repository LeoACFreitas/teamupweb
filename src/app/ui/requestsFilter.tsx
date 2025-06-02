import { Filter } from "./requestList"
import { FormControlLabel, Checkbox, Button } from "@mui/material"
import React from "react"
import GameAutocomplete from "./gameAutocomplete"
import { TOGame } from "../types"
import { useSelector } from "react-redux"
import CountriesInput from "./countriesInput"

export default function RequestsFilter({ filter, setFilter }:
        { filter: Filter, setFilter: (filter: Filter) => void }) {
    const isAuthd = useSelector((state: any) => state.auth.isAuthenticated)
    const handleGameChange = (selectedGame: TOGame) => {
        if (selectedGame) {
            setFilter({ ...filter, name: selectedGame.name })
        } else {
            setFilter({ ...filter, name: '' })
        }
    }

    const handleShowMyRequestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, showMyRequests: e.target.checked })
    }

    return (
        <>
            <div style={{ backgroundColor: '#cdcdcd', padding: '0.1em 1em 1em', marginTop: '1em' }}>
                <h2>Filter</h2>
                <form>
                    <div style={{ display: 'flex' }}>
                        <div style={{ display: 'inline-block', width: '30em' }}>
                            <GameAutocomplete onChange={handleGameChange} />
                        </div>
                        {isAuthd && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={filter.showMyRequests}
                                        onChange={handleShowMyRequestsChange} />
                                }
                                label="Show only my requests"
                                style={{ marginLeft: '1em' }}
                            />
                        )}
                    </div>
                    <CountriesInput
                        style={{ maxWidth: '30em' }}
                        value={filter.country}
                        onChange={(value: string) => setFilter({ ...filter, country: value })} />
                </form>
            </div>
        </>
    )
}