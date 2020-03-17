<template>
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
</template>

<script>
  export default {
    name: 'Header'
  }
</script>

<style scoped>

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

</style>
