import React from 'react'
import { useEffect } from 'react'
import { Grid } from '@mui/material'
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
  } from "@mui/material";
  import BaseCard from "../baseCard/BaseCard";

const AllOrders = ({orders}) => {
    const formatDate = (date) => {
        const d = new Date(date);
        
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];

const dayOfWeek = daysOfWeek[d.getDay()];
const dayOfMonth = d.getDate();
const month = months[d.getMonth()];
const year = d.getFullYear();
const hours = d.getHours();
const minutes = d.getMinutes();

const formattedDate = `${dayOfWeek} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} ${month} ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
return formattedDate;
    };
    useEffect(() => {
        console.log(orders)
      }, [])
  return (
    <>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
      <BaseCard title="All orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Customer Details
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Items
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Total
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {order.orderId}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {formatDate(order.updatedAt)}
                </Typography>
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      
                    >
                      {order.name} (Phone: {order.phone})
                    </Typography>
                    <Typography>
                        Address: {order.address}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {Object.keys(order.products).map((key) => {
                      return (
                    <Typography key={key}>
                       
                          <li>{order.products[key].name} (qty: {order.products[key].qty})</li>
                         
                    </Typography>
                    );
                  })}
                </Typography>
              </TableCell>
              <TableCell align='right' >
                <Typography variant="h6">${order.Total}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
      </Grid>
    </Grid>
    </>
  )
}

export default AllOrders