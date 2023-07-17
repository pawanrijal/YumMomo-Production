import { Grid } from "@mui/material";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import mongoose from "mongoose";
import Feedback from "../../models/Feedback";
import AllOrders from "../../src/components/dashboard/AllOrders";
import Order from "../../models/Order";



export default function Main({orders, feedbacks}) {
  return (
    <>
    <style jsx global>{`
    .nav{
      display: none;
    }
    .footer{
      display: none;
    }
    `}
    </style>
    <ThemeProvider theme={theme}>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 1 ------------------------- */}
      {/* <Grid item xs={12} lg={4}>
        <DailyActivity feedbacks={feedbacks} />
      </Grid> */}
      <Grid item xs={12} lg={8}>
        <AllOrders orders={orders}/>
      </Grid>
    </Grid>
    </FullLayout>
    </ThemeProvider>
    </>
  );
}

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const orders = await Order.find();
  const feedbacks = await Feedback.find();
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)), feedbacks: JSON.parse(JSON.stringify(feedbacks)) },
  };
};
