var FiveNineNorthMap = function(mbx, options) {

    this.makeMap = function(data) {
        mbx.accessToken = options.token;
        var bounds = getBounds(data);
        var init = {
            'container': options.container,
            'style': options.style,
            'center': options.centroid || bounds.centroid,
        };
        if(typeof options.zoom !== 'undefined' && options.zoom !== null) {
            init.zoom = options.zoom;
        }
        this.map = new mbx.Map(init);
        var map = this.map
        this.map.on('load', function() {
            addLines(map, data);
            addPoints(map, data);
            if(typeof init.zoom === 'undefined') {
                map.fitBounds(bounds.bounds, {'padding': options.padding || 20});
            }
        });
        this.map.on('click', function(e) {
            var points = map.queryRenderedFeatures(e.point, {
                layers: [pointLayerName('primary-port'),
                         pointLayerName('secondary-port'),
                         pointLayerName('route')]});
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
        addCursorEvents(map, pointLayerName('primary-port'));
        addCursorEvents(map, pointLayerName('secondary-port'));
        addCursorEvents(map, pointLayerName('route'));
        addCursorEvents(map, 'fnnLineLayer');
            
    }.bind(this);

    var addCursorEvents = function(map, layerName) {
        map.on('mouseenter', layerName, function(e) {
            map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', layerName, function(e) {
            map.getCanvas().style.cursor = '';
        });
    }         

    var addPopup = function(map, point) {
        var html = '<h3>' + point.properties.title + '</h3>';
        if(point.properties.description) {
            html += '<p>' + point.properties.description + '</p>';
        }
        var links = [];
        for (var prop in point.properties) {
            if(point.properties.hasOwnProperty(prop)
               && prop !== "title" && prop !== "description" && prop !== "type") {
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

    var pointLayerName = function(name) {
        return "fnnPointsLayer" + name;
    }

    var pointSourceName = function(name) {
        return "fnnPoints" + name;
    }
    
    var addPointLayer = function(map, data, name, layoutOptions) {
        var points = data.features.filter(function(x) {
            return (x.geometry.type === 'Point' && x.properties.type === name);
        });
        
        var sourceName = pointSourceName(name);
        var layerName = pointLayerName(name);
        var layout = {
            'text-field': '{title}',
            "text-size": {
                "base": 1,
                "stops": [
                    [1,6], [3,8], [6,12], [14,20]
                ]
            },
            'text-padding': 1,
            'visibility': 'visible',
            'text-offset': [-1, 0.1 ],
            'text-rotation-alignment': 'viewport',
            'text-anchor': 'right',
            'text-rotate': 0,
            'text-letter-spacing': 0.2,
            'icon-padding': 1,
            'text-max-width': 18
        };
        
        for (var opt in layoutOptions) {
            if(layoutOptions.hasOwnProperty(opt)) {
               layout[opt] = layoutOptions[opt];
            }
        }
        map.addSource(sourceName, {
            'type': 'geojson',
            'data': {'type': 'FeatureCollection',
                     'features': points
                    }
        });
        map.addLayer({
            'id': layerName,
            'type': 'symbol',
            'source': sourceName,
            'layout': layout,
            'paint': {
                'text-color': '#ffffff',
                'text-halo-color': 'hsl(206, 50%, 40%)',
                'text-halo-width': 1
            }
        });

    }
        
    var addPoints = function(map, data) {
        var italicFont = ["Open Sans Bold Italic", "Arial Unicode MS Regular"];
        var regularFont = ["Open Sans Bold", "Arial Unicode MS Regular"];
        
        addPointLayer(map, data, 'primary-port', {'text-font': regularFont, 'text-transform': 'uppercase', "icon-image": "port-8"});
        addPointLayer(map, data, 'secondary-port', {'text-font': regularFont, "icon-image": "port-8"});
        addPointLayer(map, data, 'route', {'text-font': italicFont});
    };

    var addLines = function(map, data) {
        var lines = data.features.filter(function(x) {
            return x.geometry.type === 'LineString';
        });
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
        var cLon = (eLon - wLon) / 2 + wLon;
        var cLat = (nLat - sLat) / 2 + sLat;
        
        return {'bounds': [wLon, sLat, eLon, nLat],
                'centroid': [cLon, cLat]};
    }

    
};
