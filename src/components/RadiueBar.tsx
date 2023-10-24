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
  value: number;
}
const RadiueBar = defineComponent({
  name: 'RadiueBar',
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
      const getSeriesData = () => {
        const series: {
          name: string;
          type: string;
          clockwise: boolean;
          emphasis: { scale: boolean } | { scale: boolean };
          radius: string[];
          center: string[];
          data:
            | (
                | { value: number; name: string }
                | {
                    value: number;
                    itemStyle: { color: string; borderWidth: number };
                    tooltip: { show: boolean };
                    emphasis: { scale: boolean };
                  }
              )[]
            | {
                value: number;
                itemStyle: { color: string; borderWidth: number };
                tooltip: { show: boolean };
                emphasis: { scale: boolean };
              }[];
          silent?: boolean;
          z?: number;
        }[] = [];
        // 上层
        data.value.forEach((item, index) => {
          series.push({
            name: item.name,
            type: 'pie',
            clockwise: false,
            emphasis: {
              scale: false,
            },
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            center: ['50%', '50%'],
            data: [
              {
                value: item.value,
                name: item.name,
              },
              {
                value: 1000,
                itemStyle: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                },
                tooltip: {
                  show: false,
                },
                emphasis: {
                  scale: false,
                },
              },
            ],
          });
          // 下层
          series.push({
            name: item.name,
            type: 'pie',
            silent: true,
            z: 1,
            clockwise: false,
            emphasis: {
              scale: false,
            },
            radius: [73 - index * 15 + '%', 68 - index * 15 + '%'],
            center: ['50%', '50%'],
            data: [
              {
                value: 7.5,
                itemStyle: {
                  color: 'rgb(3,31,62)',
                  borderWidth: 0,
                },
                tooltip: {
                  show: true,
                },
                emphasis: {
                  scale: false,
                },
              },
              {
                value: 2.5,
                itemStyle: {
                  color: 'rgba(0,0,0,0)',
                  borderWidth: 0,
                },
                tooltip: {
                  show: false,
                },
                emphasis: {
                  scale: false,
                },
              },
            ],
          });
        });

        return series;
      };
      const options: any = {
        // 图例配置
        legend: {
          show: true,
          icon: 'circle',
          top: '14%',
          left: '60%',
          data: data.value.map((item) => item.name),
          width: -5,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 6,
          textStyle: {
            fontSize: 12,
            lineHeight: 5,
            color: 'rgba(255,255,255,.8)',
          },
        },
        // 提示层
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a}<br>{b}:{c}({d}%)',
        },
        // Y
        yAxis: [
          {
            type: 'category',
            inverse: true,
            axisLine: {
              show: false,
            },
          },
        ],
        // X
        xAxis: [
          {
            show: false,
          },
        ],
        // 核心
        series: getSeriesData(),
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
        <div class="text-center">【大区异常处理】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default RadiueBar;
