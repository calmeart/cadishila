import React, { useState } from "react";
import { useQuery } from '@apollo/client';

import { GetProductsQuery } from '../graphql/queries';
import { GetCategoriesQuery } from '../graphql/category-queries';
import ProductCard from "./ProductCard";
import CenteredSpinner from "../utils/CenteredSpinner";

function DisplayProducts({ audience, propArray }) {
  const { loading, error, data } = useQuery(GetProductsQuery);

  if (loading) return <CenteredSpinner />;
  if (error) return <p className="errorMessage">Error :(</p>;

  return (
      data.products.filter(item => item.category.audience === audience)
      .filter(item => propArray.indexOf(item.category.name) > -1 )
      .map(item => <ProductCard key={item.id} item={item} /> )
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

function DisplayCategories({ audience, categoryFilter, setCategoryFilter }) {

  const [selectAll, setSelectAll] = useState(true);

  const { loading, error } = useQuery(GetCategoriesQuery, {onCompleted: data => {
    const categoriesArray = [...data.categories].filter(item => item.audience === audience).map(item => {
      return {...item, isChecked: true};
    });
    setCategoryFilter(categoriesArray);
  }});

  if (loading) return <CenteredSpinner />;
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

  return (
    <>
      <input type="checkbox" className="btn-check" name="checkAll" id="btncheckAll" autoComplete="off" onChange={onCheckBoxChange} checked={selectAll} />
      <label className="btn btn-outline-secondary w-100" htmlFor="btncheckAll">Select All</label>
      <hr className="dropdown-divider" />
      <div className="btn-group-vertical w-100" role="group" aria-label="Vertical category button group">
        {
          categoryFilter.map(item => <VerticalCheckButton key={item.id} item={item} onCheckBoxChange={onCheckBoxChange} />)
        }
      </div>
    </>
  )
}


function ProductList({ audience }) {

  const [categoryFilter, setCategoryFilter] = useState([]);


  const propArray = categoryFilter.filter(item => item.isChecked === true).map(item => item.name);

  return (

    <div id="productList" className="container">
      <div className="buttonGroup text-center">
        <h5>Filter Categories</h5>
        <hr className="dropdown-divider" />
        <DisplayCategories audience={audience} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      </div>
      <div id="products">
        <DisplayProducts audience={audience} propArray={propArray}/>
      </div>
    </div>

  )
}

export default ProductList;
