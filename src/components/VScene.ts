import { Color, Scene as ThreeScene } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { Component, Mixins, Prop, Provide, Vue, Watch } from 'vue-property-decorator';

import { Texture } from 'three/src/textures/Texture';
import { CreateElement } from 'vue';
import { BundleHandle, SceneHandle } from '../core';
import { AppComponent } from '../mixins';
import { Provider } from '../utils/provider';
import { stringToArray } from '../utils/toArray';

@Component({
  props: {
    name: {type: String},
    background: {required: false},
    assets: {type: [String, Array], default: () => []},
  }
})
export class VScene extends Mixins(AppComponent) {
  @Prop({type: String, required: true})
  public name!: string;

  @Prop({type: [String, Array], default: () => []})
  public assets!: string | string[];

  @Prop()
  public background!: null | Color | Texture;

  @Provide('scene')
  private provideScene = Provider.defaultValue<SceneHandle>();

  private mActive = false;
  private mScene!: SceneHandle;

  public async onLoad() {
    this.$emit('load');
    await this.mScene.registerDependencies(this.bundles());
  }

  public async onLoadProgress(amount: number, total: number) {
    this.$emit('load-progress', amount, total);
  }

  @Watch('background')
  private watchBackground() {
    const scene = this.app.scenes.get(this.name)?.get()
    scene!.background = this.background
    // scene)
  }

  public async onActivate() {
    const scene = new ThreeScene();
    scene.name = this.name;
    this.mScene.set(scene);
    this.mActive = true;
    await Vue.nextTick();
    this.$emit('loaded');
    this.watchBackground()
  }

  public async onUnload() {
    this.$emit('unload');
    this.mActive = false;
    await Vue.nextTick();
    this.mScene.set(undefined);
  }

  public mounted() {
    this.mScene = this.app.scenes.create(this.name);
    this.mScene.onLoad.on(this.onLoad);
    this.mScene.onActivate.on(this.onActivate);
    this.mScene.onUnload.on(this.onUnload);
    this.mScene.onLoadProgress.on(this.onLoadProgress);

    Provider.setValue<SceneHandle>(this.provideScene, this.mScene);
  }

  public destroyed() {
    this.app.scenes.dispose(this.name);
  }

  public render(h: CreateElement) {
    if (!this.mActive) {
      return null;
    }
    return h('div', this.$slots.default);
  }

  public bundles() {
    const bundles: BundleHandle[] = [];
    const app = this.app;
    const dependencies = stringToArray(',', this.assets);
    dependencies.forEach(dep => {
      const bundle = app.assets.bundles.get(dep);
      if (bundle) {
        bundles.push(bundle);
      }
    });
    return bundles;
  }
}
