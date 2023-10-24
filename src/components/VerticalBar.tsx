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
const VerticalBar = defineComponent({
  name: 'VerticalBar',
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
        // X轴展示数据
        xAxis: {
          type: 'category',
          data: data.value.map((item) => item.name),
          axisLabel: { color: '#9eb1c8' },
        },
        // Y轴展示数据
        yAxis: {
          show: false, //不显示X
          type: 'value', //表示X轴作为数据展示
          max: (value: { max: string | number }) => +value.max * 1.2,
        },
        // 图标绘制的位置 对应上下左右
        grid: {
          top: 16,
          right: 0,
          bottom: 26,
          left: -26,
          containLabel: true, //计算时包含标签
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
              color: '#5D98CE',
              borderRadius: 5,
              shadowColor: 'rgba(0,0,0,0.3)',
              shadowBlur: 5,
            },
            barWidth: 12,
            label: {
              show: true,
              position: 'top',
              color: '#fff',
              formatter: '{c}%',
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
        <div class="text-center">【服务资源占用比】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default VerticalBar;
