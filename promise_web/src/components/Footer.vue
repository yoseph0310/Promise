<template>
    <footer>
      <div class="contact-us">
        CONTACT US
        <img class="contact-img" src="./../assets/email.png">tjdytpq0310@gmail.com
        <img class="contact-img" src="./../assets/tel.png">01099534290
      </div>
    </footer>
</template>

<script>
export default {
  
}
</script>

<style scoped>
footer {
  width: 1100px;
  margin: auto;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  height: 80px;
  padding: 1rem;
  color: rgb(58, 58, 58);

  display: flex;
  align-items: center;
  text-align: center;
  font-size: 70%;
  font-weight: 50;

  z-index: 1000;
}
.contact-us{
  width: 100%;
}
.contact-img{
  color: rgb(58, 58, 58);
  width: 15px;
  margin-left: 10px;
  margin-right: 5px;
}
</style>