import React from "react";

type Props = {};

export default function StockPage({}: Props) {
  const products = ["Product1", "Product2", "Product3", "Product4"];

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
