import style from './children-three.less';
export default {
    name: 'ChildrenThree',
    data() {
        return {
            text: '我是三儿子'
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
