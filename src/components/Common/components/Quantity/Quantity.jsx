import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { Chip } from '..';

const Quantity = ({ initial, minimum, onChange, ...props }) => {
  const [quantity, setQuantity] = React.useState(initial);

  function handleAddClick() {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  }

  function handleRemoveClick() {
    if (quantity > minimum) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  }

  return (
    <div>
      <Grid container spacing={1} alignItems="center">
        {onChange && (
          <Grid item>
            <IconButton size="small" onClick={handleRemoveClick}>
              <RemoveIcon fontSize="small" />
            </IconButton>
          </Grid>
        )}
        <Grid item style={{ width: 60, textAlign: 'center' }}>
          <Chip label={quantity} />
        </Grid>
        {onChange && (
          <Grid item>
            <IconButton size="small" onClick={handleAddClick}>
              <AddIcon fontSize="small" />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Quantity;
