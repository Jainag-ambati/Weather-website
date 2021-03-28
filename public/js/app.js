console.log('Client side js is called')


const weatherform= document.querySelector('form')
const search= document.querySelector('input')
const msg1=document.querySelector('#one')
const msg2=document.querySelector('#two')



weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const Location=search.value

    msg1.textContent = 'Loading....'
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+Location).then((response)=>{
  
    response.json().then((data)=>{
        if(data.error){
        msg1.textContent = data.error
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})

})