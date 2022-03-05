import React from 'react';
import { Categories, SortPopup, PizzaBlock, PizzaLoading } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
  const dispatch = useDispatch();
  // Достать из Redux нужные значения
  const items = useSelector(({ pizzas }) => pizzas.items);
  const cartItems = useSelector(({ cart }) => cart.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  // Отправить в State каждое изменение категорий для сортировки
  React.useEffect(() => {
    dispatch(fetchPizzas(sortBy, category));
  }, [sortBy, category]);
  // Отправить в State индекс категории по клику из компонента
  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);
  // Отправить в State индекс сортировки по клику из компонента
  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);
  // Отправить в State объект с пиццой для добавления в корзину
  const handleAddPizzaToCart = (obj) => {
    dispatch(addPizzaToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          // Передаем в пропс значения из Redux
          activeCategory={category}
          // Передаем индекс категории из компонента
          onClickCategory={onSelectCategory}
          // Передаем массив самих категорий
          items={categoryNames}
        />
        <SortPopup
          // Передаем в пропс значения из Redux
          activeSortType={sortBy.type}
          // Передаем индекс сортировки из компонента
          onClickSortType={onSelectSortType}
          // Передаем массив с объектами информации
          items={sortItems}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* Если асинхронные данные уже загрузились */}
        {isLoaded
          ? items.map((obj) => (
              <PizzaBlock
                // Вытащить объект с пиццой из компонента
                onClickAddPizza={handleAddPizzaToCart}
                // Прокинуть в компонент id пиццы и количество пицц
                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                // Ключ
                key={obj.id}
                // Rest объекта пиццы
                {...obj}
              />
            ))
          // А если не загрузились то показать Content Loader
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoading key={index} />)}
      </div>
    </div>
  );
}

export default Home;
