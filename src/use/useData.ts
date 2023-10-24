import { onMounted, onUnmounted, ref } from "vue";
import getVisualization from "../api/Visualization";
const useData = () => {
  const dataRef = ref<null | any>(null);
  const timerIdRef = ref<number | null>(null);
  const loadData = async () => {
    try {
      const res = await getVisualization();
      dataRef.value = res.data
    } catch (err) {
      console.warn(err);
    }
  };

  onMounted(() => {
    loadData();
    timerIdRef.value = setInterval(async () => await loadData(), 4000);
  });
  onUnmounted(() => {
    clearInterval(timerIdRef.value!);
  });
  return {
    dataRef,
    timerIdRef
  }
}
export default useData