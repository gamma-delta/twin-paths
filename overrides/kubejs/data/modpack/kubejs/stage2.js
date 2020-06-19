events.listen("server.datapack.recipes", function (ev) {
    // Make the Mixer not need an electron tube
    ev.replaceInput({ id: 'create/crafting_shaped/contraptions/mechanical_mixer' }, 'create:electron_tube', 'create:shaft');

    // Natural Altar needs Brass
    ev.remove({ id: 'naturesaura:tree_ritual/nature_altar' });
    ev.recipes.naturesaura.tree_ritual({
        ingredients: [
            // 517
            // 3 4
            // 826
            "minecraft:stone", "minecraft:stone", "minecraft:stone", "naturesaura:gold_leaf",
            "minecraft:gold_ingot", "naturesaura:token_joy", "create:brass_ingot", "create:brass_ingot",
        ].map(function (name) { return { item: name }; }),
        sapling: {
            item: "minecraft:oak_sapling"
        },
        output: {
            item: "naturesaura:nature_altar"
        },
        time: 500
    }).id('naturesaura:tree_ritual/nature_altar');

    // Petal Apothecary needs Infused Rock
    ev.remove({ id: 'botania:apothecary_default' });
    ev.shaped(
        item.of('botania:apothecary_default', 1),
        [
            'SPS',
            ' R ',
            'RRR'
        ],
        {
            S: 'naturesaura:infused_slab',
            P: '#botania:petals',
            R: 'naturesaura:infused_stone'
        }
    ).id('botania:apothecary_default');

    // Mana Spreader needs Infused Iron
    ev.replaceInput({ id: 'botania:mana_spreader' }, 'minecraft:gold_ingot', 'naturesaura:infused_iron');

    // Manasteel needs Infused Iron or Steel
    ev.remove({ id: 'botania:mana_infusion/manasteel' });
    ev.recipes.botania.mana_infusion({
        input: {
            item: "naturesaura:infused_iron"
        },
        output: {
            item: "botania:manasteel_ingot"
        },
        mana: 3000 // aaaa nuMEbrICaL mANANNNAN?A?!?!?!??!1
    }).id('botania:mana_infusion/manasteel');
    ev.recipes.botania.mana_infusion({
        input: {
            tag: "forge:ingots/steel"
        },
        output: {
            item: "botania:manasteel_ingot"
        },
        mana: 2000
    });
    // and blocks too
    ev.remove({ id: 'botania:mana_infusion/manasteel_block' });
    ev.recipes.botania.mana_infusion({
        input: {
            item: "naturesaura:infused_iron_block"
        },
        output: {
            item: "botania:manasteel_block"
        },
        mana: 27000
    }).id('botania:mana_infusion/manasteel_block');
    ev.recipes.botania.mana_infusion({
        input: {
            tag: "forge:storage_blocks/steel"
        },
        output: {
            item: "botania:manasteel_block"
        },
        mana: 18000
    });

    // Compressed Steel instead of Compressed Iron
    ev.remove({ type: 'pneumaticcraft:explosion_crafting' });
    ev.recipes.pneumaticcraft.explosion_crafting({
        input: {
            tag: "forge:ingots/steel"
        },
        results: [
            { item: "pneumaticcraft:ingot_iron_compressed" }
        ],
        loss_rate: 20,
    }).id('pneumaticcraft:explosion_crafting/compressed_iron_ingot');
    ev.recipes.pneumaticcraft.explosion_crafting({
        input: {
            tag: "forge:storage_blocks/steel"
        },
        results: [
            { item: "pneumaticcraft:compressed_iron_block" }
        ],
        loss_rate: 20,
    }).id('pneumaticcraft:explosion_crafting/compressed_iron_block');
    ev.remove({ id: 'pneumaticcraft:pressure_chamber/compressed_iron_ingot' });
    ev.recipes.pneumaticcraft.pressure_chamber({
        inputs: [
            { tag: "forge:ingots/steel" }
        ],
        pressure: 2.0,
        results: [
            { item: "pneumaticcraft:ingot_iron_compressed" }
        ]
    }).id('pneumaticcraft:pressure_chamber/compressed_iron_ingot');
    ev.remove({ id: 'pneumaticcraft:pressure_chamber/compressed_iron_block' });
    ev.recipes.pneumaticcraft.pressure_chamber({
        inputs: [
            { tag: "forge:storage_blocks/steel" }
        ],
        pressure: 2.0,
        results: [
            { item: "pneumaticcraft:compressed_iron_block" }
        ]
    }).id('pneumaticcraft:pressure_chamber/compressed_iron_block');

    // Rose Quartz requires Runic Altar or Pressure Chamber
    var rose_quartz_ingredients = [
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:dusts/redstone" },
        { tag: "forge:gems/quartz" }
    ];
    ev.remove({ output: 'create:rose_quartz', type: 'minecraft:crafting_shapeless' });
    ev.recipes.botania.runic_altar({
        output: {
            item: 'create:rose_quartz'
        },
        mana: 8000,
        ingredients: rose_quartz_ingredients,
    });
    ev.recipes.pneumaticcraft.pressure_chamber({
        inputs: rose_quartz_ingredients,
        pressure: 4.0,
        results: [
            { item: 'create:rose_quartz' }
        ]
    });
});