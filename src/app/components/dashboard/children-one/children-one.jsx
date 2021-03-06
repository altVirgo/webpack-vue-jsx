import style from './children-one.less';
export default {
    name: 'ChildrenOne',
    data() {
        return {
            text: '我是大儿子',
            form: {
                name: '1',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        };
    },
    render(h) {
        return (
            <div className={style.root}>
                <div>{this.text}
                    {this.form.name}</div>
                <el-form ref="form" model={this.form} label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input v-model={this.form.name}></el-input>
                    </el-form-item>
                    <el-form-item label="活动区域">
                        <el-select v-model={this.form.region} placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间">
                        <el-col span={11}>
                            <el-date-picker type="date" placeholder="选择日期" v-model={this.form.date1} style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" span={2}>-</el-col>
                        <el-col span={11}>
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model={this.form.date2} style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item >
                    <el-form-item label="即时配送">
                        <el-switch v-model={this.form.delivery}></el-switch>
                    </el-form-item>
                    <el-form-item label="活动性质">
                        <el-checkbox-group v-model={this.form.type}>
                            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                            <el-checkbox label="地推活动" name="type"></el-checkbox>
                            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="特殊资源">
                        <el-radio-group v-model={this.form.resource}>
                            <el-radio label="线上品牌商赞助"></el-radio>
                            <el-radio label="线下场地免费"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="活动形式">
                        <el-input type="textarea" v-model={this.form.desc}></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitHandler}>立即创建</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form >
            </div >
        )
    },
    methods: {
        submitHandler() {
            this.$alert('哈哈', '测试', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: '真的就是测试'
                    });
                }
            });
        }

    }
}
