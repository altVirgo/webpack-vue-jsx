import './app.less';
export default {
    name: 'App',
    data() {
        return {
            text: 'Hello World'
        };
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
