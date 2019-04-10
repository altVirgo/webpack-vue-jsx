import style from './dashboard.less';
export default {
    name: 'Dashboard',
    data() {
        return {
            text: '我是Dashboard'
        };
    },
    render(h) {
        return (
            <div className={style.root}>
                <div>{this.text}</div>
                <ul>
                    <li><router-link to='./childrenOne' class='btn btn-success btn-region' role='button'>呼叫老大</router-link></li>
                    <li><router-link to='./childrenTwo' class='btn btn-success btn-region' role='button'>呼叫老二</router-link></li>
                    <li><router-link to='./childrenThree' class='btn btn-success btn-region' role='button'>呼叫老三</router-link></li>
                </ul>
                <router-view />
            </div>
        )
    }
}
