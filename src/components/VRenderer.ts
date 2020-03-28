import { Camera, Color, PCFSoftShadowMap, Scene, WebGLRenderer } from 'three';
import { CreateElement } from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { RendererHandle } from '../core';
import { AppComponent } from '../mixins';
import Events from '../utils/events';

const events = [
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

@Component({
    props: {
        canvas: {required: true, type: HTMLCanvasElement},
        scene: {required: true, type: String},
        camera: {required: true, type: String},
        antialias: {default: false, type: Boolean},
        shadows: {default: false, type: Boolean},
        stencil: {default: false, type: Boolean},
        clearColor: {default: 0xffffff, type: [Number, String]}
    },
})
export class VRenderer extends Mixins(AppComponent) {
    @Prop({required: true, type: HTMLCanvasElement})
    public canvas!: HTMLCanvasElement;

    @Prop({required: true, type: String})
    public scene!: string;

    @Prop({required: true, type: String})
    public camera!: string;

    @Prop({default: false, type: Boolean})
    public antialias!: boolean;

    @Prop({default: false, type: Boolean})
    public shadows!: boolean;

    @Prop({default: true, type: Boolean})
    public stencil!: boolean;

    @Prop({default: 0xffffff, type: [Number, String]})
    public clearColor!: number | string;

    @Watch('camera')
    private watchCamera() {
        this.mHandler.setCamera(this.camera);
    }

    @Watch('scene')
    private watchScene() {
        this.mHandler.setScene(this.scene);
    }

    @Watch('clearColor')
    private watchClearColor() {
        const color = new Color(this.clearColor as any);
        this.mRenderer.setClearColor(color, 0);
    }

    get ap() {
        return this.app.lastUpdate
    }


    @Watch('ap', {immediate: true, deep: true})
    private watchClearColoraa() {
        this.$emit('requestAnimationFrame', {lastUpdate: this.app.lastUpdate})
    }

    private mReady = false;
    private mHandler!: RendererHandle;
    private mRenderer!: WebGLRenderer;
    private mName!: string;
    private static id = 0;

    protected renderImpl(
        renderer: WebGLRenderer,
        scene?: Scene,
        camera?: Camera
    ) {
        renderer.clearColor();
        if (scene && camera) {
            renderer.render(scene, camera);
        }
    }

    private async mounted() {
        const renderer = new WebGLRenderer({
            alpha: true,
            antialias: this.antialias,
            canvas: this.canvas,
            stencil: this.stencil
        });
        this.mRenderer = renderer;
        VRenderer.id++;
        this.mName = '' + VRenderer.id;
        Events(this, renderer.domElement, events)
        this.mHandler = this.app.renderers.create(this.mName);
        this.mHandler.set(renderer);
        this.mHandler.render = () => {
            const scene = this.mHandler.scene
                ? this.mHandler.scene.get()
                : undefined;
            const camera = this.mHandler.camera
                ? this.mHandler.camera.get()
                : undefined;
            this.renderImpl(renderer, scene, camera);
            this.watchClearColoraa()
        };
        this.mHandler.use();

        this.watchClearColor();
        this.watchCamera();
        this.watchScene();

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        if (this.shadows) {
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = PCFSoftShadowMap;
        }
        this.mReady = true;
    }

    private handleResize() {
        const renderer = this.mHandler.get()!;
        const width = renderer.domElement.scrollWidth;
        const height = renderer.domElement.scrollHeight;
        renderer.setSize(width, height);
    }

    private destroyed() {
        window.removeEventListener('resize', this.handleResize);
        this.app.renderers.dispose(this.mName);
    }

    private render(h: CreateElement) {
        return h();
        //return h('canvas', {ref: 'canvas'}, this.$slots.default);
    }
}
