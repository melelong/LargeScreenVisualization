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
const RadarBar = defineComponent({
  name: 'RadarBar',
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
        // 雷达图坐标系配置
        radar: {
          axisName: {
            color: '#05D5FF',
            fontSize: 14,
          },
          shape: 'polygon',
          center: ['50%', '50%'],
          radius: '80%',
          startAngle: 120,
          // 轴线
          axisLine: {
            lineStyle: {
              color: 'rgba(2,213,255,.8)',
            },
          },
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              with: 1,
              color: 'rgba(5,213,255,.8)',
            },
          },
          // 指示器名称
          indicator: data.value.map((item) => ({
            axisName: item.name,
            max: 100,
          })),
          splitArea: {
            show: false,
          },
        },
        // 位置、极点
        polar: {
          center: ['50%', '50%'],
          radius: '0%',
        },
        // 坐标角度
        angleAxis: {
          min: 0,
          interval: 5,
          clockwise: false, //刻度逆时针
        },
        // 径向轴
        radiusAxis: {
          min: 0,
          interval: 20,
          splitLine: {
            show: true,
          },
        },
        // 图表核心配置
        series: {
          type: 'radar',
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            color: '#05D5FF',
          },
          areaStyle: {
            color: '#05D5FF',
            opacity: 0.5,
          },
          lineStyle: {
            with: 2,
            color: '#05D5FF',
          },
          label: {
            show: true,
            color: '#05D5FF',
          },
          data: [
            {
              value: data.value.map((item) => item.value),
            },
          ],
        },
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
        <div class="text-center">【云端报警风险】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default RadarBar;
