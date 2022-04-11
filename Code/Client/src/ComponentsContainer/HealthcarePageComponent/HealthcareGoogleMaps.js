import "./HealthcareGoogleMaps.css";
import { hospitals } from "./healthcareFacilities";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState, useEffect, useRef } from "react";
import useGeoLocation from "./useGeoLocation";
import {
  FaStar,
  FaLocationArrow,
  FaPhoneAlt,
  FaBed,
  FaRoute,
} from "react-icons/fa";
import { BiCurrentLocation, BiReset } from "react-icons/bi";
import { GoGlobe } from "react-icons/go";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import { toast } from "react-toastify";

function HealthcareGoogleMaps() {
  var lat = 1.3521;
  var lng = 103.8198;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({
    lat: lat,
    lng: lng,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const isMounted = useRef(false);

  // Map reference
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Function to pan map to lat long
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  const resetTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyCHHsGYsFgL7HOWjcQAe6dbzIdiZRRHCpM");
  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // Geolocation to get current location
  const location = useGeoLocation();
  if (!location.error) {
    lat = location.coordinates.lat;
    lng = location.coordinates.lng;
    // toast.success("GPS has been sucessfully enabled.");
  }
  console.log("Location value is: ", location);

  const [postal, setPostal] = useState("");
  const [nearestHF, setNearestHF] = useState(hospitals);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [destRef, setdestRef] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    calculateDirection();
  }, [destRef]);

  useEffect(() => {
    Geocode.fromAddress(postal).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        nearestHospital(setNearestHF, lng, lat, 10);
      },
      (error) => {
        // console.log("isMounted value is", isMounted.current);
        if (isMounted.current) {
          toast.error("Invalid location. Please enter a valid location");
        }
        isMounted.current = true;
        nearestHospital(setNearestHF, 103.8583, 1.295, 500);
      }
    );
  }, [postal]);

  //------------------------------------------------------------------------------------
  // GOOGLE MAPS SETTINGS
  // const libraries = ["places"];
  const mapContainerStyle = {
    width: "100wh",
    height: "130vh",
  };
  const options = {
    diableDefaultUI: true,
    clickableIcons: false,
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  };

  // Loading of GoogleMaps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBxQiBSUZFP2VGU1o-4YpurGzHVV5PrU-w",
    libraries: ["places"],
  });
  if (!isLoaded) return "Error Loading Maps";
  //if (!loadError) return "Loading Maps";

  // ----------------------------------------------------------------------------------

  // Function to calculate Route and Direction
  function calculateRoute(hname) {
    // eslint-disable-next-line no-undef
    setdestRef(hname);
  }
  async function calculateDirection() {
    const directionsService = new window.google.maps.DirectionsService();
    console.log(destRef);
    const results = await directionsService.route({
      origin: { lat, lng },
      destination: destRef,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    console.log(results);
    console.log(results.routes[0].legs[0].distance.text);
    console.log(results.routes[0].legs[0].duration.text);
    var dist = "Distance: " + results.routes[0].legs[0].distance.text;
    var dur = "Duration: " + results.routes[0].legs[0].duration.text;
    if (lat == 1.3521 && lng == 103.8198) {
      toast.error(
        "GPS has been disabled. Current location is set to center of Singapore"
      );
    }
    toast.success(dist);
    toast.success(dur);
  }

  // Function to clear route
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    // originRef.current.value = ''
    // destiantionRef.current.value = ''
  }

  //------------------------------------------------------------------------------------
  // Function to load the hospital cards
  const renderCard = (hospital, index) => {
    var lat = parseFloat(hospital.coordinates[0]);
    var lng = parseFloat(hospital.coordinates[1]);
    return (
      <div className="hospital-container">
        <div
          className="hospital-container-background"
          onClick={() => {
            panTo({ lat, lng });
            setSelectedMarker(hospital);
          }}
        >
          <div className="hospital-info-container">
            <div className="hospital-name">{hospital.name}</div>
            <div className="hospital-phone-number">{hospital.phoneNumber}</div>
            <div className="hospital-address">
              <span>{hospital.addressLines[0]}</span>
            </div>
            <div className="hospital-opentime">{hospital.openTime}</div>
          </div>
          <div className="image-container">
            <button className="website-button">
              <a href={hospital.website} target="_blank">
                {/* <img src = {website} alt = "Website Front" width="45px" height = "45px"></img> */}
                <div className="circle">
                  <GoGlobe size={32} />
                </div>
              </a>
            </button>

            <button
              className="direction-button"
              onClick={() => {
                calculateRoute(hospital.name);
              }}
            >
              <div className="circle">
                <FaRoute size={28} />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Function to locate current location
  function Locate({ panTo }) {
    return (
      <button
        className="current-loc"
        id="current_loc_button"
        onClick={() => {
          if (lat == 1.3521 && lng == 103.8198) {
            toast.error(
              "GPS has been disabled. Current location is set to center of Singapore"
            );
          } else {
            toast.info("Setting to current location.");
          }
          panTo({ lat, lng });
          setCenter({ lat, lng });
          setCurrentLocation({ lat, lng });
          nearestHospital(setNearestHF, lng, lat, 10);
        }}
      >
        <div className="circle">
          <BiCurrentLocation size={32} />
        </div>
      </button>
    );
  }

  // Function to reset location
  function Reset({ panTo }) {
    return (
      <button
        className="reset"
        onClick={() => {
          resetTo({ lat: 1.3521, lng: 103.8198 });
          setCenter({ lat: 1.3521, lng: 103.8198 });
          setCurrentLocation(null);
          nearestHospital(setNearestHF, lng, lat, 500);
          clearRoute();
          toast.info("Resetting all locations");
        }}
      >
        <div className="circle">
          <BiReset size={32} />
        </div>
      </button>
    );
  }

  return (
    <div>
      <link rel="stylesheet" href="style.css" />
      <div className="header">
        <div className="head">
          <h1>Healthcare Facilities Nearby</h1>
        </div>
        <div className="dist_dur">
          <div classname="distance">
            <h3>Distance: {distance} </h3>
          </div>
          <div classname="duration">
            <h3>Duration: {duration} </h3>
          </div>
        </div>
      </div>
      <div className="search-container">
        <div className="search">
          <input
            id="zip-code-input"
            type="text"
            name="postal"
            placeholder="Please enter your location"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setPostal(e.target.value);
              }
            }}
          />
          <i className="fas fa-search" />
        </div>
      </div>
      <div className="hospitals-list-container">
        <div className="hospitals-list">{nearestHF.map(renderCard)}</div>
      </div>

      <Locate panTo={panTo} />
      <Reset panTo={panTo} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}

        {currentLocation && (
          <Marker
            key="current location"
            position={{
              lat: lat,
              lng: lng,
            }}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/2991/2991231.png",
              scaledSize: new window.google.maps.Size(38, 38),
            }}
          />
        )}

        {hospitals.map((hospital) => (
          <Marker
            key={hospital.name}
            position={{
              lat: hospital.coordinates[0],
              lng: hospital.coordinates[1],
            }}
            onClick={() => {
              setSelectedMarker(hospital);
              panTo({
                lat: hospital.coordinates[0],
                lng: hospital.coordinates[1],
              });
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.coordinates[0],
              lng: selectedMarker.coordinates[1],
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>
              <div className="hospital-info-window">
                <div className="hospital-info-name">
                  {selectedMarker.name}
                  <div className="hospital-info-rating">
                    {selectedMarker.rating}
                    <div className="hospital-info-icon">
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div className="hospital-info-status">
                  {selectedMarker.openTime}
                </div>
                <div id="hospital-address-id" className="hospital-info-address">
                  <div className="circle">
                    <FaLocationArrow />
                  </div>
                  {selectedMarker.addressLines[0]}
                </div>
                <div className="hospital-info-phone">
                  <div className="circle">
                    <FaPhoneAlt />
                  </div>
                  {selectedMarker.phoneNumber}
                </div>
                <div className="hospital-info-beds">
                  <div className="circle">
                    <FaBed />
                  </div>
                  {selectedMarker.numBeds}
                </div>
                <Link
                  to={{
                    pathname: "/inputparticulars",
                    state: selectedMarker.name,
                  }}
                >
                  <div className="hospital-info-queue">Join Queue</div>
                </Link>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default HealthcareGoogleMaps;

//------------------------------------------------------------------------------------

// Function to get a array of nearby hospital
function nearestHospital(setNearestHF, lng, lat, d) {
  // nearestHF.length = 0;
  // setNearestHF([]);
  //lengthHos = hospitals.length;
  //console.log(lengthHos);
  let nearestHF = [];
  for (let i = 0; i < hospitals.length; i++) {
    findNearest(hospitals[i], nearestHF, lng, lat, d);
  }
  setNearestHF(nearestHF);
}

// Convert degree to radian
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// Filter hospital based on distance
function findNearest(element, nearestHF, lng, lat, dist) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(element.coordinates[0] - lat);
  var dLon = deg2rad(element.coordinates[1] - lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat)) *
      Math.cos(deg2rad(element.coordinates[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  console.log(d);
  if (d <= dist) {
    nearestHF.push(element);
  }
}
