import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import { CreateElement, VNode } from 'vue';
import { Component, Mixins, Prop } from 'vue-property-decorator';
import { AppComponent } from '../../mixins';
import { getSlot } from '../../utils/helpers';

@Component
export class SVGLoaderA extends Mixins(AppComponent) {
  @Prop({type: String, required: true})
  public src!: string;

  public async loadSvg(): Promise<any> {
    return new Promise((resolve, reject) => {
      const loader = new SVGLoader();
      loader.load(this.src, async (data) => {
          const paths = data.paths;
          for (const path of paths) {

            const material = new THREE.MeshBasicMaterial({
              // color: path.color,
              side: THREE.DoubleSide,
              depthWrite: false
            });
            const shapes = path.toShapes(true);
            let j = 1
            for (const shape of shapes) {
              const geometry = new THREE.ShapeBufferGeometry(shape);
              const mesh = new THREE.Mesh(geometry, material);
              ////  console.log(mesh)
              await this.app.mesh.set(j.toString(), mesh)
              j++
            }
          }
        },
        (xhr) => {
          //  console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
          //  console.log('An error happened');
        })
    })
  }

  public async render(h: CreateElement): Promise<VNode> {

    await this.loadSvg();
    const data = {
      staticClass: 'g-content',
      ref: 'gmap',
    };
    return h('div',
      data,
      [
        getSlot(this, 'mesh', {mesh: []}),

        /*this.$scopedSlots.default ?
            this.$scopedSlots.default.length ? 'scoped' : 'normal' :
            this.$slots.default ? 'normal' : 'empty',
        ' slot'*/
      ],
    );
  }
}
