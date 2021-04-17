import React, { useState } from "react";
import { useQuery } from '@apollo/client';

import { GetProductsQuery } from '../graphql/queries';
import { GetCategoriesQuery } from '../graphql/category-queries';
import ProductCard from "./ProductCard";

function DisplayProducts({ audience, propArray }) {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error :(</p>;

  return (
    <div id="products" className="container">
      {
      data.products.filter(item => item.category.audience === audience)
      .filter(item => propArray.indexOf(item.category.name) > -1 )
      .map(item => <ProductCard key={item.id} item={item} /> )
      }
    </div>
  );
}

function VerticalCheckButton({ item, onCheckBoxChange }) {
  return (
    <>
      <input type="checkbox" className="btn-check" name={item.name} id={"btncheck" + item.id} autoComplete="off" onChange={onCheckBoxChange} checked={item.isChecked}/>
      <label className="btn btn-outline-secondary" htmlFor={"btncheck" + item.id}>{item.name}</label>
    </>
  )
};


function ProductList({ audience }) {

  const [categoryFilter, setCategoryFilter] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  const { loading, error } = useQuery(GetCategoriesQuery, {onCompleted: data => {
    const categoriesArray = [...data.categories].filter(item => item.audience === audience).map(item => {
      return {...item, isChecked: true};
    });
    setCategoryFilter(categoriesArray);
  }});

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error :(</p>;

  function onCheckBoxChange(e) {
    const { name } = e.target;
    const tempArray = [...categoryFilter];
    if ( name === "checkAll" ) {
      tempArray.forEach(item => item.isChecked = !selectAll);
      setSelectAll(prev => !prev);
      setCategoryFilter(tempArray);
      return;
    }
    const index = tempArray.findIndex(p => p.name === name);
    tempArray[index].isChecked = !categoryFilter[index].isChecked;
    setCategoryFilter(tempArray);
  }

  const propArray = categoryFilter.filter(item => item.isChecked === true).map(item => item.name);

  return (

    <div id="productList" className="container">
      <div className="buttonGroup text-center">
        <h5>Filter Categories</h5>
        <hr className="dropdown-divider" />
        <input type="checkbox" className="btn-check w-100" name="checkAll" id="btncheckAll" autoComplete="off" onChange={onCheckBoxChange} checked={selectAll}/>
        <label className="btn btn-outline-secondary w-100" htmlFor="btncheckAll">Select All</label>
        <hr className="dropdown-divider" />
        <div className="btn-group-vertical w-100" role="group" aria-label="Vertical category button group">
          {
            categoryFilter.map(item => <VerticalCheckButton key={item.id} item={item} onCheckBoxChange={onCheckBoxChange} />)
          }
        </div>
      </div>
      <DisplayProducts audience={audience} propArray={propArray}/>
    </div>

  )
}

export default ProductList;
