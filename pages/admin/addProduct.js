import React from "react";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import {
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    let a = fetch("/api/addProducts", {
      //muji a vanera variable declare nahan
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log("error", data.error);
          toast.error("Error Adding Product");
        } else {
          toast.success("Product Added Successfully");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error Adding Product");
      });
  };

  return (
    <>
      <style jsx global>
        {`
          .nav {
            display: none;
          }
          .footer {
            display: none;
          }
        `}
      </style>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnHover={true}
          />

          <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
              <BaseCard title="Add Products">
                <Stack spacing={3}>
                  <TextField
                    onChange={handleChange}
                    value={form.title ? form.title : ""}
                    name="title"
                    label="Title"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={form.slug ? form.slug : ""}
                    name="slug"
                    label="Slug"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={form.desc}
                    name="desc"
                    label="Item Description"
                    multiline
                    rows={4}
                  />
                  <TextField
                    onChange={handleChange}
                    value={form.category ? form.category : ""}
                    name="category"
                    label="Category"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={form.price ? form.price : ""}
                    name="price"
                    label="Price"
                    variant="outlined"
                  />
                  <TextField
                    onChange={handleChange}
                    value={form.image ? form.image : ""}
                    name="image"
                    label="Image"
                    variant="outlined"
                  />
                </Stack>
                <br />
                <Button onClick={submitForm} variant="outlined" mt={2}>
                  Submit
                </Button>
              </BaseCard>
            </Grid>
          </Grid>
        </FullLayout>
      </ThemeProvider>
    </>
  );
};

export default AddProduct;
