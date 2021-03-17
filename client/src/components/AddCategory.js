import React, {Component} from "react"
import { gql, useMutation } from '@apollo/client';

const CategoryMutation = gql`
  mutation ($name: String!, $class: String!) {
    addCategory(name: $name, class: $class) {
      id
      name
      class
    }
  }
`

function AddCategoryFunction({ resetState, handleNameInputChange, handleClassInputChange, name, audience }) {
  const [addCategory, {data}] = useMutation(CategoryMutation);

  return (
    <form className="m-3 p-3 bg-light" onSubmit={e => {
      e.preventDefault()
      addCategory({
        variables: {
          name,
          class: audience
        }
      })
      resetState();
    }} style={{width: "400px"}}>
      <h5 className="mb-3 text-center">Add Category</h5>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name: </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" value={name} onChange={handleNameInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputClass" className="col-sm-2 col-form-label">Class: </label>
        <div className="col-sm-10">
          <select className="form-select" id="inputClass" aria-label="Select Audience" onChange={handleClassInputChange}>
            <option value="Human">Human</option>
            <option value="Pet">Pet</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

class AddCategory extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      class: "",
    }
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleClassInputChange = this.handleClassInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleNameInputChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  };

  handleClassInputChange(e) {
    e.preventDefault();
    this.setState({
      class: e.target.value
    })
  };

  resetState() {
    this.setState({
      name: "",
      class: ""
    })
  }

  render() {
    return (
        <div>
          <AddCategoryFunction resetState={this.resetState} handleNameInputChange={this.handleNameInputChange} handleClassInputChange={this.handleClassInputChange} name={this.state.name} audience={this.state.class} />
        </div>
    )
  }
}

export default AddCategory;
