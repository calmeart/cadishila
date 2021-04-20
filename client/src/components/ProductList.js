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
    <div className="form-check">
      <input type="checkbox" className="form-check-input" name={item.name} id={"btncheck" + item.id} onChange={onCheckBoxChange} checked={item.isChecked}/>
      <label className="form-check-label" htmlFor={"btncheck" + item.id}>{item.name}</label>
    </div>
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
      <div className="form-check">
        <input type="checkbox" className="form-check-input" name="checkAll" id="btncheckAll" autoComplete="off" onChange={onCheckBoxChange} checked={selectAll} />
        <label className="form-check-label" htmlFor="btncheckAll">Select All</label>
      </div>
      <hr className="dropdown-divider" />
        {
          categoryFilter.map(item => <VerticalCheckButton key={item.id} item={item} onCheckBoxChange={onCheckBoxChange} />)
        }
    </>
  )
}


function ProductList({ audience }) {

  const [categoryFilter, setCategoryFilter] = useState([]);

  const { innerWidth } = window;
  const isMobile = (innerWidth < 576) ? true : false;
  const propArray = categoryFilter.filter(item => item.isChecked === true).map(item => item.name);

  return (

    <div id="productList" className="container">
      <div className="buttonGroup text-center">
        { isMobile ? (
          <a className="text-decoration-none" data-bs-toggle="collapse" href="#collapseCategories" role="button" aria-expanded={isMobile} aria-controls="collapseCategories">
            <h5>Filter Categories</h5>
          </a>
        ) : (
          <h5>Filter Categories</h5>
        )}
        <hr className="dropdown-divider" />
        <div className={isMobile ? "collapse" : ""} id={isMobile ? "collapseCategories" : ""}>
          <DisplayCategories audience={audience} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
        </div>
      </div>
      <div id="products">
        <DisplayProducts audience={audience} propArray={propArray}/>
      </div>
    </div>

  )
}

export default ProductList;
