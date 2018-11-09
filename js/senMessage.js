//2018-11-09
//手机验证码
var sendMessage = {
  init:function (param) {
    this.clickEl = param.clickEl;
    this.phoneEl = param.phoneEl;
    this.submitEl= param.submitEl;
    this.codeEl  = param.codeEl;

    this.getCode(this.clickEl);
    this.isGet = true;
    this.check(this.submitEl);
  },
  getCode:function (el) {
    $(el).on("click",function () {
      var phone = $(this.phoneEl).val();
      if(phone == ''){
        alert("手机号码不能为空！");
      }else {
        if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(phone)){
          alert("手机号码格式错误！");
        }else{
          if(this.isGet){
            this.isGet = false;
            var t = 60;
            var timer = setInterval(function () {
              t--;
              $(this.clickEl).html(t+'s后重新发送');
              if(t <= 0){
                $(this.clickEl).html('免费获取验证码');
                t = 60;
                this.isGet = true;
                clearInterval(timer);
                timer=null;
              }
            }.bind(this),1000);
            var code = ('000000'+Math.floor(Math.random()*999999)).slice(-6);
            this.code = code;
            $.ajax({
              url:'http://127.0.0.1:8008/aliyun-message/test/getMesage/api_demo/SmsDemo.php',
              type:'get',
              data:{'phone':phone,'code':code},
              success:function (res) {
                console.log(res);
                if(res.Code === 'isv.BUSINESS_LIMIT_CONTROL'){
                  alert('一个手机号一个小时最多获取5次验证码！')
                }

                // console.log(phone);
                // console.log(code);
              },
              err:function (err) {
                console.log(err);
              }
            })
          }
        }
      }
    }.bind(this))
  },
  check:function (el) {
    $(el).on('click',function () {
      var inputCode = $(this.codeEl).val();
      if(inputCode!==''&&inputCode.length === 6){
        if(inputCode === this.code){
          alert("注册成功。");
          window.location.reload();
        }else{
          alert("验证码输入错误！");
        }
      }else{
        alert('请输入6位数字的验证码！');
      }
    }.bind(this))
  }
};