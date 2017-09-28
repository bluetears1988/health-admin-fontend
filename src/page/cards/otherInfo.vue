<template>
    <div class="newcard">
      <el-form label-position="right" ref="form" :model="form" class="demo-form-stacked" :rules="rules">
        <el-form-item label="城市名字" prop="cityname" >
            <el-input v-model.trim="form.name" lazy></el-input>
        </el-form-item>

        <el-form-item label="城市ID" required >
            <el-input v-model.trim="form.id" lazy></el-input>
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
    name: 'cityForm',
    data: function () {
      return {
        form: {
          extra:{}
        },
        rules: {
          cityname:[
            {required:true,message:'请输入体检人姓名',trigger:'blur'}
          ],
          id:[
            {required:true,message:'请输入体检报告ID',trigger:'blur'}
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
        let form = this.$refs["form"];
        console.dirxml(this.$qs.stringify(this.deleteExtra(this.form)));
        form.validate((valid) => {
          if (valid) {
            this.$ajax.post('/api/cities', this.deleteExtra(this.form))
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
