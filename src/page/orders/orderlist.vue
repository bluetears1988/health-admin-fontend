<template>
<section>
<el-col :span="24" class="toolbar form-search-toolbar">
    <el-form :inline="true" :model="formData">
        <el-form-item>
            <el-input v-model="formData.id" placeholder="订单ID"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="formData.pkgname" placeholder="套餐名称"></el-input>
        </el-form-item>
        <el-form-item>
            <el-input v-model="formData.organize" placeholder="体检机构"></el-input>
        </el-form-item>
        <el-form-item>
            <el-select v-model="formData.status" filterable clearable placeholder="订单状态">
                <el-option v-for="status in statusList" :key="status.id" :label="status.name" :value="status.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon="search"  @click="pageRequest()">过滤</el-button>
        </el-form-item>
       <!--  <el-form-item>
            <el-button type="primary" icon="plus"  @click="itemAdd()">{{$t('list.add')}}</el-button>
        </el-form-item> -->
    </el-form>
</el-col>

<el-table :data="page.content"  v-loading="pageLoading" stripe border style="width: 100%">
    <el-table-column prop="id" label="订单ID" sortable></el-table-column>
    <!-- <el-table-column prop="name" label="套餐姓名" sortable></el-table-column> -->
    <el-table-column prop="pkgname" label="套餐名称" sortable></el-table-column>
    <!-- <el-table-column prop="checkDate" label="体检日期" sortable></el-table-column> -->
    <el-table-column prop="amount" label="订单金额" sortable></el-table-column>
    <el-table-column prop="organize" label="体检机构" sortable></el-table-column>
    <el-table-column prop="organize_address" label="体检机构地址" sortable></el-table-column>
    <el-table-column prop="createdDate" label="创建时间" sortable></el-table-column>
    <el-table-column prop="status" label="订单状态" sortable></el-table-column>
    <el-table-column prop="remarks" label="备注"></el-table-column>
    <el-table-column label="操作">
        <template scope="scope">
            <el-button size="small" >修改</el-button>
            <el-button type="danger" size="small">删除</el-button>
        </template>
    </el-table-column>
</el-table>
</section>
</template>
<script>
export default {
	data() {
        return {
            statusList:{},
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