import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer';
import {Vector as VectorSource, Cluster, TileWMS as TileWMSSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Circle, Style, Text} from 'ol/style';

export const getStyle = (style={style:{}, fill: {}}) =>
{
    if (style instanceof Function) return style;
    console.assert(style.geom, "getStyle has to be passed geom");
    // TODO add better checks for formatting
    const fill = new Fill({color: (style.fill && style.fill.color) ? style.fill.color : '#00a3'});
    const stroke = new Stroke({
        color: (style.stroke && style.stroke.color) ? style.stroke.color : '#00a',
        width: (style.stroke && style.stroke.width) ? style.stroke.width : 1,
    });
    const text = style.text && style.text.text && new Text({
        text: style.text.text,
        fill: new Fill({ color: '#222' }),
        stroke: new Stroke({ color: '#fff', width: 2 }),
    });

    switch (style.geom)
    {
        case 'Polygon':
            return new Style({ fill,stroke,text });
        case 'Line':
            return new Style({ stroke,text });
        case 'Point':
            text && text.setOffsetY(-12);
            return new Style({
                image: new Circle({ fill, stroke, radius: style.radius || 2 }),
                text,
            });
        default:
            console.error(`Invalid geom type: ${style.geom}`)
            return null;
    }
}

// returns a style functin for layers with cluster source
// if propertyToSum is passed in the params, it will calculate the sum the values of that
// property the cluster feature & set it as label. Otherwise it will just use the count.
const getClusterStyle = ({propertyToSum, stroke='#0A08', fill='#0A0'}) =>
{
    const styleCache = {};
    return (feature) => 
    {
        const total = propertyToSum ? 
            [...feature.get('features')].reduce((sum,ftr) => sum + ftr.get(propertyToSum), 0)
            :
            feature.get('features').length;

        if (!styleCache[total])
        {
            const maxRadius = 20;
            const minRadius = 8;
            const radius = Math.max(minRadius, Math.min(total * 0.75, maxRadius));
            styleCache[total] = new Style({
                image: new Circle({
                    radius: radius,
                    stroke: new Stroke({ color: stroke, width: 15, }),
                    fill: new Fill({color: fill })
                }),
                text: new Text({
                    text: total.toString(),
                    fill: new Fill({ color: '#fff' })
                }),
            });
        }
        return styleCache[total];
    };
}

const getVectorSource = ({url, cluster=false}) =>
{
    const options = {format: new GeoJSON()};
    if (url) options.url = url;
    const source = new VectorSource(options);
    if (!cluster) return source;

    return new Cluster({
        distance: 40,
        source,
    });
}

export const makeVectorLayer = (layer) =>
{
    console.assert(layer.type==="Vector");
    const {url, cluster, style} = layer.vector_params;

    return new VectorLayer({
        id: layer.id,
        group: layer.group,
        visible: layer.visible,
        zIndex: layer.zIndex,
        source: getVectorSource({ url, cluster }),
        style: cluster ? getClusterStyle(style) : getStyle(style),
    });
}

export const makeWMSLayer = (layer) =>
{
    console.assert(layer.type==="WMS");
    return new TileLayer({
        id: layer.id,
        visible: layer.visible,
        group: layer.group,
        zIndex: layer.zIndex,
        source: new TileWMSSource({
            url: layer.wms_params.url,
            serverType: 'geoserver',
            crossOrigin: layer.wms_params.cross_origin,
            params: {
                VERSION: layer.wms_params.source_version,
                LAYERS: layer.wms_params.source_layers,
                STYLES: layer.wms_params.source_styles,
            }
        })
    });
}

export const makeLayer = (layerInfo) =>
{
    console.assert(["WMS", "Vector"].includes(layerInfo.type));
    return (layerInfo.type==='WMS') ?
        makeWMSLayer(layerInfo)
        :
        makeVectorLayer(layerInfo);
}

export const addLayer = (layerInfo, map) =>
{
    map.addLayer(makeLayer(layerInfo));
};

export const getLayerById = (layerId, map) =>
{
    return map.getLayers().getArray().find(layer => layer.get('id')===layerId);
};

export const setLayerVisible = (layerId, visible, map) =>
{
    const layer = getLayerById(layerId, map);
    layer && layer.setVisible(visible);
}

export const removeLayer = (layerId, map) =>
{
    const layer = getLayerById(layerId, map);
    map.removeLayer(layer);
}
