const name = document.querySelectorAll('.name');
const size = document.querySelectorAll('.size');
const completeBtn = document.querySelectorAll('.completeButton');

for (let i = 0; i < completeBtn.length; i++) {
  completeBtn[i].addEventListener('click', () => {
    fetch('/vieworders/completeOrder', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name[i].innerHTML,
        size: size[i].innerHTML,
        completion: true
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  })
}
