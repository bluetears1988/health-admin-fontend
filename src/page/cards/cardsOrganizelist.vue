<template>
  <div class="classify">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="套餐" required >
            <el-select 
              v-model="form.package"
              clearable
              filterable 
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>

        <!-- <el-form-item label="套餐ID" required >
            <el-input v-model.trim="form.pkgid" lazy></el-input>
        </el-form-item> -->
        <el-form-item label="机构" required>
            <el-select 
              v-model="form.orangize"
              clearable
              filterable 
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
         <!-- <el-form-item label="机构ID" required >
            <el-input v-model.trim="form.oraid" lazy ></el-input>
        </el-form-item> -->
        <el-form-item label="折前价格" required >
            <el-input v-model.trim="form.price" lazy ></el-input>
        </el-form-item>
        <el-form-item label="折后价格" required >
            <el-input v-model.trim="form.zprice" lazy ></el-input>
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
