events.listen("server.datapack.recipes", function (ev) {
    // Copper ingots are in both Create and IE.
    // Make copper ingots only come from Create.
    ev.replaceOutput({}, 'immersiveengineering:ingot_copper', 'create:copper_ingot');
    // And of course it doesn't work properly on the arc furnace...
    // ev.remove({id: 'immersiveengineering:arcfurnace/dust_copper'});
    // ev.recipes.immersiveengineering.arc_furnace({
    //     input: {tag: 'forge:dusts/copper'},
    //     additives: [],
    //     time: 100,
    //     energy: 51200,
    //     results: []
    // });

    // Fix copper blocks:
    // By default use Create's block.
    // Craft 2 Create blocks together to get 2 IE blocks for the texture.
    ev.remove({ id: 'immersiveengineering:crafting/ingot_copper_to_storage_copper' });
    ev.shapeless(
        { item: 'immersiveengineering:storage_copper', count: 2 },
        ['create:copper_block', 'create:copper_block']
    );

    // No using the Engineer's hammer or wire cutters to make stuff!
    ev.remove({
        mod: 'immersiveengineering',
        input: 'immersiveengineering:hammer'
    });
    // Don't remove the recipe for the maintenence kit
    ev.remove({
        type: 'minecraft:crafting_shapeless',
        input: 'immersiveengineering:wirecutter'
    });

    // Make all Create sheets makeable in the metal press,
    // and all IE plates makeable in the mechanical press.
    // Use sheets if there is one, otherwise use plates.

    // Make copper sheets and not plates in the metal press
    ev.replaceOutput({}, 'immersiveengineering:plate_copper', 'create:copper_sheet');
    // Make all these plates in Create's mechanical press
    ['aluminum', 'lead', 'silver', 'nickel', 'uranium', 'constantan', 'electrum', 'steel'].forEach(function (material) {
        ev.recipes.create.pressing({
            ingredients: [{ tag: "forge:ingots/" + material }],
            results: [{
                item: "immersiveengineering:plate_" + material,
                count: 1
            }]
        });
    });
    // Make lapis sheets in the IE press
    ev.recipes.immersiveengineering.metal_press({
        input: { tag: 'forge:storage_blocks/lapis' },
        mold: { item: 'immersiveengineering:mold_plate' },
        energy: 2400,
        result: { item: 'create:lapis_sheet' }
    });

    // No cheating prismarine! You need to get yourself to a monument.
    ev.remove({ output: 'minecraft:prismarine_shard' });
    ev.remove({ output: 'minecraft:prismarine_crystals' });

    // IE blueprint for circuit boards can't require aluminum
    ev.replaceInput({ id: 'immersiveengineering:crafting/blueprint_components' }, '#forge:ingots/aluminum', '#forge:ingots/brass');

    // IE mechanical components require brass
    ev.remove({ id: 'immersiveengineering:crafting/component_iron' });
    ev.shaped(
        'immersiveengineering:component_iron',
        [
            'IBI',
            'BCB',
            'IBI'
        ],
        {
            I: '#forge:plates/iron',
            B: '#forge:nuggets/brass',
            C: '#forge:ingots/copper',
        }
    ).id('immersiveengineering:crafting/component_iron');
    ev.remove({ id: 'immersiveengineering:blueprint/component_iron' });
    ev.recipes.immersiveengineering.blueprint({
        category: 'components',
        inputs: [
            { base_ingredient: { tag: 'forge:plates/iron' }, count: 2 },
            { base_ingredient: { tag: 'forge:nuggets/brass' }, count: 2 },
            { tag: 'forge:ingots/copper' }
        ],
        result: { item: 'immersiveengineering:component_iron' }
    }).id('immersiveengineering:blueprint/component_iron');
    ev.remove({ id: 'immersiveengineering:crafting/component_steel' });
    ev.shaped(
        'immersiveengineering:component_steel',
        [
            'SBS',
            'BCB',
            'SBS'
        ],
        {
            S: '#forge:plates/steel',
            B: '#forge:nuggets/brass',
            C: '#forge:ingots/copper',
        }
    ).id('immersiveengineering:crafting/component_steel');
    ev.remove({ id: 'immersiveengineering:blueprint/component_steel' });
    ev.recipes.immersiveengineering.blueprint({
        category: 'components',
        inputs: [
            { base_ingredient: { tag: 'forge:plates/steel' }, count: 2 },
            { base_ingredient: { tag: 'forge:nuggets/brass' }, count: 2 },
            { tag: 'forge:ingots/copper' }
        ],
        result: { item: 'immersiveengineering:component_steel' }
    }).id('immersiveengineering:blueprint/component_steel');

    // Arc furnace doesn't automatically double ores
    [
        'gold', 'iron', 'copper', 'zinc', 'aluminum', 'lead', 'silver', 'nickel', 'uranium'
    ].forEach(function (ore) {
        var recipeID = 'immersiveengineering:arcfurnace/ore_' + ore;
        ev.remove({ id: recipeID });
        ev.recipes.immersiveengineering.arc_furnace({
            input: { tag: 'forge:ores/' + ore },
            additives: [
                { item: 'create:limesand' }
            ],
            time: 200,
            energy: 204800,
            results: [{ base_ingredient: { tag: 'forge:ingots/' + ore }, count: 2 }],
            slag: { tag: 'forge:slag' }
        }).id(recipeID);
    });

    // Brass can't be made in the alloy kiln
    // why is 'kiln' an allowed word? what is that ln doing?
    ev.remove({ id: 'immersiveengineering:alloysmelter/brass' });

    // Un-break IE creosote and Pneumatic lubricant recipes
    ev.shaped(
        { item: 'immersiveengineering:treated_wood_horizontal', count: 8 },
        [
            'WWW',
            'WBW',
            'WWW'
        ],
        {
            W: '#minecraft:planks',
            B: 'immersiveengineering:creosote_bucket'
        }
    ).id('immersiveengineering:crafting/treated_wood_horizontal');
    ev.shaped(
        { item: 'minecraft:torch', count: 12 },
        [
            '   ',
            'WB ',
            'SSS'
        ],
        {
            W: '#minecraft:wool',
            B: 'immersiveengineering:creosote_bucket',
            S: '#forge:rods/wooden'
        }
    ).id('immersiveengineering:crafting/torch');
    ev.shaped(
        { item: 'pneumaticcraft:speed_upgrade' },
        [
            'LXL',
            'XCX',
            'LXL'
        ],
        {
            L: '#pneumaticcraft:upgrade_components',
            X: 'minecraft:sugar',
            C: 'pneumaticcraft:lubricant_bucket',
        }
    ).id('pneumaticcraft:speed_upgrade');
});

events.listen("jei.hide.items", function (ev) {
    // Hide unwanted items
    [
        'immersiveengineering:ingot_copper',
        'immersinveengineering:plate_copper'
    ].forEach(function (item) {
        ev.hide(item);
    });
});

events.listen('item.tags', function (ev) {
    // Remove IE copper from forge's copper tags
    ev.get('forge:ingots/copper').remove('immersiveengineering:ingot_copper');
    ev.get('forge:plates/copper').remove('immersiveengineering:plate_copper');
    ev.get('forge:nuggets/copper').remove('immersiveengineering:nugget_copper');
    // Keep blocks, though
});