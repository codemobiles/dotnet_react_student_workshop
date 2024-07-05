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
        <li>xx</li>
        <li>xx</li>
      </ul>
    </div>
  );
}
