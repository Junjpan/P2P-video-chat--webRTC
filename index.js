var getUserMedia = require('getusermedia');

getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
  })

  peer.on('stream', function (stream) {
    
    //var video = document.createElement('video')
    //document.body.appendChild(video)
    var video=document.querySelector('video')
    video.srcObject = stream// Don't use vidoe.src=URL.createObjectURL(stream); because firefox and other browsers will not accepting a mediastream as the object argument
    //for the URL, use this way instread.
    console.log(video.srcObject)
    video.play()
  })
})