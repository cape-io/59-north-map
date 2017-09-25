var FiveNineNorthMap = function(mbx, options) {

    this.makeMap = function(data) {
        mbx.accessToken = options.token;
        var bounds = getBounds(data);
        this.map = new mbx.Map({
            'container': options.container,
            'style': options.style,
            'center': bounds.centroid
            
        });
        var map = this.map
        this.map.on('load', function() {
            addLines(map, data);
            addPoints(map, data);
            map.fitBounds(bounds.bounds, {'padding': 200});
        });
        this.map.on('click', function(e) {
            var points = map.queryRenderedFeatures(e.point, {
                layers: ['fnnPointLayer']});
            if(points.length) {
                addPopup(map, points[0])
            }
            var lines = map.queryRenderedFeatures(e.point, {
                layers: ['fnnLineLayer']
            });
            if(lines.length) {
                if(lines[0].properties.link) {
                    var newWin = window.open(lines[0].properties.link, '_blank');
                    newWin.focus();
                }
            }
        });
            
    }.bind(this);


    var addPopup = function(map, point) {
        var html = '<h3>' + point.properties.title + '</h3>';
        if(point.properties.description) {
            html += '<p>' + point.properties.description + '</p>';
        }
        var links = []
        for (var prop in point.properties) {
            if(point.properties.hasOwnProperty(prop)
               && prop !== "title" && prop !== "description") {
                links.push([prop, point.properties[prop]]);
            }   
        }
        if(links.length) {
            html += "<ul>";
            links.map(function(l) {
                html += '<li><a href="' + l[1] + '" target="_blank">' + l[0] + '</a></li>';
            });
            html += "</ul>";
        }
        var popup = new mbx.Popup({offset: [0, -15] })
            .setLngLat(point.geometry.coordinates)
            .setHTML(html)
            .setLngLat(point.geometry.coordinates).addTo(map);
    }

    var addPoints = function(map, data) {
        var points = data.features.filter(function(x) {
            return x.geometry.type === 'Point';
        });
        map.addSource('fnnPoints', {
            'type': 'geojson',
            'data': {'type': 'FeatureCollection',
                     'features': points
                    }
        });
        map.addLayer({
            'id': 'fnnPointLayer',
            'type': 'symbol',
            'source': 'fnnPoints',
            'layout': {
                'text-field': '{title}',
                "text-size": {
                    "base": 1,
                    "stops": [
                        [1,6],
                        [3,8],
                        [6,12],
                        [14,20]
                    ]
                },
                'icon-image': 'port-8',
                'text-font': [
                    'Open Sans Bold',
                    'Arial Unicode MS Regular'
                ],
                'text-padding': 1,
                'visibility': 'visible',
                'text-offset': [
                    -1,
                    0.1
                ],
                'text-rotation-alignment': 'viewport',
                'text-anchor': 'right',
                'text-rotate': 0,
                'text-letter-spacing': 0.2,
                'icon-padding': 1,
                'text-max-width': 18,
                'text-transform': 'uppercase'
            },
            'paint': {
                'text-color': '#e7cc0b',
                'text-halo-color': 'hsl(206, 50%, 40%)',
                'text-halo-width': 1
            }
        });
        
            
    };

    var addLines = function(map, data) {
        var lines = data.features.filter(function(x) {
            return x.geometry.type === 'LineString';
        });
        console.log(lines);
        map.addSource('fnnLines', {
            'type': 'geojson',
            'data': {'type': 'FeatureCollection',
                     'features': lines
                    }
        });
        map.addLayer({
            'id': 'fnnLineLayer',
            'type': 'line',
            'source': 'fnnLines',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#e7cc0b',
                'line-width': 4
            }
        });
    };

    var getBounds = function(data) {
        var wLon = null;
        var sLat = null;
        var nLat = null;
        var eLon = null;
        var updateCoords = function(c) {
            if(wLon === null || c[0] <= wLon) wLon = c[0];
            if(sLat === null || c[1] <= sLat) sLat = c[1];
            if(eLon === null || c[0] >= eLon) eLon = c[0];
            if(nLat === null || c[1] >= nLat) nLat = c[1];
        }
        data.features.map(function(f) {
            if(f.geometry.type === 'Point') {
                updateCoords(f.geometry.coordinates)
            } else if(f.geometry.type === 'LineString') {
                f.geometry.coordinates.map(updateCoords)
            }
        })
        cLon = (eLon - wLon) / 2 + wLon;
        cLat = (nLat - sLat) / 2 + sLat;
        
        return {'bounds': [wLon, sLat, eLon, nLat],
                'centroid': [cLon, cLat]};
    }

    
};
