import React, { useState } from "react"
import { useMutation, useQuery } from '@apollo/client';
import { GetCategoriesQuery, ProductMutation, GetProductsQuery } from '../graphql/queries';

function unCheck() {
   var x = document.getElementsByClassName("btn-check");
   for (let i = 0; i < x.length; i++) {
     x[i].checked = false;
   }
 };

function GetCategories({ audience }) {
  const { loading, error, data } = useQuery(GetCategoriesQuery, {
    variables: { audience }
  });

  if (loading) return <option disabled>Loading...</option>;
  if (error) return <option disabled>Error :( {error.message}</option>;

  return data.categories.map(item => (
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
    size: [],
    categoryId: ""
  })

  const [audience, setAudience] = useState("");

  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === "size") {
      let array = [...product.size];
      let index = array.indexOf(value);
      if ( index > -1 ) {
        array.splice(index, 1);
      } else {
        array.push(value);
        value = [...array];
      }
    }
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
        console.log('success');
        setProduct({
            name: "",
            description: "",
            price: "",
            size: [],
            categoryId: ""
        });
        setAudience("");
        unCheck();
    })).catch(err => {
      props.appointError(err.message);
    })
  }

  return (
    <form className="p-3 bg-light" onSubmit={handleSubmit}>
      <h5 className="mb-3 text-center">Add Product</h5>

      <div className="row mb-3">
        <div className="col-sm-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="inputName" name="name" value={product.name} onChange={handleInputChange} placeholder="Name" />
            <label htmlFor="inputName">Name</label>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="inputPrice" name="price" value={product.price} onChange={handleInputChange} placeholder="Price "/>
            <label htmlFor="inputPrice">Price</label>
          </div>
        </div>

        <div className="col-sm-4 p-0">
            <input type="checkbox" className="btn-check" id="btnXS" name="size" value="XS" onClick={handleInputChange} autoComplete="off" />
            <label className="btn btn-outline-primary m-1 p-1" htmlFor="btnXS">XS</label>

            <input type="checkbox" className="btn-check" id="btnS" name="size" value="S" onClick={handleInputChange} autoComplete="off" />
            <label className="btn btn-outline-primary m-1 p-1" htmlFor="btnS">S</label>

            <input type="checkbox" className="btn-check" id="btnM" name="size" value="M" onClick={handleInputChange} autoComplete="off" />
            <label className="btn btn-outline-primary m-1 p-1" htmlFor="btnM">M</label>

            <input type="checkbox" className="btn-check" id="btnL" name="size" value="L" onClick={handleInputChange} autoComplete="off" />
            <label className="btn btn-outline-primary m-1 p-1" htmlFor="btnL">L</label>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="inputDescription" name="description" value={product.description} onChange={handleInputChange} placeholder="Description" />
        <label htmlFor="inputDescription">Description</label>
      </div>
      <div className="row">
        <div className="col-sm-5">
        <select className="form-select" id="inputClass" aria-label="Select Audience" value={audience} onChange={handleAudienceChange} required>
          <option value="">Select Audience</option>
          <option value="human">Human</option>
          <option value="pet">Pet</option>
        </select>
        </div>
        <div className="col-sm-5">
          <select className="form-select" id="inputCatType" name="categoryId" value={product.categoryId} aria-label="Select Type" onChange={handleInputChange} required>
            <option value="">Select Type</option>
            <GetCategories audience={audience}/>
          </select>
        </div>
        <button type="submit" className="btn btn-primary col-sm-2">Submit</button>
      </div>
    </form>


  )
}

export default AddProduct;
