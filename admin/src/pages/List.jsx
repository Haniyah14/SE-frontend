import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import upArrow from "../assets/up.png";
import downArrow from "../assets/down.png"; 

const List = ({ token }) => {
  const [listProducts, setListProducts] = useState([]);
  const [sortCriteria, setSortCriteria] = useState(""); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  const fetchListProducts = async () => {
    try {
      const response = await axios.get(backendUrl+ "/api/product/list");

      if (response.data.success) {
        setListProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.info(response.data.message);
        await fetchListProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product.");
    }
  };

  const handleSort = (criteria) => {
    const newSortOrder = sortCriteria === criteria && sortOrder === "asc" ? "desc" : "asc";
    setSortCriteria(criteria);
    setSortOrder(newSortOrder);

    const sortedProducts = [...listProducts].sort((a, b) => {
      if (criteria === "name" || criteria === "category" || criteria === "subCategory") {
        return newSortOrder === "asc"
          ? a[criteria].localeCompare(b[criteria])
          : b[criteria].localeCompare(a[criteria]);
      } else if (criteria === "price") {
        return newSortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });

    setListProducts(sortedProducts);
  };

  useEffect(() => {
    fetchListProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        
        <div className="hidden md:grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center py-1 px-2 border bg-gray-200 text-sm text-center">
          <b>Image</b>
          <b className="flex items-center justify-center gap-1">
            Name
            <div className="flex flex-col items-center">
              <img
                src={upArrow}
                alt="Sort Ascending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("name")}
              />
              <img
                src={downArrow}
                alt="Sort Descending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("name")}
              />
            </div>
          </b>
          <b>Description</b>
          <b className="flex items-center justify-center gap-1">
            Category
            <div className="flex flex-col items-center">
              <img
                src={upArrow}
                alt="Sort Ascending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("category")}
              />
              <img
                src={downArrow}
                alt="Sort Descending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("category")}
              />
            </div>
          </b>
          <b className="flex items-center justify-center gap-1">
            Sub Category
            <div className="flex flex-col items-center">
              <img
                src={upArrow}
                alt="Sort Ascending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("subCategory")}
              />
              <img
                src={downArrow}
                alt="Sort Descending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("subCategory")}
              />
            </div>
          </b>
          <b className="flex items-center justify-center gap-1">
            Price
            <div className="flex flex-col items-center">
              <img
                src={upArrow}
                alt="Sort Ascending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("price")}
              />
              <img
                src={downArrow}
                alt="Sort Descending"
                className="w-3 opacity-50 cursor-pointer hover:opacity-100"
                onClick={() => handleSort("price")}
              />
            </div>
          </b>
          <b className="text-center">Action</b>
        </div>

       
        {listProducts.map((item, index) => (
          <div
            className="grid grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] md:grid-cols-[0.5fr_1fr_1.5fr_0.5fr_0.5fr_0.5fr_0.2fr] items-center gap-2 py-1 px-2 border text-sm text-center"
            key={index}
          >
            <img className="w-12" src={item.image[0]} alt="Product Image" />
            <p className="text-left">{item.name}</p>
            <p className="text-left">
              {item.description.split(" ").slice(0, 10).join(" ")}...
            </p>
            <p>{item.category}</p>
            <p>{item.subCategory}</p>
            <p>{currency(item.price)}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="font-bold text-center text-gray-800 bg-red-500 rounded-full cursor-pointer md:text-center max-w-7"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
