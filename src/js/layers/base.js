import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import BingMaps from 'ol/source/BingMaps';

export default {
    osm: new TileLayer({
        id: 'OSM',
        source: new OSM(),
        visible: true,
        zIndex: -10,
    }),
    bing: new TileLayer({
        id: "BING",
        visible: false,
        zIndex: -10,
        source: new BingMaps({
            key: 'AjyggOxEO7AMgXgSllVTch_tJ2cWEzTXsPd7AoHMZ5EJjf6i2U5LESio4Si3Ly3X',
            imagerySet: 'AerialWithLabels',
            maxZoom: 19,
        }),
    }),
};

