<template>

    <Layout class="layout">
      <Header class="header">
        <a id="logo" href="/"><b>LinkedGlyco</b></a>
        <a id="logo-for-twitter" href="https://twitter.com/search?q=glycobiology&src=typed_query">
          <Icon type="logo-twitter" size="24" />
        </a>
        <a id="logo-for-ins" href="https://www.instagram.com/explore/tags/glycobiology/">
          <Icon type="logo-instagram" size="24" color=""/>
        </a>
        <a id="logo-for-facebook" href="">
          <Icon type="logo-facebook" size="24"/>
        </a>
      </Header>

      <Content data-aos="fade-right" data-aos-duration="1000">
        <div class="searchDiv" >
          <br>
          <search-field id="searchField"></search-field>
        </div>

        <p style="margin-left: 25%; padding-top: 50px; font-style: italic"><span v-text="resultAmount" ></span> matching results </p>
          <p style="margin-left: 10%; margin-top: 100px">Sentence type</p>
          <CheckboxGroup id="checkbox-for-type" v-model="model10" size="large">
            <Checkbox v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.text">
                          <span>{{ item.text }}</span>
            </Checkbox>
          </CheckboxGroup>

        <br>
        <br>
        <p style="margin-left: 10%">Relationship</p>
        <CheckboxGroup id="checkbox-for-relation" v-model="model11" size="large">
          <Checkbox v-for="(item,index) in relationList" :key="index" :label="item.label">
            <span>{{ item.text }}</span>
          </Checkbox>

        </CheckboxGroup>
          <div class="sentences">
            <List item-layout="vertical">
              <ListItem v-for="(item,index) in listComputed(test)" :key="index" >
                <span class="resultText" v-html="highlight(item.sentence)" style="font-size: initial; color: #363e4f"></span>
                <ListItemMeta :description="'Sentence Type: ' + item.type + ' Relation: ' + item.relation" />
              </ListItem>
            </List>
          </div>

      </Content>

    </Layout>



</template>

<script>
  import SearchField from './SearchField'
  import HeaderField from './HeaderField'
  export default {
    name: 'Result',
    data () {
      return {
        typeList:
          [{"label": 0, "text": " 0: Background"}, {"label": 1, "text": " 1: Objective"},
            {"label": 2, "text": " 2: Methods"}, {"label": 3, "text": " 3: Results"},
            {"label": 4,"text": " 4: Conclusions"}],
        relationList:
          [{"label": "ATTRIBUTION", "text": " Attribution"},{"label": "BACKGROUND", "text": " Background"},{"label": "CAUSE", "text":" Cause"},
            {"label": " CONDITION", "text": " Condition"}, {"label": "CONTRAST","text":" Contrast"},
            {"label": "DESCRIBING_DEFINITION","text": " Describing definition"}, {"label": "DISJUNCTION","text": " Disjunction"},
            {"label": "ELABORATION", "text": " Elaboration"}, {"label": "IDENTIFYING_DEFINITION", "text": " Identifying definition"},
            {"label": "LIST", "text": " List"}, {"label": " PURPOSE", "text": " Purpose"},{"label": "UNKNOWN_SUBORDINATION","text": " Unknown subordination"}
          ],
        model10: [],
        model11: [],
        entity1: '',
        entity2: '',
        verb: '',
        entityList: '',
        test: [],
        resultAmount: ''
      }
    },
    components: {
      SearchField,
      HeaderField
    },
    created () {
      this.entity1 = this.$route.query.entity1;
      this.entity2 = this.$route.query.entity2;
      this.verb = this.$route.query.verb;
      this.$axios.post('http://localhost:5000/result',{
        "entity1": this.entity1,
        "entity2": this.entity2,
        "verb": this.verb
      }).then(response => {
        //console.log(response.data);
        this.test = response.data
      })

    },
    methods: {

      // filter based on type and relation
      listComputed: function (test) {
        function filterAccording(list, filters, map) {
          if (filters.length !== 0){
            let types = new Set(filters);
            list = list.filter(function(e) {
              return types.has(map(e)) ;
            });
          }
          return list;
        }
        test = filterAccording(test, this.model10, e=>e.type);
        test = filterAccording(test, this.model11, e=>e.relation);
        this.resultAmount = test.length;
        //console.log(test.length)
        return test;
      },

      // highlight the entities entered
      highlight: function (sentence) {
        if (this.entity1 === "" && this.entity2 !== ""){
          let regex_2 = RegExp(this.entity2, "g")
          return sentence.replace(regex_2, this.entity2.bold())

        }
        else if (this.entity2 === "" && this.entity1 !== ""){
          let regex_1 = RegExp(this.entity1, "g")
          return sentence.replace(regex_1, this.entity1.bold())
        }
        else if (this.entity1 ==="" && this.entity2 === ""){
          return sentence
        }
        else{

          let regex_1 = RegExp(this.entity1, "g")
          let regex_2 = RegExp(this.entity2, "g")
          let tmpSentencesstring_1 = sentence.replace(regex_1, this.entity1.bold())
          let tmpSentencesstring_2 = tmpSentencesstring_1.replace(regex_2, this.entity2.bold())
          return tmpSentencesstring_2

        }

      }

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sentences{
    /*background: black;*/
    width: 50%;
    margin-left: 25%;
    margin-top: -550px;
  }
  .layout{
    background: white;
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    position: absolute;
  }
  .header{
    background: #E7F6FC;
  }
  #logo{
    color: #3035BD;
    font-family:  Georgia;
    font-size: 25px;
  }
  #logo-for-twitter{
    padding-left: 80%;
  }
  .searchDiv{
    background: #E7F6FC;
    height: 100px;
  }
  #searchField{
    margin-left: 20%;
  }
  .layout-footer-center{
    text-align: center;
  }

  #checkbox-for-type{
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 10px;
  }
  #checkbox-for-relation{
    display: flex;
    flex-direction: column;
    margin-left: 10%;
    margin-top: 10px;

  }

  .resultText{
    line-height: 3;
  }

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }

  >>> mark{
    padding: 0.25em 0.35em;
    margin: 0px 0.25em;
    line-height: 1;
    display: inline-block;
    border-radius: 0.25em;
  }

  >>> mark::after{
    box-sizing: border-box;
    content: attr(class);
    font-size: 0.6em;
    line-height: 1;
    padding: 0.35em;
    border-radius: 0.35em;
    text-transform: uppercase;
    display: inline-block;
    vertical-align: middle;
    margin: 0px 0px 0.1rem 0.5rem;
  }
  >>> .protein{
    background: rgba(166, 226, 45, 0.2);
    border: 1px solid rgb(166, 226, 45);
  }

  >>> .protein::after{
    background: rgb(166, 226, 45);
  }

  >>> .cell-line{
    background: rgba(253, 151, 32, 0.2);
    border: 1px solid rgb(253, 151, 32);
  }
  >>> .cell-line::after{
    background: rgb(253, 151, 32);
  }

  >>> .RNA{
    background: rgba(67, 198, 252, 0.2);
    border: 1px solid rgb(67, 198, 252);
  }

  >>> .RNA::after{
  background: rgb(67, 198, 252);
  }

  >>> .cell-type{
    background: rgba(224, 0, 132, 0.2);
    border: 1px solid rgb(224, 0, 132);
  }

  >>> .cell-type::after{
    background: rgb(224, 0, 132);
  }

  >>> .DNA{
    background: rgba(142, 125, 255,0.2);
    border: 1px solid rgb(142, 125, 255);
  }

  >>> .DNA::after{
    background: rgb(142, 125, 255);
  }

</style>
