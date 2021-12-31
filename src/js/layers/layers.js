import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import { Vector as VectorSource } from 'ol/source';
import { Fill, Stroke, Style, Icon } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';

const parcelGeoJSON = {
    "type": "FeatureCollection",
    "crs": {
        "type": "name",
        "properties": {
            "name": "EPSG:4326",
        }
    },
    "features": [
        {
            "type": "Feature",
            "properties": {
                "parcelNo": 1,
                "owner": "Diwash",
                "area": "1 Ropani",
                "cost": "NPR. 10,00,10,000",
                "imgUrl": "/static/land1.jpeg"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [ 85.33984422683714, 27.709452351421728 ],
                        [ 85.34018218517303, 27.708929937061733 ],
                        [ 85.34028947353363, 27.70874471682428 ],
                        [ 85.34016072750092, 27.708644982720013 ],
                        [ 85.34043431282043, 27.70831253504726 ],
                        [ 85.34043967723846, 27.70809881815125 ],
                        [ 85.34092783927917, 27.708293538006803 ],
                        [ 85.34135699272156, 27.708711472132986 ],
                        [ 85.34058988094328, 27.70932412267415 ],
                        [ 85.33984422683714, 27.709452351421728 ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "parcelNo": 2,
                "owner": "Suman",
                "area": "2 Ropani",
                "cost": "NPR. 21,00,20,000",
                "imgUrl": "/static/land2.jpg"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [ 85.34058988094328, 27.7093288718897 ],
                        [ 85.34133017063141, 27.708711472132986 ],
                        [ 85.34249424934387, 27.710083994534084 ],
                        [ 85.34110486507416, 27.710815366200183 ],
                        [ 85.34058988094328, 27.7093288718897 ]
                    ]
                ]
            }
        }
    ]
};


export const makeParcelLayer = () =>
{
    const style = new Style({
        fill: new Fill({
            color: 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new Stroke({
            color: '#319fd3',
            width: 1,
        }),
    });

    const parcelFeatures = (new GeoJSON()).readFeatures(parcelGeoJSON);
    const parcelSoure = new VectorSource({ features: parcelFeatures });
    return new VectorLayer({
        source: parcelSoure,
        style: style,
        id: 'parcel',
    });
};

export const makeParcelPointLayer = () =>
{
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/static/icons/pin.png',
        scale: 0.5,
      }),
    });
    // const parcelPointFeatures =
    const parcelFeatures = (new GeoJSON()).readFeatures(parcelGeoJSON);
    const parcelPointFeatures = parcelFeatures.map(feature => 
    {
        const point = feature.getGeometry().getInteriorPoint();
        return new Feature({
            geometry: point,
        });
    });
    const parcelPointSource = new VectorSource({ features: parcelPointFeatures });
    return new VectorLayer({
        source: parcelPointSource,
        style: iconStyle,
        id: 'parcel-point'
    });
}

// document.getElementById('parcel-extent').onclick = function () {
//     map.getView().fit(parcelSource.getExtent(), map.getSize());
// };

