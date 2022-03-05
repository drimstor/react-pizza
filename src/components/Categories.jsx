import React from 'react';
import PropTypes from 'prop-types';

// Получаем пропсы с массивом категорий, функцию куда передается индекс выбранной категории и активный индекс
function Categories({ items, onClickCategory, activeCategory }) {
  return (
    <div className="categories">
      <ul>
        <li
          // Если null то добавить класс active
          className={activeCategory === null ? 'active' : ''}
          // При клике передавать null
          onClick={() => onClickCategory(null)}>
          Все
        </li>
        {items &&
          items.map((item, index) => (
            <li
              // Если индекс совпадает то добавить класс active
              className={activeCategory === index ? 'active' : ''}
              // При клике передать индекс в пропс
              onClick={() => onClickCategory(index)}
              // Уникальный ключ
              key={`${item}_${index}`}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}
// Типизация
Categories.propTypes = {
  activeCategory: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func,
};
// Стандартные значения
Categories.defaultProps = { items: [], activeCategory: null };

export default Categories;
