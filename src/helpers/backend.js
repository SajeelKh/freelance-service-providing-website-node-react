export default function configureBackend() {
    let users = [{id:1, username:'test', password: 'test', firstname: 'test', lastname: 'user'}];
    let realFetch = window.fetch;

    window.fetch = function(url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter((user) => {
                        return (user.username === params.username && user.password === params.password);
                    });

                    if(filteredUsers.length){
                        let user = filteredUsers[0];
                        const response = {
                            id: user.id,
                            username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            token: 'fake-jwt-token'
                        };
                        resolve({ok:true, data: Promise.resolve(JSON.stringify(response))})
                    } else {
                        reject('Username or Password is Incorrect');
                    }
                    return;
                }

                if(url.endsWith('/users') && opts.method === 'GET') {
                    if(opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token'){
                        resolve({ok: true, data: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        reject('Unauthorized');
                    }
                    return;
                }

                realFetch(url, opts).then(res => {
                    resolve(res);
                })
            }, 1000);
        });
    }
}