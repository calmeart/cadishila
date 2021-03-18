import React, {Component} from "react"
import { gql, useMutation } from '@apollo/client';
import { CategoryMutation } from '../graphql/queries';

function AddCategoryFunction({ resetState, handleNameInputChange, handleAudienceInputChange, name, audience }) {
  const [addCategory] = useMutation(CategoryMutation);

  return (
    <form className="p-3 bg-light" onSubmit={e => {
      e.preventDefault()
      addCategory({
        variables: {
          name,
          audience
        }
      })
      resetState();
    }}>
      <h5 className="mb-3 text-center">Add Category</h5>
      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="inputName" placeholder="Name" value={name} onChange={handleNameInputChange} />
        <label htmlFor="inputName">Name</label>
      </div>
      <div className="form-floating mb-3">
          <select className="form-select" id="inputAudience" aria-label="Select Audience" value={audience} onChange={handleAudienceInputChange}>
            <option value="human">Human</option>
            <option value="pet">Pet</option>
          </select>
          <label htmlFor="floatingSelect">Select Audience</label>
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
      audience: "",
    }
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleAudienceInputChange = this.handleAudienceInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleNameInputChange(e) {
    this.setState({
      name: e.target.value
    })
  };

  handleAudienceInputChange(e) {
    this.setState({
      audience: e.target.value
    })
  };

  resetState() {
    this.setState({
      name: "",
      audience: ""
    })
  }

  render() {
    return (
        <div id="addCategoryBox">
          <AddCategoryFunction
            resetState={this.resetState}
            handleNameInputChange={this.handleNameInputChange}
            handleAudienceInputChange={this.handleAudienceInputChange}
            name={this.state.name}
            audience={this.state.audience}
          />
        </div>
    )
  }
}

export default AddCategory;
