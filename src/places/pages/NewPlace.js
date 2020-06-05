import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validotor";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

const NewPlace = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const body = {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        creator: auth.userId,
      };
      console.log(body);
      await sendRequest(
        "http://localhost:5000/api/places/",
        "POST",
        JSON.stringify(body),
        { "Content-Type": "application/json" }
      );
      history.push(`${auth.userId}/places`);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={formSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid title."
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter a valid description (at least 5 characters)."
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter a valid address."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;
