import React from "react";

import PlaceItem from "./PlaceItem";
import Card from "../../shared/components/UIElements/Card";

import "./PlacesList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Places found! Why not add one?</h2>
          <button>Add a place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          description={place.description}
          image={place.image}
          address={place.address}
          location={place.location}
          creatorId={place.creatorId}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
