<template>
    <div class="feature">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="特点叫法" prop="name" >
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>

        <el-form-item label="特点详情" prop="details" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.details">
            </el-input>
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
    name: 'featureForm',
    data: function () {
      return {
        form: {
          extra:{}
        },
        rules: {
          name:[
            {required:true,message:'必填',trigger:'blur'}
          ],
          details:[
            {required:true,message:'必填',trigger:'blur'}
          ]
        },
      }
    },
    props: [],
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
      // 'threshold'
    ]),
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
              this.$ajax.put('/api/feature/' + this.$route.query.id, this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$message({
                          message: '更新成功！',
                          type: 'success'
                        });
                        that.$router.push({ name: 'featurelist'})
                      })
                      .catch(function (error) {
                        that.$message.error(error);
                        console.log(error);
                      });
            }else{
              this.$ajax.post('/api/feature', this.deleteExtra(this.form))
                .then(function (response) {
                  console.log(response);
                  that.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  that.$router.push({ name: 'featurelist'})
                })
                .catch(function (error) {
                  console.log(error);
                  that.$message.error(error);
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
        var queryId = that.$route.query.id;
        if(queryId){
          that.$ajax.get('/api/feature',{params:{_id:queryId}}).then((response) =>{
              console.dirxml(response.data.data);
              // Object.assign(that.form, response.data.data[0]);
              that.form = response.data.data[0];
              console.dirxml(that.form);
            });
          // Object.assign(that.form.extra, {institutions:response.data.data});
        }
      }
  },
  created: function () {
      this.initPage();
    }
}
</script>
<style>
</style>
