import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9090';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default{
    methods: {
        async $api(url, data = {}, method = "GET"){
            
            return (await axios({
                method: method,
                url,
                data: data
            }).catch(e=>{
                console.log(e);
            })).data;
        },
        $base64(file){
            return new Promise(resolve =>{
                let a = new FileReader();
                a.onload = e => resolve(e.target.result);
                a.readAsDataURL(file);
            });
        }
    }
}