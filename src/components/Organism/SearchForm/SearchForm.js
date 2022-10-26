import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

export default function SearchForm(props){
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleConfirm = (desc, loc) => {
    let query = "";
    console.log(desc, loc);
    if(desc || loc){
      query = query + "?";
      if(desc && loc){
        query = query + "description=" + desc + "&location=" + loc
        props.onConfirm(query);
      } else {
        desc ? query = query + "description=" + desc : query = query + "location=" + loc
        props.onConfirm(query);
      }
    }
  }

  return (
    <div>
      <GridContainer>
        <GridItem md={4}>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Description"
              id="outlined-size-small"
              placeholder="Enter description..."
              variant="outlined"
              size="small"
              onChange={e => setDescription(e.target.value)}
              value={description}
              error={description==""}
            />
          </FormControl>
        </GridItem>
        <GridItem md={4}>
          <FormControl fullWidth margin="normal" style={{margin: "25px 0px"}}>
            <TextField
              label="Location"
              id="outlined-size-small"
              placeholder="Enter location..."
              variant="outlined"
              size="small"
              onChange={e => setLocation(e.target.value)}
              value={location}
              error={location==""}
            />
          </FormControl>
        </GridItem>
        <GridItem md={4} style={{alignSelf: 'center', textAlign: 'center'}}>
          <Button onClick={() => handleConfirm(description, location)}>Search</Button>
        </GridItem>
      </GridContainer>
    </div>
  )
}

SearchForm.propTypes = {
  onConfirm: PropTypes.func,
};
