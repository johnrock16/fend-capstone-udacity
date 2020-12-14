export const SERVER_ROOT='http://localhost:3000';

export const verifyUrl=(url)=>{
    const regexUrl=/^(ftp|https):\/\/[^ "]+$/
    return regexUrl.test(url)
}

export const postData=(url,obj)=>{
    return fetch(`${SERVER_ROOT}${url}`, {
        method: 'POST',
        headers:{
            'content-type':'application/json',
            'accept':'application/json',
        },
        body: JSON.stringify(obj)
    }).then((resolve)=>{
        if(resolve.status===200){
            return resolve.json();
        }
        else if(resolve.status===400){
            alert('Invalid URL');
        }
        else if(resolve.status===500){
            alert('Evaluate failed');
        }
        else{
            alert('error on server');
        }
    }).then((result)=>{
        return result;
    }).catch((error)=>{
        console.log(error)
    });
}