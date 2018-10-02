import React, {Component} from 'react';
import {render} from 'react-dom';
import {StaticMap} from 'react-map-gl';
// import MapGL from 'react-map-gl';
import DeckGL, {LineLayer, ScatterplotLayer} from 'deck.gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGlicmFoaW0iLCJhIjoiY2ptbHJ2eTFkMGJldDNxcGt4cXk5MjE0cCJ9.ax5_fH9jKStEWjH_qf_SLQ';
const data_sites = require('./data/sites_scatter.json');
// console.log(data_sites);
// const data_sites = []

export const INITIAL_VIEW_STATE = {
  longitude: 106.8173201,
  latitude: -6.2307753,
  zoom: 11,
  maxZoom: 16,
  pitch: 45,
  bearing: 0
}

class App extends Component {

  _renderLayers() {
    const {
      radius = 1000,
    } = this.props;

    return [
      new ScatterplotLayer({
        id: 'sites',
        data: data_sites,
        radiusScale: radius,
        getPosition: d => [d[3], d[4], 0],
        getRadius: d => d[6],
        getColor: d => [1, 155, 194, 60],
        pickable: true,
        fp64: true
        // onHover: d => console.log('Hovered:', d),
        // updateTriggers: {
        //   getColor: [maleColor, femaleColor]
        // }
      })
    ];
  }

  render() {

    const {viewState, controller = true, baseMap = true} = this.props;

    return (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
        layers={this._renderLayers()}
      >
        {baseMap && (
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/tibrahim/cjms2lcb20iiq2rkbg3inkiz9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
        )}
      </DeckGL>
    )
  }
}

export default App;
