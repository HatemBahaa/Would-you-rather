

const logger = (store) => (next) => (action) =>{

    console.group(action.type); 
        console.log("Action is", action);

        const returnedValue = next(action);

        console.log("New state is:", store.getState());
    console.groupEnd();

    return returnedValue;
  }


  export default logger