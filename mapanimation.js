const appID = "7CBB98B4AE7C7662E47CCD101";


mapboxgl.accessToken = 'pk.eyJ1IjoidGhhdHN0cnVkZWF1IiwiYSI6ImNsYjEyZzF6dDA0NzQzdm56NTBqNDh3NWcifQ.TQjT-zcWNqgaImMMZRNjAQ';
let markerCreatedFlag = 1;
let marker = {};

/* const map = new mapboxgl.Map({
    container: 'content', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
}); */

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-122.623839, 45.524109],
    zoom: 13,
  });

function createMapMarker(long,lat) {
    map.setCenter([long,lat]);
    marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
    markerCreatedFlag = 0;
    //return marker
    // console.log("Marker is a: " +typeof(marker))
  }
  
function updateMapMarker(long, lat) {
    map.setCenter([long,lat]);
    marker = marker.setLngLat([long,lat]).addTo(map);
}
  
  window.onload = () => {
    console.log("Window Loaded")
    createMapMarker();
  };


async function run(){
    const vehicleLocation = await getVehiclesCurrentLocation();
    console.log('Marker Created Flag is: ' + markerCreatedFlag);
    if (markerCreatedFlag){ 
        createMapMarker(vehicleLocation.vehicle[1].longitude, vehicleLocation.vehicle[1].latitude);
    }
    updateMapMarker(vehicleLocation.vehicle[1].longitude, vehicleLocation.vehicle[1].latitude);
    
    //const stopInformation    = await getStopInfo('./gtfs/stops.txt');
    //console.log(new Date());
    //console.log(typeof(vehicleLocation.vehicle[1].latitude));
    //console.log("Longitude: " + vehicleLocation.vehicle[0].longitude);
    //console.log(stopInformation);
    //console.log(resultSet)

    //Timer
    setTimeout(run, 15000);
}

async function getVehiclesCurrentLocation(){
    const url = 'https://developer.trimet.org/ws/v2/vehicles&appID=' + appID;
    const response = await fetch(url);
    const json     = await response.json();
    return json.resultSet;
}

/* async function getStopInfo(filename){
    try{
        const contents = await fs.readFile(filename, 'utf8');
        const contentSplit = contents.split(/\r\n/);
        const titleSplit = contentSplit[0].split(',');
        let stopData = {};
        for(let i=0;i<titleSplit.length;i++){
            let tempArray = new Array;
            let interpArray = new Array;
            for(let j=1;j<contentSplit.length;j++){
                tempArray = contentSplit[j].split(',');
                if(isNaN(tempArray[i])){
                    interpArray.push(tempArray[i]);
                }else{
                    interpArray.push(Number(tempArray[i]));
                }
            }
            stopData[titleSplit[i]] = interpArray;
        }    
        return stopData;
    }
    catch(err){
        console.log(err);
    }
} */


window.onload = () => {
    createMapMarker();
  };
run();