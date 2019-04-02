<template>
    <div class="container">
        <div class="header">
            BROCCOLI & CO
        </div>
        <div class="content">
            <Popup v-if="isShowPopup" v-on:closeAllBox="close"></Popup>
            <div class="slogan">
                <h1>A better way</h1>
                <h1>to enjoy every day.</h1>
                <h6>Be the first to know when wo launch</h6>
            </div>
            <button class="invite-button" @click="showPopup">
                Request an invite
            </button>
        </div>
        <div class="footer">
            <h6>made with ❤ in Shanghai</h6>
            <h6>© Broccoli & Co. All right reserved</h6>
        </div>
    </div>
</template>

<script>
  import Popup from './components/Popup'
  export default {
    name: 'App',
    components: {
      Popup
    },
    data() {
      return {
        isShowPopup: false
      }
    },
    methods: {
      showPopup: function () {
        this.isShowPopup = !this.isShowPopup
      },
      close: function () {
        this.isShowPopup = false
      }
    }
  }
</script>

<style lang="less">
    @import "./lib/variables";

    * {
        margin: 0;
        padding: 0;
    }

    .container {
        font-family: STFangSong, Helvetica, Arial, "Microsoft YaHei", "Songti SC", SimSun, Heiti, sans-serif;
        display: flex;
        min-height: 100vh;
        width: 100%;
        height: 100%;
        flex-direction: column;
        .header {
            height: 80px;
            line-height: 80px;
            padding-left: 10%;
            border-bottom: 1px @border-color solid;
        }
        .content {
            flex: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            h1 {
                color: @h1-color;
            }
            h6 {
                margin-top: 20px;
                color: @h6-color;
            }
            .invite-button {
                border: 1px @border-color solid;
                padding: 10px;
                text-align: center;
                margin-top: 20px;
                background: white;
            }
        }
        .footer {
            min-height: 100px;
            border-top: 1px @border-color solid;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            h6 {
                color: @trademark;
            }
        }
    }


</style>
