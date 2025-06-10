import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { TOGame } from "../types";
import { useFetch } from "../lib/fetchContext.js";

export default function  GameAutocomplete({onChange}: {onChange: Function}) {
    const [options, setOptions] = useState<TOGame[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedOption, setSelectedOption] = useState<TOGame | null>(null);
    const fetchWithAuth = useFetch()
  
    useEffect(() => {
      fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/game?${new URLSearchParams({ name: inputValue }).toString()}`)
        .then((response: any) => {
            response.json().then((j: Array<TOGame>) => {
                setOptions(j)
            })
        })
        .catch((error: any) => console.error('Error fetching data:', error));
    }, [inputValue]);
  
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.name || ""}
            value={selectedOption}
            onChange={(_event, newValue) => {
                onChange(newValue)
                setSelectedOption(newValue)
                if (newValue === null) {
                    setInputValue("");
                }
            }}
            inputValue={inputValue}
            onInputChange={(_event, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => <TextField {...params} label="Game" />}
        />
    )
}