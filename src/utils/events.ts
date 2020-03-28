import Vue from 'vue';

export default (vue: any, domElement: HTMLElement, events: any[]) => {
  events.forEach((eventName: string) => {
    const exposedName = eventName;
    domElement.addEventListener(eventName, (ev: any) => {
      vue.$emit(exposedName, ev);
    });
  });
};
