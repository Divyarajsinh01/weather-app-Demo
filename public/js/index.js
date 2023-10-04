console.log('welcome to my world!!!')

// fetch('https://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then(data=>{
//         console.log(data)
//     })
//     // console.log(res)
// })

// fetch('http://localhost:3000/weather?address=!').then((res)=>{
//     res.json().then((data)=>{
//         // console.log(data)
//         if(data.error){
//             console.log(data.error)
//         }
//         else{
//             console.log(data.location)
//             console.log(data.forcast)
//         }
//     })
// })

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messOne = document.getElementById('mess1')
const messSec = document.getElementById('mess2')
const subButton = document.querySelector('button')


search.addEventListener('focus', ()=>{
    search.placeholder= "Enter your Location..."
})

search.addEventListener('blur', ()=>{
    search.placeholder = 'enter'
})

// subButton.addEventListener('click',(e)=>{
//     e.preventDefault()
//     weatherform.submit()
// })

weatherform.addEventListener('submit', (e)=>{
    e.preventDefault()
    // console.log('testing')
    const location = search.value
    // console.log(location)
   
    //fetvh weather api

    messOne.textContent = 'loading....'
    messSec.textContent = ""

    fetch(`http://localhost:3000/weather?address=${location}`).then((res)=>{
    res.json().then((data)=>{
        // console.log(data)
        if(data.error){
            // console.log(data.error)
            messOne.textContent = data.error
        }
        else{
            // console.log(data.location)
            // console.log(data.forcast)
          
            messOne.textContent = data.location
            messSec.textContent = data.forcast
        }

        search.value = ''
        search.onfocus()
    })
})

})