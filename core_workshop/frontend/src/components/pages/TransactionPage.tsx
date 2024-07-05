import { getTransactions, shopSelector } from "@/store/slices/shopSlice";
import { useAppDispatch } from "@/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {};

export default function TransactionPage({}: Props) {
  const shopReducer = useSelector(shopSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div>
      TransactionPage
      <ul>
        {shopReducer.transactionAllResult.map((trx) => (
          <li>
            {trx.transactionId}, {trx.paid}, {trx.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
