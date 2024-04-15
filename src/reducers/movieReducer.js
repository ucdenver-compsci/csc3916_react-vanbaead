import constants from '../constants/actionTypes'

let initialState = {
      movies: [],
      selectedMovie: null,
      review: null
}

const movieReducer = (state = initialState, action) => {
      let updated = Object.assign({}, state);
      debugger;
      switch(action.type) {
            case constants.FETCH_MOVIES:
                  updated['movies'] = action.movies;
                  updated['selectedMovie'] = action.movies[0];
                  return updated;
            case constants.SET_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.FETCH_MOVIE:
                  updated['selectedMovie'] = action.selectedMovie;
                  return updated;
            case constants.ADD_REVIEW:
                  updated.selectedMovie = {
                        ...updated.selectedMovie,
                        reviews: [...updated.selectedMovie.reviews, action.review]
                    };
                    return updated;
            default:
                  return state;
      }
}

export default movieReducer;