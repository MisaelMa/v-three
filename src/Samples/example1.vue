<template>
	<div ref="html">
		<div ref="tags">
			<button style="background-color: red; color: white;">amir</button>
			<button style="background-color: red; color: white;">amir</button>
			<input type="text">
			<h1>This is heading 1</h1>
			<h2>This is heading 2</h2>
			<h3>This is heading 3</h3>
			<h4>This is heading 4</h4>
			<h5>This is heading 5</h5>
			<h6>This is heading 6</h6>
		
		</div>
		<canvas ref="canvas"></canvas>
		<VThree v-if="canvas">
			<VRenderer :canvas="canvas"
			           camera="camera"
			           scene="scene"
			           clearColor="0x000000, 0 "
			           @click="prueba"
			           antialias shadows/>
			<VCss3DRenderer name="css3d"
			                :canvas="html"
			                camera="camera"
			                scene="scene2"
			/>
			<VAssetBundle name="cubefbx" preload>
				<Model name="Formacion5" :src="require('@/assets/models/Formacion5.fbx')"/>
				<Model name="Tuberia5" :src="require('@/assets/models/Tuberia5.fbx')"/>
			</VAssetBundle>
			<VAssetBundle name="cube" preload>
				<Material name="cube_Mat" :factory="material1"/>
				<Geometry name="plane" :factory="PlaneBufferGeometry"/>
				<Material name="gas" :factory="MeshLambertMaterial"/>
				<Geometry name="test" :factory="amir"/>
			</VAssetBundle>
			<VScene name="scene" assets="cube, cubefbx">
				<Camera name="camera" :factory="perspectiveCamera">
					<position :value="scene.camera.position"/>
					<rotation :value="scene.camera.rotation"/>
					<orbit-behaviour :data="scene.camera"/>
				
				</Camera>
				<light name="AmbientLight" :factory="AmbientLight"></light>
				
				<light name="SpotLight" :factory="DirectionalLight">
					<position :value="{x: -1, y: 1, z: 1}"/>
				</light>
				
				<TRayCaster @click="click">
					
					<mesh name="waterPlane" geometry="plane" material="cube_Mat">
						<rotation :value="{ x: -92, y: 0, z: 0 }"/>
						<Position :value="{ x: 0, y: -1.5, z: 0 }"/>
						<shadows receive/>
					</mesh>
					
					
					<Mesh name="ybot" model="Formacion5">
						<Position :value="{ x: -1.5, y: -0.1, z: -0.2 }"/>
						<Scale :value="{ x: 0.02, y: 0.012, z: 0.02}"/>
						<shadows receive/>
					</Mesh>
					<Mesh name="ybot2" model="Tuberia5">
						<Position :value="{ x:-1.5, y:-0.14, z:-0.2}"/>
						<Scale :value="{ x:0.02, y:0.012, z:0.02}"/>
						<shadows receive/>
					</Mesh>
					<Mesh name="yb3ot" geometry="test" material="gas">
						<rotation :value="{ x: -92, y: 0, z: 0 }"/>
						<Position :value="{ x:-1.5, y:1.085, z:1}"/>
						<Scale :value="{ x:0.0025, y:0.0025, z:0.0025}"/>
						<Color :value="{ x:0.0025, y:0.0025, z:0.0025}"/>
					</Mesh>
				</TRayCaster>
			</VScene>
			<VScene name="scene2">
				<Camera name="camera" :factory="perspectiveCamera">
					<position :value="scene.camera.position"/>
					<rotation :value="scene.camera.rotation"/>
					<orbit-behaviour :data="scene.camera"/>
				
				</Camera>
				<TRayCaster @click="click">
					<VCSS3DObject v-if="tags" name="tml" :html="tags">
						<Position :value="{ x: -1.5, y: -0.1, z: -0.2 }"/>
					</VCSS3DObject>
				</TRayCaster>
			</VScene>
		</VThree>
	</div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import {
    Camera, Fog, Geometry,
    Group, Light,
    Material,
    Mesh,
    Model,
    Position,
    Rotation, Scale,
    Shadows, Texture, VAssetBundle,
    VRenderer,
    VScene,
    VThree,
} from '@/components';
import { Color } from '@/components/properties/Color';
import { StandardMaterial } from '@/components/extra/StandardMaterial';
import { DragBehaviour } from '@/components/extra/DragBehaviour';
import { OrbitBehaviour } from '@/components/extra/OrbitBehaviour';
import TRayCaster from '@/components/extra/TRayCaster';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import * as THREE from 'three';
import { loaddss, stlLoader } from '@/utils/cooking';

import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Loader } from '@/core';
import { VCss3DRenderer } from '@/components/VRenderers/VCss3DRenderer';
import { VCSS3DObject } from '@/components/entities/VCSS3DObject';

Loader.registerExtension('stl', STLLoader);
Loader.registerExtension('fbx', FBXLoader);
Loader.registerExtension('dds', DDSLoader);
@Component({
    components: {
        VThree,
        VRenderer,
        Group,
        VScene,
        Mesh,
        VAssetBundle,
        Camera,
        Material,
        Rotation,
        Shadows,
        Color,
        Position,
        Model,
        Texture,
        TRayCaster,
        Geometry,
        Fog,
        Light,
        Scale,
        OrbitBehaviour,
        DragBehaviour,
        StandardMaterial,
        VCss3DRenderer,
        VCSS3DObject
    }
})
export default class Example1 extends Vue {
    public canvas: HTMLCanvasElement = {} as HTMLCanvasElement;
    public html: HTMLElement = {} as HTMLElement;
    public tags: HTMLElement = {} as HTMLElement;
    public scene = {
        camera: {
            position: {
                x: -3, y: 2, z: 5
            },
            rotation: {
                x: 0, y: 0, z: 0
            }
        }
    };
    public camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        1,
        15
    );
    public cameraTarget = new THREE.Vector3(-1, 0, 0);

    public pi() {
        return -Math.PI
    }

    public async perspectiveCamera() {

        this.camera.position.set(0, 0, 0);
        this.camera.rotation.set(0, 0, 0);

        this.camera.lookAt(this.cameraTarget);
        return this.camera


    }

    public PlaneBufferGeometry() {
        return new THREE.PlaneBufferGeometry(40, 40)
    }

    public MeshLambertMaterial() {
        return new THREE.MeshLambertMaterial({
            color: 0x000000,
        });
    }

    public async AmbientLight() {
        return new THREE.AmbientLight(0xcccccc, 0.4);
    }

    public async DirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        directionalLight.position.set(-1, 1, 1);
        return directionalLight
    }

    public async amir() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const geo = await stlLoader(require('@/assets/models/TESTSEPARATOR.stl'))
        //  console.log(geo)
        return geo
    }

    public click(data: any) {
        //  console.log(data)
        data.intersects[0]?.object.material.color.setHex(Math.random() * 0xffffff);
    }

    public async material1() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const map1 = await loaddss(require('@/assets/textures/compressed/disturb_dxt1_nomip.dds'));
        map1.magFilter = THREE.LinearFilter;
        map1.minFilter = map1.magFilter
        map1.anisotropy = 4;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const cubemap = await loaddss(require('@/assets/textures/compressed/Mountains.dds'));
        cubemap.magFilter = THREE.LinearFilter;
        cubemap.minFilter = THREE.LinearFilter;
        cubemap.mapping = THREE.CubeReflectionMapping;
        cubemap.needsUpdate = true;

        const material1 = new THREE.MeshBasicMaterial({
            map: map1,
            envMap: cubemap,
            opacity: 0.9
        });
        return material1
    }

    public ir = false;
    public regreso = false;
    public timer = 1.6;

    public prueba(event: any) {
        //  console.log(event)
    }

    public renderer() {
        //  console.log('amir')

        if (this.regreso === false) {
            this.timer += 0.0002;
            if (this.timer >= 1.6) {
                this.regreso = true;
            }
        }

        if (this.regreso === true) {
            this.timer -= 0.0002;
            if (this.timer <= 1.4) {
                this.regreso = false;
            }
        }

        this.camera.position.x = Math.cos(this.timer) * 3;
        this.camera.position.z = Math.sin(this.timer) * 3;
        this.camera.position.y = 1.35;
        this.camera.lookAt(this.cameraTarget);
    }

    public mounted() {
        const ref: any = this.$refs
        this.canvas = ref.canvas
        this.html = ref.html
        this.tags = ref.tags
    }

}
</script>
