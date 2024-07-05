import React from "react";

type Props = {
  order: string;
};

type OrderType = {
  productId: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  created: Date;
  qty: number;
};

export default function Payment({ order }: Props) {
  const orderArray = JSON.parse(order) as OrderType[];

  return (
    <div>
      Payment <br />
      <ul>
        {orderArray.map((item) => (
          <li>
            <img
              src={"https://localhost:8081/images/" + item.image}
              alt=""
              className="h-[50px]"
            />
            {item.name}: {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
