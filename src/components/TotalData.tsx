import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import { CountUp } from 'countup.js';
interface DataType {
  db: number;
  hb: number;
  hd: number;
  total: number;
  xb: number;
  xn: number;
  zn: number;
}
const TotalData = defineComponent({
  name: 'TotalData',
  props: {
    data: {
      type: Object as PropType<DataType>,
      required: true,
    },
  },
  setup(props, { attrs }) {
    const data = computed(() => props.data);
    const totalCountTargetRef = ref(null);
    const city1Ref = ref(null);
    const city2Ref = ref(null);
    const city3Ref = ref(null);
    const city4Ref = ref(null);
    const city5Ref = ref(null);
    const city6Ref = ref(null);
    const renderData = () => {
      new CountUp(totalCountTargetRef.value!, props.data.total).start();
      new CountUp(city1Ref.value!, props.data.hb).start();
      new CountUp(city2Ref.value!, props.data.db).start();
      new CountUp(city3Ref.value!, props.data.hd).start();
      new CountUp(city4Ref.value!, props.data.zn).start();
      new CountUp(city5Ref.value!, props.data.xn).start();
      new CountUp(city6Ref.value!, props.data.xb).start();
    };
    onMounted(() => renderData());
    watch(
      () => data,
      () => renderData(),
      {
        deep: true,
      }
    );
    return () => (
      <div class={`${attrs.class}`}>
        <div class=" p-6">
          {/* 总数据 */}
          <div class=" text-slate-300 text-center">
            数据总量：
            <span
              ref={totalCountTargetRef}
              class="text-gradient font-[Electronic]  text-7xl ml-2 mr-2 font-bold"
            >
              679,473,929
            </span>
            条记录
          </div>
          {/* 其他数据 */}
          <div class=" mt-3 flex flex-wrap">
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              华北：
              <span
                ref={city1Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              东北：
              <span
                ref={city2Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              华东：
              <span
                ref={city3Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              中南：
              <span
                ref={city4Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              西南：
              <span
                ref={city5Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
            <div class=" w-1/3 text-center text-slate-400 text-sm">
              西北：
              <span
                ref={city6Ref}
                class="font-[Electronic] text-[#5dc5ef] text-3xl"
              >
                9,778,988
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
export default TotalData;
