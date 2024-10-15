import React from "react";

function Card({ title = "N/A", description="N/A" }) {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </>
  );
}

export default Card;
