export const FetchAPI = (url,method,data)=>{
    return new Promise((resolve, reject) => {
        const req = new Request(`/api${url}`, {
            method: method,
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "Content-Type": ' application/json',
            }});
        fetch(req).then((res)=>{
            if(res.ok){
                return res.json();
            }
            reject({err:{msg:'网络异常',code:'6666'}})
        }).then((result)=>{
            if(result.code == '0000'){
                resolve(result.data)
            } else {
                reject(result);
            }
        }).catch((err)=> {
            reject({err:{msg:'后台异常',code:'6666'}})
        });
    })
}
