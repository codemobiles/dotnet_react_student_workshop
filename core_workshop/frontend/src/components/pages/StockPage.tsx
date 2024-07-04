import { getProducts, stockSelector } from "@/store/slices/stockSlice";
import { useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function StockPage({}: Props) {
  const products = ["Product1", "Product2", "Product3", "Product4"];
  const stockReducer = useSelector(stockSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // first - called during created
    dispatch(getProducts());

    return () => {
      // second - called during destroyed
      console.log("Stock page was destroyed");
    };
  }, [dispatch]);

  return (
    <div>
      StockPage
      <ul>
        {products.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
