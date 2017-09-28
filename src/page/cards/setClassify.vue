<template>
	<div class="classify">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="分类名字" required >
            <el-input v-model.trim="form.classname" lazy></el-input>
        </el-form-item>

        <!-- <el-form-item label="分类ID" required >
            <el-input v-model.trim="form.classid" lazy></el-input>
        </el-form-item> -->
        <el-form-item label="旗下套餐个数（单位：个）" required>
            <el-input v-model.trim="form.count" lazy number></el-input>
        </el-form-item>
        <el-form-item label="添加旗下套餐" required >
            <el-row>
              <el-col :span="4">
                <el-select 
                  v-model="form.package"
                  clearable
                  filterable
                  multiple
                  placeholder="请选择机构">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select 
                      v-model="form.package"
                      clearable
                      filterable 
                      placeholder="请选择套餐">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-col>
                <!-- <el-col :span="4">
                  <el-input v-model.trim="form.price" placeholder="折前价格" lazy></el-input>
                </el-col>
                <el-col :span="4">
                  <el-input v-model.trim="form.price" placeholder="折后价格" lazy></el-input>
                </el-col> -->
                <el-col :span="4">
                  <i class="el-icon-plus"></i>
                </el-col>
              <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
export default {
	data() {
        return {
            form:{},
            rules:{}
        }
    },
}
</script>
<style>

</style>
