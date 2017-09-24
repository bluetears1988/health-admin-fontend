<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="id" label="分类ID" sortable></el-table-column>
    <el-table-column prop="nm" label="分类名字" ></el-table-column>
    <el-table-column prop="count" label="套餐个数" ></el-table-column>
    <el-table-column prop="pkg" label="套餐列表" ></el-table-column>
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
}
</script>
<style>
</style>