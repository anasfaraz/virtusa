import axios from 'axios'
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

     register(firstname,lastname, email, password) {
        return axios.post('https://virtusa-api.herokuapp.com/api/auth/signup', {
            firstname,
            lastname,
            email,
            password
         })

    }
    logout(id) {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("pattern_id");
        sessionStorage.removeItem("detector");

        return axios({

            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },

            method: 'get',
            url: `https://virtusa-api.herokuapp.com/api/auth/signout/${id}`,

        })

        
    }




     isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }
 

  login(email, password) {
     return  axios({
         headers: {
             
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${sessionStorage.getItem("token")}`
         },

         method: 'post',
         url: 'https://virtusa-api.herokuapp.com/api/auth/signin',
         data: {
             email,                     
             password                           
         }

     })
 } 

    LoginPassword(pass) {
        return axios({

            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },

            method: 'put',
            url: `https://virtusa-api.herokuapp.com/api/user/${sessionStorage.getItem("id")}`,
            data: {
                password: pass
            }

        })
    }



 AddPattern(pattern){
     console.log(pattern.password + "Password")
     return axios({
         headers: {

             'Content-Type': 'application/json',
             'Authorization': `Bearer ${sessionStorage.getItem("token")}`

         },

         method: 'post',
         url:(`https://virtusa-api.herokuapp.com/api/secure/${pattern.id}/${pattern.pattern_id}`),
         data : {
             password : pattern.password
         }

     })
 }

  FetchUser(){
     return  axios({
         headers: {

             'Content-Type': 'application/json',
             'Authorization': `Bearer ${sessionStorage.getItem("token")}`

         },

         method: 'get',
         url: `https://virtusa-api.herokuapp.com/api/user/${sessionStorage.getItem("id")}`,

     })
    }

    FetchUserPattern(id) {
        return axios({

            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },

            method: 'get',
            url: `https://virtusa-api.herokuapp.com/api/secure/all/${sessionStorage.getItem("id")}`,

        })
    }

    ValidatePattern(password) {
        console.log(password)
        return axios({

            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },

            method: 'post',
            url: `https://virtusa-api.herokuapp.com/api/secure/validate/${sessionStorage.getItem("id")}`,
           data : 
           {
               password : password
           }

        })
    }
 
    EditPattern(newPattern) {
        return axios({

            headers: {

                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },

            method: 'put',
            url: `https://virtusa-api.herokuapp.com/api/secure/${sessionStorage.getItem("id")}/${sessionStorage.getItem("pattern_id")}`,
            data:{
                password : newPattern
            }

        })
    }

//homepage
 FetchHomeProducts(id) {
    return  axios({
        headers: {
              'Content-Type':'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`

        },
        method:'get',
        url: `https://virtusa-api.herokuapp.com/api/home/${id}`,
    })

}
//after click homepage details
    FetchProductDetails() {
        console.log()
        return axios({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            method: 'get',
            url: `https://virtusa-api.herokuapp.com/api/product/${sessionStorage.getItem("id")}/${sessionStorage.getItem("p")}`,
        })
    }
    //profilepic update
  
    FetchProfilePhoto(pic) {
    var form = new FormData();
    form.append('photo', pic);
        return axios({
            headers: {
                'Content-Type': form.getHeaders,
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`

            },
            method: 'post',
            url: `https://virtusa-api.herokuapp.com/api/user/${sessionStorage.getItem("id")}/photo`,
            data: form
        })
    }
    //admin
//admin add product
    FetchAddProduct(data) {
        return axios({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("admin_token")}`

            },
            method: 'post',
            url: `https://virtusa-api.herokuapp.com/api/product/${sessionStorage.getItem("admin_id")}`,
            data
        })
    }








}


















export default new AuthenticationService()
    // .then(res => console.log(res.data)).catch(err => console.log(err));