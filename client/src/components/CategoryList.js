import React, { useState } from "react"
import { useMutation, useQuery } from '@apollo/client';
import { CategoryMutation, DeleteCategory, GetCategoriesQuery } from '../graphql/category-queries';

function AddCategory(props) {
  const [addCategory] = useMutation(CategoryMutation);
  const [category, setCategory] = useState({
    name: "",
    audience: "human"
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setCategory(prev => { return { ...prev, [name]: value}  });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const { name, audience } = category;
    const returnedPromise = addCategory({
      variables: {
        name,
        audience
      },
      refetchQueries: [{query: GetCategoriesQuery }]
    });
    returnedPromise.then(result => {
      setCategory(prev => ({ ...prev, name: "" }));
    }).catch(err => {
      props.appointError(err.message);
    })
  };

  return (
      <tfoot>
        <tr>
          <th scope="row">#</th>
          <td>
            <select className="form-select" id="inputAudience" name="audience" value={category.audience} onChange={handleInputChange} aria-label="Select Audience">
              <option value="human">Human</option>
              <option value="pet">Pet</option>
            </select>
          </td>
          <td>
            <input type="text" className="form-control" id="categoryInputName" name="name" value={category.name} onChange={handleInputChange} placeholder="Name"  />
          </td>
          <td>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="btn btn-primary">Create Category</button>
            </form>
          </td>
        </tr>
      </tfoot>
  )
}

function CategoryList(props) {
  const { loading, error, data } = useQuery(GetCategoriesQuery);
  const [deleteCategory] = useMutation(DeleteCategory);

  if (loading) return <p className="errorMessage">Loading...</p>;
  if (error) return <p className="errorMessage">Error: {error.message}</p>;

  function handleClick(e) {
    const { name } = e.target
    e.preventDefault();
    const returnedPromise = deleteCategory({
      variables: {
        id: name
      },
      refetchQueries: [{ query: GetCategoriesQuery}]
    });
    returnedPromise.then().catch(err => {
      props.appointError(err.message);
    });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Audience</th>
          <th scope="col">Type</th>
          <th scope="col">Created At</th>
          <th className="text-center" scope="col">Product Quantity</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
      {
        data.categories.map((item, idx) => (
          <tr key={item.id}>
            <th scope="row">{idx + 1}</th>
            <td>{item.audience}</td>
            <td>{item.name}</td>
            <td>{item.createdAt ? item.createdAt.substr(0,10) : 'Not Given'}</td>
            <td className="text-center">{item.products.length}</td>
            <td><button type="button" name={item.id} onClick={handleClick} className="btn-close" aria-label="Close"></button></td>
          </tr>
        ))
      }
      </tbody>
      <AddCategory appointError={props.appointError} />
    </table>
  )
}

export default CategoryList;
