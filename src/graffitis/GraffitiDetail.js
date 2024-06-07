import React from "react";
import PropTypes from "prop-types";

export default function GraffitiDetail({ graffiti, onEdit, onDelete }) {
  const handleEditClick = (graffitiBeingEdited) => {
    onEdit(graffitiBeingEdited);
  };

  const handleDeleteClick = (graffitiBeingDeleted) => {
    onDelete(graffitiBeingDeleted);
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-sm-6">
          {graffiti.imgLocation === "" && (
            <>
              <img
                className="rounded detail-image"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5hvw6LxzrtFDIiaj9ETqX7dW38OcbMaHCA&usqp=CAU"
                alt={graffiti.name}
              />
            </>
          )}
          {graffiti.imgLocation !== "" && (
            <img
              className="rounded detail-image"
              src={graffiti.imgLocation}
              alt={graffiti.name}
            />
          )}
        </div>
        <div className="col-sm-6">
          <section className="section dark">
            <h3 className="strong">
              <strong>{graffiti.name}</strong>
            </h3>
            <p>
              <strong>GSN:</strong> {graffiti.graffitiSurveyNumber}
            </p>
            <p>
              <strong>Size:</strong> {graffiti.size}
            </p>
            <p>
              <strong>Address:</strong> {graffiti.address}
            </p>
            <p>
              <strong>Postcode:</strong> {graffiti.postcode}
            </p>
            <p>
              <strong>Location:</strong> {graffiti.location.longitude}°,{" "}
              {graffiti.location.latitude}°
            </p>
            <p>{graffiti.description}</p>
          </section>
          <button
            className=" bordered"
            onClick={() => {
              handleEditClick(graffiti);
            }}
          >
            <span className="icon-edit "></span>
            Edit
          </button>
          <button
            className="inverse bordered"
            onClick={() => {
              handleDeleteClick(graffiti);
            }}
          >
            <span className=""></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

GraffitiDetail.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
