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
        <el-form-item label="添加旗下机构套餐" required >
          <el-button @click="addOrgCard" type="text">新增机构及套餐<i class="el-icon-plus"></i></el-button>
            <el-row v-for="(pkg, index) in dynamicOrgsCards.pkgs" :key="index">
              <el-col :span="4">
                <el-select 
                  v-model="pkg.orgName"
                  clearable
                  filterable 
                  :placeholder="index+'-请选择机构'"
                  @change="cardInit">
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
                      v-model="pkg.cardName"
                      clearable
                      filterable 
                      :placeholder="index+'-请选择套餐'"
                      @change='(value) => getCardInfo(value, index, pkg.orgName)'>
                      <el-option
                        v-for="item in cards"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                  <el-button @click.prevent="removeOrgCard(pkg)" type="text">删除</el-button>
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
          dynamicOrgsCards:{
            pkgs:[{
              orgName:'',
              cardName:'',
              price:'',
              real_price:'',
              sales:''
            }]
          },
          form:{ extra:{}},
          rules:{},
          city:'360100'
        }
    },
    methods: {
      getCardInfo(opt, index, orgName){
        console.log("opt:index:orgName:", opt, index, orgName);
        var that = this;
        if(that.orgs.length > 0){
          var org = that.orgs.filter(function(item){
            return item.name === orgName;
          })

          if(org[0].cards){
            var card = org[0].cards.filter(function(item){
              return item.name === opt;
            })

            if(card[0]){
              that.dynamicOrgsCards.pkgs[index].sales = card[0].sales || 0;
              that.dynamicOrgsCards.pkgs[index].real_price = card[0].real_price;
              that.dynamicOrgsCards.pkgs[index].price = card[0].price;
            }
          }
        }
      },
      removeOrgCard(item) {
        var index = this.dynamicOrgsCards.pkgs.indexOf(item)
        if (index !== -1) {
          this.dynamicOrgsCards.pkgs.splice(index, 1)
        }
      },
      addOrgCard() {
        this.dynamicOrgsCards.pkgs.push({
          orgName:'',
          cardName:'',
          price:'',
          real_price:'',
          sales:''
        });
      },
      deleteExtra: function(json){
          var j = JSON.parse(JSON.stringify(json));
          delete j.extra;
          return j;
      },
      onSubmit: function(){
        var that = this;
        let form = this.$refs["form"];
        //console.dirxml(this.$qs.stringify(this.deleteExtra(this.form)));
        form.validate((valid) => {
          if (valid) {
            this.form.pkgs = this.dynamicOrgsCards.pkgs;
            console.dirxml(this.deleteExtra(this.form));
            if(this.$route.query.id){
              this.$ajax.put('/api/classify/' + this.$route.query.id, this.deleteExtra(this.form))
                  .then(function (response) {
                    console.log(response);
                    that.$message({
                      message: '更新成功！',
                      type: 'success'
                    });
                    that.$router.push({ name: 'classifylist'})
                  })
                  .catch(function (error) {
                    that.$message.error(error);
                    console.log(error);
                  });
            }else{
              this.$ajax.post('/api/classify', this.deleteExtra(this.form))
                  .then(function (response) {
                    that.$message({
                      message: '添加成功！',
                      type: 'success'
                    });
                    that.$router.push({ name: 'classifylist'})
                    console.log(response);
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
        this.$ajax.all([
            this.$ajax.get('/api/cities',{params:{grade:2}}),
          ])
        .then(this.$ajax.spread(function (cityResp) {
            // 上面两个请求都完成后，才执行这个回调方法
            that.form =   {extra:{cities:cityResp.data.data,},
                            city:'',
                            name:'',
                            pkgNum:'',
                          };
            var queryId = that.$route.query.id;
            if(queryId){
                that.$ajax.get('/api/classify',{params:{_id:queryId}}).then((response) =>{
                /*console.dirxml(response.data.data[0].city);
                that.orgInit(response.data.data[0].city);*/
                Object.assign(that.form, response.data.data[0]);

                Object.assign(that.dynamicOrgsCards.pkgs, response.data.data[0].pkgs);
              });
            }
          
          // console.dirxml(that.form);
        }));
      },
      cardInit(opt){
        var that = this;
        this.$ajax.get('/api/card',{params:{institutions:opt}}).then((response) =>{
          that.$store.dispatch('setCards', response.data.data);
        });
      },
      orgInit(opt){
        var that = this;
        this.$ajax.get('/api/institution',{params:{city:opt}}).then((response) =>{
          that.$store.dispatch('setOrgs', response.data.data);
        });
      },
    },
    computed: mapState({
      orgs: state => state.orgs,
      cards: state => state.cards,
    }),
    created: function () {
      this.initPage();
    }
}
</script>
<style>

</style>
