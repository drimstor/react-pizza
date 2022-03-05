import React from 'react';
import PropTypes from 'prop-types';
// Принимаем из пропс массив со значениями, передаем нажуру индекс выбранной сортировки и получаем активный индекс из Redux
function SortPopup({ items, onClickSortType, activeSortType }) {
  // Отслеживаем состояние попапа
  const [showPopup, setShowPopup] = React.useState(false);
  // Записываем ссылку на HTML блок для проверки
  const sortRef = React.useRef();
  // Динамическое название сортировки, если тип из Redux совпадает с типом из массива то верни название
  const activeLabel = items.find((obj) => obj.type === activeSortType).name;
  // При каждом клике меняет состояние попапа
  function toggleShowPopup() {
    setShowPopup(!showPopup);
  }
  // При клике на элемент сортировки, наружу передается объект и попап закрывается
  function onSelectItem(obj) {
    onClickSortType(obj);
    setShowPopup(false);
  }
  // Отслеживаем клик по всей странице для закрытия попапа
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);
  // Проверяем если клик был по области вне попапа
  function handleOutsideClick(event) {
    const path = event.path || (event.composedPath && event.composedPath());
    // Если путь клика не содержит записанной ссылки то меняем состояние попапа на false
    if (!path.includes(sortRef.current)) {
      setShowPopup(false);
    }
  }

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={showPopup ? 'rotate' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* При клике на динамическое название меняется состояние попапа */}
        <span onClick={toggleShowPopup}>{activeLabel}</span>
      </div>
      {/* Если состояние попапа активно */}
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {items &&
              items.map((obj, index) => (
                <li
                  // Если тип объекта из Redux совпадает с типом из массива то добвить класс active
                  className={activeSortType === obj.type ? 'active' : ''}
                  // При клике на элемент сортировки, наружу передается объект с информацией для Redux
                  onClick={() => onSelectItem(obj)}
                  // Уникальные ключи
                  key={`${obj.type}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
// Типизация
SortPopup.propTypes = {
  activeSortType: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickSortType: PropTypes.func.isRequired,
};
// Стандартные значения
SortPopup.defaultProps = { items: [] };

export default SortPopup;
