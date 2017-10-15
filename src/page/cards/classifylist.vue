<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <!-- <el-table-column prop="id" label="分类ID" sortable></el-table-column> -->
    <el-table-column prop="name" label="分类名字" ></el-table-column>
    <el-table-column prop="city" label="开通城市" ></el-table-column>
    <el-table-column prop="pkgNum" label="套餐个数" ></el-table-column>
    <el-table-column prop="pkgs" label="套餐列表" >
        <template scope="scope">
            <div v-if="scope.row.pkgs"  v-for="pkg in scope.row.pkgs">
                {{pkg.orgName + '-' + pkg.cardName + '###'}}
            </div>
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
            this.$ajax.get('/api/classify').then((response) => {
                that.page = {content:response.data.data};
                console.dirxml(that.page.content);
            })
        },
        itemAction:function(id, action){
            var that = this;
            if(action=="edit") {
                this.$router.push({ name: 'setClassify', query: { id: id }})
            } else if(action=="delete") {
                this.$ajax.delete('/api/classify/'+ id).then((response) =>{
                    that.$message({
                      message: '删除成功！',
                      type: 'success'
                    });
                    that.$router.push({ name: 'classifylist'})
                });
            }
        }
    },
    created: function () {
      this.initPage();
    }
}
</script>
<style>
</style>