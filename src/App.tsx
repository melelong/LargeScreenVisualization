import HorizontalBar from './components/HorizontalBar.tsx';
import RadarBar from './components/RadarBar.tsx';
import Relation from './components/Relation.tsx';
import TotalData from './components/TotalData.tsx';
import MapChart from './components/MapChart.tsx';
import VerticalBar from './components/VerticalBar.tsx';
import RadiueBar from './components/RadiueBar.tsx';
import WordCloud from './components/WordCloud.tsx';
import { defineComponent } from 'vue';
import useData from './use/useData.ts';
const App = defineComponent({
  setup() {
    const { dataRef } = useData();
    const handelClick = () => {
      console.log(123);
    };
    return () =>
      dataRef?.value ? (
        <div
          onClick={handelClick}
          class="bg-[url('assets/imgs/bg.jpg')] text-center bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
        >
          <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
            {/* <!-- 横向柱状图 --> */}
            <HorizontalBar
              class="h-1/3 box-border pb-4"
              data={dataRef?.value?.regionData.regions}
            />
            {/* <!-- 雷达图 --> */}
            <RadarBar
              class="h-1/3 box-border pb-4"
              data={dataRef?.value?.riskData.risks}
            />
            {/* <!-- 数据传递关系图 --> */}
            <Relation
              class="h-1/3"
              data={dataRef?.value?.relationData.relations}
            />
          </div>
          <div class="w-1/2 mr-5 flex flex-col">
            {/* <!-- 数据展示图 --> */}
            <TotalData
              class="bg-opacity-50 bg-slate-800 p-3"
              data={dataRef?.value?.totalData}
            />
            {/* <!-- 地图可视化 --> */}
            <MapChart
              class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
              data={dataRef?.value?.mapData}
            />
          </div>
          <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
            {/* <!-- 竖向柱状图 --> */}
            <VerticalBar
              class="h-1/3 box-border pb-4"
              data={dataRef?.value?.verData.servers}
            />
            {/* <!-- 环形资源站比图 --> */}
            <RadiueBar
              class="h-1/3 box-border pb-4"
              data={dataRef?.value?.abnormalData.abnormals}
            />
            {/* <!-- 文档云图 --> */}
            <WordCloud
              class="h-1/3 box-border"
              data={dataRef?.value?.wordCloudData.datas}
            />
          </div>
        </div>
      ) : (
        <h1 class={'text-center'}>数据加载中。。。</h1>
      );
  },
});
export default App;
