
function validateSize(sizeArray) {
  const checkArray = sizeArray.slice(1);
  const nameArray = ["neck", "chest", "length"];

  let state = true;
  let message = "";

  if (sizeArray[0] === "") {
    state = false;
    message = "Please select size";
    return { state, message };
  }

  checkArray.forEach((measure,idx) => {
    const numberValue = Number(measure);

    if (!numberValue) {
      state = false;
     return message = `Please select a valid ${nameArray[idx]} measure`;
    }

    if (!Number.isInteger(numberValue)) {
      state = false;
      return message= `The ${nameArray[idx]} value must be integer`;
    }

    if ( numberValue < 10 ) {
      state = false;
      return message = `The ${nameArray[idx]} value you entered is too small, please revise your measures`;
    }

    if ( numberValue > 250 ) {
      state = false;
      return message = `The ${nameArray[idx]} value you entered is too big, please revise your measures`;
    }
  })
  return { state, message }
}

export default validateSize;
