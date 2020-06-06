import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showMap, setShowMap] = useState(false);
  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const [showDeleteConfirmModal, setShowDelteConfirmModal] = useState(false);
  const showDeleteConfirmModalHandler = () => setShowDelteConfirmModal(true);
  const closeDeleteConfirmModalHandler = () => setShowDelteConfirmModal(false);
  const deleteClickHandler = async () => {
    setShowDelteConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
    } catch (errror) {}
  };

  console.log(auth.userId + " " + props.creator);
  console.log(auth.isLoggedIn);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <Map center={props.location} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showDeleteConfirmModal}
        onCancel={closeDeleteConfirmModalHandler}
        header={<p>Are you sure?</p>}
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={closeDeleteConfirmModalHandler}>CANCEL</Button>
            <Button onClick={deleteClickHandler}>DELETE</Button>
          </React.Fragment>
        }
      >
        <p>Please confirm that you want to delete this place!</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {auth.isLoggedIn && auth.userId === props.creator && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.isLoggedIn && auth.userId === props.creator && (
              <Button danger onClick={showDeleteConfirmModalHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
