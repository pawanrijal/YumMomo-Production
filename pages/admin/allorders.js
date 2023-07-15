import React from 'react'
import FullLayout from '../../src/layouts/FullLayout';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import mongoose from "mongoose";
import Order from "../../models/Order"
import AllOrders from "../../src/components/dashboard/AllOrders";


const Allorders = ({orders}) => {
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
        <AllOrders orders = {orders} />
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
  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
};

export default Allorders