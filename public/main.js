const sleepPatterns = document.querySelectorAll(".sleepPatterns");
var trash = document.getElementsByClassName("fa-trash");

Array.from(sleepPatterns).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.childNodes[1].innerText
        const naps = this.parentNode.childNodes[3].innerText
        const sleep = this.parentNode.childNodes[5].innerText
        fetch('update', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'date': date,
            'naps': naps,
            'sleep': sleep,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
    });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const naps = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const sleep = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'naps': naps,
            'sleep': sleep
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
