const props = ref({
  text: "",
  color: "",
  modelValue: false,
  "onUpdate:modelValue": (val) => {
    props.value.modelValue = val;
  },
});
const buttonProps = ref({
  text: "Close",
  color: "primary",
  variant: "elevated",
});

export default function useMessage() {
  function success(text) {
    props.value.text = text;
    props.value.color = "success";
    props.value.modelValue = true;
  }

  function error(text) {
    props.value.text = text;
    props.value.color = "error";
    props.value.modelValue = true;
  }

  function warning(text) {
    props.value.text = text;
    props.value.color = "warning";
    props.value.modelValue = true;
  }

  function info(text) {
    props.value.text = text;
    props.value.color = "info";
    props.value.modelValue = true;
  }

  return {
    props,
    buttonProps,
    success,
    error,
    warning,
    info,
  };
}
