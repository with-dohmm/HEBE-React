import axios from 'axios'

const AuthenticationService = () => {
    // send username, password to the SERVER
    const executeJwtAuthenticationService = (username, password) => {
        return axios.post('http://localhost:8080/authenticate', {
            username,
            password
        })
    }

    const executeHelloService = () => {
        console.log("===executeHelloService===")
        return axios.get('http://localhost:8080/hello');        
    }

    const registerSuccessfulLoginForJwt = (username, token) => {
        console.log("===registerSuccessfulLoginForJwt===")
        localStorage.setItem('token', token);
        localStorage.setItem('authenticatedUser', username);
        // sessionStorage.setItem('authenticatedUser', username)
        //this.setupAxiosInterceptors(this.createJWTToken(token))
        this.setupAxiosInterceptors();
    }

    const createJWTToken = (token) => {
        return 'Bearer ' + token
    }

    const setupAxiosInterceptors = () => {
        axios.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    const logout = () => {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    const isUserLoggedIn = () => {
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token) {
            return true;
        }
        
        return false;
    }

    const getLoggedInUserName = () => {
        //let user = sessionStorage.getItem('authenticatedUser')
        let user = localStorage.getItem('authenticatedUser');
        if(user===null) return '';
        return user;
    }
}

export default AuthenticationService;