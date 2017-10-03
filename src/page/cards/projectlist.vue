<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="_id" label="ID" sortable></el-table-column>
    <el-table-column prop="name" label="检查项目名称" ></el-table-column>
    <el-table-column prop="content" label="检查内容" ></el-table-column>
    <el-table-column prop="aim" label="检查目的" ></el-table-column>
    <el-table-column label="操作">
        <template scope="scope">
            <el-button size="small" >修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
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
            this.$ajax.get('/api/project').then((response) => {
                that.page = {content:response.data.data};
                console.dirxml(that.page.content);
            })
        }
    },
    created: function () {
      this.initPage();
    }
}
</script>
<style>
</style>