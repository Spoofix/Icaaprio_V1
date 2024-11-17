import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/canada/canada-provinces.json";

interface MapData {
  [key: string]: number;
}

interface CanadaMapProps {
  data: MapData;
  onHover: (name: string, value: number) => void;
}

const CanadaMap: React.FC<CanadaMapProps> = ({ data, onHover }) => {
  const colorScale = scaleLinear<string>()
    .domain([0, Math.max(...Object.values(data))])
    .range(["#BFDBFE", "#1D4ED8"]);

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 600,
        center: [-97, 62]
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const code = `CA-${geo.properties.abbreviation}`;
            const value = data[code] || 0;
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colorScale(value)}
                stroke="#FFFFFF"
                strokeWidth={0.5}
                style={{
                  default: {
                    outline: "none"
                  },
                  hover: {
                    fill: "#93C5FD",
                    outline: "none",
                    cursor: "pointer"
                  }
                }}
                onMouseEnter={() => {
                  onHover(geo.properties.name, value);
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
};

export default memo(CanadaMap);