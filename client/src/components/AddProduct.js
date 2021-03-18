import React, {Component} from "react"
import { gql, useMutation, useQuery } from '@apollo/client';
import { GetCategoriesQuery, ProductMutation, GetProductsQuery } from '../graphql/queries';


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
    <form className="p-3 bg-light" onSubmit={e => {
      e.preventDefault()
      addProduct({
        variables: {
          name,
          description,
          price,
          size,
          categoryId
        },
        refetchQueries: [{query: GetProductsQuery }]
      })
      props.resetState();
    }}>
      <h5 className="mb-3 text-center">Add Product</h5>

      <div className="row mb-3">
        <div className="col-sm-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="inputName" value={name} onChange={props.handleNameInputChange} placeholder="Name" />
            <label htmlFor="inputName">Name</label>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="inputPrice" value={price} onChange={props.handlePriceInputChange} placeholder="Price "/>
            <label htmlFor="inputPrice">Price</label>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="form-floating">
            <input type="text" className="form-control" id="inputSize" value={size} onChange={props.handleSizeInputChange} placeholder="Size"/>
            <label htmlFor="inputSize">Size</label>
          </div>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input type="text" className="form-control" id="inputDescription" value={description} onChange={props.handleDescriptionInputChange} placeholder="Description" />
        <label htmlFor="inputDescription">Description</label>
      </div>
      <div className="row">
        <div className="col-sm-5">
        <select className="form-select" id="inputClass" aria-label="Select Audience" value={audience} onChange={props.handleAudienceInputChange}>
          <option disabled>Select Audience</option>
          <option value="human">Human</option>
          <option value="pet">Pet</option>
        </select>
        </div>
        <div className="col-sm-5">
          <select className="form-select" id="inputCatType" value={categoryId} aria-label="Select Type" onChange={props.handleCategoryIdInputChange}>
            <option disabled>Select Type</option>
            <GetCategories audience={audience}/>
          </select>
        </div>
        <button type="submit" className="btn btn-primary col-sm-2">Submit</button>
      </div>
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
    this.setState({
      name: e.target.value
    })
  };

  handleDescriptionInputChange(e) {
    this.setState({
      description: e.target.value
    })
  };

  handlePriceInputChange(e) {
    this.setState({
      price: e.target.value
    })
  };

  handleSizeInputChange(e) {
    this.setState({
      size: e.target.value
    })
  };

  handleCategoryIdInputChange(e) {
    this.setState({
      categoryId: e.target.value
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
      description: "",
      price: "",
      size: "",
      categoryId: "Select Type",
      audience: "Select Audience",
    })
  }

  render() {
    return (
      <div id="addProductBox">
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
