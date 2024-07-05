import React from "react";

type Props = {
  order: string;
};

export default function Payment({ order }: Props) {
  const orderArray = JSON.parse(order) as any[];

  return (
    <div>
      Payment <br />
      <ul>
        {orderArray.map((item) => (
          <li>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
