var map = L.map('map').setView([51.969260, 7.596025], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.969260, 7.596025]).addTo(map)
    .bindPopup('I am the location of a dummy trash bin!')
    .openPopup();