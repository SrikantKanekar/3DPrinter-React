/**
 * time in seconds
 * material in cubic meter
 */
export function calculateSlicingDetails(time, material) {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time % 3600 / 60)

    const printTime = `${hours}h ${minutes}m`
    const materialWeight = (material * 0.00123).toFixed(2)
    const filament = (material / 2405).toFixed(2)
    const materialCost = (materialWeight * 1.85).toFixed(2)
    const powerCost = (time / 3600 * 2).toFixed(2)
    const labourCost = (time / 3600 * 10).toFixed(2)
    const price = Math.round(parseFloat(materialCost) + parseFloat(powerCost) + parseFloat(labourCost))

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