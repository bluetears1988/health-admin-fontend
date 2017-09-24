<template>
    <div class="newcard">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="套餐名字" prop="pkgname" >
            <el-input v-model.trim="form.pkgname" lazy></el-input>
        </el-form-item>

        <el-form-item label="套餐ID" required >
            <el-input v-model.trim="form.pkgid" lazy></el-input>
        </el-form-item>
        <el-form-item label="所在城市">
              <el-select
                v-model="form.city"
                filterable
                multiple
                placeholder="请输入城市名"
                clearable>
                <el-option
                  v-for="city in form.extra.cities"
                  :key="city.value"
                  :label="city.label"
                  :value="city.value">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="最低价格 （单位：元）">
            <el-input v-model.trim="form.bprice" lazy></el-input>
        </el-form-item>
        <el-form-item label="打折前价格 （单位：元）">
            <el-input v-model.trim="form.price" lazy></el-input>
        </el-form-item>
        <el-form-item label="适用性别">
            <el-radio-group v-model="radio_sexy">
              <el-radio :label="3">通用</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="适用人群">
            <el-select 
              v-model="form.people" 
              placeholder="请选择" 
              filterable
              clearable>
              <el-option
                v-for="people in form.extra.people"
                :key="people.value"
                :label="people.label"
                :value="people.value">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="套餐特色">
            <el-select 
              v-model="form.feature" 
              multiple 
              filterable 
              placeholder="请选择">
              <el-option
                v-for="feature in form.extra.features"
                :key="feature.value"
                :label="feature.label"
                :value="feature.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="体检项目个数 （单位：个）">
            <el-input v-model.trim="form.count" lazy number></el-input>
        </el-form-item>
         <el-form-item label="具体体检项目">
            <el-select 
              v-model="form.project" 
              multiple 
              filterable 
              placeholder="请选择">
              <el-option
                v-for="project in form.extra.projects"
                :key="project.value"
                :label="project.label"
                :value="project.value">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="开通机构数目 （单位：个）">
            <el-input v-model.trim="form.onum" lazy number></el-input>
        </el-form-item>
        <el-form-item label="具体开通机构">
            <el-select 
              v-model="form.orangizes" 
              multiple 
              filterable 
              placeholder="请选择">
              <el-option
                v-for="orangize in form.extra.orangizes"
                :key="orangize.value"
                :label="orangize.label"
                :value="orangize.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="套餐相关照片(最多三张)">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
    name: 'newcardForm',
    data: function () {
      // var validators = {
      //     number: function (val) {
      //         return /^[1-9]\d*$/.test(val);
      //     },
      //     // shousuoya: function (val) {
      //     //     // return /^[A-Za-z0-9_\-\u4e00-\u9fa5]{1,10}$/.test(val);
      //     //     return !(val > 139 || v < 90);
      //     // },
      //     // shuzhangya: function (val) {
      //     //     // return /^[1-9]\d*$/.test(val);
      //     //     return !(val > 89 || v < 60);
      //     // }
      // };

      return {
        radio_sexy:3,
        form: {
          extra:{}
        },
        rules: {
          pkgname:[
            {required:true,message:'请输入体检人姓名',trigger:'blur'}
          ],
          id:[
            {required:true,message:'请输入体检报告ID',trigger:'blur'}
          ],
          shengao:[
            {required:true,message:'请输入身高',trigger:'blur'}
          ]
        },
      }
    },
    props: ['currentPack'],
    filters: {
      // filter_area: function (val, min, max){
      //     return !(val > max || val < min);
      // }
    },
    watch: {
      // 'form.tizhongzhishu': 'updateFormStatus("tizhongzhishu", )',
    },
    computed: mapState([
      // threshold: state => state.threshold['pack' + this.currentPack],
      'threshold'
    ]),
    methods: {
      remoteMethod: function(){},
      loading: function(){},
      deleteExtra: function(json){
          var j = JSON.parse(JSON.stringify(json));
          delete j.extra;
          return j;
      },
      save: function(form){
        this.$refs.form.validate((valid) => {
          if (valid) {
            // alert('submit!');
            var mid_form = {};
            Object.assign(mid_form, this.form);

            this.addunit(mid_form);
            console.dirxml(mid_form);
            this.$emit('transferForm', mid_form);

            this.disabledInput = true;
            this.disableButton = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      onSubmit: function(){
        let form = this.$refs["form"];
        console.dirxml(this.$qs.stringify(this.deleteExtra(this.form)));
        form.validate((valid) => {
          if (valid) {
            this.$ajax.post('/api/cart', this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    created: function () {
    }
  }
}
</script>
<style>
</style>
