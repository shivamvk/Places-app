import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Places = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(data.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlacesList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default Places;
