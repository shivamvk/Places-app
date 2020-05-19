import React from "react";

import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";

const NewPlace = (props) => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        errorText="This shouldn't be empty"
      />
    </form>
  );
};

export default NewPlace;
