<template>
<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="pkgid" label="套餐ID" sortable></el-table-column>
    <el-table-column prop="pkgnm" label="套餐名字" ></el-table-column>
    <el-table-column prop="oraid" label="机构ID" ></el-table-column>
    <el-table-column prop="oranm" label="机构名字" ></el-table-column>
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