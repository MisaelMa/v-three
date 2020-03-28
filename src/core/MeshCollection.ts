
import { Component, Mixins } from 'vue-property-decorator';
import { AppComponent } from '../mixins';

@Component
export class MeshCollection extends Mixins(AppComponent) {

  protected instantiate(): any {
   //  console.log(this.app)
    return ''

  }

  private created() {
    this.instantiate();
  }
}
