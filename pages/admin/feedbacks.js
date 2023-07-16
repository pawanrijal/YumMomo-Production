import React from 'react'
import FullLayout from '../../src/layouts/FullLayout';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import { Grid } from "@mui/material";
import mongoose from "mongoose";
import Feedback from '../../models/Feedback';
import DailyActivity from "../../src/components/dashboard/DailyActivity";


const Feedbacks = ({feedbacks}) => {
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
        <DailyActivity feedbacks = {feedbacks} />
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
  const feedbacks = await Feedback.find();
  return {
    props: { feedbacks: JSON.parse(JSON.stringify(feedbacks)) },
  };
};

export default Feedbacks