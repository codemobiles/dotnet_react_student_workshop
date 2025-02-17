import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import {
  editProduct,
  getProductById,
  stockSelector,
} from "@/store/slices/stockSlice";
import { useAppDispatch } from "@/store/store";
import { Product } from "@/types/product.type";
import { imageUrl } from "@/utils/constants";

import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField } from "@mui/material";

const initialValue: Product = { name: "", price: 0, stock: 0 };

const formValidateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  price: Yup.number().min(100, "Number must be greater than 100"),
  stock: Yup.number().min(100, "Number must be greater than 100"),
});

const StockEdit = () => {
  const match = useMatch("/stock/edit/:id");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const stockReducer = useSelector(stockSelector);

  useEffect(() => {
    if (match?.params.id) {
      dispatch(getProductById(match?.params.id));
    }
  }, [dispatch, match?.params.id]);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: initialValue,
    //@ts-ignore
    resolver: yupResolver(formValidateSchema),
  });

  useEffect(() => {
    reset(stockReducer.stockOneResult ?? initialValue);
  }, [stockReducer.stockOneResult, reset]);

  const watchPreviewImage = watch("file_obj");

  const onSubmit = async (values: Product) => {
    const formData = new FormData();
    formData.append("productId", String(values.productId));
    formData.append("name", values.name);
    formData.append("price", String(values.price));
    formData.append("stock", String(values.stock));
    if (values.file) {
      formData.append("file", values.file);
    }

    dispatch(editProduct(formData)).then((result: any) => {
      if (editProduct.fulfilled.match(result)) {
        navigate("/stock");
      }
    });
  };

  const showForm = () => {
    return (
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="p-8">
            <Typography gutterBottom variant="h3">
              Edit Product
            </Typography>

            <Controller
              name="name"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Name"
                    error={Boolean(errors.name?.message)}
                    helperText={errors.name?.message?.toString()}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    autoFocus
                  />
                );
              }}
            ></Controller>

            <Controller
              name="price"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Price"
                    error={Boolean(errors.price?.message)}
                    helperText={errors.price?.message?.toString()}
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    autoFocus
                  />
                );
              }}
            ></Controller>

            <Controller
              name="stock"
              control={control}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    label="Stock"
                    error={Boolean(errors.stock?.message)}
                    helperText={errors.stock?.message?.toString()}
                    variant="outlined"
                    margin="normal"
                    required
                    type="number"
                    fullWidth
                    autoFocus
                  />
                );
              }}
            ></Controller>

            <TextField
              className="mt-4"
              type="file"
              fullWidth
              onChange={(e: React.ChangeEvent<any>) => {
                e.preventDefault();
                setValue("file", e.target.files[0]); // for upload
                setValue("file_obj", URL.createObjectURL(e.target.files[0])); // for preview image
              }}
            />
            <Box>{showPreviewImage(getValues("image"))}</Box>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="mr-2"
            >
              Edit
            </Button>
            <Button
              fullWidth
              component={Link}
              to="/stock"
              color="info"
              variant="outlined"
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };

  const showPreviewImage = (image: string | undefined) => {
    if (watchPreviewImage) {
      return <img alt="" src={watchPreviewImage} className="h-[100px]" />;
    } else if (image) {
      return <img alt="" src={`${imageUrl}//${image}`} className="h-[100px]" />;
    }
  };

  return <Box>{showForm()}</Box>;
};

export default StockEdit;
