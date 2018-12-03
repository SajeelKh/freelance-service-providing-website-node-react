function promisedLand(theTruth){
    return new Promise((resolve, reject) => {
        if(theTruth){
            resolve({ok:false, data: "heres the truth!"});
        }
        else if(!theTruth){
            reject(new Error('You are not worthy'));
        }
    });
}

async function main(){
    return promisedLand(true).then(handleResponse)
    .then(res => res)
    .catch(err => {
        throw err;
    });
}

function handleResponse(res){
    if(res.ok){
        return res.data;
    }
    else{
        throw new Error("Internal Server Error");
    }
}

main().then(res => {
        console.log("Response: ", res);
    },
    err => {
        console.log("Error: ", err.message);
    }
).catch((err) => {
    console.log('clean');
})