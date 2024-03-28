const { createApp, defineComponent, h, ref } = Vue;

const Button = ({ props }, { slots }) => h("button", props, slots);

// 高阶组件
const logProp =
  (propName, Component) =>
  (props, { slots }) => {
    console.log(props[propName]);
    return h(Component, props, slots);
  };

const LoggedButton = logProp("type", Button);

const App = defineComponent(() => {
  const firstRef = ref(null);
  const secondRef = ref(null);

  const log = (elRef) => () => {
    console.log(
      elRef.value instanceof HTMLButtonElement,
      elRef.value.textContent
    );
  };

  return () => [
    h("p", ["Unwrapped ", h("code", "Button"), " component"]),
    h(
      Button,
      { ref: firstRef, type: "button", onClick: log(firstRef) },
      () => "First button"
    ),
    h("p", [
      h("code", "Button"),
      " component wrapped in ",
      h("code", "logProp"),
      " HOC",
    ]),
    h(
      LoggedButton,
      { ref: secondRef, type: "button", onClick: log(secondRef) },
      () => "Second button"
    ),
  ];
});

const app = createApp(App);
app.mount("#app");

// const { createApp, defineComponent, h, ref } = Vue

// // https://github.com/vuejs/composition-api/issues/317

// const Input = defineComponent({
//   props: {
//     inputRef: { type: Function, required: true }
//   },
//   setup ({ inputRef }) {
//     return () => {
//       return h('input', { ref: el => inputRef().value = el, type: 'text' })
//     }
//   },
// })

// const App = defineComponent({
//   setup () {
//     const inputRef = ref(null)
//     const log = () => {
//       console.log(inputRef.value instanceof HTMLInputElement, inputRef.value.value)
//     }
//     return { forwardRef: () => inputRef, log }
//   }
// })

// const app = createApp(App)

// app.component('the-input', Input)
// app.mount('#app')
