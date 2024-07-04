import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { Product } from "@/types/product.type";

type Props = {};

const formValidateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  price: Yup.number().min(100, "Number must be greater than 100"),
  stock: Yup.number().min(100, "Number must be greater than 100"),
});

export default function StockCreatePage({}: Props) {
  const initialValue: Product = { name: "", price: 1500, stock: 9999 };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(formValidateSchema),
  });
  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => {
        alert(JSON.stringify(values));
      })}
    >
      <Card>
        <CardContent className="p-8">
          <Typography gutterBottom variant="h3">
            Create Product
          </Typography>

          {/* Name  */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                {...field}
              />
            )}
          />

          {/* Stock  */}
          <Controller
            name="stock"
            control={control}
            render={({ field }) => (
              <TextField
                label="Stock"
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                autoFocus
                {...field}
              />
            )}
          />

          {/* Price  */}
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                label="Price"
                variant="outlined"
                margin="normal"
                fullWidth
                type="number"
                autoFocus
                {...field}
              />
            )}
          />

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Create
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
