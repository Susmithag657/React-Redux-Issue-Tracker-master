import React from "react";

const StatusLabel = ({ status }) => {
  switch (status) {
    case "Open": {
      return <div className="label p-2 bg-success text-white ">Open</div>;
    }
    case "Closed": {
      return <div className="label p-2 bg-danger text-white ">Closed</div>;
    }
    default: {
      return (
        <div className="label p-2 bg-warning text-white ">In Progress</div>
      );
    }
  }
};

export default StatusLabel;
