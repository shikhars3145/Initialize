import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { InputAdornment, Select, MenuItem } from "@material-ui/core";

export default function BasicTextFields({ setter, InputProps,...otherProps }) {
  const [input, setInput] = useState("");
  const [multiplier, setMultiplier] = useState(1e18);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleMultiplier = (e) => {
    setMultiplier(e.target.value);
  };

  useEffect(() => {
    setter(Number(input) * Number(multiplier));
  }, [input, multiplier, setter]);

  return (
      <TextField
        value={input}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <InputAdornment position="end" style={{height:"100%", marginRight:4}}>
              <Select style={{paddingLeft:5, height:"100%", width:"fit-content"}} disableUnderline={true} value={multiplier} onChange={handleMultiplier}>
                <MenuItem value={1e18}>eth</MenuItem>
                <MenuItem value={1e9}>gwei</MenuItem>
                <MenuItem value={1}>wei</MenuItem>
              </Select>
            </InputAdornment>
          )
        }}
        onChange={handleChange}
        {...otherProps}
      />
  );
}
