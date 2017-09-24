<template>
    <div class="newcard">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="套餐名字" required >
            <el-input v-model.trim="form.pkgname" lazy></el-input>
        </el-form-item>

        <el-form-item label="套餐ID" required >
            <el-input v-model.trim="form.pkgid" lazy></el-input>
        </el-form-item>
        <el-form-item label="所在城市" required>
              <el-select
                v-model="city"
                filterable
                remote
                multiple
                placeholder="请输入城市名"
                :remote-method="remoteMethod"
                :loading="loading"
                clearable>
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="最低价格 （单位：元）" required>
            <el-input v-model.trim="form.bprice" lazy></el-input>
        </el-form-item>
        <el-form-item label="打折前价格 （单位：元）" required>
            <el-input v-model.trim="form.price" lazy></el-input>
        </el-form-item>
        <el-form-item label="适用性别" required >
            <el-radio-group v-model="radio_sexy">
              <el-radio :label="3">通用</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">男</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="适用人群" required>
            <el-select 
              v-model="form.people" 
              placeholder="请选择" 
              filterable
              clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="套餐特色" required>
            <el-select 
              v-model="form.feature" 
              multiple 
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
        <el-form-item label="体检项目个数 （单位：个）" required >
            <el-input v-model.trim="form.count" lazy number></el-input>
        </el-form-item>
         <el-form-item label="具体体检项目" required >
            <el-select 
              v-model="form.project" 
              multiple 
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

        <el-form-item label="开通机构数目 （单位：个）" required>
            <el-input v-model.trim="form.onum" :disabled="disabledInput" lazy number></el-input>
        </el-form-item>
        <el-form-item label="具体开通机构" required>
            <el-select 
              v-model="form.orangizes" 
              multiple 
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
        <el-form-item label="套餐相关照片(最多三张)" required>
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
    name: 'newcard',
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
        disabledInput: false,
        disableButton: true,
        form: {
          shengao: '',
          tizhong: '',
          tizhongzhishu: '',
          shousuoya: '',
          shuzhangya: '',
          textarea_g: ''
        },
        form_status: {
          shengao: true,
          tizhong: true,
          tizhongzhishu: true,
          shousuoya: true,
          shuzhangya: true
        },
        units:{
          shengao: 'cm',
          tizhong: 'Kg',
          tizhongzhishu: '',
          shousuoya: 'mmHg',
          shuzhangya: 'mmHg',
        },
        // threshold:{
        //   tizhongzhishu: {'min':18.5,'max':23.99},
        //   shousuoya: {'min':90,'max':139},
        //   shuzhangya: {'min':60,'max':89}
        // },
        rules: {
          shengao: [
            {required:true,message:'请输入身高',trigger:'blur'},
            // {validator:validators.number,message:'请输入数字',trigger:'blur'}
          ],
          tizhong: [
            {required:true,message:'请输入体重',trigger:'blur'}
          ],
          tizhongzhishu: [
            {required:true,message:'请输入体重指数',trigger:'blur'}
          ],
          shousuoya: [
            {required:true,message:'请输入收缩压',trigger:'blur'}
          ],
          shuzhangya: [
            {required:true,message:'请输入舒张压',trigger:'blur'}
          ],
        }
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
      edit: function(){
        this.disabledInput = false;
        this.disableButton = true;
      },
      updateFormStatus: function(){
        var threshold = this.threshold['pack' + this.currentPack];
        // console.log(this.threshold);
        for(var key in threshold){
        // for(var key in this.threshold){
          // var min =  this.threshold[key]['min'];
          // var max =  this.threshold[key]['max'];
          var min =  threshold[key]['min'];
          var max =  threshold[key]['max'];
          var val =  this.form[key];
          this.form_status[key] = !(val > max || val < min);
        }
      },
      addunit: function(obj){
        this.updateFormStatus();
        for(var key in obj){
          if(this.units.hasOwnProperty(key)){
            obj[key] += ' ' + this.units[key] + '#';
          }

          if(this.form_status.hasOwnProperty(key)){
            obj[key] += this.form_status[key];
          }
          // console.log(obj[key]);
        }
      },
    created: function () {
    }
  }
}
</script>
<style>
</style>
