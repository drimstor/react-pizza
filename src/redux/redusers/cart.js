// Создаем изначальные значения для State
const innitialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};
// Подсчет цены в массиве пицц
const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

// Чела в курсе понесло, функция для расчета общей цены и количества
const _get = (obj, path) => {
  const [firstKey, ...keys] = path.split('.');
  return keys.reduce((val, key) => {
    return val[key];
  }, obj[firstKey]);
};
const getTotalSum = (obj, path) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

// Редюсеры для кнопок в корзине
const cart = (state = innitialState, action) => {
  switch (action.type) {
    case 'ADD_PIZZA_CART': {
      // Проверяем нет ли добавляемой пиццы в корзине, результат добавляем в переменную
      const currentPizzaItems = !state.items[action.payload.id]
        ? // Если нет, то добавляем в массив объект с пиццей
          [action.payload]
        : // Если есть, то добавляем к массиву новый элемент
          [...state.items[action.payload.id].items, action.payload];
      // Формируем данные для Redux
      const newItems = {
        // Предыдущие данные в этом State
        ...state.items,
        // ID текущего элемента
        [action.payload.id]: {
          // Массив с объектом который создавали ранее
          items: currentPizzaItems,
          // Подсчет цены пицц в этом массиве
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      // Расчет общей цены и количества
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      // Передаем в Redux
      return {
        // Прошлые данные
        ...state,
        // Новый объект с пиццами
        items: newItems,
        // Cчетчики
        totalCount,
        totalPrice,
      };
    }
    // Удаляем элемент из корзины
    case 'REMOVE_CART_ITEM': {
      // Сохраняем в переменную текущее состояние
      const newItems = {
        ...state.items,
      };
      // Запоминаем текущую цену и количество
      const curentTotalPrice = newItems[action.payload].totalPrice;
      const curentTotalCount = newItems[action.payload].items.length;
      // Удаляем элемент
      delete newItems[action.payload];
      // Передаем в Redux удаление, отнимаем от общих счетчиков текущие значения
      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - curentTotalPrice,
        totalCount: state.totalCount - curentTotalCount,
      };
    }
    // Очищаем корзину, просто обнуляем State
    case 'CLEAR_CART': {
      return { items: {}, totalPrice: 0, totalCount: 0 };
    }
    // Добавляем +1
    case 'PLUS_CART_ITEM': {
      // Добавляем такой же объект в массив
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      // Формируем объект для Redux
      const newItems = {
        // Предыдущие значения
        ...state.items,
        // ID элемента
        [action.payload]: {
          // Массив с новым объектом
          items: newObjItems,
          // Считаем цену в массиве
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      // Считаем общую цену и количество
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');
      // Передаем в Redux все данные
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    // Отнимаем -1
    case 'MINUS_CART_ITEM': {
      // Сохраняем текущее значение
      const oldItems = state.items[action.payload].items;
      // Если элементов больше 1, то все следущие поместить в массив
      const newObjItems =
        oldItems.length > 1 ? state.items[action.payload].items.slice(1) : oldItems;
      // Передаем в Redux все данные
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      // Считаем количество и цену
      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      // Если элемент один
      if (oldItems.length == 1) {
        // Сохраняем текущее состояние
        const newItems = {
          ...state.items,
        };
        // Запоминаем текущую цену и количество
        const curentTotalPrice = newItems[action.payload].totalPrice;
        const curentTotalCount = newItems[action.payload].items.length;
        // Удаляем элемент
        delete newItems[action.payload];
        // Передаем в Redux удаление, отнимаем от общих счетчиков текущие значения
        return {
          ...state,
          items: newItems,
          totalPrice: state.totalPrice - curentTotalPrice,
          totalCount: state.totalCount - curentTotalCount,
        };
      }
      // Передаем в Redux прошлые значения, новый массив и счетчики
      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cart;
