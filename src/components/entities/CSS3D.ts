/* eslint-disable */
import { Object3D } from 'three';
import { Component, Mixins, Provide } from 'vue-property-decorator';
import { Application } from '../../core';
import { ObjectComponent, ObjectType } from '../../mixins';
import { Provider } from '../../utils/provider';
import { CreateElement } from 'vue';
import { VNodeData } from 'vue/types/vnode';
import { getSlot } from '@/utils/helpers';

@Component
export class CSS3D extends Mixins(ObjectComponent) {
    @Provide('object')
    private provideObject = Provider.defaultValue<ObjectType>();

    private m_object!: ObjectType;
    private m_created = false;
    protected instantiate(_app: Application): Promise<ObjectType> {
        return Promise.resolve(new Object3D());
    }

    protected destroy() {
    }

    private async mounted() {
        const scene = this.scene ? this.scene.get() : undefined;
        if (!scene) {
            const message = `${
                this.$options.name
            } component must be placed in a scene component`;
            throw {
                message,
                code: 'undefined_scene'
            };
        }

        this.m_object = await this.instantiate(this.app);
        console.log('amir ', this.m_object)
        const parent = this.object ? this.object : scene;
        parent!.add(this.m_object);
        Provider.setValue<ObjectType>(this.provideObject, this.m_object);
        this.m_created = true;
    }
    updated(){
        console.log('creado')
    }

    private destroyed() {
        if (this.scene) {
            this.destroy();
            const scene = this.scene ? this.scene.get() : undefined;
            const parent = this.object ? this.object : scene;
            parent!.remove(this.m_object);
        }
    }

    private render(h: CreateElement) {
        if (!this.m_created) {
            return null;
        }
        const data: VNodeData = {
            staticClass: 'g-infowindo',
            ref: 'ginfowindo',
            style: {
                width: '647px',
                height: '660px',
                position: 'absolute',
                top: '0px',
                zIndex: '9999',
                perspective: '393.279px',
            }

        };
        return h('div', data,
            [
                this.$slots.default,
                getSlot(this, 'body'),
            ]);
    }
}
