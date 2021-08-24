import {CuraWASM} from "cura-wasm";
import {resolveDefinition} from "cura-wasm-definitions";
import {getCuraOverrides} from "./settingOverrides";
import {calculateSlicingDetails} from "../../../../../util/priceCalculator";

export async function sliceAllQualities(file, progress) {
    let total = 0
    const [_super, low] = await Promise.all([
        slice(file, "SUPER", () => progress(total++ / 4)),
        slice(file, "LOW", () => progress(total++ / 4))
    ])

    const [dynamic, standard] = await Promise.all([
        slice(file, "DYNAMIC", () => progress(total++ / 4)),
        slice(file, "STANDARD", () => progress(total++ / 4)),
    ])

    return new Promise((resolve, reject) => {
        if (!_super.price || !low.price || !dynamic.price || !standard.price) {
            reject("Error Slicing Object, please contact us")
        }
        resolve({_super, dynamic, standard, low})
    })
}

async function slice(file, quality, progress) {

    const slicer = new CuraWASM({
        definition: resolveDefinition('creality_ender3'),
        overrides: getCuraOverrides(quality),
        transfer: true,
        verbose: false
    })

    const stl = await file.arrayBuffer();
    slicer.on('progress', percent => progress(percent))
    const {metadata} = await slicer.slice(stl, 'stl')
    await slicer.destroy()

    return calculateSlicingDetails(metadata.printTime, metadata.material1Usage)
}
