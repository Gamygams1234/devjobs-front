import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function NoOptions(props) {
  const { warning, secondWarning } = props;

  return (
    <div className="no-options mt-3 bg-white-1">
      <div className="icon">
        <FontAwesomeIcon icon={faCircleInfo} />
      </div>

      <h3 className="fw-800 mb-3 text-black">{warning}</h3>
      {secondWarning && <h5 className="fw-800 text-dark-grey">{secondWarning}</h5>}
    </div>
  );
}
