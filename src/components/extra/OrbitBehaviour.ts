import * as THREE from 'three';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { OrbitControls } from '../../Controls/OrbitControls';
import { BehaviourComponent } from '../../mixins';

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

@Component
export class OrbitBehaviour extends Mixins(BehaviourComponent) {
  @Prop()
  public data!: {
    position: Vec3;
    rotation: Vec3;
  };

  private controls!: OrbitControls;
  private camera!: THREE.PerspectiveCamera;
  private static id = 0;

  public async created() {
   //  console.log(this.scene!.get(), this.object)
    if (!this.data) {
      throw new Error('Could not initialize OrbitBehaviour: data is missing');
    }
    this.camera = new THREE.PerspectiveCamera();
    OrbitBehaviour.id++
    const render = await this.app.renderers.get(OrbitBehaviour.id.toString())
    const renderCurent = await render?.get()
    this.controls = new OrbitControls(this.camera, renderCurent?.domElement);
    this.camera.position.set(
      this.data!.position.x,
      this.data!.position.y,
      this.data!.position.z
    );
    this.camera.rotation.set(
      this.data!.rotation.x,
      this.data!.rotation.y,
      this.data!.rotation.z
    );
    this.data!.position = this.camera.position;
    this.data!.rotation = this.camera.rotation;
   //  console.log(this.app)
    this.controls.update();
    this.ready();
  }

  public beforeDestroy() {
    this.controls.dispose();
  }

  public render(h: any) {
    return h('div');
  }
}
