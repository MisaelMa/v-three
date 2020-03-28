import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { Color as Colors, Material, Mesh, MeshLambertMaterial } from 'three';
import { ObjectComponent } from '../../mixins';

@Component
export class Color extends Mixins(ObjectComponent) {
  @Prop({
    required: false,
    type: Object
  })
  private value!: { x: number; y: number; z: number };

  @Watch('value', {deep: true})
  private onChange() {
   //  console.log(this.app)
  }

  public created() {
    const object: Mesh = this.object as Mesh
    const material: MeshLambertMaterial = object.material as MeshLambertMaterial
   //  console.log(this.object!.type, this.object)
    ////  console.log(material.color = new Colors('red'))
    ////  console.log(object.material.color.setHex())
    if (!this.app) {
      throw new Error(
        'Scale property can only be added as child to an object component'
      );
    }
    // this.onChange();
  }

  public render(h: any) {
    return h();
  }
}
