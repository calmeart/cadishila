import React, {Component} from "react"
import { gql, useMutation } from '@apollo/client';

const CategoryMutation = gql`
  mutation ($name: String!, $audience: String!) {
    addCategory(name: $name, audience: $audience) {
      id
      name
      audience
    }
  }
`

function AddCategoryFunction({ resetState, handleNameInputChange, handleAudienceInputChange, name, audience }) {
  const [addCategory, {data}] = useMutation(CategoryMutation);

  return (
    <form className="m-3 p-3 bg-light" onSubmit={e => {
      e.preventDefault()
      addCategory({
        variables: {
          name,
          audience
        }
      })
      resetState();
    }} style={{width: "500px"}}>
      <h5 className="mb-3 text-center">Add Category</h5>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" value={name} onChange={handleNameInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputClass" className="col-sm-2 col-form-label">Audience </label>
        <div className="col-sm-10">
          <select className="form-select" id="inputClass" aria-label="Select Audience" value={audience} onChange={handleAudienceInputChange}>
            <option selected disabled>Select Audience</option>
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
      audience: "Select Audience",
    }
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleAudienceInputChange = this.handleAudienceInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleNameInputChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  };

  handleAudienceInputChange(e) {
    e.preventDefault();
    this.setState({
      audience: e.target.value
    })
  };

  resetState() {
    this.setState({
      name: "",
      audience: "Select Audience"
    })
  }

  render() {
    return (
        <div>
          <AddCategoryFunction resetState={this.resetState} handleNameInputChange={this.handleNameInputChange} handleAudienceInputChange={this.handleAudienceInputChange} name={this.state.name} audience={this.state.audience} />
        </div>
    )
  }
}

export default AddCategory;
