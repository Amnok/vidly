import React from 'react';
import PropTypes from 'prop-types';

export default function ListGroup({
  items,
  onItemSelect,
  textProperty,
  valueProperty,
  selectedItem,
}) {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            className={
              selectedItem === item.name
                ? 'list-group-item active'
                : 'list-group-item'
            }
            onClick={() => onItemSelect(item)}
            style={{ cursor: 'pointer' }}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
}
ListGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

ListGroup.propTypes = {
  items: PropTypes.array,
  onItemSelect: PropTypes.func,
  textProperty: PropTypes.string,
  valueProperty: PropTypes.string,
  selectedItem: PropTypes.string,
};
