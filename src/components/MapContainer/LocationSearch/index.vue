<template>
  <div class="search-box">
    <button class="btn-search">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>
    </button>
    <input type="text" class="input-search" placeholder="Type to Search...">
  </div>
</template>

<script>
export default {
  name: 'LocationSearch',
}
</script>

<style lang='scss' scoped>
.search-box{
  width: fit-content;
  height: fit-content;
  position: relative;
}
.input-search{
  height: 50px;
  width: 50px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  /* background-color: #22a6b3; */
  background-color: $primary-color;
  padding-right: 40px;
  /* color:#fff; */
  color:#333;
}
.input-search::placeholder{
  /* color:rgba(255,255,255,.5); */
  color: #333; 
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 100;
}
.btn-search{
  width: 50px;
  height: 50px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  /* color: white ; */
  color:black ;
  background-color: #fffa;
  pointer-events: painted;  
}
.btn-search:focus ~ .input-search{
  width: 300px;
  border-radius: 0px;
  background-color: #fffa;
  border-bottom:1px solid $dark-color;
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
.input-search:focus{
  width: 300px;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid $dark-color;
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
</style>
