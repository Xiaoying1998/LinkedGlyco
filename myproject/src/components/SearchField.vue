<template>
  <div class="searchTable">
    <div class="ivu-row">
      <Col span="6" style="padding-right:10px">
        <Select v-model="text1" size="large"filterable clearable>
          <Option v-for="item in entityList"  :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select v-model="text2" size="large"filterable clearable>
          <Option v-for="item in entityList" :value="item" :key="item">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="4" style="margin-left: 10px">
        <Input v-model="text3" placeholder="Enter a verb" size="large" clearable style="width: 200px" />
      </Col>
      <Col span="2" style="margin-left: 15px">
        <Button type="primary" icon="ios-search" size="large" v-on:click="searchFunction">Search</Button>
      </Col>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchField',
    data() {
      return{
        text1: '',
        text2: '',
        text3: '',
        entityList: []
      }
    },
    mounted () {
      this.$axios.get("http://localhost:5000").then(response => {
        //console.log(response.data);
        let tmpList = [];
        this.data = response.data;
        this.entityList = response.data;
        this.entityList.forEach(selectFunction);
        function selectFunction (item) {

          if (! tmpList.includes(item.surface_form)){
            tmpList.push(item.surface_form)
          }
        }

        this.entityList = tmpList;


      }, response => {
        console.log("error");
      });
    },
    methods: {
      searchFunction: function(){
        this.$router.push({path: '/show-result', query: {'entity1': this.text1, 'entity2': this.text2, 'verb': this.text3}}).catch(err => {})

      }

    }
  }
</script>

<style scoped>

</style>
