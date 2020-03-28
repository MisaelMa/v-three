import { Object3D, Raycaster, Vector2 } from 'three'
import { CreateElement } from 'vue';
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import { AppComponent } from '../../mixins';

const MousEvents = [
  'click',
  'contextmenu',
  'dblclick',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
]
@Component
export default class TRayCaster extends Mixins(AppComponent) {

  private static id = 0;
  public mouse = new Vector2();
  public ray = new Raycaster()

  get mesh() {
    return this.app.mesh;
  }

  public mounted() {
    TRayCaster.id++;
   //  console.log(this.app.renderers, TRayCaster.id)
    const render = this.app.renderers.get(TRayCaster.id.toString())
    if (render) {
      const canvasBounds = render!.get()!.domElement.getBoundingClientRect();
      for (const mousevent of MousEvents) {
        render?.get()?.domElement.addEventListener(mousevent, (event: any) => {
          this.mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
          this.mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
          // @ts-ignore
          this.ray.setFromCamera(this.mouse, render!.camera?.get());
          const intersects = this.ray.intersectObjects(this.mesh.get());
          this.$emit(mousevent, {event, intersects: intersects.length > 0 ? intersects : []})
          // this.onMouseMove(event)
          // this.$emit(even, {event: event, intersects: intersects.length > 0 ? intersects[0] : null});
        });
      }
    }
  }

  public async onMouseMove(event: any) {
    const render = await this.app.renderers.get(TRayCaster.id.toString())

    const canvasBounds = render!.get()!.domElement!.getBoundingClientRect();

    this.mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
    this.mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
    // @ts-ignore
    this.ray.setFromCamera(this.mouse, render!.camera?.get());
    const intersects = this.ray.intersectObjects(render!.scene?.get()!.children);
   //  console.log(intersects)
    if (intersects.length > 0) {

      // @ts-ignore
      intersects[0].object.material.color.setHex(Math.random() * 0xffffff);
    }
  }

  public render(h: CreateElement) {
    return h('div', this.$slots.default);
  }
}
