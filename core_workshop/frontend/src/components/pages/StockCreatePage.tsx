import { Card, CardContent, TextField, Typography } from "@mui/material";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Product } from "@/types/product.type";

type Props = {};

export default function StockCreatePage({ }: Props) {
  
  const initialValue: Product = { name: "", price: 1500, stock: 9999 };
  const { control, handleSubmit } = useForm({ defaultValues: initialValue });
  
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
