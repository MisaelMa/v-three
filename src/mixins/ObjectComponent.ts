import { Camera, Mesh, Object3D } from 'three';
import { Component, Inject, Mixins } from 'vue-property-decorator';
import { Provider, ProviderValue } from '../utils/provider';
import { SceneComponent } from './SceneComponent';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';

export type ObjectType = Object3D | Camera | Mesh | CSS3DObject;

@Component
export class ObjectComponent extends Mixins(SceneComponent) {
  @Inject({
    from: 'object',
    default: Provider.defaultValue<ObjectType>()
  })
  private injectedObject!: ProviderValue<ObjectType>;


  protected get object() {
    return this.injectedObject.value;
  }
}
