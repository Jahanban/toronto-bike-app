// Create namespace object Y
// Document Ready Y
// Init Function Y
// Create variable DOM selectors Y
// Begin button needs id to scroll to main section Y


// Landmark Submit button -> Create Event Listener
//  Create parks and schools arrays -> five different options Y
//  .each() through the array, and render to DOM Y

// Dropdown Event Listener
//  make ajax call -> then method takes results
//  Create variables for each piece of data needed Y
//  Lat/Long Function used
//  Populate html tags with data variables
//  For ul, we'll need <li> with <h3>, <p>, <ul> with <li><i></li>
//  Toggle class to make display section visible

// Reset Button -> Event Listener
//  Toggle Class of display section to make invisible
//  Reset Forms

// NAMESPACE OBJECT
const app = {};


// Arrays for locations

//Arrays for schools

app.schoolsArray = [
    {
        name: "Juno",
        value: "juno",
        lat: 43.6483,
        long: -79.3979
    },
    {
        name: "University of Toronto - St. George",
        value: "university-of-toronto-st-george",
        lat: 43.6629,
        long: -79.3957
    },
    {
        name: "George Brown - St. James",
        value: "george-brown-st-james",
        lat: 43.6513,
        long: -79.3702
    },
    {
        name: "Ryerson",
        value: "ryerson",
        lat: 43.6577,
        long: -79.3788
    },
    {
        name: "OCAD",
        value: "ocad",
        lat: 43.6530,
        long: -79.3912
    }
]

//Arrays for parks

app.parksArray = [
    {
        name: "High Park",
        value: "high-park",
        lat: 43.6465,
        long: -79.4637
    },

    {
        name: "Riverdale Park East",
        value: "riverdale-park-east",
        lat: 43.6708,
        long: -79.3561
    },

    {
        name: "Christie Pits Park",
        value: "christie-pits-park",
        lat: 43.6646,
        long: -79.4207
    },

    {
        name: "Toronto Music Garden",
        value: "toronto-music-garden",
        lat: 43.636927,
        long: -79.394655
    },

    {
        name: "Underpass Park",
        value: "underpass-park",
        lat: 43.6560117,
        long: -79.355092
    }
]

// GeoDataSource.com (C) All Rights Reserved 2018
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

//Ajax call
app.chooseLocation = function () {
    $.ajax({
        headers: { 'Accept': 'application/ json' },
        url: 'https://api.citybik.es/v2/networks/bixi-toronto',
        dataType: 'json',
        method: 'GET'
    }).then((response) => {

        const lat = 43.636927;
        const long = -79.394655;

        let stationDistance;

        const data = response.network.stations;

        const proximateStations = data.filter((station) => {
            const stationLat = station.latitude;
            const stationLong = station.longitude;

            stationDistance = distance(lat, long, stationLat, stationLong, "K");

            if (stationDistance < 0.5) {
                console.log(station);

                return station;

            }

        }).forEach((station) => {
            const stationLat = station.latitude;
            const stationLong = station.longitude;

            stationDistance = distance(lat, long, stationLat, stationLong, "K");

            app.$infoStationList.html('');
            app.$infoStationList.append(`
                <li>
                    <h3>${station.name}</h3>
                    <p>${stationDistance}</p>
                    <ul class="bikesAvailable">
                    
                    </ul>

                    <ul class="emptySlots">

                    </ul>
                    
                </li>
            `)
            for (let i = 1; i <= station.free_bikes; i++) {
                $('.bikesAvailable').append(
                    `<li><i class="fas fa-bicycle"></i></li>`
                )
            }
            for (let i = 1; i <= station.empty_slots; i++) {
                $('.emptySlots').append(
                    `<li><i class="fas fa-bicycle"></i></li>`
                )
            }
        })


        //lat/long
        // School Lat / Long
        // Declare distance function 


        // Create variables for (1) empty slots, (2) free bikes, (3) lat, (4) long, and (5) intersection name, (6) id.
    })
}

app.chooseLocation();

app.chooseLocation = function () {
    const locationName = $(this).attr('name');
    const locationValue = $(this).val();
    let name;
    let lat;
    let long;
    if (locationName === 'park-location') {
        app.parksArray.forEach((park) => {
            if (park.value === locationValue) {
                name = park.name;
                lat = park.lat;
                long = park.long;

            }
        })
    } else if (locationName === 'schools-location') {
        app.schoolsArray.forEach((school) => {
            if (school.value === locationValue) {
                name = school.name;
                lat = school.lat;
                long = school.long;

            }
        })
    }




}

app.chooseLandmark = function () {
    const landmarkValue = $(this).attr('class');
    app.$selectLocation.html(`<option value=""> Select </option>`);

    if (landmarkValue === 'parks-radio') {
        app.$selectLocation.attr('name', 'park-location')
        app.parksArray.forEach((park) => {
            const parkName = park.name;
            const parkValue = park.value;
            app.$selectLocation.append(
                `<option value=${parkValue} class="park"> ${parkName} </option>`
            )

        })

    } else if (landmarkValue === 'schools-radio') {
        app.$selectLocation.attr('name', 'schools-location')
        app.schoolsArray.forEach((school) => {
            const schoolName = school.name;
            const schoolValue = school.value;
            app.$selectLocation.append(
                `<option value=${schoolValue} class="school"> ${schoolName} </option>`
            )
        })
    }



}


// INIT FUNCTION
app.init = function () {

    app.$formLocation = $('.form-location');
    app.$parksRadio = $('.parks-radio');
    app.$schoolsRadio = $('.schools-radio');
    app.$selectLocation = $('.select-location');

    app.$bikeInfo = $('.bike-info');
    app.$infoLocationName = $('.info-location-name');
    app.$infoLocationImage = $('.info-location-image');
    app.$infoStationList = $('.info-station-list');

    app.$buttonReset = $('.button-reset');

    app.$formLocation.on('click', 'input[type="radio"]', app.chooseLandmark);
    app.$selectLocation.on('change', app.chooseLocation);

}

// DOCUMENT READY
$(document).ready(function () {
    app.init();
});