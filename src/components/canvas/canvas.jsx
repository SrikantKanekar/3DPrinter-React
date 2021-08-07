import React, {Component} from 'react';
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {GUI} from "three/examples/jsm/libs/dat.gui.module";
import styles from "./canvas.module.css"

class Canvas extends Component {
    state = {
        error: '',
        loading: true
    }

    constructor(props) {
        super(props);
        this.canvas = React.createRef()
        this.canvasContainer = React.createRef()
    }

    componentDidMount() {
        this.initialize()
        this.loadObjectFile()
        window.addEventListener('resize', this.refreshSize)
    }

    componentWillUnmount() {
        this.removeObject()
        window.removeEventListener('resize', this.refreshSize)
    }

    render() {
        const {loading, error} = this.state

        return (
            <div className={styles.container} ref={this.canvasContainer}>
                <canvas id="canvas" ref={this.canvas}/>

                {loading && (
                    <div id="canvasLoader" className={styles.overlay}>
                        <div className={styles.spinner_container}>
                            <span className={styles.spinner}/>
                        </div>
                    </div>
                )}

                {error && (
                    <div className={styles.error}>
                        <div>{this.state.error}</div>
                    </div>
                )}
            </div>
        );
    }

    initialize = () => {
        const canvasContainer = this.canvasContainer.current
        const canvas = this.canvas.current

        const sizes = {
            width: canvasContainer.clientWidth,
            height: canvasContainer.clientHeight
        }

        // scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);

        // axes
        // const axesHelper = new THREE.AxesHelper(5);
        // scene.add(axesHelper);

        // camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);

        // OrbitControls
        let controls = new OrbitControls(camera, canvas);
        controls.addEventListener('change', () => renderer.render(scene, camera));

        // renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            preserveDrawingBuffer: true
        });
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.3;
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;

        // Lighting
        const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
        scene.add(hemiLight);

        const spotLight = new THREE.SpotLight(0xffa95c, 4);
        spotLight.position.set(-50, 50, 50);
        spotLight.castShadow = true;
        spotLight.shadow.bias = -0.0001;
        spotLight.shadow.mapSize.width = 1024 * 4;
        spotLight.shadow.mapSize.height = 1024 * 4;
        scene.add(spotLight);

        // loading manager
        const manager = new THREE.LoadingManager();
        manager.onLoad = () => {
            this.setState({loading: false})
        }
        manager.onError = (url) => {
            this.setState({loading: false})
            this.showCanvasError("Error loading " + url)
        }

        // material for obj and stl files
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: .25,
            roughness: 0.3,
            transparent: true,
            transmission: 0.5,
            side: THREE.DoubleSide,
            clearcoat: 1.0,
            clearcoatRoughness: .25
        });

        // GUI
        const gui = new GUI({autoPlace: false});
        gui.close();
        gui.domElement.id = "gui";
        this.canvasContainer.current.appendChild(gui.domElement);

        const data = {
            sceneColor: scene.background.getHex(),
            materialColor: material.color.getHex()
        };

        const cameraFolder = gui.addFolder("Camera")
        cameraFolder.add(camera.position, "x", 0, 10, 0.01).onChange(this.renderCanvas).listen()
        cameraFolder.add(camera.position, "y", 0, 10, 0.01).onChange(this.renderCanvas).listen()
        cameraFolder.add(camera.position, "z", 0, 10, 0.01).onChange(this.renderCanvas).listen()

        const colorFolder = gui.addFolder("Colors")
        colorFolder.addColor(data, "sceneColor").onChange(() => {
            scene.background.setHex(Number(data.sceneColor.toString().replace('#', '0x')))
            this.renderCanvas()
        });
        colorFolder.addColor(data, "materialColor").onChange(() => {
            material.color.setHex(Number(data.materialColor.toString().replace('#', '0x')))
            this.renderCanvas()
        });

        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.sizes = sizes
        this.material = material
        this.controls = controls
        this.manager = manager
    }

    loadObjectFile = () => {
        const {file, fileUrl, fileExt} = this.props
        if (file) {
            const url = URL.createObjectURL(file);
            const ext = this.getFileExtension(file)
            this.loadObject(url, ext)
            URL.revokeObjectURL(url);
        } else if (fileUrl) {
            this.loadObject(fileUrl, fileExt)
        } else {
            this.showCanvasError("File url not found")
        }
    }

    loadObject = (url, ext) => {
        this.refreshSize();
        if (ext === "glb") {
            new GLTFLoader(this.manager).load(url, (gltf) => {
                this.renderObject(gltf.scene)
            }, undefined, (e) => {
                this.showCanvasError(e.message)
            });
        } else if (ext === "obj") {
            new OBJLoader(this.manager).load(url, (object) => {
                    object.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                            child.material = this.material
                        }
                    });
                    this.renderObject(object)
                }, undefined, (e) => {
                    this.showCanvasError(e.message)
                }
            );
        } else if (ext === "stl") {
            new STLLoader(this.manager).load(url, (geometry) => {
                    const mesh = new THREE.Mesh(geometry, this.material)
                    this.renderObject(mesh);
                }, undefined, (e) => {
                    this.showCanvasError(e.message)
                }
            );
        } else {
            this.showCanvasError(`${ext} file type not supported`)
        }
    }

    renderObject = (object) => {
        const box = new THREE.Box3().setFromObject(object);

        // zoom camera according to object size
        const cameraPosition = Math.max(
            box.max.y - box.min.y,
            box.max.z - box.min.z,
            box.max.x - box.min.x
        ) * 0.5;
        this.camera.position.x = cameraPosition;
        this.camera.position.y = cameraPosition * 0.5;
        this.camera.position.z = cameraPosition * 2.5;
        this.camera.lookAt(0, 0, 0)

        //position object to origin
        object.position.x = -box.min.x - (box.max.x - box.min.x) / 2;
        object.position.y = -box.min.y - (box.max.y - box.min.y) / 2;
        object.position.z = -box.min.z - (box.max.z - box.min.z) / 2;

        this.scene.add(object);
        this.renderer.render(this.scene, this.camera);
        this.currentModel = object

        this.checkSizeError(box)
    }

    checkSizeError = (box) => {
        const vector = new THREE.Vector3()
        box.getSize(vector)
        if (vector.x > 200 || vector.y > 200 || vector.z > 250) this.props.sizeError()
    }

    showCanvasError = (e) => {
        this.props.canvasError(e)
        this.setState({error: e})
    }

    removeObject = () => {
        this.scene.remove(this.currentModel);
        this.renderer.render(this.scene, this.camera);
    }

    refreshSize = () => {
        const canvasContainer = this.canvasContainer.current

        this.sizes.width = canvasContainer.clientWidth
        this.sizes.height = canvasContainer.clientHeight

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderCanvas();
    }

    renderCanvas = () => {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }

    takeSnapshot = () => {
        const temporaryCanvas = document.createElement('canvas');
        let context = temporaryCanvas.getContext('2d');

        const canvas = this.canvas.current
        let cWidth = canvas.width;
        let cHeight = canvas.height;

        if (cWidth < cHeight) {
            temporaryCanvas.width = cWidth;
            temporaryCanvas.height = cWidth;
            let x = cHeight / 2 - cWidth / 2;
            context.drawImage(canvas, 0, x, cWidth, cWidth, 0, 0, cWidth, cWidth);
        } else {
            temporaryCanvas.width = cHeight;
            temporaryCanvas.height = cHeight;
            let x = cWidth / 2 - cHeight / 2;
            context.drawImage(canvas, x, 0, cHeight, cHeight, 0, 0, cHeight, cHeight);
        }
        return temporaryCanvas.toDataURL("image/png");
    }

    getFileExtension(file) {
        const lastDot = file.name.lastIndexOf('.');
        return file.name.substring(lastDot + 1).toLowerCase();
    }
}

export default Canvas;