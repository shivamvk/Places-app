import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validotor";
import { useForm } from "../../shared/hooks/form-hook.js";

import "./PlaceForm.css";

const dummy_places = [
  {
    id: "p1",
    title: "Empire state building",
    description: "Best building in the world",
    image:
      "https://cropper.watch.aetnd.com/public-content-aetn.video.aetnd.com/video-thumbnails/AETN-History_VMS/21/202/tdih-may01-HD.jpg?w=1440",
    address: "bla bla new york USA",
    creatorId: "u1",
    location: {
      lat: "40.7484405",
      lng: "-73.9878531",
    },
  },
  {
    id: "p2",
    title: "Taj Mahal",
    description: "Best building in the India",
    image:
      "https://cdn.britannica.com/86/170586-050-AB7FEFAE/Taj-Mahal-Agra-India.jpg",
    address: "Agra Uttar Pradesh India",
    creatorId: "u2",
    location: {
      lat: "27.173891",
      lng: "78.042068",
    },
  },
];

const UpdatePlace = (props) => {
  const placeId = useParams().placeId;
  const identifiedPlace = dummy_places.find((p) => p.id === placeId);
  
  const [formState, inputHandler] = useForm({
    title: {
      value: identifiedPlace.title,
      isValid: true,
    },
    description: {
      value: identifiedPlace.description,
      isValid: true,
    },
  }, true);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send it to backend
  }
  
  if (!identifiedPlace) {
    return <div className="center">Couldn't find the place</div>;
  }

  return (
    <form className="place-form" onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        value={formState.inputs.title.value}
        isValid={formState.inputs.title.isValid}
        errorText="Please enter a valid title."
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        value={formState.inputs.description.value}
        isValid={formState.inputs.description.isValid}
        errorText="Please enter a valid description (at least 5 characters)"
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
