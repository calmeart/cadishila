import React, { useState } from "react"
import { useMutation, useQuery } from '@apollo/client';

import { ProductMutation, GetProductsQuery } from '../graphql/queries';
import { GetCategoriesQuery } from "../graphql/category-queries";

function unCheck() {
   var x = document.getElementsByClassName("btn-check");
   for (let i = 0; i < x.length; i++) {
     x[i].checked = false;
   }
 };

function GetCategories({ audience }) {
  const { loading, error, data } = useQuery(GetCategoriesQuery);

  if (loading) return <option disabled>Loading...</option>;
  if (error) return <option disabled>Error :( {error.message}</option>;

  return data.categories.filter(item => item.audience === audience ).map(item => (
      <option key={item.id} value={item.id}>{item.name}</option>
  ));
};

// { resetState, handleNameInputChange, handleDescriptionInputChange, handlePriceInputChange, handleSizeInputChange, handleCategoryIdInputChange, handleAudienceInputChange, name, description, price, size, categoryId, audience }

function AddProduct(props) {
  const [addProduct] = useMutation(ProductMutation);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageLink: ""
  })

  const [audience, setAudience] = useState("");

  function handleInputChange(e) {
    let { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleAudienceChange(e) {
    const value = e.target.value
    setAudience(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const returnedPromise = addProduct({
      variables: product,
      refetchQueries: [{query: GetProductsQuery }]
    });
    returnedPromise.then((result => {
        setProduct({
            name: "",
            description: "",
            price: "",
            categoryId: "",
            imageLink: ""
        });
        setAudience("");
        unCheck();
    })).catch(err => {
      props.appointError(err.message);
    })
  }

  return (

      <div className="w-100">
        <form className="p-3 bg-light" onSubmit={handleSubmit}>
          <h5 className="mb-3 text-center">Add Product</h5>
          <div className="row mb-3">
            <div className="col-sm-4">
              <div className="imagePort w-100 mb-3">
                {product.imageLink && (<img src={product.imageLink} alt={product.description} />)}
              </div>
              <input type="text" className="form-control" id="inputImageLink" name="imageLink" value={product.imageLink} onChange={handleInputChange} placeholder="Image Link" />
            </div>

            <div className="col-sm-4">
              <input type="text" className="form-control mb-3" id="inputName" name="name" value={product.name} onChange={handleInputChange} placeholder="Name" />
              <textarea type="text" className="form-control mb-3" id="inputDescription" name="description" value={product.description} onChange={handleInputChange} placeholder="Description" />
              <input type="text" className="form-control mb-3" id="inputPrice" name="price" value={product.price} onChange={handleInputChange} placeholder="Price "/>
            </div>

            <div className="col-sm-4 p-0">
              <select className="form-select mb-3" id="inputClass" aria-label="Select Audience" value={audience} onChange={handleAudienceChange} required>
                <option value="">Select Audience</option>
                <option value="Human">Human</option>
                <option value="Pet">Pet</option>
              </select>
              <select className="form-select mb-3" id="inputCatType" name="categoryId" value={product.categoryId} aria-label="Select Type" onChange={handleInputChange} required>
                <option value="">Select Type</option>
                <GetCategories audience={audience}/>
              </select>
              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </div>
          </div>

        </form>
      </div>


  )
}

export default AddProduct;
