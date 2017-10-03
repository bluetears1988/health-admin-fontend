<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="_id" label="机构ID" sortable></el-table-column>
    <el-table-column prop="name" label="机构名字" ></el-table-column>
    <el-table-column prop="address" label="机构地址" ></el-table-column>
    <el-table-column prop="telephone" label="机构电话" ></el-table-column>
    <el-table-column prop="bprice" label="最低价格" ></el-table-column>
    <el-table-column prop="price" label="市场价格" ></el-table-column>
    <el-table-column prop="num" label="体检项目数目" ></el-table-column>
    <el-table-column prop="project" label="体检项目" ></el-table-column>
    <el-table-column prop="onum" label="开通机构数目" ></el-table-column>
    <el-table-column prop="oran" label="开通机构" ></el-table-column>
    <el-table-column prop="images" label="相关图片" ></el-table-column>
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
            this.$ajax.get('/api/institution').then((response) => {
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