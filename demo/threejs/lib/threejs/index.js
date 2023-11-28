import * as THREE from './src/Three.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { TextGeometry } from './jsm/geometries/TextGeometry.js';


// 创建实例
function createApp(canvas, option = {}) {
    const clock = new THREE.Clock();
    option.width = option.width || canvas.width;
    option.height = option.height || canvas.height;
    option.aspect = option.aspect || (option.width / option.height);
    const camera = new THREE.PerspectiveCamera( option.fov||50, option.aspect, option.near || 0.1, option.far || 1000 );

    camera.position.z = 60; 
    camera.position.x = 0;
    camera.position.y = 10;
    camera.lookAt(0, 0);

    const backgroundColor = option.backgroundColor || 0xf1f1f1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(backgroundColor);

    const renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    renderer.setSize( option.width, option.height );
    // 人物对象能投射阴影
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(option.devicePixelRatio || window.devicePixelRatio);

    const control = new OrbitControls(camera, renderer.domElement);

    const app = {
        scene,
        clock,
        camera,
        renderer,
        bindAnimation(cb) {
            animations.push(cb);
        },
        unbindAnimation(cb) {
            for(let i=animations.length-1; i>=0; i--) {
                if(animations[i] === cb) {
                    animations.splice(i, 1);
                }
            }
        },
        control,
        loadObj,
        drawCoord,
        addLights,
        addFloor
    }

    // 动画调用
    const animations = [];
    renderer.setAnimationLoop((time) => {
        animations.forEach((cb)=>{
            cb && cb.call(app, time);
        });
        renderer.render( scene, camera );
    });

    return app;    
}


// 添加光源
function addLights(scene=this.scene, option={}) {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    // Add hemisphere light to scene
    scene.add(hemiLight);

    const d = 800.25;
    const lightPosition = option.position || [-40, 40, 30];
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
    dirLight.position.set(...lightPosition);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(10240, 10240);
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 15000;
    dirLight.shadow.camera.left = d * -1;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = d * -1;
    // Add directional Light to scene
    scene.add(dirLight);
}

// 添加一个地板
function addFloor(scene=this.scene, option={}) {
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(option.width||100, option.height||100, option.widthSegments||300, option.heightSegments||300);
    const floorMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(option.color||"#ccc"),
        //wireframe: true,
        shininess: 0,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -0.5 * Math.PI; // This is 90 degrees by the way
    floor.receiveShadow = true;

    option.position = option.position || {x:0, y: -11, z: 0};
    floor.position.x = option.position.x || 0;
    floor.position.y = option.position.y || 0;
    floor.position.z = option.position.z || 0;
    scene.add(floor);
}

// 加载3D模型
function loadObj(url, success, progress, traverse) {
    let loader = null;
    if(url.toLowerCase().includes('.fbx')) loader = new FBXLoader();
    else loader = new GLTFLoader();

    loader.load(url, (obj) => {
        
        // 使用模型的 traverse 方法遍历所有网格（mesh）以启用投射和接收阴影的能力。该操作需要在 scene.add(model) 前完成。
        (obj.scene||obj).traverse(o => {
            if(traverse) traverse(o);
            
            if (o.isMesh) {
                o.castShadow = true;
                o.receiveShadow = true;
                //o.material = stacy_mtl;
            }
        });

        success && success(obj);
    }, (e)=>{
        progress && progress(e);
    }, (err) => {
        console.error(err);
    });
}

// 画坐标系
function drawCoord(position={
    x: 40,
    y: 0,
    z: 30
}, size=5, scene=this.scene) {
    
    // x
    drawLines(scene, [position.x-size, position.y, position.z], [20, 0, 0], '#ff0000', 'X', size*2);
    // y
    drawLines(scene, [position.x, position.y-size, position.z], [0, 20, 0], '#00ff00', 'Y', size*2);
    // z
    drawLines(scene, [position.x, position.y, position.z-size], [0, 0, 20], '#0000ff', 'Z', size*2);
}

function drawLines(scene, p1, p2, color, txt, size=5) {
    const point1 = new THREE.Vector3(...p1);
    const point2 = new THREE.Vector3(...p2);

    // 添加箭头
    const arrowLength = size;
    const arrowColor = new THREE.Color(color) || 0xffff00;
    const arrowHelper = new THREE.ArrowHelper(point2.normalize(), point1, arrowLength, arrowColor);
    scene.add(arrowHelper);

    const m = drawText(txt, color);
    m.position.set(...p1);
    scene.add(m);
}

let textCanvas = null;
function drawText(txt, color) {
    const canvas = textCanvas || (textCanvas=document.createElement('canvas'));
    canvas.width = 100;
    canvas.height = 100;
    
    const context = canvas.getContext('2d', {
        willReadFrequently: true
    });
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '60px Microsoft YaHei';
    context.textAlign = 'center';
    context.fillStyle = color;
    const textWidth =  context.measureText(txt).width
    context.fillText(txt, (canvas.width-textWidth) / 2, 80);
    const data = context.getImageData(0, 0, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(data, canvas.width, canvas.height);
    texture.needsUpdate = true;
    
    const textSprit = new THREE.Sprite(new THREE.SpriteMaterial({map: texture, color: color}));            
    
    textSprit.scale.set(0.8, 0.8, 0.8);
    textSprit.rotateZ(Math.PI);
    return textSprit;
}

// 连续播放动画
function playModifierAnimation(from, fSpeed, to, tSpeed) {
    to.setLoop(THREE.LoopOnce);
    to.reset();
    to.play();
    from.crossFadeTo(to, fSpeed, true);
    setTimeout(function() {
        from.enabled = true;
        to.crossFadeTo(from, tSpeed, true);
        
    }, to._clip.duration * 1000 - ((tSpeed + fSpeed) * 1000));
}

export {
    THREE,
    createApp,
    loadObj,
    drawCoord,
    addLights,
    addFloor
}