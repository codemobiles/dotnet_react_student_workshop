import { Paper, Stack, Typography } from "@mui/material";
import { color } from "chart.js/helpers";
import React from "react";

// icon = { AddShoppingCart };
// title = "TOTAL";
// subtitle = "112 THB";
// color = "#00a65a";

type Props = {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
};

export default function StockCard(props: Props) {
  return (
    <Paper elevation={2} className="w-[200px]">
      <Stack direction={"row"}>
        <props.icon />
        <Stack direction={"column"} color={props.color}>
          <Typography>{props.title}</Typography>
          <Typography>{props.subtitle}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
