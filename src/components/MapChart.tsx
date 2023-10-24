import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import * as echarts from 'echarts';
import mapJson from '../assets/MapData/china.json';
interface DataType {
  categoryData: {
    [year: string]: {
      name: string;
      value: number;
    }[];
  };
  colors: string[];
  topData: {
    [year: string]: {
      name: string;
      value: [number, number, number];
    }[];
  };
  voltageLevel: string[];
}
const MapChart = defineComponent({
  name: 'MapChart',
  props: {
    data: {
      type: Object as PropType<DataType>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const data = computed(() => props.data);
    let mChart: echarts.EChartsType | null = null;
    const chartRef = ref<null | HTMLDivElement>(null);
    const renderChart = () => {
      const options: any = {
        // 时间线
        timeline: {
          data: data.value.voltageLevel,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          left: '10%',
          right: '10%',
          bottom: '0%',
          width: '80%',
          emphasis: {
            color: '#fff',
            label: {
              color: '#ddd',
            },
            borderColor: '#aaa',
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              color: '#666',
              borderColor: '#666',
            },
          },
          symbolSize: 10,
          lineStyle: {
            color: '#555',
          },
          checkpointStyle: {
            borderColor: '#888',
            borderWidth: 2,
          },
        },
        // 柱形图
        baseOption: {
          grid: {
            right: '2%',
            top: '15%',
            bttom: '10%',
            width: '20%',
          },
          // 地图配置
          geo: {
            show: true,
            map: 'china',
            roam: true,
            zoom: 0.8,
            center: [113.83531246, 34.0267395887],
            itemStyle: {
              borderColor: 'rgba(147,235,248,1)',
              borderWidth: 1,
              areaColor: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  //地图渐变色
                  {
                    offset: 0,
                    color: 'rgba(147,235,248,0)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(147,235,248,.2)',
                  },
                ],
              },
            },
            emphasis: {
              itemStyle: { areaColor: '#389BB7', borderColor: 0 },
            },
          },
        },
        options: [],
      };
      // 根据时间线绘制柱形图
      data.value.voltageLevel.forEach((item: string, index: number) => {
        options.options.push({
          title: [
            {
              text: '2019-2023 年度数据统计',
              left: '0%',
              top: '0%',
              color: '#fff',
              fontSize: 30,
            },
            {
              id: 'statistic',
              text: item + '年度数据统计情况',
              right: '0%',
              top: '4%',
              color: '#fff',
              fontSize: 20,
            },
          ],
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              margin: 2,
              color: '#aaa',
            },
          },
          yAxis: {
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              color: '#ddd',
            },
            data: data.value.categoryData[item].map(
              (item: { name: any }) => item.name
            ),
          },
          series: [
            {
              type: 'bar',
              zlevel: 1.5,
              itemStyle: {
                color: data.value.colors[index],
              },
              data: data.value.categoryData[item].map(
                (item: { value: any }) => item.value
              ),
            },
            // 地图散点图
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: data.value.topData[item],
              symbolSize: function (val: number[]) {
                return val[2] / 4;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke', //散点水波效果
              },
              label: {
                formatter: '{b}',
                position: 'right',
                show: true,
              },
              itemStyle: {
                color: data.value.colors[index],
                shadowBlur: 5,
                shadowColor: data.value.colors[index],
              },
            },
          ],
        });
      });
      mChart?.setOption(options);
    };
    onMounted(() => {
      echarts.registerMap('china', mapJson);
      mChart = echarts.init(chartRef.value!);
      renderChart();
    });
    watch(
      () => data,
      () => renderChart(),
      {
        deep: true,
      }
    );
    return () => (
      <div
        ref={chartRef}
        class={`text-center w-full h-full ${attrs.class}`}
      ></div>
    );
  },
});
export default MapChart;
