import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { CategoryMutation } from '../graphql/queries';

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
      }
    });
    returnedPromise.then(result => {
      setCategory(prev => ({ ...prev, name: "" }));
    }).catch(err => {
      props.appointError(err.message);
    })
  };

  return (

    <div className="btn-group dropup w-100">
      <button type="button" className="btn btn-primary dropdown-toggle" id="dropdownAddCategory" data-bs-toggle="dropdown" aria-expanded="false">
        Add Category
      </button>
      <div className="dropdown-menu w-100" aria-labelledby="dropdownAddCategory" onClick={(e) => e.stopPropagation()}>
        <form className="p-3 bg-light" onSubmit={handleSubmit}>
          <h5 className="mb-3 text-center">Add Category</h5>
          <div className="mb-3">
            <input type="text" className="form-control" id="inputName" name="name" value={category.name} onChange={handleInputChange} placeholder="Name"  />
          </div>
          <div className="mb-3">
              <select className="form-select" id="inputAudience" name="audience" value={category.audience} onChange={handleInputChange} aria-label="Select Audience">
                <option value="human">Human</option>
                <option value="pet">Pet</option>
              </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>


  )
}

export default AddCategory;
