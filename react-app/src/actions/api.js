import axios from "axios";

const baseUrl = "https://localhost:5001/api/";
const token = localStorage.getItem('token');

export default {
    
    product(url= baseUrl + 'products/'){
        return {
            fetchAll: () => axios.get(url,
                {
                    headers: {
                        'Authorization': ('Bearer ' + token),
                        'Accept' : 'application/json',
                        'Content-Type': 'application/json'
                    }
                }),
            fetchById:id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord, 
                {
                headers: {
                    'Authorization': ('Bearer ' + token),
                    'Content-Type': 'application/json'
                }
            }).catch(function (error) {
                    console.log("Post Error : " +error);
                }),
            update: (id, updateRecord) => axios.put(url + id, updateRecord,
                {
                    headers: {
                        'Authorization': ('Bearer ' + token),
                        'Content-Type': 'application/json'
                    }
                }),
            delete: id => axios.delete(url + id,
                {
                    headers: {
                        'Authorization': ('Bearer ' + token),
                        'Content-Type': 'application/json'
                    }
                }),
            }
        }
}