import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validotor";
import { useForm } from "../../shared/hooks/form-hook.js";

import "./PlaceForm.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [identifiedPlace, setIdentifiedPlace] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );
        setIdentifiedPlace(data.place);
        console.log(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, placeId, setFormData]);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!identifiedPlace && !error) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && identifiedPlace && (
        <form className="place-form" onSubmit={submitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
            value={identifiedPlace.title}
            isValid={true}
            errorText="Please enter a valid title."
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
            value={identifiedPlace.description}
            isValid={true}
            errorText="Please enter a valid description (at least 5 characters)"
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;
