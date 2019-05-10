window.addEventListener('load', ()=> {

    treevalue = document.querySelector('.tree-pollen-value');
    treecategory = document.querySelector('.tree-plant-category');

    grassvalue = document.querySelector('.grass-pollen-value');
    grasscategory = document.querySelector('.grass-plant-category');

    ragweedvalue = document.querySelector('.ragweed-pollen-value');
    ragweedcategory = document.querySelector('.ragweed-plant-category');

    let long;
    let lat;

    const api_key = 'J3TxZFzoSlpN9KLSnpFIk7CNFNqdUmdJ';
    
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    let pollenvalue = document.querySelector('.pollen-value');
    let plantcategory = document.querySelector('.plant-category');

    const getCurrentConditions = key => {
        console.log('location key', key);
        fetch(`${proxy}http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${api_key}&details=true`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let tree = data.DailyForecasts[0].AirAndPollen[3];
                console.log(tree);
                let grass = data.DailyForecasts[0].AirAndPollen[1];
                console.log(grass);
                let ragweed = data.DailyForecasts[0].AirAndPollen[4];
                console.log(ragweed);

                const {Category, CategoryValue} = data.DailyForecasts[0].AirAndPollen;
                 
                treevalue.textContent = data.DailyForecasts[0].AirAndPollen[3].Category;
                treecategory.textContent = data.DailyForecasts[0].AirAndPollen[3].CategoryValue;

                grassvalue.textContent = data.DailyForecasts[0].AirAndPollen[1].Category;
                grasscategory.textContent = data.DailyForecasts[0].AirAndPollen[1].CategoryValue;

                ragweedvalue.textContent = data.DailyForecasts[0].AirAndPollen[4].Category;
                ragweedcategory.textContent = data.DailyForecasts[0].AirAndPollen[4].CategoryValue;

            })
    }

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            long = position.coords.longitude;
            lat = position.coords.latitude;

            console.log(lat);
            console.log(long);

            fetch(`${proxy}http://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json?q=${lat},${long}&apikey=${api_key}`)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if(data.Key) {
                        getCurrentConditions(data.Key);
                    }

                });

        });

    }

});
