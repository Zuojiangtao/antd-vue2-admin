"use strict";(self["webpackChunkantd_vue2_admin"]=self["webpackChunkantd_vue2_admin"]||[]).push([[378],{57917:function(e,t,a){a.r(t),a.d(t,{default:function(){return B}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"main"},[t("a-form",{ref:"formLogin",staticClass:"user-layout-login",attrs:{id:"formLogin",form:e.form},on:{submit:e.handleSubmit}},[t("a-tabs",{attrs:{activeKey:e.customActiveKey,tabBarStyle:{textAlign:"center",borderBottom:"unset"}},on:{change:e.handleTabClick}},[t("a-tab-pane",{key:"tab1",attrs:{tab:e.$t("user.login.tab-login-credentials")}},[e.isLoginError?t("a-alert",{staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",showIcon:"",message:e.$t("user.login.message-invalid-credentials")}}):e._e(),t("a-form-item",[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:e.$t("user.userName.required")},{validator:e.handleUsernameOrEmail}],validateTrigger:"change"}],expression:"[\n              'username',\n              {\n                rules: [\n                  { required: true, message: $t('user.userName.required') },\n                  { validator: handleUsernameOrEmail },\n                ],\n                validateTrigger: 'change',\n              },\n            ]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.username.placeholder")}},[t("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),t("a-form-item",[t("a-input-password",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:e.$t("user.password.required")}],validateTrigger:"blur"}],expression:"[\n              'password',\n              { rules: [{ required: true, message: $t('user.password.required') }], validateTrigger: 'blur' },\n            ]"}],attrs:{size:"large",placeholder:e.$t("user.login.password.placeholder")}},[t("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1)],1),t("a-tab-pane",{key:"tab2",attrs:{tab:e.$t("user.login.tab-login-mobile")}},[t("a-form-item",[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{required:!0,pattern:/^1[34578]\d{9}$/,message:e.$t("user.login.mobile.placeholder")}],validateTrigger:"change"}],expression:"[\n              'mobile',\n              {\n                rules: [{ required: true, pattern: /^1[34578]\\d{9}$/, message: $t('user.login.mobile.placeholder') }],\n                validateTrigger: 'change',\n              },\n            ]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.mobile.placeholder")}},[t("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mobile"},slot:"prefix"})],1)],1),t("a-row",{attrs:{gutter:16}},[t("a-col",{staticClass:"gutter-row",attrs:{span:16}},[t("a-form-item",[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["captcha",{rules:[{required:!0,message:e.$t("user.verification-code.required")}],validateTrigger:"blur"}],expression:"[\n                  'captcha',\n                  {\n                    rules: [{ required: true, message: $t('user.verification-code.required') }],\n                    validateTrigger: 'blur',\n                  },\n                ]"}],attrs:{size:"large",type:"text",placeholder:e.$t("user.login.mobile.verification-code.placeholder")}},[t("a-icon",{style:{color:"rgba(0,0,0,.25)"},attrs:{slot:"prefix",type:"mail"},slot:"prefix"})],1)],1)],1),t("a-col",{staticClass:"gutter-row",attrs:{span:8}},[t("a-button",{staticClass:"getCaptcha",attrs:{tabindex:"-1",disabled:e.state.smsSendBtn},domProps:{textContent:e._s(!e.state.smsSendBtn&&e.$t("user.register.get-verification-code")||e.state.time+" s")},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.getCaptcha.apply(null,arguments)}}})],1)],1)],1)],1),t("a-form-item",[t("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["rememberMe",{valuePropName:"checked"}],expression:"['rememberMe', { valuePropName: 'checked' }]"}]},[e._v(e._s(e.$t("user.login.remember-me")))]),t("router-link",{staticClass:"forge-password",staticStyle:{float:"right"},attrs:{to:{name:"recover",params:{user:"aaa"}}}},[e._v(e._s(e.$t("user.login.forgot-password")))])],1),t("a-form-item",{staticStyle:{"margin-top":"24px"}},[t("a-button",{staticClass:"login-button",attrs:{size:"large",type:"primary",htmlType:"submit",loading:e.state.loginBtn,disabled:e.state.loginBtn}},[e._v(e._s(e.$t("user.login.login")))])],1),t("div",{staticClass:"user-login-other"},[t("span",[e._v(e._s(e.$t("user.login.sign-in-with")))]),t("a",[t("a-icon",{staticClass:"item-icon",attrs:{type:"alipay-circle"}})],1),t("a",[t("a-icon",{staticClass:"item-icon",attrs:{type:"taobao-circle"}})],1),t("a",[t("a-icon",{staticClass:"item-icon",attrs:{type:"weibo-circle"}})],1),t("router-link",{staticClass:"register",attrs:{to:{name:"register"}}},[e._v(e._s(e.$t("user.login.signup")))])],1)],1),e.requiredTwoStepCaptcha?t("two-step-captcha",{attrs:{visible:e.stepCaptchaVisible},on:{success:e.stepCaptchaSuccess,cancel:e.stepCaptchaCancel}}):e._e()],1)},r=[],i=function(){var e=this,t=e._self._c;return t("a-modal",{attrs:{centered:"",maskClosable:!1},on:{cancel:e.handleCancel},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[t("div",{style:{textAlign:"center"},attrs:{slot:"title"},slot:"title"},[e._v("两步验证")]),t("template",{slot:"footer"},[t("div",{style:{textAlign:"center"}},[t("a-button",{key:"back",on:{click:e.handleCancel}},[e._v("返回")]),t("a-button",{key:"submit",attrs:{type:"primary",loading:e.stepLoading},on:{click:e.handleStepOk}},[e._v(" 继续 ")])],1)]),t("a-spin",{attrs:{spinning:e.stepLoading}},[t("a-form",{attrs:{layout:"vertical","auto-form-create":e=>{this.form=e}}},[t("div",{staticClass:"step-form-wrapper"},[e.stepLoading?t("p",{staticStyle:{"text-align":"center"}},[e._v("正在验证.."),t("br"),e._v("请稍后")]):t("p",{staticStyle:{"text-align":"center"}},[e._v(" 请在手机中打开 Google Authenticator 或两步验证 APP"),t("br"),e._v("输入 6 位动态码 ")]),t("a-form-item",{style:{textAlign:"center"},attrs:{hasFeedback:"",fieldDecoratorId:"stepCode",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入 6 位动态码!",pattern:/^\d{6}$/,len:6}]}}},[t("a-input",{style:{textAlign:"center"},attrs:{placeholder:"000000"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleStepOk.apply(null,arguments)}}})],1),t("p",{staticStyle:{"text-align":"center"}},[t("a",{on:{click:e.onForgeStepCode}},[e._v("遗失手机?")])])],1)])],1)],2)},o=[],n={props:{visible:{type:Boolean,default:!1}},data(){return{stepLoading:!1,form:null}},methods:{handleStepOk(){const e=this;this.stepLoading=!0,this.form.validateFields(((t,a)=>{t?(this.stepLoading=!1,this.$emit("error",{err:t})):setTimeout((()=>{e.stepLoading=!1,e.$emit("success",{values:a})}),2e3)}))},handleCancel(){this.visible=!1,this.$emit("cancel")},onForgeStepCode(){}}},l=n,c=a(1001),u=(0,c.Z)(l,i,o,!1,null,"250a3bec",null),d=u.exports,p=a(26294);function m(){const e=new Date,t=e.getHours();return t<9?"早上好":t<=11?"上午好":t<=13?"中午好":t<20?"下午好":"晚上好"}var g=a(47467),h=a.n(g),v=a(55389),f=a(70473);const b=h().create({baseURL:"/api",timeout:6e3}),y="no-network";let C=!1,w=[];const S=e=>{if(e.response){const{data:t,status:a,statusText:s}=e.response;if(401===a&&v.Z.dispatch("Clear").then((()=>{setTimeout((()=>{window.location.reload()}),1500)})),450===a){const t=e.config;return C?new Promise((e=>{w.push((a=>{e(b(t))}))})):(C=!0,v.Z.dispatch("RefreshToken").then((e=>(w.forEach((t=>t(e))),w=[],b(t)))).catch((e=>{v.Z.dispatch("Clear").then((()=>{setTimeout((()=>{window.location.reload()}),1500)}))})).finally((()=>{C=!1})))}450!==a&&f.Z.error({message:s,description:t})}else f.Z.error({key:y,message:"网络异常",description:"请检查网络!"});return Promise.reject(e)};b.interceptors.request.use((e=>{const t=v.Z.getters.token;return t&&(e.headers["Authorization"]=t),e}),S),b.interceptors.response.use((e=>{const{message:t,success:a}=e.data;if(!1===a){f.Z.error({message:"错误",description:t});const a=new Error(t||"Error");return a.response=e,Promise.reject(a)}return Promise.resolve(e.data)}),S);var k=b;const $={Login:"/auth/login",Logout:"/auth/logout",ForgePassword:"/auth/forge-password",Register:"/auth/register",twoStepCode:"/auth/2step-code",SendSms:"/account/sms",SendSmsErr:"/account/sms_err",UserInfo:"/user/info",UserMenu:"/user/nav"};function x(e){return k({url:$.SendSms,method:"post",data:e})}function _(e){return k({url:$.twoStepCode,method:"post",data:e})}var T={name:"Login",components:{TwoStepCaptcha:d},data(){return{customActiveKey:"tab1",loginBtn:!1,loginType:0,isLoginError:!1,requiredTwoStepCaptcha:!1,stepCaptchaVisible:!1,form:this.$form.createForm(this),state:{time:60,loginBtn:!1,loginType:0,smsSendBtn:!1}}},created(){_({}).then((e=>{this.requiredTwoStepCaptcha=e.result.stepCode})).catch((()=>{this.requiredTwoStepCaptcha=!1}))},methods:{...(0,p.mapActions)(["Login","Logout"]),handleUsernameOrEmail(e,t,a){const{state:s}=this,r=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;r.test(t)?s.loginType=0:s.loginType=1,a()},handleTabClick(e){this.customActiveKey=e},handleSubmit(e){e.preventDefault();const{form:{validateFields:t},state:a,customActiveKey:s,Login:r}=this;a.loginBtn=!0;const i="tab1"===s?["username","password"]:["mobile","captcha"];t(i,{force:!0},((e,t)=>{if(e)setTimeout((()=>{a.loginBtn=!1}),600);else{const e={...t};delete e.username,e[a.loginType?"username":"email"]=t.username,e.password=t.password,r(e).then((e=>this.loginSuccess(e))).catch((e=>this.requestFailed(e))).finally((()=>{a.loginBtn=!1}))}}))},getCaptcha(e){e.preventDefault();const{form:{validateFields:t},state:a}=this;t(["mobile"],{force:!0},((e,t)=>{if(!e){a.smsSendBtn=!0;const e=window.setInterval((()=>{a.time--<=0&&(a.time=60,a.smsSendBtn=!1,window.clearInterval(e))}),1e3),s=this.$message.loading("验证码发送中..",0);x({mobile:t.mobile}).then((e=>{setTimeout(s,2500),this.$notification["success"]({message:"提示",description:"验证码获取成功，您的验证码为："+e.result.captcha,duration:8})})).catch((t=>{setTimeout(s,1),clearInterval(e),a.time=60,a.smsSendBtn=!1,this.requestFailed(t)}))}}))},stepCaptchaSuccess(){this.loginSuccess()},stepCaptchaCancel(){this.Logout().then((()=>{this.loginBtn=!1,this.stepCaptchaVisible=!1}))},loginSuccess(e){this.$router.push({path:"/"}),setTimeout((()=>{this.$notification.success({message:"欢迎",description:`${m()}，欢迎回来`})}),1e3),this.isLoginError=!1},requestFailed(e){this.isLoginError=!0,this.$notification["error"]({message:"错误",description:((e.response||{}).data||{}).message||"请求出现错误，请稍后再试",duration:4})}}},q=T,L=(0,c.Z)(q,s,r,!1,null,"1cfa8815",null),B=L.exports}}]);