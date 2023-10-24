import { defineComponent, ref } from 'vue';

const Add = defineComponent({
  setup(props, context) {
    console.log(props, context);
    const num = ref<number>(0);
    return () => (
      <div class={'text-center'} onClick={() => num.value++}>
        {num.value}
      </div>
    );
  },
});
export default Add;
