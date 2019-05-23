import './app.less';
export default {
    name: 'App',
    data() {
        return {
            text: 'Hello World'
        };
    },
    mounted() {
        this.axios({
            url: "http://127.0.0.1:9000/users/list",
            method: "post",
            params: {
                username: "huangyuling"
            }
        })
            .then(res => {
                debugger;
                this.text = "已接收远程信息："+res;
            })
            .catch(err => {
                debugger;
                this.text = err;
            });
    },
    render(h) {
        return (
            <div>
                <p class="welcome">{this.text}</p>
                <img src={require('../assets/img/500114377_banner.png')} alt="" /><router-view />
            </div>
        )
    }
}
