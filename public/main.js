$('#alloy-init').click(() => {
  $('#bg-p')[0].src = ''
  if (!$('#main-input').val().startsWith('https://')) {
    $('#bg-p')[0].src = 'https://'+window.location.host+'/prox/?url='+btoa('https://google.com/search?q='+$('#main-input').val(), '2'); return $('#bg-p').fadeIn('fast');
  }
  $('#bg-p')[0].src = 'https://'+window.location.host+'/prox?url='+btoa($('#main-input').val())
  $('#bg-p').fadeIn('fast');
})

$('#smoke-init').click(() => {
  $('#bg-p')[0].src = ''
  alert('Soon')
}) 

var xor = (str,key)=>(str.split('').map((char,ind)=>ind%key?String.fromCharCode(char.charCodeAt()^key):char).join(''));

$('#corro-init').click(() => {
  $('#bg-p')[0].src = ''
  if (!$('#main-input').val().startsWith('https://')) {
    $('#bg-p')[0].src = 'https://'+window.location.host+'/service/'+encodeURIComponent(xor('https://google.com/search?q='+$('#main-input').val(), '2')); return $('#bg-p').fadeIn('fast');
  }
  $('#bg-p')[0].src = 'https://pr.'+window.location.host+'/service/'+encodeURIComponent(xor($('#main-input').val(), '2'))
  $('#bg-p').fadeIn('fast');
})

$('#frame-close').click(() => {$('#bg-p').hide()})

$('#frame-reload').click(() => {$('#bg-p')[0].contentWindow.innerHTML})

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
