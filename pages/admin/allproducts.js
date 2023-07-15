import React from 'react'
import FullLayout from '../../src/layouts/FullLayout';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";
import mongoose from "mongoose";
import Product from "../../models/Product"


const Allproducts = ({products}) => {
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
        <AllProducts products = {products} />
      </Grid>
    </Grid>
        </FullLayout>
        </ThemeProvider>
        </>
      );
}

export default Allproducts

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
};