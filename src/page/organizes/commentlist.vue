<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="oraid" label="机构ID" sortable></el-table-column>
    <el-table-column prop="oranm" label="机构名字" ></el-table-column>
    <el-table-column prop="account" label="用户账号" ></el-table-column>
    <el-table-column prop="date" label="评论时间" ></el-table-column>
    <el-table-column prop="comment" label="具体评论" ></el-table-column>
    <el-table-column label="操作">
        <template scope="scope">
            <!-- <el-button size="small" >修改</el-button> -->
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
}
</script>
<style>
</style>