import React, {Component} from "react"
import { gql, useMutation, useQuery } from '@apollo/client';

const ProductMutation = gql`
  mutation ($name: String!, $description: String!, $price: String!, $size: String!, $categoryId: String!) {
    addProduct(name: $name, description: $description, price: $price, size: $size, categoryId: $categoryId) {
      id
      name
      price
      category {
        id
        name
        audience
      }
    }
  }
`;

const GetCategoriesQuery = gql`
  query ($audience: String!) {
    categories(audience: $audience) {
      id
      name
    }
  }
`;

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

function AddProductFunction(props) {
  const { name, description, price, size, categoryId, audience } = props;
  const [addProduct] = useMutation(ProductMutation);
  return (
    <form className="m-3 p-3 bg-light" onSubmit={e => {
      e.preventDefault()
      addProduct({
        variables: {
          name,
          description,
          price,
          size,
          categoryId
        }
      })
      props.resetState();
    }} style={{width: "500px"}}>
      <h5 className="mb-3 text-center">Add Product</h5>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputName" value={name} onChange={props.handleNameInputChange} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="inputDescription" value={description} onChange={props.handleDescriptionInputChange} />
        </div>
      </div>
      <div className="row mb-3">
          <label htmlFor="inputPrice" className="col-sm-2 col-form-label">Price </label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="inputPrice" value={price} onChange={props.handlePriceInputChange} />
          </div>
          <label htmlFor="inputSize" className="col-sm-1 col-form-label">Size </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="inputSize" value={size} onChange={props.handleSizeInputChange} />
          </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6">
        <select className="form-select" id="inputClass" aria-label="Select Audience" value={audience} onChange={props.handleAudienceInputChange}>
          <option disabled>Select Audience</option>
          <option value="human">Human</option>
          <option value="pet">Pet</option>
        </select>
        </div>
        <div className="col-sm-6">
          <select className="form-select" id="inputCatType" value={categoryId} aria-label="Select Type" onChange={props.handleCategoryIdInputChange}>
            <option disabled>Select Type</option>
            <GetCategories audience={audience}/>
          </select>
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

class AddProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      price: "",
      size: "",
      categoryId: "Select Type",
      audience: "Select Audience",
    }
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleDescriptionInputChange = this.handleDescriptionInputChange.bind(this);
    this.handlePriceInputChange = this.handlePriceInputChange.bind(this);
    this.handleSizeInputChange = this.handleSizeInputChange.bind(this);
    this.handleCategoryIdInputChange = this.handleCategoryIdInputChange.bind(this);
    this.handleAudienceInputChange = this.handleAudienceInputChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  // name={this.state.name} description={this.state.description} price={this.state.price} size={this.state.size} categroyId={this.state.categoryId} handleCategoryIdInputChange={this.handleCategoryIdInputChange} handleSizeInputChange={this.handleSizeInputChange} handlePriceInputChange={this.handlePriceInputChange} handleNameInputChange={this.handleNameInputChange} handleDescriptionInputChange={this.handleDescriptionInputChange}

  handleNameInputChange(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    })
  };

  handleDescriptionInputChange(e) {
    e.preventDefault();
    this.setState({
      description: e.target.value
    })
  };

  handlePriceInputChange(e) {
    e.preventDefault();
    this.setState({
      price: e.target.value
    })
  };

  handleSizeInputChange(e) {
    e.preventDefault();
    this.setState({
      size: e.target.value
    })
  };

  handleCategoryIdInputChange(e) {
    e.preventDefault();
    this.setState({
      categoryId: e.target.value
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
      description: "",
      price: "",
      size: "",
      categoryId: "Select Type",
      audience: "Select Audience",
    })
  }

  render() {
    return (
      <div>
        <AddProductFunction
          name={this.state.name}
          description={this.state.description}
          price={this.state.price} size={this.state.size}
          categoryId={this.state.categoryId}
          audience={this.state.audience}
          handleCategoryIdInputChange={this.handleCategoryIdInputChange}
          handleSizeInputChange={this.handleSizeInputChange}
          handlePriceInputChange={this.handlePriceInputChange}
          handleNameInputChange={this.handleNameInputChange}
          handleDescriptionInputChange={this.handleDescriptionInputChange}
          handleAudienceInputChange={this.handleAudienceInputChange}
          resetState={this.resetState}
        />
      </div>
    )
  }
}

export default AddProduct;
