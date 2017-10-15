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
            <!-- <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <!-- <el-upload
              class="upload-demo"
              ref="upload"
              action="http://upload.qiniup.com"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="form.fileList"
              :auto-upload="false"
              :before-upload='beforeAvatarUpload'
              :on-error="handleError"
              list-type="picture">
              <el-button size="small" type="primary" slot="trigger">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <!-- <el-upload
              action="http://upload.qiniup.com"  
              :drag="true"
              :on-success="handleAvatarSuccess"
              :on-error="handleError"
              :before-upload="beforeAvatarUpload"
              :data="postData">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
          </el-upload> -->
          <el-upload
            class="upload-demo"
            drag
            action="http://upload.qiniup.com"
            :on-success="handleAvatarSuccess"
            :on-error="handleError"
            :before-upload="beforeAvatarUpload"
            :data="postData">
            <img v-if="form.img" :src="form.img" class="avatar"/>
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
        <el-form-item label="添加旗下套餐" required ref="dynamicCards">
          <!-- <el-button @click="resetCards('dynamicCards')" type="text">重置</el-button> -->
          <el-button @click="addCard" type="text">新增套餐<i class="el-icon-plus"></i></el-button>
            <el-row v-for="(card, index) in dynamicCards.cards" :key="index">
              <el-col :span="4">
                <el-select 
                  v-model="card.name"
                  clearable
                  filterable 
                  :placeholder="index+'-请选择套餐'"
                  @change='(value) => getCardInfo(value, index)'>
                  <el-option
                    v-for="item in cards"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                  </el-option>
                </el-select>
                </el-col>
                <el-col :span="4">
                  <el-input v-model.trim="card.real_price" :placeholder="index+'-请输入套餐价格'" lazy></el-input>
                </el-col>
                <el-col :span="4">
                  <el-button @click.prevent="removeCard(card)" type="text">删除</el-button>
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
      return {
        dynamicCards:{
          cards:[{
            name:'',
            img:'',
            price:'',
            real_price:''
          }]
        },
        introduce:'',
        city:'',
        form: {
          type: 4,
          extra:{}
        },
        postData: {
            token: 'OGP8PkJuWP4tLEKTuhKIJqv9VjOqVVjaH8WfHUnv:F1IFmeVIlNo68-XJ_aV905Omgs4=:eyJzY29wZSI6ImFmYW1pbHloZWFsdGgyMDE4IiwiZGVhZGxpbmUiOjE4Njc5NTk4NDB9'
        },
        rules: {
          name:[
            {required:true,message:'必填项',trigger:'blur'}
          ]
        },
      }
    }, 
    methods: {
      removeCard(item) {
        var index = this.dynamicCards.cards.indexOf(item)
        //var index_f = this.form.cards.indexOf(item)
        if (index !== -1) {
          this.dynamicCards.cards.splice(index, 1)
        }
        /*if (index_f !== -1) {
          this.form.cards.splice(index, 1)
        }*/
      },
      addCard() {
        this.dynamicCards.cards.push({
          name:'',
          img:'',
          price:'',
          real_price:''
        });
      },
      handleAvatarSuccess(res, file) {   //上传成功后在图片框显示图片
        this.form.img = 'http://oxsopdu8e.bkt.clouddn.com/'+ res.key;
        console.log(res)
      },
      handleError(res) {   //显示错误
        console.log(res)
      },
      beforeAvatarUpload(file) {    //在图片提交前进行验证
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG&&!isPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }

        return (isJPG || isPNG) && isLt2M
      },
      // submitUpload() {
      //   this.$refs.upload.submit();
      // },
      deleteExtra: function(json){
          var j = JSON.parse(JSON.stringify(json));
          delete j.extra;
          return j;
      },
      onSubmit: function(){
        var that = this;
        let form = this.$refs["form"];
        form.validate((valid) => {
          if (valid) {
            //Object.assign(this.form, this.dynamicCards);
            this.form.cards = this.dynamicCards.cards;
            console.dirxml(this.deleteExtra(this.form));
             if(this.$route.query.id){
               this.$ajax.put('/api/institution/' + this.$route.query.id, this.deleteExtra(this.form))
                       .then(function (response) {
                         //console.log(response);
                         that.$message({
                           message: '更新成功！',
                           type: 'success'
                         });
                         that.$router.push({ name: 'organizelist'})
                       })
                       .catch(function (error) {
                         that.$message.error(error);
                         console.log(error);
                       });

             }else{
               this.$ajax.post('/api/institution', this.deleteExtra(this.form))
                       .then(function (response) {
                         //console.log(response);
                         that.$message({
                           message: '添加成功！',
                           type: 'success'
                         });
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
                         num:'',
                         img:''
                         };
          var queryId = that.$route.query.id;
          if(queryId){
            that.$ajax.get('/api/institution',{params:{_id:queryId}}).then((response) =>{
              var res = response;
              that.$ajax.get('/api/card',{params:{city:res.city}}).then((response) =>{
                that.$store.dispatch('setCards', response.data.data);

                Object.assign(that.form, res.data.data[0]);
                Object.assign(that.dynamicCards.cards, res.data.data[0].cards);

              });
              
            });
            // Object.assign(that.form.extra, {institutions:response.data.data});
          }


        }));
      },
      cardInit(opt){
        var that = this;
        this.$ajax.get('/api/card',{params:{city:opt}}).then((response) =>{
          that.$store.dispatch('setCards', response.data.data);

        });
      },
      getCardInfo(opt, index){
        //console.log("opt:index:",opt, index);
        var that = this;
        this.$ajax.get('/api/card',{params:{city:this.form.city,name:opt}}).then((response) =>{
          that.dynamicCards.cards[index].img = response.data.data[0].images[0];
          that.dynamicCards.cards[index].price = response.data.data[0].price;
          //console.dirxml(that.dynamicCards);
          // that.form.extra.cards = response.data.data;
          // that.$store.dispatch('setCards', response.data.data);

        });
      }
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
.avatar{
  float: left;
  height: 100%;
}
</style>
