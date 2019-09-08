import log from './log.mjs';
import iterateReplaceProperties from './iterateReplaceProperties.mjs';

// properties

const surfaceStructureLongMembersCount = 7;

// suppliers

const HierrosYAieros = {
	name: 'Hierros y Aieros',
	link: 'https://hyadelaljarafe.es/'
};

const RSComponents = {
	name: 'RS Components Spain',
	link: 'https://es.rs-online.com/'
}

const suppliers = [
	HierrosYAieros,
	RSComponents
];

// products

const products = iterateReplaceProperties(
	{
		allenBolt_M8x12: [RSComponents, 17.97, 1]
	},
	(values, productName) => ({
		supplier: values[0],
		packPrice: values[1],
		packSize: values[2] || 1
	})
);

// parts

const parts = iterateReplaceProperties(
	[
		[
			'Surface Structure to Surface Structure Ends Bolts',
			products.allenBolt_M8x12,
			(surfaceStructureLongMembersCount - 2) * 4
		]
	],
	values => ({
		name: values[0],
		uses: values[1],
		count: values[2] || 1
	})
);

log(parts);
