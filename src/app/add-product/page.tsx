"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Button, Form, Input, Upload, Select, message } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd"
import axios from "axios";

const SignupForm = () => {
  const [productData, setProductData] = useState();
  const [categories, setCategories] = useState([]);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData1();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://20.2.70.141:5000/api/v1/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProductData(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData1 = async () => {
    try {
      const response = await fetch(`http://20.2.70.141:5000/api/v1/categories`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await fetch(
        `http://20.2.70.141:5000/api/v1/upload/file`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const  image = {
    name: "image",
    action: "http://20.2.70.141:5000/api/v1/upload/file",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        const imageUrl = info.file.response.url;
        formik.setFieldValue('image', [...formik.values.image, imageUrl]);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      sale_price: "",
      image: [],
      stock: "",
      category: "",
    },
    onSubmit: async (values) => {
        try {
          const response = await axios.post(
            `http://20.2.70.141:5000/api/v1/products/create`,
            values
          );
          console.log("Data sent successfully:", response.data);
          message.success("Thêm sản phẩm thành công");
        } catch (error) {
          console.error("Error adding product:", error);
          message.error("Thêm sản phẩm thất bại. Vui lòng thử lại sau.");
        }
      },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <Input
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        type="text"
        placeholder="Tên sản phẩm"
      />
      <label htmlFor="description">description</label>
      <Input
        id="description"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
        type="text"
        placeholder="Tên sản phẩm"
      />
      <label htmlFor="price">price</label>
      <Input
        id="price"
        name="price"
        onChange={formik.handleChange}
        value={formik.values.price}
        type="text"
        placeholder="Tên sản phẩm"
      />
      <label htmlFor="sale_price">sale_price</label>
      <Input
        id="sale_price"
        name="sale_price"
        onChange={formik.handleChange}
        value={formik.values.sale_price}
        type="text"
        placeholder="Tên sản phẩm"
      />
      <label htmlFor="stock">stock</label>
      <Input
        id="stock"
        name="stock"
        onChange={formik.handleChange}
        value={formik.values.stock}
        type="text"
        placeholder="Tên sản phẩm"
      />
      <Select
                placeholder="Chọn danh mục"
                onChange={(value) => formik.setFieldValue("category", value)}
              >
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
    </Select>

              <Upload {...image}>
                <Button icon={<UploadOutlined />}>Tải ảnh</Button>
              </Upload>
      <button type="submit">Submit</button>
    </form>
  );
};
export default SignupForm;
