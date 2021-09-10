document.addEventListener('DOMContentLoaded', function () {

  // @todo: DRY

  const mapDiv = document.getElementById('osg-map');

  if (mapDiv) {
    let map = new maplibregl.Map({
      container: 'osg-map',
      style: 'https://api.maptiler.com/maps/ef955669-6ec4-4320-b5c3-bb2e0732700f/style.json?key=ozJ4wrFZpcxwcjYNzQn0',
      center: [10.749810, 59.913008],
      zoom: 12.0
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

    map.on('load', function () {

      //let marker = new maplibregl.Marker().setLngLat([]).addTo(map);

      map.addSource('point', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [10.749810, 59.913008],
              },
              'properties': {
                'name': 'Lorem ipsum dolor sit amet',
                'description': 'Pellentesque mollis venenatis molestie. Pellentesque interdum ex sed lobortis rutrum. Pellentesque vitae sem vel lectus sodales vestibulum sit amet eget neque.'
              }
            }
          ]
        }

      });

      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'point',
        'layout': {
          'icon-image': 'ok-pin-filled',
          //'icon-anchor': 'bottom'
        }
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'points', function (e) {
        let coordinates = e.features[0].geometry.coordinates.slice();
        let heading = e.features[0].properties.name;
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
      map.on('mouseenter', 'points', function () {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'points', function () {
        map.getCanvas().style.cursor = '';
      });

    });
  }
  const mapDiv2 = document.getElementById('osg-map2');

  if (mapDiv2) {
    let map = new maplibregl.Map({
      container: 'osg-map2',
      style: 'https://api.maptiler.com/maps/ef955669-6ec4-4320-b5c3-bb2e0732700f/style.json?key=ozJ4wrFZpcxwcjYNzQn0',
      center: [10.749810, 59.913008],
      zoom: 10.0
    });

    let nav = new maplibregl.NavigationControl({
      showCompass: false
    });

    let scale = new maplibregl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
    });

    map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('osg-map2')}));

    map.addControl(nav, 'top-left');
    map.addControl(scale);
    map.scrollZoom.disable();

    // Load an image from an external URL.
    map.loadImage('https://ukeweb-public.s3.eu-central-1.amazonaws.com/map/location-pin-filled.png', function (error, image) {
      if (error) throw error;
      map.addImage('ok-pin-filled', image);
    });

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
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#2a2859',
            50,
            '#2a2859',
            150,
            '#2a2859'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            50,
            30,
            150,
            40
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

});
