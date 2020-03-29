import { Camera, Color, PCFSoftShadowMap, Scene, } from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CreateElement } from 'vue';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { RendererHandle } from '../../core';
import { AppComponent } from '../../mixins';
import Events from '../../utils/events';

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
        stencil: {default: false, type: Boolean},
        clearColor: {default: 0xffffff, type: [Number, String]}
    },
})
export class VCss3DRenderer extends Mixins(AppComponent) {
    @Prop({required: true, type: String})
    public name!: string;

    @Prop({required: true, type: HTMLElement})
    public canvas!: HTMLElement;

    @Prop({required: true, type: String})
    public scene!: string;

    @Prop({required: true, type: String})
    public camera!: string;

    @Prop({default: false, type: Boolean})
    public antialias!: boolean;

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


    get ap() {
        return this.app.lastUpdate
    }


    @Watch('ap', {immediate: true, deep: true})
    private watchClearColoraa() {
        this.$emit('requestAnimationFrame', {lastUpdate: this.app.lastUpdate})
    }

    private mReady = false;
    private mHandler!: RendererHandle;
    private mRenderer!: CSS3DRenderer;
    private static id = 0;

    protected renderImpl(
        renderer: CSS3DRenderer,
        scene?: Scene,
        camera?: Camera
    ) {
        if (scene && camera) {
            renderer.render(scene, camera);
        }
    }

    private async mounted() {
        const renderer = new CSS3DRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.zIndex = '9999';
        this.canvas.appendChild(renderer.domElement)
        this.mRenderer = renderer;
        Events(this, renderer.domElement, events)
        this.mHandler = this.app.renderers.create(this.name);
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
        this.watchCamera();
        this.watchScene();

        window.addEventListener('resize', this.handleResize);
        this.handleResize();
        this.mReady = true;
        console.log(this.app)
    }

    private handleResize() {
        const renderer = this.mHandler.get()!;
        const width = renderer.domElement.scrollWidth;
        const height = renderer.domElement.scrollHeight;
        renderer.setSize(width, height);
    }

    private destroyed() {
        window.removeEventListener('resize', this.handleResize);
        this.app.renderers.dispose(this.name);
    }

    private render(h: CreateElement) {
        return h();
    }
}
