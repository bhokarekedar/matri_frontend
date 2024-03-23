export const loadState = () => {
   try {
    const data = localStorage.getItem('user-data');
    if(data === null){
        return undefined;
    }
    return JSON.parse(data)
   } catch (error) {
    console.log("error IN GETTING LOCALSTORAGE");
    return error
   }
}

export const saveState = (state) => {
    try {
     let data = JSON.stringify(state)
     localStorage.setItem('user-data', data);
     
    } catch (error) {
     console.log("error IN setting LOCALSTORAGE");
     return error
    }
 }