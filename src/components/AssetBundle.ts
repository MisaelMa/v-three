import { Component, Mixins, Prop, Provide, Vue } from "vue-property-decorator";

import { BundleHandle } from "../core";
import { AppComponent } from "../mixins";
import { Provider } from "../utils/provider";
import { stringToArray } from "../utils/toArray";

@Component
export class AssetBundle extends Mixins(AppComponent) {
  @Prop({ type: String, required: true })
  public name!: string;

  @Prop({ type: Boolean, default: false })
  public preload!: boolean;

  @Prop({ type: Number, default: 0 })
  public timeout!: number;

  @Prop({ type: [String, Array], default: () => [] })
  public dependencies!: string | string[];

  @Provide("bundle")
  private provideBundle = Provider.defaultValue<BundleHandle>();

  private getBundle() {
    return this.mBundle;
  }

  private mActive = false;
  private mBundle!: BundleHandle;

  public mounted() {
    this.mBundle = this.app.assets.bundles.create(this.name);
    this.mBundle.onLoad.on(this.onLoad);
    this.mBundle.onUnload.on(this.onUnload);
    this.mBundle.preload = this.preload;
    this.mBundle.unloadTimeout = this.timeout;

    Provider.setValue(this.provideBundle, this.mBundle);
  }

  public destroyed() {
    this.app.assets.bundles.dispose(this.name);
  }

  public render(h: any) {
    if (!this.mActive) {
      return null;
    }
    return h("div", this.$slots.default);
  }

  private async onLoad(): Promise<void> {
    this.mActive = true;

    const bundles = this.getBundles(this.dependencies);
    const deps = this.mBundle.registerDependencies(bundles);

    await Vue.nextTick();
    await deps;
  }

  private async onUnload(): Promise<void> {
    this.mActive = false;
    await Vue.nextTick();
  }

  private getBundles(pDependencies: string | string[]): BundleHandle[] {
    const bundles: BundleHandle[] = [];
    const dependencies = stringToArray(",", pDependencies);
    const app = this.app;

    dependencies.forEach(name => {
      const bundle = app.assets.bundles.get(name);
      if (bundle) {
        bundles.push(bundle);
      }
    });
    return bundles;
  }
}
