<template>
    <div class="project">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="检查项目名称" prop="name">
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>

        <el-form-item label="检查内容" prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model.trim="form.content">
            </el-input>
        </el-form-item>

        <el-form-item label="检查目的" prop="aim">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model.trim="form.aim">
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
    name: 'projectForm',
    data: function () {
      return {
        form: {
          extra:{}
        },
        rules: {
          name:[
            {required:true,message:'必填项',trigger:'blur'}
          ],
          content:[
            {required:true,message:'必填项',trigger:'blur'}
          ],
          aim:[
            {required:true,message:'必填项',trigger:'blur'}
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
            this.$ajax.post('/api/project', this.deleteExtra(this.form))
                      .then(function (response) {
                        console.log(response);
                        that.$message({
                          message: '添加成功！',
                          type: 'success'
                        });
                        that.$router.push({ name: 'projectlist'})
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
    created: function () {
    }
  }
}
</script>
<style>
</style>
