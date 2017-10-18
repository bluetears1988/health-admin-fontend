<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <!-- <el-table-column prop="_id" label="套餐ID" sortable></el-table-column> -->
    <el-table-column prop="name" label="套餐名字" ></el-table-column>
    <el-table-column prop="city" label="开通城市" ></el-table-column>
    <el-table-column prop="people" label="适用人群" ></el-table-column>
    <el-table-column prop="bprice" label="最低价格" ></el-table-column>
    <el-table-column prop="price" label="市场价格" ></el-table-column>
    <el-table-column prop="projectNum" label="体检项目数目" ></el-table-column>
    <el-table-column prop="project" label="体检项目" ></el-table-column>
    <el-table-column prop="institutionNum" label="开通机构数目" ></el-table-column>
    <el-table-column prop="institutions" label="开通机构" ></el-table-column>
    <el-table-column prop="feature" label="套餐特色" ></el-table-column>
    <el-table-column prop="gender" label="适用性别" >
        <template scope="scope">
        {{scope.row.gender | sexy}}
        </template>
    </el-table-column>
    <el-table-column prop="sales" label="销量" ></el-table-column>
    <el-table-column prop="images" label="相关图片" >
        <template scope="scope">
            <img v-if="scope.row.images"  v-for="image in scope.row.images" :src="image" style="width:50px;height:50px" />
        </template>
    </el-table-column>
    <el-table-column label="操作">
        <template scope="scope">
            <el-button size="small" @click.native="itemAction(scope.row._id,'edit')" >修改</el-button>
            <el-button type="danger" size="small" @click.native="itemAction(scope.row._id,'delete')">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</template>
<script>
export default {
	data() {
        return {
            page:{},
            formData:{
                extra:{}
            },
            pageLoading: false
        }
    },
    methods: {
        initPage(){
            var that = this;
            this.$ajax.get('/api/card').then((response) => {
                that.page = {content:response.data.data};
                // console.dirxml(that.page.content);
            })
        },
        itemAction:function(id, action){
            var that = this;
            if(action=="edit") {
                this.$router.push({ name: 'newcard', query: { id: id }})
            }else if(action=="delete") {
                this.$ajax.delete('/api/card/'+ id).then((response) =>{
                    that.$message({
                      message: '删除成功！',
                      type: 'success'
                    });
                    // that.$router.push({ name: 'cardlist'})
                    // this.$router.go(0);
                    // that.$router.go({name: 'cardlist'});
                });
            }
        }
    },
    created: function () {
      this.initPage();
    },
    filters:{
        sexy: function(val){
            if(val === 3){
                return "男女通用"
            }else if(val === 1){
                return "女"
            }else if(val === 2){
                return "男"
            }
        }
    }
}
</script>
<style>
</style>