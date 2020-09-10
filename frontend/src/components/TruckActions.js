function getTrucks(){
    return fetch("/trucks?address=")
      .then(handleErrors)
      .then(res => res.json());
}

// function fakeGetTrucks(){
//     return new Promise(resolve => {
//         setTimeout(
//             () =>
//                 resolve(
//                     {
//                         trucks:[
//                             {
//                                 id:0,
//                                 name:"Apple"
//                         },
//                         {
//                             id:1,
//                             name:"Pear"
//                          }
//                         ]
//                     }
//                 )
//         )

//     }


//     )

// }

export function fetchTrucks(){
    return dispatch => {
        dispatch(fetchTrucksBegin());
        return getTrucks()
          //  .then(handleErrors)
          //  .then(res => res.json())
            .then(json => {
                dispatch(fetchTrucksSuccess(json.trucks));
                console.log("200");
                return json.trucks;
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