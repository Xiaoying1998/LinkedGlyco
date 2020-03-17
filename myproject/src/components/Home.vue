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

    <Content>
      <div id="particle" data-aos="zoom out" data-aos-duration="3000">
        <vue-particle-line >

          <br>
          <p id="discover"><b>Discover</b></p>
          <p id="relation">the amazing relationship</p>
          <p id="find">Select entities to find their potential relations.</p>
        </vue-particle-line>
      </div>
      <div class="item" data-aos="zoom-in" data-aos-duration="1000"><search-field ></search-field></div>
    </Content>
  </Layout>

</template>

<script>
  import SearchField from './SearchField'
  export default {
    name: 'Home',
    data(){
      return{
        count:""
      }
    },
    components:{
      SearchField
    }
  }
</script>

<style scoped>
  .layout{
    width: 100%;
    height: 100%;
    padding: 0px;
    margin: 0px;
    position: absolute;
    background: #E7F6FC;
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

  .search{
    position: relative;
    margin-left: 20%;
    margin-top: 3%;

  }
  #discover{
    font-size: 60px;
    font-family:  Georgia;
    color: black;
    margin-top: 5%;
    margin-left: 25%;
  }
  #relation{
    font-size: 60px;
    font-family: Georgia;
    color: black;
    margin-top: -1%;
    margin-left: 25%;

  }
  #find{
    font-size: 20px;
    font-family: Georgia;
    color: gray;
    margin-top: 2%;
    margin-left: 25%;
  }

  #particle{
    height: 100%;
    position: relative;
  }

  .item {
    width: 80%;
    height: 100px;
    margin-left: 300px;
    margin-top: -300px;
    position: absolute;
    z-index: 1;
  }



</style>
