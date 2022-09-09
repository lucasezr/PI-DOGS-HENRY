const initialState = {
  dogs: [],
  allDogs: [],
  detail: [],
  temperaments: [],
  allTemperaments: [],
  error: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_ALL_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
        allTemperaments: action.payload,
      };

    case "GET_NAME_DOG":
      if (typeof action.payload === "string") {
        return { ...state, error: action.payload };
      } else {
        return {
          ...state,
          error: "",
          dogs: action.payload,
        };
      }

    case "POST_DOG":
      return {
        ...state,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "created"
          ? state.allDogs.filter((el) => el.createdInDb)
          : state.allDogs.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: createdFilter,
      };

    case "FILTER_TEMPERAMENT":
      const dog = state.allDogs;
      const tempsFiltered =
        action.payload === "Todos"
          ? dog
          : dog.filter((el) => el.temperaments.includes(action.payload));
      return {
        ...state,
        dogs: tempsFiltered,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detail: [],
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };

    case "ORDER_BY_WEIGHT":
      const sortedArrWeight =
        action.payload === "max_weight"
          ? state.dogs.sort(function (a, b) {
              return b.min_weight - a.min_weight;
            })
          : state.dogs.sort(function (a, b) {
              return a.min_weight - b.min_weight;
            });
      return {
        ...state,
        dogs: sortedArrWeight,
      };
    default:
      return state;
  }
}

export default rootReducer;
