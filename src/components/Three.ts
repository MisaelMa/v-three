import { CreateElement } from "vue";
import { Component, Prop, Provide, Vue, Watch } from "vue-property-decorator";

import { Application } from "../core";
import { Provider } from "../utils/provider";

@Component
export class Three extends Vue {
  @Prop({ default: true, type: Boolean })
  public active!: boolean;

  @Provide()
  public app = Provider.defaultValue<Application>();

  private mReady = false;
  private mApp!: Application;

  public mounted() {
    this.mApp = new Application();
    Provider.setValue<Application>(this.app, this.mApp);
    this.onChangeActive();
    this.mReady = true;
  }

  public destroyed() {
    this.onDeactivate();
    if (this.mApp) {
      this.mApp.dispose();
    }
  }

  @Watch("active")
  public onChangeActive() {
    if (this.active) {
      this.onActivate();
    } else {
      this.onDeactivate();
    }
  }

  public onDeactivate() {
    this.mApp.deactivate();
  }
  public onActivate() {
    this.mApp.activate();
  }

  public render(h: CreateElement) {
    if (!this.mReady) {
      return null;
    }
    return h("div", this.$slots.default);
  }
}
