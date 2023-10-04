const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geourl = require('./utils/GeoCode')
const forcast = require('./utils/forcast')


const app = express()

// app.get('/', (req, res)=>{
//     res.send('hello express!!!')
// })

// app.get('/help', (req, res)=>{
//     res.send('help page')
// })

// app.get('/about', (req, res)=>{
//     res.send('about page')
// })

// app.get('/weather', (req, res)=>{
//     res.send('show weather')
// })

//using json and html

// app.get('/', (req, res) => {
//     res.send('<h1>hello express!!!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'roy',
//             age: 21
//         },
//         {
//             name: 'joy',
//             age:25
//         }
//     ])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>about</h1>')
// })

// app.get('/weather', (req, res)=>{
//     res.send({
//         forcast: 'it is showing',
//         location: 'bhavnagar'
//     })
// })

// using html from html file

const DirPath = path.join(__dirname, '../public')
app.use(express.static(DirPath))

//using handlebar
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        text: 'Rundra IT Hub'
    })
})



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        text: 'Rundra IT Hub'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        })
    }
    else {

        geourl(req.query.address, (error, { latitude, longtitude, placeName } = {} ) => {
            if (error) {
                return res.send({ error })
            }
            //    console.log(data)
            forcast(latitude, longtitude, (error, forcastdata) => {
                if (error) {
                    // console.log("err:", error)
                    return res.send({ error })
                }
                // console.log(placeName)
                // console.log("data:", forcastdata)
                res.send({
                    forcast: forcastdata,
                    location: placeName,
                    address: req.query.address
                })
            })
        })
    }
    // console.log(req.query.address)
})

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//         return res.send({
//             error:'please provide search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product: []
//     })

// })

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        text: 'Rundra IT Hub'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'help artical not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found'
    })
})




app.listen(3000, () => {
    console.log('server listen on port 3000')
})

