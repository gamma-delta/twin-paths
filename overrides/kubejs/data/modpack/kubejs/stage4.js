events.listen("server.datapack.recipes", function (ev) {
    // Chromatic Compound recipe is made more evil
    ev.remove({ id: 'create:mixing/chromatic_compound' });
    ev.recipes.create.mixing({
        ingredients: [
            { tag: 'forge:gems/biotite', count: 3 },
            { item: 'create:polished_rose_quartz' },
            { tag: 'forge:gems/prismarine', count: 3 },
            { item: 'minecraft:dragon_breath', return_chance: 0.94 }
        ],
        results: [
            { item: 'create:chromatic_compound', count: 1 }
        ]
    });

    // Terrasteel Glombomgjomgmogfm Plate requires Chromatic compound
    ev.remove({ id: 'botania:terra_plate' });
    ev.shaped(
        { item: 'botania:terra_plate' },
        [
            'LLL',
            'aCb',
            'cMd'
        ],
        {
            L: 'create:lapis_sheet',
            C: 'create:chromatic_compound',
            M: '#forge:storage_blocks/manasteel',
            a: '#botania:runes/spring',
            b: '#botania:runes/summer',
            c: '#botania:runes/autumn',
            d: '#botania:runes/winter',
        }
    ).id('botania:terra_plate');

    // Tier 3 runes are *very* evil
    // Each requires two runes, a terrasteel nugget, a lingering potion, a rare mob drop, and a block that needs silk touch.
    // Ravager hide, Heart of Diamond, dragon scales, Totem of Undying, honeycomb, wither skull, rabbit's foot, crab shell, scute, nautilis shell
    // Chorus fruit, mushroom blocks, ore, coral, turtle egg, blue ice, bee nest, podzol/mycelium/grass
    [
        ['lust', 'winter', 'air', 'invisibility', 'minecraft:scute', 'minecraft:podzol'],
        ['gluttony', 'winter', 'fire', 'slowness', 'minecraft:honey_block', 'minecraft:turtle_egg'],
        ['greed', 'spring', 'water', 'healing', 'quark:diamond_heart', 'minecraft:diamond_ore'],
        ['sloth', 'autumn', 'air', 'weakness', 'minecraft:nautilus_shell', ['minecraft:red_mushroom_block', 'minecraft:brown_mushroom_block', 'minecraft:mushroom_stem']],
        ['wrath', 'winter', 'earth', 'strength', 'quark:ravager_hide', 'minecraft:bee_nest'],
        ['envy', 'winter', 'water', 'night_vision', 'minecraft:wither_skeleton_skull', 'minecraft:chorus_flower'],
    ].forEach(function (stuff) {
        var runeName = stuff[0];
        var ingredients = [
            { tag: 'botania:runes/' + stuff[1] },
            { tag: 'botania:runes/' + stuff[2] },
            item.of('minecraft:lingering_potion', { Potion: 'minecraft:' + stuff[3] }),
            { item: stuff[4] }
        ];
        if (typeof stuff[5] === 'string')
            ingredients.push({ item: stuff[5] });
        else // an array
            ingredients.push(stuff[5].map(function (e) { return { item: e } }));

        // And add terrasteel nugget
        ingredients.push({ tag: 'forge:nuggets/terrasteel' });

        var runeRecipeID = 'botania:runic_altar/' + runeName;
        var runeItemID = 'botania:rune_' + runeName;
        ev.remove({ id: runeRecipeID });
        ev.recipes.botania.runic_altar({
            ingredients: ingredients,
            mana: 15000,
            output: {
                item: runeItemID
            }
        }).id(runeRecipeID);
    });
    ev.remove({ id: 'botania:runic_altar/pride' });
    ev.recipes.botania.runic_altar({
        ingredients: [
            { tag: 'botania:runes/summer' },
            { tag: 'botania:runes/fire' },
            { item: 'minecraft:lingering_potion', nbt: { Potion: 'minecraft:regeneration' } },
            { tag: 'forge:ingots/brick' },
            { item: 'minecraft:cobblestone_wall' },
            ['tube', 'brain', 'bubble', 'fire', 'horn'].map(function (coral) { return { item: 'minecraft:' + coral + '_coral_block' } }),
            { tag: 'forge:nuggets/terrasteel' }
        ],
        mana: 15000,
        output: {
            item: 'botania:rune_pride'
        }
    }).id('botania:runic_altar/pride');

    // Make Natura Pylons need 3 ender eyes and 1 terrasteel nugget
    // This way you can evenly use up one ingot of terrasteel on 7 runes and 2 pylongs
    ev.remove({ id: 'botania:natura_pylon' });
    ev.shaped(
        'botania:natura_pylon',
        [
            ' E ',
            'EPE',
            ' T '
        ],
        {
            E: 'minecraft:ender_eye',
            P: 'botania:mana_pylon',
            T: '#forge:nuggets/terrasteel'
        }
    ).id('botania:natura_pylon');

    // The Elven Gateway Core requires stuff
    ev.remove({ id: 'botania:alfeim_portal' });
    ev.recipes.naturesaura.tree_ritual({
        ingredients: [
            // 517
            // 3 4
            // 826
            { item: 'botania:livingwood' },
            { tag: 'botania:runes/lust' },
            { tag: 'botania:runes/gluttony' },
            { tag: 'botania:runes/greed' },
            { tag: 'botania:runes/sloth' },
            { tag: 'botania:runes/wrath' },
            { tag: 'botania:runes/envy' },
            { tag: 'botania:runes/pride' }
        ],
        sapling: {
            item: 'naturesaura:ancient_sapling'
        },
        output: {
            item: 'botania:alfheim_portal',
            count: 1,
        },
        time: 500
        // The ID won't make it display in the lexicon but it will keep it from breaking everything
    }).id('botania:alfeim_portal');

    // Cheap elementium with aluminum
    ev.recipes.botania.elven_trade({
        ingredients: [{ tag: 'forge:ingots/aluminum' }],
        output: [{ item: 'botania:elementium_ingot' }]
    });
    ev.recipes.botania.elven_trade({
        ingredients: [{ tag: 'forge:storage_blocks/aluminum' }],
        output: [{ item: 'botania:elementium_block' }]
    });

    // Pneumatic dynamo requires chromatic compound
    ev.remove({ id: 'pneumaticcraft:pneumatic_dynamo' });
    ev.shaped(
        'pneumaticcraft:pneumatic_dynamo',
        [
            ' T ',
            'GCG',
            'SBS'
        ],
        {
            T: 'pneumaticcraft:advanced_pressure_tube',
            G: 'pneumaticcraft:compressed_iron_gear',
            C: 'create:chromatic_compound',
            S: '#forge:ingots/compressed_iron',
            B: 'pneumaticcraft:printed_circuit_board',
        }
    );

    // IE engineering blocks require shulker shells >:)
    ev.remove({ id: 'immersiveengineering:crafting/rs_engineering' });
    ev.shaped(
        { item: 'immersiveengineering:rs_engineering', count: 2 },
        [
            'CSC',
            'BIB',
            'CSC',
        ],
        {
            C: '#forge:ingots/iron',
            S: 'minecraft:shulker_shell',
            B: '#forge:ingots/brass',
            I: 'quark:redstone_inductor'
        }
    ).id('immersiveengineering:crafting/rs_engineering');
    ev.remove({ id: 'immersiveengineering:crafting/light_engineering' });
    ev.shaped(
        { item: 'immersiveengineering:light_engineering', count: 2 },
        [
            'CSC',
            'MBM',
            'CSC'
        ],
        {
            C: '#forge:ingots/steel',
            S: 'minecraft:shulker_shell',
            M: 'immersiveengineering:component_iron',
            B: 'create:brass_casing'
        }
    ).id('immersiveengineering:crafting/light_engineering');
    ev.remove({ id: 'immersiveengineering:crafting/heavy_engineering' });
    ev.shaped(
        { item: 'immersiveengineering:heavy_engineering', count: 2 },
        [
            'CSC',
            'MmM',
            'CSC'
        ],
        {
            C: '#forge:ingots/compressed_iron',
            S: 'minecraft:shulker_shell',
            M: 'immersiveengineering:component_steel',
            m: 'quark:magnet'
        }
    ).id('immersiveengineering:crafting/heavy_engineering');
    ev.remove({ id: 'immersiveengineering:crafting/generator' });
    ev.shaped(
        { item: 'immersiveengineering:generator', count: 2 },
        [
            'CSC',
            'EDE',
            'CSC',
        ],
        {
            C: '#forge:ingots/steel',
            S: 'minecraft:shulker_shell',
            E: '#forge:ingots/electrum',
            D: 'immersiveengineering:dynamo'
        }
    ).id('immersiveengineering:crafting/generator');
    ev.remove({ id: 'immersiveengineering:crafting/radiator' });
    ev.shaped(
        { item: 'immersiveengineering:radiator', count: 2 },
        [
            'CSC',
            'HIH',
            'CSC'
        ],
        {
            C: '#forge:ingots/steel',
            S: 'minecraft:shulker_shell',
            H: 'pneumaticcraft:heat_sink',
            I: 'minecraft:blue_ice'
        }
    )

    // Aluminum may only be made in the Arc Furnace.
    ev.remove({ or: [{ type: 'minecraft:smelting' }, { type: 'minecraft:blasting' }], output: '#forge:ingots/aluminum' });
    // But you can get more bang our of your ore with Elementium
    ev.recipes.immersiveengineering.arc_furnace({
        input: { tag: 'forge:ores/aluminum' },
        additives: [
            { item: 'create:limesand' },
            { tag: 'forge:ingots/elementium' }
        ],
        time: 200,
        energy: 102400,
        results: [{ base_ingredient: { tag: 'forge:ingots/aluminum' }, count: 4 }],
        slag: { tag: 'forge:slag', count: 2 }
    });
});