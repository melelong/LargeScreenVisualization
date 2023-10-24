import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
interface DataType {
  name: string;
  value: number;
}
const WordCloud = defineComponent({
  name: 'WordCloud',
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
    const randowRGB = () => {
      const one = () => Math.floor(Math.random() * 255);
      return `rgb(${one()},${one()},${one()})`;
    };
    const renderChart = () => {
      const options: any = {
        series: [
          {
            type: 'wordCloud',
            sizeRange: [8, 46],
            rotationRange: [0, 0],
            gridSize: 0,
            layoutAnimation: true,
            textStyle: {
              color: randowRGB,
            },
            emphasis: {
              textStyle: {
                fontWeight: 'bold',
                color: '#ffffff',
              },
            },
            data: data.value,
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
        <div class="text-center">【关键词条】</div>
        <div
          ref={chartRef}
          class={`text-center w-full h-full ${attrs.class}`}
        ></div>
      </>
    );
  },
});
export default WordCloud;
