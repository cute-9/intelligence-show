<template>
  <div class="vehicle-route">
    <div id="map" ref="map" class="map-container dark-theme"></div>
    <div v-if="vehiclePositionText" class="position-text">
      {{ vehiclePositionText }}
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Style, Stroke } from "ol/style";
import { Icon } from "ol/style";
import { LineString, Point } from "ol/geom";
import { fromLonLat } from "ol/proj";

export default {
  name: "VehicleRoute",
  data() {
    return {
      map: null,
      routeLayer: null,
      vehiclePositionText:'',
      vehicleFeature: null,
      vehiclePosition: [104.066667, 30.666667], // 起始位置，春熙路附近
      routeCoordinates: [
        [104.066667, 30.666667], // 起点，春熙路
        [104.07, 30.65], // 中间点1
        [104.05, 30.65], // 中间点1
        [104.05, 30.64], // 中间点2
        [104.02, 30.6], // 终点，成都高新区
      ],
      refinedRouteCoordinates: [], // 插值后细化的路线坐标
      direction: 1, // 移动方向，1为正向，-1为反向
      currentIndex: 0, // 当前坐标索引
      animationInterval: null, // 动画定时器
    };
  },
  mounted() {
    this.initMap();
    this.refineRoute(); // 插值细化路线
    this.startAnimation();
    this.map.on("pointermove", (event) => {
      this.handlePointerMove(event);
    });
  },
  beforeDestroy() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  },
  methods: {
    initMap() {
      // 成都市中心的经纬度
      const chengduCenter = [104.066667, 30.666667];

      // 初始化地图
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(chengduCenter),
          zoom: 13,
        }),
      });

      // 添加路线图层
      this.routeLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: new LineString(
                this.routeCoordinates.map((coord) => fromLonLat(coord))
              ),
            }),
          ],
        }),
        style: new Style({
          stroke: new Stroke({
            color: "#70cf90",
            width: 8,
          }),
        }),
      });
      this.map.addLayer(this.routeLayer);

      // 添加小车图标
      this.vehicleFeature = new Feature({
        geometry: new Point(fromLonLat(this.vehiclePosition)),
      });
      const vehicleLayer = new VectorLayer({
        source: new VectorSource({
          features: [this.vehicleFeature],
        }),
        style: new Style({
          image: new Icon({
            src: "https://pic.52112.com/180610/EPS-180610_254/wFNa6n2KbS_small.jpg", // 小车图标路径
            scale: 0.05,
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            offset: [0, -23],
            offsetOrigin: [0.5, 0],
            origin: [0.5, 46],
            rotation: Math.PI / 10,
          }),
        }),
      });
      this.map.addLayer(vehicleLayer);
    },
    refineRoute() {
      this.refinedRouteCoordinates = [];
      for (let i = 0; i < this.routeCoordinates.length - 1; i++) {
        const startCoord = this.routeCoordinates[i];
        const endCoord = this.routeCoordinates[i + 1];
        const numPoints = 10; // 控制细化程度，数值越大，轨迹越平滑
        for (let j = 0; j <= numPoints; j++) {
          const t = j / numPoints;
          const x = startCoord[0] * (1 - t) + endCoord[0] * t;
          const y = startCoord[1] * (1 - t) + endCoord[1] * t;
          this.refinedRouteCoordinates.push([x, y]);
        }
      }
    },
    startAnimation() {
      // console.log(this.routeCoordinates.length, " this.routeCoordinates");
      let routeCoordinates = this.refinedRouteCoordinates.length;
      this.animationInterval = setInterval(() => {
        if (
          this.currentIndex >= routeCoordinates - 1 ||
          this.currentIndex < 0
        ) {
          this.direction *= -1; // 改变方向
        }
        if (this.currentIndex == 0) {
          this.direction = 1; // 改变方向
        }

        this.currentIndex += this.direction;

        let currentPosition = fromLonLat(
          this.refinedRouteCoordinates[this.currentIndex]
        );
        this.vehicleFeature.setGeometry(new Point(currentPosition));
      }, 500); // 每秒更新一次位置
    },
    handlePointerMove(event) {
      const pixel = event.pixel;
      let vehicleFeatureFound = false;
      this.map.forEachFeatureAtPixel(
        pixel,
        (feature, layer) => {
          if (feature === this.vehicleFeature) {
            vehicleFeatureFound = true;
            if (this.animationInterval) {
              clearInterval(this.animationInterval);
              this.animationInterval = null;
              const position = this.vehicleFeature
                .getGeometry()
                .getCoordinates();
              // 更新 vehiclePositionText 属性
              this.vehiclePositionText = `Vehicle Position: ${position}`;
            }
          }
        },
        { hitTolerance: 5 }
      );

      if (!vehicleFeatureFound && !this.animationInterval) {
        this.startAnimation();
      }
    },
  },
};
</script>

<style scoped>
.vehicle-route {
  position: relative;
  width: 100%;
  height: 100%;
}
.map-container {
  height: 100%;
  width: 100%;
}
.dark-theme {
  /* filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(180deg);  */
} 
.position-text {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
  z-index: 1000;
}
.vehicle-position-text {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
  z-index: 1000;
  transform-origin: left top;
  transition: transform 0.3s ease-in-out;
}
</style>
