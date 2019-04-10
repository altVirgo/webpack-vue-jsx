import style from './children-two.less';
export default {
    name: 'ChildrenTwo',
    data() {
        return {
            text: '我是二儿子'
        };
    },
    render(h) {
        return (
            <div className={style.root}>
                <div>{this.text}</div>
            </div>
        )
    }
}
