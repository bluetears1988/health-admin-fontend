<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <!-- <el-table-column prop="_id" label="ID" sortable></el-table-column> -->
    <el-table-column prop="name" label="特点叫法" ></el-table-column>
    <el-table-column prop="details" label="特点详情" ></el-table-column>
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
            this.$ajax.get('/api/feature').then((response) => {
                that.page = {content:response.data.data};
                console.dirxml(that.page.content);
            })
        },
        itemAction:function(id, action){
            var that = this;
            if(action=="edit") {
                this.$router.push({ name: 'addFeature', query: { id: id }})
            } else if(action=="delete") {
                    this.$ajax.delete('/api/feature/'+ id).then((response) =>{
                        that.$message({
                          message: '删除成功！',
                          type: 'success'
                        });
                        that.$router.push({ name: 'featurelist'})
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