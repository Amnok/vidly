import React from 'react';
import PropTypes from 'prop-types';

export default function ListGroup({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
}) {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item[valueProperty]} className="list-group-item">
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
};
