window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position  => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log("long" ,long);
            console.log("lat", lat);

            const api = 'http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=0fc1dfb24e9da15bcfad449d8c6e715d&lang=ja&units=metric';

        })
        
    } else {
        h1.textContent = "hey dis is not working bec ause resons";
    }

})