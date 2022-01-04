import {inAndOut} from 'ol/easing';
import { getCenter as getExtentCenter, isEmpty } from 'ol/extent';
import { defaults as defaultControls } from 'ol/control';
import MousePosition from 'ol/control/MousePosition';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import ScaleLine from 'ol/control/ScaleLine';
import {createStringXY} from 'ol/coordinate';
import Map from 'ol/Map';
import View from 'ol/View';

import baseLayers from '../js/layers/base';
import  { makeParcelPointLayer,makeParcelLayer } from '../js/layers/layers';
// import store from '../store';

export const nepalBounds = [80.05, 26.3, 88.21, 30.6];

export const getControls = () =>
{
   const zoomIcon = document.createElement('span');
   zoomIcon.style.display = 'flex';
   zoomIcon.style.justifyContent = 'center';
   zoomIcon.style.alignItems = 'center';
   zoomIcon.innerHTML = '<img src="/static/nepal-extent-btn.svg">';

   return defaultControls({ attribution: false }).extend([
      new MousePosition({ coordinateFormat: createStringXY(4) }),
      new ZoomToExtent({ extent: nepalBounds, label: zoomIcon }),
      new ScaleLine({ unit: 'metric' }),
   ]);
};


export const initMap = ({target}) =>
{
    const parcelLayer = makeParcelLayer();
    const parcelPointLayer = makeParcelPointLayer();
    const map = new Map({
        target: target,
        layers: [...Object.values(baseLayers), parcelLayer, parcelPointLayer ],
        controls: getControls(),
        view: new View({ center: [84, 27.5], zoom: 7, projection: 'EPSG:4326', duration: 250 }),
    });

    map.on('moveend', () =>
    {
        if (map.getView().getResolution() < 0.000026454792873537297)
        {
            parcelLayer.setVisible(true);
            parcelPointLayer.setVisible(false);
        }
        else
        {
            parcelLayer.setVisible(false);
            parcelPointLayer.setVisible(true);
        }
    });
    return map;
}

const getResolutionForExtent = (map, extent) =>
{
    const [width, height] = map.getSize(); // width height of map container in pxl
    const [minX, minY, maxX, maxY] = extent;
    return Math.max((maxX-minX)/width, (maxY-minY)/height) * 1.05;
};

export const fitToExtent = (map, extent) =>
{
    console.assert(extent, `Invalid extent ${extent}`);
    console.assert(map, `Invalid map ${map}`);
    if (!extent || isEmpty(extent))
    {
        console.error("Empty extent passed to fitToExtent");
        return;
    }
    map.getView().setCenter(getExtentCenter(extent));
    map.getView().setResolution(getResolutionForExtent(map, extent));
}

export const animateToExtent = (map, newExtent, speedFactor=0.8) =>
{
    console.log(map, newExtent);
    if (isEmpty(newExtent))
    {
        console.error("Empty extent passed to animateToExtent");
        return;
    }
    const newResolution = getResolutionForExtent(map, newExtent);
    map.getView().animate(
        // { resolution: map.getView().getResolution()*1.2, duration: 650/speedFactor, easing: inAndOut },
        { center: getExtentCenter(newExtent), duration: 650/speedFactor, easing: inAndOut },
        { resolution: newResolution, duration: 650/speedFactor, easing: inAndOut }
    );
};

export const animateResolution = (map, resolution, speedFactor=1) =>
{
    map.getView().animate(
        { resolution: resolution, duration: 650/speedFactor, easing: inAndOut },
    );
};

export const animateToPoint = (map, lnglat) =>
{
    if (lnglat.some(isNaN) || lnglat.length !== 2) {
        return;
    }
    map.getView().animate(
        { center: lnglat, easing: inAndOut },
        { zoom: 10, duration: 2000, easing: inAndOut }
    );
};

export const fitToNepalBounds = () =>
{
    fitToExtent(nepalBounds);
}

// export const getMapAsync = (count=0) =>
// {
//     return new Promise((resolve, reject) => {
//         if (count>10)
//         {
//             reject("Get map async taking too damn long");
//         }
//         getMap({check: true}) ?
//             resolve(getMap())
//             :
//             setTimeout(() => resolve(getMapAsync(count+1)), 500);
//     })
// }

