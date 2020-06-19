events.listen("server.datapack.recipes", function (ev) {
    // Psi's CADs are now made with Electron Tubes
    [
        ['iron'],
        ['gold'],
        ['psimetal'],
        ['ebony', true],
        ['ivory', true]
    ].forEach(function (material) {
        var mat_name = material[0];
        if (material[1])
            mat_name += '_psimetal';
        var item_name = 'psi:cad_assembly_' + mat_name;
        var recipe_name = 'psi:cad_assembly_' + material[0];
        ev.remove({ id: recipe_name });
        ev.shaped(
            item.of(item_name, 1),
            [
                '   ',
                'MMM',
                ' TM'
            ],
            {
                M: '#forge:ingots/' + mat_name,
                T: 'create:electron_tube'
            }
        ).id(recipe_name)
    });
    // Ebony and Ivory require Create's chromatic materials & a runic altar
    [
        ['ebony', 'create:shadow_steel'], ['ivory', 'create:refined_radiance']
    ].forEach(function (materials) {
        var psimetal = 'psi:' + materials[0] + '_psimetal';
        var psi_substance = 'psi:' + materials[0] + '_substance';
        ev.remove({ id: psimetal });
        ev.recipes.botania.runic_altar({
            output: {
                item: psimetal
            },
            mana: 18000,
            ingredients: [
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: psi_substance },
                { item: materials[1] },
                { tag: 'forge:ingots/psimetal' }
            ],
        });
    });

    // Spirits of Calling require Polished Rose Quartz
    ev.replaceInput({ id: 'naturesaura:calling_spirit' }, '#forge:gems/diamond', 'create:polished_rose_quartz');

    // Change botania's rune recipes
    // Red -> Fire
    // White -> Winter
    // Violet -> Spring
    // Indigo -> Water
    // Blue -> Air
    // Lime -> Earth
    // Yellow -> Autumn
    // Orange -> Summer
    [
        ['botania:rune_water', ['minecraft:fishing_rod', 'minecraft:sugar_cane', 'minecraft:bone_meal', 'quark:blue_rune']],
        ['botania:rune_fire', ['minecraft:nether_brick', 'minecraft:gunpowder', 'minecraft:nether_wart', 'quark:red_rune']],
        ['botania:rune_earth', ['#forge:stone', '#forge:storage_blocks/coal', '#forge:mushrooms', 'quark:lime_rune']],
        ['botania:rune_air', ['#minecraft:carpets', '#forge:feathers', '#forge:string', 'quark:light_blue_rune']]
    ].forEach(function (stuff) {
        var rune = stuff[0], ingredients = stuff[1];
        ingredients.unshift('#forge:ingots/manasteel', '#forge:dusts/mana', 'naturesaura:sky_ingot');
        var expandedIngredients = ingredients.map(function (i) {
            if (i.startsWith('#'))
                return { tag: i.substr(1) };
            else
                return { item: i };
        });
        var rune_id = rune.match(/^botania:rune_(\w+)$/)[1];
        ev.remove({ id: 'botania:runic_altar/' + rune_id });
        ev.recipes.botania.runic_altar({
            ingredients: expandedIngredients,
            mana: 5500, // just a little more than normal
            output: {
                item: rune,
                count: 2
            }
        }).id('botania:runic_altar/' + rune_id);
    });
    [
        ['botania:rune_spring', [
            '#botania:runes/water', '#botania:runes/fire', '#minecraft:saplings', 'minecraft:wheat',
            'minecraft:rabbit_hide', 'quark:magenta_rune', 'naturesaura:token_euphoria'
        ]],
        ['botania:rune_summer', [
            '#botania:runes/earth', '#botania:runes/air', '#minecraft:sand', '#forge:slimeballs',
            'minecraft:melon_slice', 'quark:orange_rune', 'naturesaura:token_rage'
        ]],
        ['botania:rune_autumn', [
            '#botania:runes/fire', '#botania:runes/air', '#minecraft:leaves', 'minecraft:spider_eye',
            'minecraft:carved_pumpkin', 'quark:yellow_rune', 'naturesaura:token_terror'
        ]],
        ['botania:rune_winter', [
            '#botania:runes/water', '#botania:runes/earth', 'minecraft:snow_block', '#minecraft:wool',
            'minecraft:cake', 'quark:white_rune', 'naturesaura:token_grief'
        ]]
    ].forEach(function (stuff) {
        var rune = stuff[0], ingredients = stuff[1];
        var expandedIngredients = ingredients.map(function (i) {
            if (i.startsWith('#'))
                return { tag: i.substr(1) };
            else
                return { item: i };
        });
        var rune_id = rune.match(/^botania:rune_(\w+)$/)[1];
        ev.remove({ id: 'botania:runic_altar/' + rune_id });
        ev.recipes.botania.runic_altar({
            ingredients: expandedIngredients,
            mana: 9001, // its over 9000!
            output: {
                item: rune,
                count: 2
            }
        }).id('botania:runic_altar/' + rune_id);
    });

    // Immersive vacuum tubes require electron tubes and a vacuum
    ev.remove({ id: 'immersiveengineering:blueprint/electron_tube' });
    ev.recipes.pneumaticcraft.pressure_chamber({
        inputs: [
            { tag: 'forge:glass' },
            { tag: 'forge:plates/nickel' },
            { tag: 'forge:dusts/redstone' },
            { item: 'create:electron_tube' }
        ],
        pressure: -0.9,
        results: [
            { item: 'immersiveengineering:electron_tube', count: 4 }
        ]
    });

    // Immersive circuit boards require Create integrated circuits
    ev.remove({ id: 'immersiveengineering:blueprint/circuit_board' });
    ev.recipes.immersiveengineering.blueprint({
        category: 'components',
        inputs: [
            { item: 'immersiveengineering:insulating_glass' },
            { tag: 'forge:plates/copper' },
            { item: 'immersiveengineering:electron_tube' },
            { item: 'create:integrated_circuit' }
        ],
        result: { item: 'immersiveengineering:circuit_board' }
    }).id('immersiveengineering:blueprint/circuit_board');

    // Pneumatic oil refining requires Immersive circuit boards
    ev.replaceInput({ id: 'pneumaticcraft:refinery' }, '#forge:dusts/redstone', 'immersiveengineering:circuit_board');
    ev.replaceInput({ id: 'pneumaticcraft:refinery_output' }, '#forge:gems/diamond', 'immersiveengineering:circuit_board');
    // Using coal for plastic is 4x less effecient. Use phantom membranes instead
    ev.remove({ id: 'pneumaticcraft:thermo_plant/plastic' });
    ev.recipes.pneumaticcraft.thermo_plant({
        item_input: { tag: 'minecraft:coals', count: 4 },
        fluid_input: { type: 'pneumaticcraft:fluid', tag: 'pneumaticcraft:lpg', amount: 400 },
        fluid_output: { fluid: 'pneumaticcraft:plastic', amount: 1000 },
        temperature: { min_temp: 373 },
        exothermic: false
    });
    ev.recipes.pneumaticcraft.thermo_plant({
        item_input: { item: 'minecraft:phantom_membrane' },
        fluid_input: { type: 'pneumaticcraft:fluid', tag: 'pneumaticcraft:lpg', amount: 100 },
        fluid_output: { fluid: 'pneumaticcraft:plastic', amount: 1000 },
        temperature: { min_temp: 373 },
        exothermic: false
    });
    // Pneumatic Unassembled PCBs require Immersive circuit boards
    ev.remove({ id: 'pneumaticcraft:pressure_chamber/empty_pcb' });
    ev.recipes.pneumaticcraft.pressure_chamber({
        inputs: [
            { item: 'immersiveengineering:circuit_board' },
            {
                type: "pneumaticcraft:stacked_item",
                tag: "forge:nuggets/gold",
                count: 3
            },
            { item: "pneumaticcraft:plastic" }
        ],
        pressure: 2.0,
        results: [
            { item: "pneumaticcraft:empty_pcb", count: 3 }
        ]
    }).id('pneumaticcraft:pressure_chamber/empty_pcb');

    // Eyes of ender are made either with a forest ritual or an assembly line
    ev.remove({ output: 'minecraft:ender_eye' });
    ev.recipes.naturesaura.tree_ritual({
        ingredients: [
            // 517
            // 3 4
            // 826
            'botania:runes/spring', 'botania:runes/summer', 'botania:runes/autumn', 'botania:runes/winter',
            'forge:ender_pearls', 'forge:ender_pearls', 'forge:ender_pearls', 'forge:ender_pearls'
        ].map(function (name) { return { tag: name }; }),
        sapling: {
            item: 'naturesaura:ancient_sapling'
        },
        output: {
            item: 'minecraft:ender_eye',
            count: 4,
        },
        time: 500
    });
    ev.recipes.pneumaticcraft.assembly_laser({
        input: {
            tag: 'forge:ender_pearls'
        },
        program: 'laser',
        result: { item: 'minecraft:ender_eye' }
    });

    // Mana pearls require an eye of ender >:)
    ev.replaceInput({ id: 'botania:mana_infusion/mana_pearl' }, 'minecraft:ender_pearl', 'minecraft:ender_eye');
});