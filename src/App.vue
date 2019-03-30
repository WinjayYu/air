<template>
    <div class="container">
        <div class="header">

        </div>
        <div class="content">
            <h1>hhh</h1>
        </div>
        <div class="footer">

        </div>
    </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang='less'>
    @import "variables";
    *{
        margin: 0;
        padding: 0;
    }

    .container {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction:column;
        .header {
            height: 100px;
            border-bottom: 1px @border-color solid;
        }
        .content {
            flex: 1;
            background: #ffafbd;
        }
        .footer {
            height: 150px;
            border-top: 1px @border-color solid;
            background: #f2f9ff;
        }
    }


</style>
