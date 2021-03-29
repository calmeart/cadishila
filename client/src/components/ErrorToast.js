import React from "react"

function ErrorToast(props) {
  return (
    <div className="toast show align-items-center position-absolute top-50 start-50 translate-middle" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="me-auto">Error</strong>
        <button type="button" className="btn-close" onClick={props.dismissError} data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div className="toast-body">
        {props.errorMessage}
      </div>
    </div>
  )
}

export default ErrorToast;
