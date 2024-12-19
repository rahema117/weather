// https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=e551c57a43a04195b8200316241912

var searchInput = document.getElementById('foundCountry')

searchInput.addEventListener('input', function(e){
    var country = e.target.value
    if(country.length >2){
        getDataApi(country)
        
    }

})




 async function getDataApi(country){
    let res  = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${country}&days=3&key=e551c57a43a04195b8200316241912`)
   let data =  await res.json()
   displayData(data)
    
}

function displayData(data){
console.log(data);
const date = new Date(data.current.last_updated) 
const currentDayName = date.toLocaleString('en-us' , {weekday:'long'})
const currentMonthName = date.toLocaleString('en-us',{month:'long'})
const currentDayNum = date.getDate()
console.log(data.location.name);



document.getElementById('currentDay').innerHTML = currentDayName;
document.getElementById('currentMonth').innerHTML = currentDayNum+currentMonthName;
document.getElementById('regionName').innerHTML = data.location.name;
document.getElementById('currentDegree').innerHTML = data.current.temp_c;
document.getElementById('currentStauts').innerHTML = data.current.condition.text;
document.getElementById('humadity').innerHTML=data.current.humidity + '%'

document.getElementById('wind').innerHTML=data.current.wind_kph + 'km/h'

document.getElementById('direction').innerHTML = data.current.wind_dir
document.getElementById('currentIcon').setAttribute('src',`https:${data.current.condition.icon}`)  

///////////////////////////////////////////////////////////////
let forecastday = data.forecast.forecastday
let cartona = ''
for (let i = 1; i <=2; i++) {
   console.log(forecastday);
   const nextDate = new Date(forecastday[i].date)
   console.log(nextDate);
cartona = `
<div class="item text-center h-100">
            <div class="forcast-header p-2" ">
              <div class="day">
               ${nextDate.toLocaleString('en-us' , {weekday:'long'})}
              </div>
            </div>
            <div class="forcast-content py-5" ">
              <div class="icon">
                <img src="https:${forecastday[i].day.condition.icon}" alt="" width="90">
              </div>
              <div class="degree fs-4 fw-bold">
               ${forecastday[i].day.maxtemp_c}
                <sup>o</sup>
                c
              </div>
              <span>${forecastday[i].day.mintemp_c} <sup>o</sup>c</span>
              <div class="custom">
               ${forecastday[i].day.condition.text}
              </div>

            </div>
          </div>
`

document.querySelectorAll('.card-days')[i-1].innerHTML = cartona ;


}




}

if( navigator.geolocation){
navigator.geolocation.getCurrentPosition(function(pos){
console.log(pos);
let lat = pos.coords.latitude
let lang = pos.coords.longitude

console.log(lat);
console.log(lang);
getDataApi(`${lat},${lang}`)


})

}
  
const links = document.querySelectorAll('.nav-link')
for (let i = 0; i < links.length; i++) {
   links[i].addEventListener('click',function(){
links.forEach(function(link){
    link.classList.remove('active')
})
links[i].classList.add('active');

   })
}
