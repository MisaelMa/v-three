import { BoxGeometry } from 'three';
import { Component, Mixins, Prop, Vue, Watch } from 'vue-property-decorator';
import { Asset } from '../../assets/Asset';
import { GeometryType } from '../../../core';

@Component({
  props: {
    width: {default: 1},
    height: {default: 1},
    depth: {default: 1},
    widthSegments: {type: Number, default: 1},
    heightSegments: {type: Number, default: 1},
    depthSegments: {type: Number, default: 1},
  }
})
export default class VBoxGeometry extends Mixins(Asset) {
  @Prop({type: Function})
  public factory!: BoxGeometry;

  public boxGeometry!: BoxGeometry;

  @Prop({default: 1})
  public width!: number;

  @Prop({default: 1})
  public height!: number;

  @Prop({default: 1})
  public depth!: number;

  @Prop()
  public widthSegments!: number;

  @Prop()
  public heightSegments!: number;

  @Prop()
  public depthSegments!: number;

  protected get assets() {
    return this.app.assets.geometries;
  }

  protected async instantiate(): Promise<GeometryType> {
    if (!this.factory) {
      this.boxGeometry = new BoxGeometry(this.width,
        this.height,
        this.depth,
        this.widthSegments,
        this.heightSegments,
        this.depthSegments)
    } else {
      this.boxGeometry = this.factory
    }
    return this.boxGeometry
  }
}
