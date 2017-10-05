<template>
    <div class="newcard">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="机构名字" required prop="name">
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>

        <!-- <el-form-item label="机构ID" required >
            <el-input v-model.trim="form.oid" lazy></el-input>
        </el-form-item> -->
       <!--  <el-form-item label="所在城市" required>
            <el-autocomplete
              class="inline-input"
              v-model="form.city"
              :fetch-suggestions=""
              placeholder=""
              :trigger-on-focus="false"
              @select=""
            ></el-autocomplete>
        </el-form-item> -->
        <el-form-item label="所在城市" required>
              <el-select
                v-model="form.city"
                filterable
                placeholder="请输入城市名"
                clearable
                @change="cardInit">
                <el-option
                  v-for="item in form.extra.cities"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
        </el-form-item>

        <el-form-item label="机构类型" required >
            <el-radio-group v-model="form.type">
              <el-radio :label="4">公立医院</el-radio>
              <el-radio :label="5">公立三甲</el-radio>
              <el-radio :label="6">体检中心</el-radio>
              <el-radio :label="7">专科医院</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="详细地址" required>
            <el-input v-model.trim="form.address" lazy></el-input>
        </el-form-item>
        
        <el-form-item label="联系电话" required>
            <el-input v-model.trim="form.telephone" lazy></el-input>
        </el-form-item>

        <el-form-item label="最低套餐价格" required>
            <el-input v-model.trim="form.bprice" lazy></el-input>
        </el-form-item>

        <el-form-item label="机构环境照片(重复上传会覆盖)" required>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="机构介绍" required >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.introduce">
            </el-input>
        </el-form-item>
        <el-form-item label="旗下体检套餐数 （单位：个）" required >
            <el-input v-model.trim="form.num" lazy number></el-input>
        </el-form-item>
        <el-form-item label="添加旗下套餐" required >
            <el-row>
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
                <el-col :span="4">
                  <el-input v-model.trim="form.price" placeholder="请输入套餐价格" lazy></el-input>
                </el-col>
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
        introduce:'',
        city:'',
        form: {
          type: 4,
          extra:{}
        },
        // threshold:{
        //   tizhongzhishu: {'min':18.5,'max':23.99},
        //   shousuoya: {'min':90,'max':139},
        //   shuzhangya: {'min':60,'max':89}
        // },
        rules: {
          name:[
            {required:true,message:'必填项',trigger:'blur'}
          ]
        },
      }
    }, 
    methods: {
      deleteExtra: function(json){
          var j = JSON.parse(JSON.stringify(json));
          delete j.extra;
          return j;
      },
      onSubmit: function(){
        var that = this;
        let form = this.$refs["form"];
        console.dirxml(this.$qs.stringify(this.deleteExtra(this.form)));
        form.validate((valid) => {
          if (valid) {
            if(this.$route.query.id){
              this.$ajax.put('/api/institution/' + this.$route.query.id, this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$router.push({ name: 'organizelist'})
                      })
                      .catch(function (error) {
                        console.log(error);
                      });

            }else{
              this.$ajax.post('/api/institution', this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$router.push({ name: 'organizelist'})
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
            }
            

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
          that.form =  {extra:{cities:cityResp.data.data},
                        city:'',
                        type:'',
                        name:'',
                        address:'', 
                        bprice:'',
                        telephone:'',
                        introduce:'',
                        num:'',};
          // console.dirxml(that.form);
          var queryId = that.$route.query.id;
          if(queryId){
            that.$ajax.get('/api/institution',{params:{_id:queryId}}).then((response) =>{
              // console.dirxml(response.data.data);
              Object.assign(that.form, response.data.data[0]);
            });
            // Object.assign(that.form.extra, {institutions:response.data.data});
          }


        }));
      },
      cardInit(opt){
        var that = this;
        this.$ajax.get('/api/card',{params:{city:opt}}).then((response) =>{
          // that.form.extra.cards = response.data.data;
          that.$store.dispatch('setCards', response.data.data);

        });
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
      edit: function(){
        this.disabledInput = false;
        this.disableButton = true;
      },
    },
    computed: mapState({
      cards: state => state.cards,
    }),
    created: function () {
      this.initPage();
    }
}
</script>
<style>
</style>
