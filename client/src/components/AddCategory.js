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
    <form className="p-3 bg-light" onSubmit={handleSubmit}>
      <h5 className="mb-3 text-center">Add Category</h5>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="inputName" name="name" value={category.name} onChange={handleInputChange} placeholder="Name"  />
        <label htmlFor="inputName">Name</label>
      </div>
      <div className="form-floating mb-3">
          <select className="form-select" id="inputAudience" name="audience" value={category.audience} onChange={handleInputChange} aria-label="Select Audience">
            <option value="human">Human</option>
            <option value="pet">Pet</option>
          </select>
          <label htmlFor="floatingSelect">Select Audience</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default AddCategory;
