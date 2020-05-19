import React from "react";

import Input from "../../shared/components/FormElements/Input";
import "./NewPlace.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validotor";

const NewPlace = (props) => {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="This shouldn't be empty"
      />
    </form>
  );
};

export default NewPlace;
