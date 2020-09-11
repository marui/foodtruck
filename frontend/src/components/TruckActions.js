function getTrucks(){
    return fetch("http://localhost:9000/trucks")
      .then(handleErrors)
      .then(res => res.json());
}

// function getTrucksbyId(truckid){
//     return fetch("http://localhost:9000/trucks?truckid=$??")
//       .then(handleErrors)
//       .then(res => res.json());
// }

export function fetchTrucks(){
    return dispatch => {
        dispatch(fetchTrucksBegin());
        return getTrucks()
            .then(json => {
                dispatch(fetchTrucksSuccess(json));
                console.log(json);
                return json;
            })
            .catch(error => dispatch(fetchTrucksFailure(error)));
    };
}

function handleErrors(response){
    if(!response.ok){
        throw Error(response.statusText);
    }
    return response;
}

export const FETCH_TRUCKS_BEGIN = 'FETCH_TRUCKS_BEGIN';
export const FETCH_TRUCKS_SUCCESS = 'FETCH_TRUCKS_SUCCESS';
export const FETCH_TRUCKS_FAILURE = 'FETCH_TRUCKS_FAILURE';

export const fetchTrucksBegin = () => ({
    type: FETCH_TRUCKS_BEGIN
});

export const fetchTrucksSuccess = trucks => ({
    type: FETCH_TRUCKS_SUCCESS,
    payload: { trucks }
});

export const fetchTrucksFailure = error => ({
    type: FETCH_TRUCKS_FAILURE,
    payload:{ error }
});