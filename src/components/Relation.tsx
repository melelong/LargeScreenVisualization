import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import * as echarts from 'echarts';
interface DataType {
  id: number;
  name: string;
  source: string;
  speed: number;
  target: string;
  value: number;
}
const Relation = defineComponent({
  name: 'Relation',
  props: {
    data: {
      type: Array as PropType<DataType[]>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const data = computed(() => props.data);
    let mChart: echarts.EChartsType | null = null;
    const chartRef = ref<null | HTMLDivElement>(null);
    const renderChart = () => {
      const options: any = {
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: {
          show: false,
          type: 'value',
        },
        series: [
          //
          {
            type: 'graph',
            layout: 'none',
            coordinateSystem: 'cartesian2d',
            symbolSize: 26,
            z: 3,
            edgeLabel: {
              show: true,
              color: '#fff',
              fontSize: 14,
              formatter: (Data: { data: { speed: any } }) => Data.data.speed,
            },
            label: {
              show: true,
              position: 'bottom',
              color: '#5E5E5E',
            },
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: 8,
            data: data.value.map(
              (item: { id: number; name: any; speed: any; value: any }) =>
                item.id !== 0
                  ? {
                      name: item.name,
                      category: 0,
                      active: true,
                      speed: `${item.speed}kb/s`,
                      value: item.value,
                    }
                  : {
                      name: item.name,
                      value: item.value,
                      symbolSize: 100,
                      itemStyle: {
                        color: {
                          colorStops: [
                            { offset: 0, color: '#157eff' },
                            { offset: 1, color: '#35c2ff' },
                          ],
                        },
                      },
                      label: {
                        fontSize: '14',
                      },
                    }
            ),
            // 极点
            links: data.value.map(
              (item: { source: any; target: any; speed: any }) => ({
                source: item.source,
                target: item.target,
                speed: `${item.speed}kb/s`,
                lineStyle: {
                  color: '#12b5d0',
                  curveness: 0.2,
                },
                label: {
                  show: true,
                  position: 'middle',
                  offset: [10, 0],
                },
              })
            ),
          },
          {
            type: 'lines',
            coordinateSystem: 'cartesian2d',
            z: 1,
            effect: {
              show: true,
              amooth: false,
              trailLength: 0,
              symbol: 'arrow',
              color: 'rgba(55,155,255,0.6)',
              symbolSize: 12,
            },
            lineStyle: {
              curveness: 0.2,
            },
            coords: [
              [{ coord: [0, 300] }, { coord: [50, 200] }],
              [{ coord: [0, 100] }, { coord: [50, 200] }],
              [{ coord: [50, 200] }, { coord: [100, 100] }],
              [{ coord: [50, 200] }, { coord: [100, 300] }],
            ],
          },
        ],
      };
      mChart?.setOption(options);
    };
    onMounted(() => {
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
      <>
        <div class="text-center">【数据传递信息】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default Relation;
