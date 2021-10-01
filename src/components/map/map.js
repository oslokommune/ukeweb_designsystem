function getMapObject(latitude, longitude, zoom, container) {
  let map = new maplibregl.Map({
    container: container,
    style: 'https://api.maptiler.com/maps/ef955669-6ec4-4320-b5c3-bb2e0732700f/style.json?key=ozJ4wrFZpcxwcjYNzQn0',
    center: [latitude, longitude],
    zoom: zoom
  });

  let nav = new maplibregl.NavigationControl({
    showCompass: false
  });

  let scale = new maplibregl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
  });

  map.addControl(nav, 'top-left');
  map.addControl(scale);
  map.scrollZoom.disable();

  // Load an image from an external URL.
  map.loadImage('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/location-pin-filled.png', function (error, image) {
    if (error) throw error;
    map.addImage('ok-pin-filled', image);
  });

  return map;
}

function addMarker(map, id, latitude, longitude, hasPopup = true, heading = '', description = '') {
  map.addSource(id, {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [latitude, longitude],
          },
          'properties': {
            'heading': heading,
            'description': description
          }
        }
      ]
    }
  });

  map.addLayer({
    'id': id,
    'type': 'symbol',
    'source': id,
    'layout': {
      'icon-image': 'ok-pin-filled',
      //'icon-anchor': 'bottom'
    }
  });

  if (hasPopup) {
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', id, function (e) {
      let coordinates = e.features[0].geometry.coordinates.slice();
      let heading = e.features[0].properties.heading;
      let description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new maplibregl.Popup({ className: 'osg-map__popup' })
        .setLngLat(coordinates)
        .setHTML('<h3 class="osg-heading-4">' + heading + '</h3>' + description)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', id, function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', id, function () {
      map.getCanvas().style.cursor = '';
    });
  }
}

function addGeoJson(map, id, geojson) {
  map.addSource(id, {
    type: 'geojson',
    data: geojson,
  });

  map.addLayer({
    'id': 'polygons',
    'type': 'fill',
    'source': id,
    'paint': {
      'fill-color': '#888888', // @todo: Configurable colors ??
      'fill-opacity': 0.6
    },
    'filter': ['==', '$type', 'Polygon']
  });

  map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': id,
    'paint': {
      'icon-image': 'ok-pin-filled',
      'icon-allow-overlap': true
    },
    'filter': ['==', '$type', 'Point']
  });

  map.addLayer({
    'id': 'lines',
    'type': 'line',
    'source': id,
    'paint': {
      'line-color': '#B42222'
    },
    'filter': ['==', '$type', 'LineString']
  });

  // @todo: MultiPoint, MultiLineString og MultiPolygon, howto?
}

function addClusteredGeoJson() {
  // @todo
}

function cleanMap() {
  // @todo:Remove all layers and data
}

function calculateCenterFromGeoJson() {
  // @todo: Funksjon for å finne center i et polygon / sett med geojson ting ?
}



document.addEventListener('DOMContentLoaded', function () {

  const mapDiv = document.getElementById('osg-map');

  if (mapDiv) {
    let map = getMapObject(10.749810, 59.913008, 12.0, 'osg-map');
    map.on('load', function () {
      addMarker(map, 'one-magic-marker', 10.749810, 59.913008, true, 'Heading', 'Description');
      // addMarker(map, 'anther-magic-marker', 10.749810, 59.923008, true, 'Other heading', 'Other description');
    });
  }

  const mapDiv2 = document.getElementById('osg-map2');
  if (mapDiv2) {

    let map = getMapObject(10.749810, 59.913008, 10.0, 'osg-map2');
    map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('osg-map2')}));


    map.on('load', function () {
      map.addSource('points', {
        type: 'geojson',
        data: 'https://api.maptiler.com/data/a476f28b-5498-4acc-8cea-899e91ec75ca/features.json?key=ozJ4wrFZpcxwcjYNzQn0',
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'points',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://maplibre.org/maplibre-gl-js-docs/style-spec/#expressions-step)
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#2a2859',  // default color
            50,         // 50+ items
            '#2a2859',  // 50+ items color
            150,        // 150+ items
            '#2a2859'   // 150+ items color
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,  // default size
            50,  // 50+ items
            30,  // 50+ items size
            150, // 150+ items
            40   // 150+ items size
          ]
        }
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['Oslo Sans'],
          'text-size': 16
        },
        paint: {
          'text-color': '#ffffff'
        }
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 'ok-pin-filled',
          'icon-allow-overlap': true
        }
      });


      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('points').getClusterExpansionZoom(
          clusterId,
          function (err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'unclustered-point', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let heading = e.features[0].properties.name;
        let data = JSON.parse(e.features[0].properties.data);
        let dataHtml = '';

        data.forEach((element, index, array) => {
          dataHtml += element.label + ': ' + element.value + '<br>';
        });

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new maplibregl.Popup({ className: 'osg-map__popup' })
          .setLngLat(coordinates)
          .setHTML('<h3 class="osg-heading-4">' + heading + '</h3>' + dataHtml)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'unclustered-point', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'unclustered-point', function () {
        map.getCanvas().style.cursor = '';
      });

    });

  }

  const mapDiv3 = document.getElementById('osg-map3');
  if (mapDiv3) {
    let map = getMapObject(10.749810, 59.913008, 10.0, 'osg-map3');
    map.on('load', function () {
      // @todo: addClusteredGeoJson()
    });
  }

});
