function SearchBox() {
    return (
        <body>
            <div class="title">
                NEARBY HOSPITALS
            </div>
        <div class="search-container"  >
                <div class="search">
                    <input id="zip-code-input"  type="text" placeholder="enter postal code e.g. 110062 or 110050"></input>
                    <i class="fas fa-search" onclick="searchHospitals()"></i>
                </div> 
            </div>
            <div class="hospitals-list-container">
                <div class="hospitals-list">
                
                </div>
            </div>
        
            <div id="map"></div>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCHHsGYsFgL7HOWjcQAe6dbzIdiZRRHCpM&callback=initMap"
            async defer></script>
        </body>
    )
};

export default SearchBox;