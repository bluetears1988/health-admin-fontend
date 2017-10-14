<template>
    <div class="newcard">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="套餐名字" prop="name" >
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>

        <!-- <el-form-item label="套餐ID" required prop="pkgid">
            <el-input v-model.trim="form.id" lazy></el-input>
        </el-form-item> -->
         <el-form-item label="适用性别">
            <el-radio-group v-model="form.gender">
              <el-radio :label="3">通用</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">男</el-radio>
            </el-radio-group>
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
        <el-form-item label="适用人群">
            <!-- <el-select 
              v-model="form.peopleID" 
              placeholder="请选择" 
              filterable
              clearable>
              <el-option
                v-for="people in form.extra.people"
                :key="people.value"
                :label="people.label"
                :value="people.value">
              </el-option>
            </el-select> -->
            <el-input v-model.trim="form.people" lazy></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="套餐特色">
            <el-select 
              v-model="form.feature" 
              multiple 
              placeholder="请选择">
              <el-option
                v-for="feature in form.extra.features"
                :key="feature.name"
                :label="feature.name"
                :value="feature.name">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="最低价格 （单位：元）">
            <el-input v-model.trim="form.bprice" lazy></el-input>
        </el-form-item>
        <el-form-item label="打折前价格 （单位：元）">
            <el-input v-model.trim="form.price" lazy></el-input>
        </el-form-item>
        <el-form-item label="体检项目个数 （单位：个）">
            <el-input v-model.trim="form.projectNum" lazy number></el-input>
        </el-form-item>
         <el-form-item label="具体体检项目">
            <el-select 
              v-model="form.project" 
              multiple 
              placeholder="请选择">
              <el-option
                v-for="project in form.extra.projects"
                :key="project.name"
                :label="project.name"
                :value="project.name">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="开通机构数目 （单位：个）">
            <el-input v-model.trim="form.institutionNum" lazy number></el-input>
        </el-form-item>
        <el-form-item label="具体开通机构">
            <el-select 
              v-model="form.institutions" 
              multiple 
              placeholder="请选择">
              <el-option
                v-for="institution in orgs"
                :key="institution.name"
                :label="institution.name"
                :value="institution.name">
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
          extra:{},
          gender:3
        },
        rules: {
          name:[
            {required:true,message:'必填项',trigger:'blur'}
          ]
        },
      }
    },
    methods: {
      remoteMethod: function(){},
      loading: function(){},
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
              this.$ajax.put('/api/card/' + this.$route.query.id, this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$message({
                          message: '更新成功！',
                          type: 'success'
                        });
                        that.$router.push({ name: 'cardlist'})
                      })
                      .catch(function (error) {
                        that.$message.error(error);
                        console.log(error);
                      });

            }else{
              this.$ajax.post('/api/card', this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$message({
                          message: '添加成功！',
                          type: 'success'
                        });
                        that.$router.push({ name: 'cardlist'})
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
      },initPage(){
        var that = this;
        this.$ajax.all([
            this.$ajax.get('/api/cities',{params:{grade:2}}),
            this.$ajax.get('/api/project'),
            this.$ajax.get('/api/feature'),
            // this.$ajax.get('/api/institution')
          ])
        .then(this.$ajax.spread(function (cityResp, projectResp, featureResp) {
            // 上面两个请求都完成后，才执行这个回调方法
          that.form = {extra:{cities:cityResp.data.data,projects:projectResp.data.data,
                              features:featureResp.data.data,
                              },
                        city:'',
                        people:'',
                        name:'',
                        gender:'',
                        feature:[],
                        bprice:'',
                        price:'',
                        projectNum:'',
                        project:[],
                        institutionNum:'',
                        institutions:[], };
          var queryId = that.$route.query.id;
          if(queryId){
            that.$ajax.get('/api/card',{params:{_id:queryId}}).then((response) =>{
              // console.dirxml(response.data.data);
              Object.assign(that.form, response.data.data[0]);
            });
            // Object.assign(that.form.extra, {institutions:response.data.data});
          }

          console.dirxml(that.form);
        }
        ));
        
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
