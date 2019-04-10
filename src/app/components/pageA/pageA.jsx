import style from './pageA.less';
import style1 from './pageA.css';
export default {
    name: 'PageA',
    data() {
        return {
            text: '我是pageA'
        };
    },
    render(h) {
        return (<div class={style1.root} >
            <p class="p" >{this.text},{style.root},{style1.root},{h}</p>
        </div>)
    },
    mounted() {
        debugger;
        console.log($('div'), '你哈珀');
    }
}
