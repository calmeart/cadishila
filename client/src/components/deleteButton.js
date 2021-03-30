import React from "react";
import { useMutation } from '@apollo/client';
import { DeleteProductMutation } from '../graphql/queries';

function DeleteButton({ id, appointError }) {
  const [deleteProduct] = useMutation(DeleteProductMutation);

  function handleDelete() {

    const returnedPromise = deleteProduct({ variables: { id } });
    returnedPromise.then(() => {
      window.location.reload(false);
    }).catch(err => {
      console.log(err);
    })
  }




  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Warning</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this product?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteButton;
