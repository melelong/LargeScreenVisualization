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
const HorizontalBar = defineComponent({
  name: 'HorizontalBar',
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
        // x轴
        xAxis: {
          show: false,
          type: 'value',
          max: (value: { max: string | number }) => +value.max * 1.2,
        },
        // y轴
        yAxis: {
          type: 'category',
          data: data.value.map((item) => item.name),
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#9eb1c8',
          },
        },
        // 布局
        grid: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          containLabel: true,
        },
        // 核心配置
        series: [
          {
            type: 'bar',
            data: data.value.map((item) => ({
              name: item.name,
              value: item.value,
            })),
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            },
            itemStyle: {
              color: '#479AD3',
              borderRadius: 5,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 5,
            },
            barWidth: 12,
            label: {
              show: true,
              position: 'right',
              color: '#fff',
            },
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
        <div class="text-center">【大区数据信息】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default HorizontalBar;
