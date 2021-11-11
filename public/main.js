$('#alloy-init').click(() => {
  $('#bg-p')[0].src = ''
  $('#frame-btns-over').show()
  if (!$('#main-input').val().startsWith('http')) {
    $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/prox/?url='+btoa('https://google.com/search?q='+$('#main-input').val(), '2'); return $('#bg-p').fadeIn('fast');
  }
  $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/prox?url='+btoa($('#main-input').val())
  $('#bg-p').fadeIn('fast');
})

$('#pal-init').click(() => {
  $('#bg-p')[0].src = ''
  $('#frame-btns-over').show()
  if (!$('#main-input').val().startsWith('http')) {
    $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/surf/'+encodeURIComponent(xor('https://google.com/search?q='+$('#main-input').val(), '2')); return $('#bg-p').fadeIn('fast');
  }
  $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/surf/'+encodeURIComponent(xor($('#main-input').val(), '2'))
  $('#bg-p').fadeIn('fast');
}) 

var xor = (str,key)=>(str.split('').map((char,ind)=>ind%key?String.fromCharCode(char.charCodeAt()^key):char).join(''));

$('#corro-init').click(() => {
  $('#bg-p')[0].src = ''
  $('#frame-btns-over').show()
  if (!$('#main-input').val().startsWith('http')) {
    $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/service/gateway?url='+'https://google.com/search?q='+$('#main-input').val(); return $('#bg-p').fadeIn('fast');
  }
  $('#bg-p')[0].src = location.protocol+'//'+window.location.host+'/service/gateway?url='+$('#main-input').val()
  $('#bg-p').fadeIn('fast');
})

$('#frame-close').click(() => {$('#bg-p').hide();$('#frame-btns-over').hide()})

$('#frame-reload').click(() => {$('#bg-p')[0].contentWindow.location.reload()})

$('#settings-placeholder').click(() => {
  $('#preferences-container')[0].classList.toggle('visible')
})

$('#title-change').click(() => {
  var input = document.querySelector('.input')
  document.title = input.value
  localStorage.setItem('title', input.value)
})

$('#icon-change').click(() => {
  var input = document.querySelector('.input')
  localStorage['icon'] = input.value
  var link = document.head.querySelector('link[rel=icon]') || document.createElement('link');link.href = input.value
  link.rel = 'icon'
  document.head.appendChild(link)
})

if (localStorage['title']) {
  document.title = localStorage['title']
}

if (localStorage['icon']) {
  var link = document.head.querySelector('link[rel=icon]') || document.createElement('link');link.href = localStorage['icon']
  link.rel = 'icon'
  document.head.appendChild(link)
}

window.alert2 = function(param) {
  var elem = document.createElement('div')
  elem.style = "position: fixed;border-left:0px;border-right:0px;width:100%;margin:auto;top:30px;background:transparent;border-style: solid;border-bottom: 1px solid #fff;border-top:1px solid #fff;display:flex;justify-content:center;align-items:center;box-shadow:0px 0px 10px 0px #fff;padding:20px;color:white;font-size:20px;cursor:pointer;"
  elem.innerText = param
  elem.setAttribute('onclick', '(() => {this.remove()})()')
  document.body.insertAdjacentElement('afterBegin', elem)
}

var interval = setInterval(() => {
  try {$('#arc-widget-launcher-iframe')[0].contentWindow.document.querySelector('#launcher').style.background = 'linear-gradient(238deg, #3baeff 1%, #587cff 100%)';clearInterval(interval)} catch(err) {console.log()}
}, 5)

$('#bg-p')[0].onload = function() {
  $('#bg-p')[0].contentWindow.document.querySelectorAll('a[target]').forEach((node) => {node.target = '_self'})
}
