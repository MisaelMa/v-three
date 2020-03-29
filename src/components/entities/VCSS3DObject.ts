import { Component, Inject, Mixins, Prop, Vue } from 'vue-property-decorator';
import { Entity } from '@/components';
import { Provider, ProviderValue } from '@/utils/provider';
import { ObjectType } from '@/mixins';
import { ObjectTypeMesh } from '@/components/extra/DragBehaviour';
import { CreateElement } from 'vue';
import { getSlot } from '@/utils/helpers';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CSS3D } from '@/components/entities/CSS3D';

interface Interface {
    ginfowindo: HTMLElement
}

@Component
export class VCSS3DObject extends Mixins(CSS3D) {
    @Prop({type: String, default: ''})
    private name!: string;

    @Prop({required: true, type: HTMLElement})
    public html!: HTMLElement;

    @Inject({
        from: 'objectMesh',
        default: Provider.defaultValue<ObjectType>()
    })
    private injectedObjectMesh!: ProviderValue<ObjectTypeMesh>;

    ref: any | Interface = this.$refs;

    protected async instantiate() {

        console.log(this.html)
        const css3DObject = new CSS3DObject(this.html);
        css3DObject.position.x = 1
        css3DObject.position.y = -4
        css3DObject.position.z = -0.2
        css3DObject.scale.x = 0.02;
        css3DObject.scale.y = 0.02;
        console.log(css3DObject)
        await this.app.mesh.set(this.name, css3DObject)
        return css3DObject
    }


    /*render(h: CreateElement) {
        const data = {
            staticClass: 'g-infowindo',
            style: 'position: relative!important; float: left;',
            ref: 'ginfowindo',
        };
        return h('div', data,
            [
                this.$slots.default

            ]);
    }*/

}
