import * as THREE from 'three';
import { CompressedTexture } from 'three';
import { BufferGeometry } from 'three';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

export async function loaddss(src: string): Promise<CompressedTexture> {

  const loader = new DDSLoader();
  return new Promise((resolve, reject) => {
    loader.load(src, async (data) => {
        resolve(data)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        // console.log('An error happened');
      })
  })
}

export async function stlLoader(src: string): Promise<BufferGeometry> {
  const loader = new STLLoader();
  return new Promise((resolve, reject) => {
    loader.load(src, async (data) => {
        resolve(data)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
       // console.log('An error happened');
      });
  })
}

