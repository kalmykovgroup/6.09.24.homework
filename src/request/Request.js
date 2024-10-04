 export const baseUrl = "https://localhost:7270/"
 export function Get(url, params, callBack){

    // Default options are marked with *
    fetch(`${baseUrl}${url}${params}`, {
        method: "GET", //
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        } ,
        credentials: 'include',
        cors: "cors"
    }).then(response => {
        if(response.status === 200)
            return response.json()
        else{
            console.log(response)
        }

    }).then(data => callBack(data))
}

export function Post(url, params, callBack){


    // Default options are marked with *
    fetch(`${baseUrl}${url}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        } ,
        credentials: 'include',
        cors: "cors"
    }).then(response => {
        if(response.status === 200)
            return response.json()
        else{
            console.log(response)
        }

    }).then(data => callBack(data))
}