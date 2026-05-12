function getQuery() {
  let query = {}
  let search = window.location.search
  search = search.substr(1)
  let search_arr = search.split('&')
  search_arr.forEach(str => {
    let arr = str.split("=")
    query[arr[0]] = arr[1]
  })
  return query
}

function initLogined() {
  let userProfile_json = localStorage.getItem('p_UserProfile')
  let p_UserProfile = JSON.parse(userProfile_json)
    if (p_UserProfile.username) {
      $('#username').html(p_UserProfile.username)
      $('#head-btns').addClass('userLogined')

      // 价格介绍页： 登录时才显示立即购买
      $('.free-signup-btn')&&$('.free-signup-btn').hide()
      $('.bug-now-btn')&&$('.bug-now-btn').show()
    }
}

function initRegister(queryObj, username) {
  let $usernameRegisteredBtn = $('#username-registered')
  $('#head-btns').addClass('userRegister')
  if (queryObj.hasOwnProperty('username')) {
    const decodeUsername = decodeURIComponent(queryObj.username)
    $usernameRegisteredBtn.html(decodeUsername)
    document.cookie='p_username='+queryObj.username;
  } else if (username) {
    $usernameRegisteredBtn.html(username)
  }
}

function showSubscribeButton(){
 $('#demonstration').addClass('demonstration')
    
   
}

$(document).ready(function () {
  //console.log('ready')
  //console.log(localStorage.getItem('p_UserProfile'))

  // 已登录
  let userProfile_json = localStorage.getItem('p_UserProfile')
  if (userProfile_json) {
    showSubscribeButton()
    initLogined()
    return 
  }

  

  // 已注册未登录
  let queryObj = getQuery()
  let exp1 = new RegExp("p_username" + "=.*?(?=;|$)");
  let cookie = document.cookie
  let username = ''
  let match_arr = cookie.match(exp1)
  if (match_arr&&match_arr.length) {
    username = match_arr[0].split('=')[1]
    username = decodeURIComponent(username || '')
  }


  // 已注册
  if (queryObj.hasOwnProperty('username') || username) {
    return initRegister(queryObj, username)
  }

  

  return showSubscribeButton()

});
