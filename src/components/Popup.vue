<template>
    <div class="pop-up">
        <div class="box invite-box" v-if="isShowInviteBox">
            <p class="title">Request an invite</p>
            <div class="cut-of-rule"></div>
            <form
                    id="inviteForm"
                    action="https://vuejs.org/"
                    method="post"
                    novalidate="true"
                    @submit.prevent="submit"
            >
                <div class="input-group">
                    <div class="input-item">
                        <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Full name"
                                v-model="name"
                                :class="{ danger: errors.name }"
                                @focus="changeHandler"
                        >
                        <div class="warning" v-if="errors.name">{{errors.name}}</div>
                    </div>
                    <div class="input-item">
                        <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                v-model="email"
                                :class="{ danger: errors.email }"
                                @focus="changeHandler"
                        >
                        <div class="warning" v-if="errors.email">{{errors.email}}</div>
                    </div>
                    <div class="input-item">
                        <input
                                type="text"
                                id="confirmEmail"
                                name="confirmEmail"
                                placeholder="Confirm email"
                                v-model="confirmEmail"
                                :class="{ danger: errors.confirmEmail }"
                                @focus="changeHandler"
                        >
                        <div class="warning" v-if="errors.confirmEmail">{{errors.confirmEmail}}</div>
                    </div>
                </div>
                <input type="submit" value="sendValue" v-model="sendValue">
                <div class="error-message"><em class="error-message-text" v-if="errorMessage">{{errorMessage}}</em>
                </div>
            </form>
        </div>
        <div class="box done-box" v-if="!isShowInviteBox">
            <p class="title">All done!</p>
            <p class="succeed-info">
                You will be one of the first to experience Broccoli & Co. when we launch.
            </p>
            <button class="ok" @click="closeBox">ok</button>
        </div>
    </div>
</template>

<script>
  const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const serverUrl = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'
  import warnMsg from '../lib/warn-msg'
  export default {
    name: 'Popup',
    props: {
      showInviteBox: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        name: null,
        email: null,
        confirmEmail: null,
        sendValue: 'Send',
        errors: {
          name: null,
          email: null,
          confirmEmail: null,
        },
        errorMessage: null,
        isShowInviteBox: this.showInviteBox
      }
    },
    methods: {
      checkForm: function () {
        this.errors = {
          name: null,
          email: null,
          confirmEmail: null,
        }
        this.errorMessage = null
        if (!this.name || this.name.length < 3) {
          this.errors.name = warnMsg.name
        }
        if (!emailReg.test(this.email)) {
          this.errors.email = warnMsg.email
        }
        if (this.email !== this.confirmEmail) {
          this.errors.confirmEmail = warnMsg.confirmEmail
        }
        if (Object.values(this.errors).filter(item => item).length === 0) {
          return true
        }

        return false
      },
      submit: function () {
        if (!this.checkForm()) {
          return false
        }
        this.sendValue = "Sending, please wait..."
        const requestData = JSON.stringify({"name": this.name, "email": this.email})
        window.fetch(serverUrl, {
          method: 'POST',
          body: requestData,
          headers: new Headers({
            'Content-Type': 'application/json;charset=UTF-8'
          })
        })
          .then(this.parseJSON)
          .then(response => {
            if (response.ok) {
              this.isShowInviteBox = false
              this.sendValue = "Send"
            } else {
              throw new Error(JSON.stringify(response.json))
            }
          })
          .catch(error => {
            console.error('Error:', error.message)
            try {
              this.errorMessage = JSON.parse(error.message).errorMessage || warnMsg.serverDefaultError
            } catch (e) {
              this.errorMessage = error.message || warnMsg.serverDefaultError
            }
            this.sendValue = "Send"
          })
      },
      parseJSON(response) {
        return new Promise((resolve) => response.json()
          .then((json) => resolve({
            status: response.status,
            ok: response.ok,
            json,
          })))
      },
      changeHandler(e) {
        this.errorMessage = null
        switch (e.target.id) {
          case "name":
            this.errors.name = null
            break
          case "email":
            this.errors.email = null
            break
          case "confirmEmail":
            this.errors.confirmEmail = null
            break
        }
      },
      closeBox() {
        this.$emit("closeAllBox")
      }
    }
  }
</script>

<style scoped lang="less">
    @import "../variables";

    .pop-up {
        position: absolute;
        background: #fff;
        padding: 30px 20px;
        width: 20%;
        min-width: 230px;
        border: 1px @border-color solid;
        input {
            box-sizing: border-box;
        }
        .title {
            &::after {
                content: "";
                width: 30px;
                height: 1px;
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                background: black;
                top: 60px;
            }
        }
        .input-group {
            margin-top: 30px;
            .input-item {
                input {
                    width: 100%;
                    height: 30px;
                    margin-top: 20px;
                    border: @border-color 1px solid;
                    color: @input-value;
                    padding: 2px 5px;
                    font-size: @box-font-size;
                }
                .danger {
                    border-color: @danger;
                }
                .warning {
                    font-size: 12px;
                    text-align: left;
                    color: @input-value;
                    position: absolute;
                }
            }
        }
        input[type=submit],
        .ok {
            width: 100%;
            border: 1px @border-color solid;
            background: white;
            text-align: center;
            display: block;
            color: @input-value;
            margin-top: 20px;
            height: 30px;
            font-size: @box-font-size;
        }
        .error-message {
            margin-top: 10px;
            .error-message-text {
                color: @input-value;
                font-size: @box-font-size;
            }
        }
        .succeed-info {
            margin-top: 50px;
            color: @input-value;
            font-size: @box-font-size;
        }
    }
</style>
