import React, { useEffect } from "react";
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
import Product from "../../../models/Product";

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  const products = await Product.find();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
};

const AllProducts = ({products}) => {
  

  return (
    <BaseCard title="All Products">
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
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Slug
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Category
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.slug}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
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
                      variant="h6"
                      
                    >
                      {product.slug}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
                      <TableCell><img className="m-4"height={50} width={50}  src={product.image} alt="" />
                      </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  {product.desc}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.category === "veg" ? "green" : "red",
                    color: "#fff",
                  }}
                  size="small"
                  label={product.category}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">${product.price}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
