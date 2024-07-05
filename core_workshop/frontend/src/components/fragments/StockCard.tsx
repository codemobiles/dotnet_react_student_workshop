import { Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";

type StockCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
};

const StockCard = ({ icon, title, subtitle, color }: StockCardProps) => {
  return (
    <Card>
      <Grid container className="min-h-[70px]">
        <Grid item className="flex-grow h-[100px] p-2">
          <Typography variant="h5" color="textPrimary">
            {title}
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {subtitle}
          </Typography>
        </Grid>

        <Grid
          item
          style={{
            backgroundColor: color,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 70,
          }}
        >
          {icon}
          {/* {React.createElement(props.icon, { fontSize: "large" })} */}
        </Grid>
      </Grid>
    </Card>
  );
};

export default StockCard;
