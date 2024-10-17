const { default: axios } = require("axios");

const getGooglePlace=(category,radius,lat,lng)=>axios.get('/api/google-place?'+
'category=mountain&radius=1000&lat=14.5995&lng=120.9842')

export default{
    getGooglePlace
}