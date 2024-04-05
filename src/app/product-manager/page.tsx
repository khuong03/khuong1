"use client";
import { useState, useEffect } from "react";
import { Space, Table, Tag} from "antd";
import Page from "../edit-product/[id]/page";
import Link from 'next/link';
import type { TableProps } from 'antd';

const { Column, ColumnGroup } = Table;


interface DataType {
  _id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  image: any[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "sale_price",
    dataIndex: "sale_price",
    key: "sale_price",
  },
  {
    title: "image",
    key: "image",
    render: (_, record) => (
        <Space size="middle">
         <img className="w-[100px]" src={record.image[0]} alt="" />
        </Space>
      ),
  },
  
  {
    title: "Chức năng",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
       <Link href={`edit-product/${record._id}`}>edit</Link>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Product = () => {
  const [productData, setProductData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://20.2.70.141:5000/api/v1/products`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data?.data);
      setProductData(data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  


  return <Table columns={columns} dataSource={productData} />;
};

export default Product;
