import { Card, CardContent, TextField, Typography } from "@mui/material";
import React from "react";

type Props = {};

export default function StockCreatePage({}: Props) {
  return (
    <form noValidate onSubmit={() => {}}>
      <Card>
        <CardContent className="p-8">
          <Typography gutterBottom variant="h3">
            Create Product
          </Typography>

          {/* Name  */}
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
          />
        </CardContent>
      </Card>
    </form>
  );
}
