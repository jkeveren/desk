import iterateReplaceProperties from './iterateReplaceProperties.mjs';
import log from './log.mjs';

const squareTubeLink = 'https://hyadelaljarafe.es/hierros/tubos/tubo-cuadrado/';
const plateLink = 'https://hyadelaljarafe.es/hierros/chapas/chapas-a-medida/';

const suppliers = {
	'Hierros y Aieros': {
		link: 'https://hyadelaljarafe.es/',
		products: {
			squareTube80_2_2500:          [17.68, 1, squareTubeLink],
			squareTube45_1mm5_2500:       [ 7.83, 1, squareTubeLink],
			squareTube60_2_2000:          [ 8.18, 1, squareTubeLink],
			rectangularTube_60_40_3_2500: [13.26, 1, 'https://hyadelaljarafe.es/hierros/tubos/tubo-rectangular/'],
			plate_5_1200_625:             [46.00, 1, plateLink],
			plate_2_2000_1000:            [49.00, 1, plateLink]
		}
	},
	'RS Components Spain': {
		link: 'https://es.rs-online.com',
		products: {
			wireRope_1mm8_100m:         [66.73,   1, 'https://es.rs-online.com/web/p/products/1244748/'],
			shaft_20_1000:              [40.47,   3, 'https://es.rs-online.com/web/p/varillas-barras-tubos-hexagonales-de-acero/0770440/'],
			bearing_20_32_7:            [ 3.10,   1, 'https://es.rs-online.com/web/p/rodamientos-de-bola/6190323/'],
			threadedRivet_M8:           [19.81, 100, 'https://es.rs-online.com/web/p/remaches/7689984/'],
			flangedNut_M8_8:            [11.15, 100, 'https://es.rs-online.com/web/p/tuercas-hexagonales-con-reborde/0275484/'],
			lockNut_M8_8:               [ 9.67, 100, 'https://es.rs-online.com/web/p/tuercas-de-bloqueo/1224373/'],
			washer_M8_17_1mm6:          [ 3.61, 100, 'https://es.rs-online.com/web/p/arandelas-planas/0527634/'],
			washer_M8_25_1mm5:          [ 6.35, 100, 'https://es.rs-online.com/web/p/arandelas-guardabarros/6667772/'],
			countersunkAllenBolt_M8_20: [13.50,  50, 'https://es.rs-online.com/web/p/tornillos-allen/0281552/'],
			allenBolt_M8_12:            [26.13, 100, 'https://es.rs-online.com/web/p/tornillos-allen/1247274/'],
			allenBolt_M8_16:            [17.97,  50, 'https://es.rs-online.com/web/p/tornillos-allen/4838382/'],
			allenBolt_M8_20:            [16.66,  50, 'https://es.rs-online.com/web/p/tornillos-allen/4838398/'],
			allenBolt_M8_60:            [31.23,  50, 'https://es.rs-online.com/web/p/tornillos-allen/4839515/'],
		}
	}
};

// products

const products = {};

for (const [supplierKey, supplier] of Object.entries(suppliers)) {
	for (let [productKey, productDetails] of Object.entries(supplier.products)) {
		products[productKey] = supplier.products[productKey] = {
			supplier,
			packPrice: productDetails[0],
			packSize: productDetails[1],
			link: productDetails[2],
			parts: [],
		};
	}
}

// parts

const p = products;

const legCount = 4; // bacause magic numbers cause confusion
const surfaceStructureProduct = p.rectangularTube_60_40_3_2500;
const surfacePlateCount = 5;
const surfaceStructureMemberCount = 7;
const surfaceToSurfaceStructureFastenerCount = 2 * surfacePlateCount * surfaceStructureMemberCount;
const surfaceStructureToSurfaceStructureEndsFastenerCount = (surfaceStructureMemberCount - 2) * 4;
const shaftFastenerCount = (8.5) * legCount; // 2 at top, 2 at bottom outside, 1 bottom inside, 1(2 on half of legs) for directing cable to spool
const lowerShaftSupportFastenerCount = 4 * legCount;
const surfaceStructureToLegGuideFastenerCount = (2 * 2) * legCount; // 2 per joint, 2 joints per leg
const legGuideSupportToLegGuideFastenerCount = (2 * 2) * legCount; // 2 per joint, 2 joints per leg
const legGuideSupportToSurfaceStructureFastenerCount = 2 * legCount;

const parts = {
	legGuides:                                     [p.squareTube80_2_2500, 1],
	legGuideSupports:                              [p.squareTube45_1mm5_2500, legCount],
	legs:                                          [p.squareTube60_2_2000, legCount],
	surfaceStructure:                              [surfaceStructureProduct, surfaceStructureMemberCount],
	surfaceStructureEnds:                          surfaceStructureProduct,
	surface:                                       [p.plate_5_1200_625, surfacePlateCount],
	hoistRope:                                     p.wireRope_1mm8_100m,
	pulleyBearings:                                [p.bearing_20_32_7, 8.5 * legCount], // 4 at top, 2 on bottom outside, 1 bottom inside, 1(2 on half of legs) for directing cable to spool
	shaft:                                         [p.shaft_20_1000, 2],
	shaftWashers:                                  [p.washer_M8_25_1mm5, shaftFastenerCount], // goes on the bolts not the shaft itself
	shaftBolts:                                    [p.allenBolt_M8_20, shaftFastenerCount],
	lowerShaftSupport:                             [p.plate_2_2000_1000, 0.1], // dont need an entire sheet but order one because its useful
	lowerShaftSupportNut:                          [p.flangedNut_M8_8, lowerShaftSupportFastenerCount], // outside 2 pulleys and inside pulley
	lowerShaftSupportWasher:                       [p.washer_M8_17_1mm6, lowerShaftSupportFastenerCount],
	lowerShaftSupportBolt:                         [p.allenBolt_M8_16, lowerShaftSupportFastenerCount], // use 16mm bolts but cut the ends off
	surfaceToSurfaceStructureNuts:                 [p.threadedRivet_M8, surfaceToSurfaceStructureFastenerCount],
	surfaceToSurfaceStructureBolts:                [p.countersunkAllenBolt_M8_20, surfaceToSurfaceStructureFastenerCount],
	surfaceStructureToSurfaceStructureEndsNuts:    [p.threadedRivet_M8, surfaceStructureToSurfaceStructureEndsFastenerCount],
	surfaceStructureToSurfaceStructureEndsWashers: [p.washer_M8_17_1mm6, surfaceStructureToSurfaceStructureEndsFastenerCount],
	surfaceStructureToSurfaceStructureEndsBolts:   [p.allenBolt_M8_20, surfaceStructureToSurfaceStructureEndsFastenerCount],
	surfaceStructureToLegGuideNuts:                [p.flangedNut_M8_8, surfaceStructureToLegGuideFastenerCount],
	surfaceStructureToLegGuideWashers:             [p.washer_M8_17_1mm6, surfaceStructureToLegGuideFastenerCount],
	surfaceStructureToLegGuideBolts:               [p.allenBolt_M8_16, surfaceStructureToLegGuideFastenerCount],
	legGuideSupportToLegGuideNuts:                 [p.flangedNut_M8_8, legGuideSupportToLegGuideFastenerCount],
	legGuideSupportToLegGuideWashers:              [p.washer_M8_17_1mm6, legGuideSupportToLegGuideFastenerCount],
	legGuideSupportToLegGuideBolts:                [p.allenBolt_M8_12, legGuideSupportToLegGuideFastenerCount],
	legGuideSupportToSurfaceStructureNuts:         [p.lockNut_M8_8, legGuideSupportToSurfaceStructureFastenerCount],
	legGuideSupportToSurfaceStructureWashers:      [p.washer_M8_17_1mm6, legGuideSupportToSurfaceStructureFastenerCount * 2], // washer under both bolt head and nut side
	legGuideSupportToSurfaceStructureBolts:        [p.allenBolt_M8_60, legGuideSupportToSurfaceStructureFastenerCount],
};

for (const [partKey, partDetails] of Object.entries(parts)) {
	const partDetailsIsArray = partDetails instanceof Array;
	const product = partDetailsIsArray ? partDetails[0] : partDetails
	if (!product) {
		throw new Error(`product for part "${partKey}" does not exist or in unspcified`)
	}
	if (partDetailsIsArray && partDetails[1] !== undefined && (typeof partDetails[1] !== 'number' || partDetails[1] <= 0)) {
		throw new Error(`"${partDetails[1]}" is an invalid value for count of part "${partKey}"`);
	}
	product.parts.push(parts[partKey] = {
		product: product,
		count: partDetailsIsArray ? partDetails[1] || 1 : 1,
	});
}
