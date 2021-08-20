import {CuraWASM} from "cura-wasm";
import {resolveDefinition} from "cura-wasm-definitions";
import {getCuraOverrides} from "./settingOverrides";

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

    const printTime = `${Math.floor(metadata.printTime / 3600)}h ${Math.floor(metadata.printTime % 3600 / 60)}m ${Math.floor(metadata.printTime % 3600 % 60)}s`;
    const materialWeight = (metadata.material1Usage * 0.00123).toFixed(2)
    const filament = (metadata.material1Usage / 2405).toFixed(2)
    const materialCost = (materialWeight * 1.85).toFixed(2)
    const powerCost = (metadata.printTime / 3600 * 2).toFixed(2)
    const labourCost = (metadata.printTime / 3600 * 10).toFixed(2)
    const price = Math.round(parseFloat(materialCost) + parseFloat(powerCost) + parseFloat(labourCost))

    await slicer.destroy()

    return {
        printTime,
        materialWeight,
        filament,
        materialCost,
        powerCost,
        labourCost,
        price
    }
}
