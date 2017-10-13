<template>
	<div class="classify">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="分类名字" required >
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
              <el-select
                v-model="form.city"
                filterable
                placeholder="请输入城市名"
                clearable
                @change="orgInit">
                <el-option
                  v-for="city in form.extra.cities"
                  :key="city.name"
                  :label="city.name"
                  :value="city.name">
                </el-option>
              </el-select>
        </el-form-item>
        <!-- <el-form-item label="分类ID" required >
            <el-input v-model.trim="form.classid" lazy></el-input>
        </el-form-item> -->
        <el-form-item label="旗下套餐个数（单位：个）" required>
            <el-input v-model.trim="form.pkgNum" lazy number></el-input>
        </el-form-item>
        <el-form-item label="添加旗下套餐" required >
            <el-row>
              <el-col :span="4">
                <el-select 
                  v-model="form.institution"
                  clearable
                  filterable
                  placeholder="请选择机构">
                  <el-option
                    v-for="item in orgs"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
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
                        v-for="item in cards"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
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
import { mapState, mapActions } from 'vuex'
export default {
	data() {
        return {
            form:{ extra:{}},
            rules:{},
            city:'360100'
        }
    },
    methods: {
      deleteExtra: function(json){
          var j = JSON.parse(JSON.stringify(json));
          delete j.extra;
          return j;
      },
      onSubmit: function(){
        let form = this.$refs["form"];
        console.dirxml(this.$qs.stringify(this.deleteExtra(this.form)));
        form.validate((valid) => {
          if (valid) {
            this.$ajax.post('/api/classify', this.deleteExtra(this.form))
                      .then(function (response) {
                        that.$message({
                          message: '添加成功！',
                          type: 'success'
                        });
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                        that.$message.error(error);
                      });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      initPage(){
        var that = this;
        this.$ajax.all([
            this.$ajax.get('/api/cities',{params:{grade:2}}),
            // this.$ajax.get('/api/card'),
          ])
        .then(this.$ajax.spread(function (cityResp) {
            // 上面两个请求都完成后，才执行这个回调方法
          that.form =  {extra:{cities:cityResp.data.data,},
                        city:'',
                        type:'',
                        name:'',
                        address:'', 
                        bprice:'',
                        telephone:'',
                        introduce:'',
                        num:'',
                        pkgs:[]};
          // console.dirxml(that.form);
        }));
      },
      cardInit(opt){
        var that = this;
        this.$ajax.get('/api/card',{params:{city:opt}}).then((response) =>{
          // that.form.extra.cards = response.data.data;
          that.$store.dispatch('setCards', response.data.data);

        });
      },
      orgInit(opt){
        var that = this;
        this.$ajax.get('/api/institution',{params:{city:opt}}).then((response) =>{
          // Object.assign(that.form.extra, {institutions:response.data.data});
          that.$store.dispatch('setOrgs', response.data.data);
        });
      },
    },
    computed: mapState({
      orgs: state => state.orgs,
    }),
    created: function () {
      this.initPage();
    }
}
</script>
<style>

</style>
