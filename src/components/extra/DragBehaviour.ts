import { MeshCollection } from '../../core/MeshCollection';
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import { Object3D } from 'three';

export type ObjectTypeMesh = Object3D[]

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

@Component
export class DragBehaviour extends Mixins(MeshCollection) {
  @Prop({type: String, default: '', required: true})
  private camera!: string;

  @Prop({type: String, required: true})
  private scene!: string;

  private static id = 0;
  public controls!: DragControls

  protected get mesh() {
    return this.app.mesh;
  }


  protected async instantiate() {
    await Vue.nextTick();
    const msh = this.mesh
    DragBehaviour.id++;
    const render = await this.app.renderers.get(DragBehaviour.id.toString())
    if (render) {

      const renderCurent = await render?.get()
      const came = await this.app.scenes.get(this.scene)?.cameras.get(this.camera)
      //  console.log(msh.get('s'))
      // @ts-ignore
      this.controls = new DragControls(msh.get('s'), came?.get(), renderCurent?.domElement ?? document);
      //  console.log(this.controls.getObjects())
      this.controls.addEventListener('drag', (event) => {
        //  console.log(event)

        this.app.renderers.render()
      })
      ////  console.log(this.controls.getObjects(), this.controls.object, came?.get())
      this.controls.activate()
    } else {
      //  console.log('no cargado')

    }
  }


  public beforeDestroy() {
    this.controls?.dispose();
  }

  public render(h: any) {
    return h('div', this.$slots.default);
  }
}
